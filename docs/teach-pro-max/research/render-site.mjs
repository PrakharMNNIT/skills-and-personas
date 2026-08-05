#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptPath = fileURLToPath(import.meta.url);
const outputRoot = path.dirname(scriptPath);

async function loadMarked() {
  const candidates = [
    process.env.PRAX_MARKED_PATH,
    '/Users/prax/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/marked/lib/marked.esm.js',
  ].filter(Boolean);
  try {
    return (await import('marked')).marked;
  } catch {
    for (const candidate of candidates) {
      try {
        return (await import(pathToFileURL(candidate).href)).marked;
      } catch {
        // Try the next verified local runtime path.
      }
    }
  }
  throw new Error('Unable to load marked. Set PRAX_MARKED_PATH to marked.esm.js.');
}

const marked = await loadMarked();
marked.setOptions({ gfm: true, breaks: false });

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function stripTags(value) {
  return value
    .replace(/<code>([\s\S]*?)<\/code>/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .trim();
}

function slugify(value) {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}\s-]/gu, '')
    .trim()
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'section';
}

function parseFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) return { body: markdown, data: {} };
  const end = markdown.indexOf('\n---\n', 4);
  if (end === -1) return { body: markdown, data: {} };
  const raw = markdown.slice(4, end);
  const data = {};
  for (const line of raw.split('\n')) {
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (match) data[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
  }
  return { body: markdown.slice(end + 5), data };
}

const candidatePrunedDirectories = new Set([
  '.git', '.mypy_cache', '.pytest_cache', '.ruff_cache', '.venv', '__pycache__',
  'node_modules', 'runs', 'venv',
]);

async function walk(directory, { pruneRuntime = false } = {}) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    if (pruneRuntime && candidatePrunedDirectories.has(entry.name)) continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full, { pruneRuntime }));
    else files.push(full);
  }
  return files;
}

function sourceHash(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

function buildDate() {
  const value = process.env.SOURCE_DATE_EPOCH;
  if (!value) return new Date().toISOString();
  if (/^\d+$/.test(value)) return new Date(Number(value) * 1000).toISOString();
  const parsed = new Date(value);
  if (Number.isNaN(parsed.valueOf())) throw new Error('Invalid SOURCE_DATE_EPOCH');
  return parsed.toISOString();
}

const generatedAt = buildDate();

function relativeHref(fromFile, toFile) {
  let result = path.relative(path.dirname(fromFile), toFile).split(path.sep).join('/');
  if (!result.startsWith('.')) result = `./${result}`;
  return result;
}

function enrichMarkdownHtml(rawHtml) {
  const used = new Map();
  const toc = [];
  let html = rawHtml.replace(/<h([1-6])>([\s\S]*?)<\/h\1>/g, (match, levelText, inner) => {
    const level = Number(levelText);
    const label = stripTags(inner);
    const base = slugify(label);
    const count = used.get(base) || 0;
    used.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    if (level === 2 || level === 3) toc.push({ level, id, label });
    return `<h${level} id="${escapeHtml(id)}">${inner}<a class="heading-anchor" href="#${escapeHtml(id)}" aria-label="Link to ${escapeHtml(label)}">#</a></h${level}>`;
  });

  html = html
    .replace(/href="([^"#?]+)\.md(#[^"]*)?"/g, 'href="$1.html$2"')
    .replace(/\b(href|src)="([^"]*)"/g, (all, attribute, value) => `${attribute}="${value.replace(/&(?!#\d+;|#x[0-9a-f]+;|[a-z][a-z0-9]+;)/gi, '&amp;')}"`)
    .replaceAll('<table>', '<div class="table-wrap" tabindex="0" role="region" aria-label="Scrollable table"><table>')
    .replaceAll('</table>', '</table></div>');
  return { html, toc };
}

function tocHtml(items) {
  if (!items.length) return '';
  return `<nav class="toc" aria-label="On this page">
    <p class="toc-title">On this page</p>
    <ol>${items.map((item) => `<li class="toc-l${item.level}"><a href="#${escapeHtml(item.id)}">${escapeHtml(item.label)}</a></li>`).join('')}</ol>
  </nav>`;
}

function metadataCard(frontmatter) {
  if (!frontmatter.name && !frontmatter.description) return '';
  return `<aside class="metadata-card" aria-label="Skill metadata">
    <span class="metadata-label">Skill metadata</span>
    ${frontmatter.name ? `<code>${escapeHtml(frontmatter.name)}</code>` : ''}
    ${frontmatter.description ? `<p>${escapeHtml(frontmatter.description)}</p>` : ''}
  </aside>`;
}

const css = `
:root {
  color-scheme: light;
  --paper: #f7f3ea;
  --paper-deep: #efe7d7;
  --ink: #172235;
  --muted: #5d6674;
  --accent: #a44424;
  --accent-strong: #7d2f17;
  --teal: #176b69;
  --line: #d7cbb8;
  --surface: rgba(255, 253, 248, .82);
  --code: #1c2837;
  --code-ink: #f4f1ea;
  --shadow: 0 16px 48px rgba(65, 48, 29, .10);
  --sans: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --serif: ui-serif, Georgia, Cambria, "Times New Roman", serif;
}

[data-theme="dark"] {
  color-scheme: dark;
  --paper: #111923;
  --paper-deep: #182331;
  --ink: #edf2f5;
  --muted: #b4bdc8;
  --accent: #f19a72;
  --accent-strong: #ffc0a2;
  --teal: #72cbc5;
  --line: #344355;
  --surface: rgba(24, 35, 49, .86);
  --code: #09111a;
  --code-ink: #edf2f5;
  --shadow: 0 20px 56px rgba(0, 0, 0, .28);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 5.5rem; }
body {
  margin: 0;
  background:
    radial-gradient(circle at 8% 3%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 24rem),
    linear-gradient(180deg, var(--paper) 0%, var(--paper-deep) 100%);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 17px;
  line-height: 1.68;
  min-height: 100vh;
}
a { color: var(--accent-strong); text-decoration-thickness: .08em; text-underline-offset: .16em; }
a:hover { text-decoration-thickness: .14em; }
a:focus-visible, button:focus-visible, [tabindex="0"]:focus-visible {
  outline: 3px solid var(--teal);
  outline-offset: 3px;
}
.skip-link {
  position: fixed;
  z-index: 100;
  left: 1rem;
  top: .75rem;
  transform: translateY(-180%);
  background: var(--ink);
  color: var(--paper);
  padding: .65rem .9rem;
  border-radius: .45rem;
}
.skip-link:focus { transform: translateY(0); }
.progress { position: fixed; inset: 0 0 auto; height: 3px; z-index: 80; background: transparent; }
.progress > span { display: block; height: 100%; width: 0; background: linear-gradient(90deg, var(--accent), var(--teal)); }
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid color-mix(in srgb, var(--line) 82%, transparent);
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  backdrop-filter: blur(16px);
}
.topbar {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  min-height: 4.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.brand { display: flex; align-items: center; gap: .7rem; color: var(--ink); text-decoration: none; font-weight: 780; letter-spacing: -.015em; }
.brand-mark { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: 50%; color: #fff; background: linear-gradient(145deg, var(--accent), var(--teal)); box-shadow: var(--shadow); }
.top-actions { display: flex; gap: .55rem; align-items: center; }
.quiet-link, .theme-toggle {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: .48rem .78rem;
  background: var(--surface);
  color: var(--ink);
  font: 650 .84rem/1 var(--sans);
  text-decoration: none;
}
.theme-toggle { cursor: pointer; }
.layout {
  width: min(1180px, calc(100% - 2rem));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 17rem;
  gap: clamp(2rem, 5vw, 5rem);
  padding: clamp(2.5rem, 7vw, 6.5rem) 0 5rem;
  align-items: start;
}
.document { max-width: 49rem; min-width: 0; }
.eyebrow { margin: 0 0 1.1rem; color: var(--teal); font-size: .78rem; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
h1, h2, h3, h4 { font-family: var(--serif); line-height: 1.13; text-wrap: balance; scroll-margin-top: 6rem; }
h1 { font-size: clamp(2.55rem, 7vw, 5rem); letter-spacing: -.045em; margin: 0 0 1.5rem; max-width: 14ch; }
h2 { font-size: clamp(1.75rem, 4vw, 2.55rem); letter-spacing: -.025em; margin: 3.6rem 0 1rem; padding-top: .2rem; }
h3 { font-size: 1.38rem; margin: 2.3rem 0 .65rem; }
h4 { font-size: 1.08rem; margin: 1.8rem 0 .5rem; }
.heading-anchor { margin-left: .35em; font-family: var(--sans); font-size: .55em; font-weight: 500; opacity: 0; text-decoration: none; }
h1:hover .heading-anchor, h2:hover .heading-anchor, h3:hover .heading-anchor, h4:hover .heading-anchor, .heading-anchor:focus { opacity: .65; }
p, li { max-width: 72ch; }
p { margin: .78rem 0 1.15rem; }
strong { color: color-mix(in srgb, var(--ink) 92%, var(--accent)); }
hr { border: 0; border-top: 1px solid var(--line); margin: 3rem 0; }
blockquote {
  margin: 1.5rem 0;
  padding: .8rem 1.25rem;
  border-left: .3rem solid var(--accent);
  background: color-mix(in srgb, var(--surface) 86%, transparent);
  border-radius: 0 .7rem .7rem 0;
}
blockquote > :first-child { margin-top: 0; }
blockquote > :last-child { margin-bottom: 0; }
ul, ol { padding-left: 1.35rem; }
li { margin: .34rem 0; }
li::marker { color: var(--accent); font-weight: 700; }
code { padding: .12em .34em; border: 1px solid color-mix(in srgb, var(--line) 70%, transparent); border-radius: .32rem; background: color-mix(in srgb, var(--surface) 70%, var(--paper-deep)); font: .88em/1.45 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
pre { position: relative; overflow: auto; margin: 1.35rem 0; padding: 1.1rem 1.2rem; border-radius: .75rem; background: var(--code); color: var(--code-ink); box-shadow: var(--shadow); }
pre code { padding: 0; border: 0; background: none; color: inherit; font-size: .86rem; }
.copy-code { position: absolute; top: .55rem; right: .55rem; border: 1px solid rgba(255,255,255,.25); border-radius: .4rem; padding: .35rem .55rem; background: rgba(0,0,0,.25); color: #fff; font: 650 .72rem/1 var(--sans); cursor: pointer; }
.table-wrap { overflow-x: auto; margin: 1.4rem 0 2rem; border: 1px solid var(--line); border-radius: .7rem; background: var(--surface); box-shadow: 0 8px 28px rgba(65,48,29,.06); }
table { width: 100%; border-collapse: collapse; font-size: .92rem; line-height: 1.5; }
th, td { padding: .78rem .86rem; border-bottom: 1px solid var(--line); vertical-align: top; text-align: left; }
th { background: color-mix(in srgb, var(--paper-deep) 75%, var(--surface)); font-size: .78rem; letter-spacing: .025em; text-transform: uppercase; }
tr:last-child td { border-bottom: 0; }
.metadata-card { margin: 1.3rem 0 2.2rem; padding: 1rem 1.1rem; border: 1px solid var(--line); border-radius: .7rem; background: var(--surface); }
.metadata-card p { margin: .55rem 0 0; color: var(--muted); font-size: .92rem; }
.metadata-label { display: block; margin-bottom: .5rem; color: var(--teal); font-size: .7rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase; }
.toc { position: sticky; top: 6rem; max-height: calc(100vh - 8rem); overflow: auto; padding-left: 1.2rem; border-left: 1px solid var(--line); font-size: .82rem; line-height: 1.38; }
.toc-title { color: var(--muted); font-size: .72rem; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }
.toc ol { list-style: none; padding: 0; }
.toc li { margin: .52rem 0; }
.toc-l3 { padding-left: .8rem; }
.toc a { color: var(--muted); text-decoration: none; }
.toc a:hover, .toc a[aria-current="true"] { color: var(--accent-strong); }
.provenance { margin-top: 4rem; padding-top: 1.1rem; border-top: 1px solid var(--line); color: var(--muted); font-size: .78rem; }
.provenance code { word-break: break-all; }
.pager { width: min(1180px, calc(100% - 2rem)); margin: 0 auto 2rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.pager a { display: block; min-height: 5rem; padding: 1rem; border: 1px solid var(--line); border-radius: .7rem; background: var(--surface); color: var(--ink); text-decoration: none; }
.pager a:last-child { text-align: right; }
.pager small { display: block; color: var(--muted); text-transform: uppercase; letter-spacing: .08em; }
.site-footer { padding: 1.5rem 1rem 2.8rem; color: var(--muted); text-align: center; font-size: .8rem; }
.noscript { margin: 0; padding: .5rem 1rem; background: var(--paper-deep); color: var(--muted); text-align: center; font-size: .8rem; }

@media (max-width: 880px) {
  .layout { grid-template-columns: 1fr; }
  .document { max-width: 100%; }
  .toc { position: static; grid-row: 1; max-height: none; padding: 1rem; border: 1px solid var(--line); border-radius: .7rem; background: var(--surface); }
  h1 { max-width: 16ch; }
}
@media (max-width: 560px) {
  body { font-size: 16px; }
  .topbar { width: min(100% - 1rem, 1180px); }
  .quiet-link { display: none; }
  .layout { width: min(100% - 1.25rem, 1180px); padding-top: 2rem; }
  .pager { width: min(100% - 1.25rem, 1180px); grid-template-columns: 1fr; }
  .pager a:last-child { text-align: left; }
  th, td { min-width: 11rem; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
@media print {
  :root { --paper: #fff; --paper-deep: #fff; --ink: #000; --muted: #333; --line: #aaa; --surface: #fff; }
  body { background: #fff; font-size: 10.5pt; }
  .site-header, .toc, .progress, .pager, .copy-code, .noscript, .heading-anchor { display: none !important; }
  .layout { display: block; width: 100%; padding: 0; }
  .document { max-width: none; }
  h1 { max-width: none; font-size: 28pt; }
  h2 { break-after: avoid; }
  pre, blockquote, table { break-inside: avoid; box-shadow: none; }
  a { color: #000; text-decoration: underline; }
  a[href^="http"]::after { content: " (" attr(href) ")"; font-size: 8pt; word-break: break-all; }
}
`;

const js = `
(() => {
  const root = document.documentElement;
  const button = document.querySelector('#theme-toggle');
  let stored = null;
  try { stored = localStorage.getItem('prax-theme'); } catch { stored = null; }
  if (stored === 'dark' || stored === 'light') root.dataset.theme = stored;
  const setLabel = () => {
    if (!button) return;
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    button.textContent = dark ? 'Light theme' : 'Dark theme';
    button.setAttribute('aria-pressed', String(dark));
  };
  button?.addEventListener('click', () => {
    const dark = root.dataset.theme === 'dark' || (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches);
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('prax-theme', root.dataset.theme); } catch { /* File origins may disable storage. */ }
    setLabel();
  });
  setLabel();

  const bar = document.querySelector('#reading-progress');
  const updateProgress = () => {
    if (!bar) return;
    const available = document.documentElement.scrollHeight - innerHeight;
    const percent = available > 0 ? Math.min(100, Math.max(0, scrollY / available * 100)) : 100;
    bar.style.width = percent + '%';
  };
  addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  document.querySelectorAll('pre').forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;
    const copy = document.createElement('button');
    copy.type = 'button';
    copy.className = 'copy-code';
    copy.textContent = 'Copy';
    copy.setAttribute('aria-label', 'Copy code block');
    copy.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent || '');
        copy.textContent = 'Copied';
        setTimeout(() => { copy.textContent = 'Copy'; }, 1600);
      } catch {
        copy.textContent = 'Select text';
      }
    });
    pre.prepend(copy);
  });

  const tocLinks = [...document.querySelectorAll('.toc a')];
  const targets = tocLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window && targets.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (!visible) return;
      tocLinks.forEach((link) => link.removeAttribute('aria-current'));
      const escaped = window.CSS && CSS.escape ? CSS.escape(visible.target.id) : visible.target.id.replace(/[^a-zA-Z0-9_-]/g, '');
      document.querySelector('.toc a[href="#' + escaped + '"]')?.setAttribute('aria-current', 'true');
    }, { rootMargin: '-18% 0px -72% 0px' });
    targets.forEach((target) => observer.observe(target));
  }
})();
`;

function pageShell({ title, body, toc, sourcePath, sourceHref, hash, frontmatter, homeHref, previous, next }) {
  const category = sourcePath.includes('prax-teach-v2/') ? 'Candidate skill · generated companion' : 'Research dossier · generated companion';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <meta name="source-path" content="${escapeHtml(sourcePath)}">
  <meta name="source-sha256" content="${hash}">
  <meta name="generated-at" content="${escapeHtml(generatedAt)}">
  <title>${escapeHtml(title)} · Prax Teach research</title>
  <style>${css}</style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="progress" aria-hidden="true"><span id="reading-progress"></span></div>
  <header class="site-header">
    <div class="topbar">
      <a class="brand" href="${escapeHtml(homeHref)}"><span class="brand-mark" aria-hidden="true">P</span><span>Prax Teach Lab</span></a>
      <div class="top-actions">
        <a class="quiet-link" href="${escapeHtml(sourceHref)}">Markdown source</a>
        <button class="theme-toggle" id="theme-toggle" type="button" aria-pressed="false">Dark theme</button>
      </div>
    </div>
  </header>
  <noscript><p class="noscript">The complete document is available without JavaScript; theme, progress, and copy-button enhancements are disabled.</p></noscript>
  <main id="main-content" class="layout">
    <article class="document">
      <p class="eyebrow">${escapeHtml(category)}</p>
      ${metadataCard(frontmatter)}
      ${body}
      <div class="provenance">
        <strong>Canonical source:</strong> <a href="${escapeHtml(sourceHref)}">${escapeHtml(sourcePath)}</a><br>
        <strong>SHA-256:</strong> <code>${hash}</code><br>
        <strong>Generated:</strong> ${escapeHtml(generatedAt)}
      </div>
    </article>
    ${tocHtml(toc)}
  </main>
  <nav class="pager" aria-label="Document navigation">
    ${previous ? `<a href="${escapeHtml(previous.href)}"><small>Previous</small>${escapeHtml(previous.title)}</a>` : '<span></span>'}
    ${next ? `<a href="${escapeHtml(next.href)}"><small>Next</small>${escapeHtml(next.title)}</a>` : '<span></span>'}
  </nav>
  <footer class="site-footer">Prax Teach v2 research bundle · Markdown remains canonical</footer>
  <script>${js}</script>
</body>
</html>`;
}

// Dossier pages and candidate pages have deliberately different rendering
// contracts. Render only top-level dossier Markdown here; the candidate's
// sanitized exact renderer owns everything below prax-teach-v2/.
const markdownFiles = (await readdir(outputRoot, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => path.join(outputRoot, entry.name))
  .sort((a, b) => a.localeCompare(b));

const documents = [];
for (const sourceFile of markdownFiles) {
  const buffer = await readFile(sourceFile);
  const source = buffer.toString('utf8');
  const { body: markdownBody, data: frontmatter } = parseFrontmatter(source);
  const firstHeading = markdownBody.match(/^#\s+(.+)$/m);
  const title = firstHeading ? firstHeading[1].replace(/[`*_]/g, '').trim() : frontmatter.name || path.basename(sourceFile, '.md');
  const rawHtml = await marked.parse(markdownBody);
  const enriched = enrichMarkdownHtml(rawHtml);
  documents.push({
    sourceFile,
    htmlFile: sourceFile.replace(/\.md$/, '.html'),
    sourcePath: path.relative(outputRoot, sourceFile).split(path.sep).join('/'),
    title,
    hash: sourceHash(buffer),
    body: enriched.html,
    toc: enriched.toc,
    frontmatter,
  });
}

for (let index = 0; index < documents.length; index += 1) {
  const doc = documents[index];
  const previousDoc = documents[index - 1];
  const nextDoc = documents[index + 1];
  const html = pageShell({
    ...doc,
    sourceHref: relativeHref(doc.htmlFile, doc.sourceFile),
    homeHref: relativeHref(doc.htmlFile, path.join(outputRoot, 'index.html')),
    previous: previousDoc ? { title: previousDoc.title, href: relativeHref(doc.htmlFile, previousDoc.htmlFile) } : null,
    next: nextDoc ? { title: nextDoc.title, href: relativeHref(doc.htmlFile, nextDoc.htmlFile) } : null,
  });
  await writeFile(doc.htmlFile, html, 'utf8');
}

const reportDocs = documents;
const candidateRoot = path.join(outputRoot, 'prax-teach-v2');
const candidateMarkdownFiles = (await walk(candidateRoot, { pruneRuntime: true }))
  .filter((file) => file.endsWith('.md'))
  .sort((a, b) => a.localeCompare(b));
const skillDocs = [];
for (const sourceFile of candidateMarkdownFiles) {
  const source = await readFile(sourceFile, 'utf8');
  const { body, data } = parseFrontmatter(source);
  const firstHeading = body.match(/^#\s+(.+)$/m);
  skillDocs.push({
    sourceFile,
    htmlFile: sourceFile.replace(/\.md$/, '.html'),
    sourcePath: path.relative(outputRoot, sourceFile).split(path.sep).join('/'),
    title: firstHeading
      ? firstHeading[1].replace(/[`*_]/g, '').trim()
      : data.name || path.basename(sourceFile, '.md'),
  });
}
const linkCard = (doc, label) => `<a class="hub-card" href="${escapeHtml(path.relative(outputRoot, doc.htmlFile).split(path.sep).join('/'))}">
  <span>${escapeHtml(label)}</span>
  <strong>${escapeHtml(doc.title)}</strong>
  <small>${escapeHtml(doc.sourcePath)}</small>
</a>`;

const indexCss = `${css}
.hub-main { width: min(1120px, calc(100% - 2rem)); margin: 0 auto; padding: clamp(3rem, 8vw, 7rem) 0 5rem; }
.hero { max-width: 58rem; padding-bottom: 3rem; }
.hero h1 { max-width: 12ch; }
.hero .lede { max-width: 48rem; color: var(--muted); font: 1.18rem/1.65 var(--sans); }
.verdict { margin-top: 2rem; padding: 1.2rem 1.35rem; border-left: .35rem solid var(--teal); border-radius: .2rem .75rem .75rem .2rem; background: var(--surface); box-shadow: var(--shadow); }
.hub-actions { display:flex; flex-wrap:wrap; gap:.7rem; margin-top:1.35rem; }
.hub-actions a { display:inline-block; padding:.68rem .95rem; border:1px solid var(--line); border-radius:999px; background:var(--surface); color:var(--ink); font-weight:750; text-decoration:none; }
.hub-actions a:first-child { border-color:var(--accent); background:var(--accent); color:#fff; }
.hub-section { margin-top: 3.5rem; }
.hub-section h2 { margin-top: 0; }
.hub-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
.hub-card { min-height: 10.5rem; display: flex; flex-direction: column; padding: 1.25rem; border: 1px solid var(--line); border-radius: .8rem; background: var(--surface); color: var(--ink); text-decoration: none; box-shadow: 0 10px 34px rgba(65,48,29,.06); }
.hub-card:hover { border-color: var(--accent); transform: translateY(-2px); }
.hub-card span { color: var(--teal); font-size: .72rem; font-weight: 800; letter-spacing: .11em; text-transform: uppercase; }
.hub-card strong { margin: .7rem 0 auto; font: 1.35rem/1.2 var(--serif); }
.hub-card small { margin-top: 1rem; color: var(--muted); overflow-wrap: anywhere; }
.principles { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; padding: 0; list-style: none; }
.principles li { padding: 1rem; border-top: 3px solid var(--accent); background: color-mix(in srgb, var(--surface) 80%, transparent); }
.principles strong { display: block; margin-bottom: .35rem; }
@media (max-width: 760px) { .hub-grid, .principles { grid-template-columns: 1fr; } }
`;

const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>Prax Teach Lab · Research and candidate skill</title>
  <style>${indexCss}</style>
</head>
<body>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <header class="site-header">
    <div class="topbar">
      <a class="brand" href="./index.html"><span class="brand-mark" aria-hidden="true">P</span><span>Prax Teach Lab</span></a>
      <div class="top-actions"><button class="theme-toggle" id="theme-toggle" type="button" aria-pressed="false">Dark theme</button></div>
    </div>
  </header>
  <main id="main-content" class="hub-main">
    <section class="hero" aria-labelledby="hub-title">
      <p class="eyebrow">Deep research · engineering release verified 5 August 2026</p>
      <h1 id="hub-title">A teaching system that earns the name.</h1>
      <p class="lede">A source-ranked audit of Sidechat’s proposal, more than twenty teaching skills and systems, the learning-science evidence behind them, and a reviewed, reproducibly packaged <code>prax-teach-v2</code> engineering candidate with matching HTML companions. The update evaluates Microsoft SkillOpt and Flint at guarded optional boundaries.</p>
      <div class="verdict"><strong>The conclusion:</strong> keep quick / lesson / course and the visual router; add anti-crutch teaching behavior, correctable concept evidence, real review scheduling, deterministic Markdown-to-HTML parity, delayed retention/transfer evaluation, staged SkillOpt proposals, and accessible Flint chart fallbacks.</div>
      <div class="hub-actions"><a href="./07-prax-teach-v2-implementation-status.html">Read final status</a><a href="./prax-teach-v2-8c26440a0402.zip">Download reviewed candidate</a></div>
    </section>

    <section class="hub-section" aria-labelledby="reports-title">
      <h2 id="reports-title">Research dossier</h2>
      <div class="hub-grid">${reportDocs.map((doc, index) => linkCard(doc, `Report ${index + 1}`)).join('')}</div>
    </section>

    <section class="hub-section" aria-labelledby="principles-title">
      <h2 id="principles-title">The system in three moves</h2>
      <ol class="principles">
        <li><strong>Retrieve before reveal</strong>Turn explanation into effort, targeted feedback, and another attempt.</li>
        <li><strong>Store evidence, not labels</strong>Track what the learner demonstrated, with uncertainty and correction.</li>
        <li><strong>Test independence later</strong>Delayed unseen retention and transfer decide whether teaching worked.</li>
      </ol>
    </section>

    <section class="hub-section" aria-labelledby="skill-title">
      <h2 id="skill-title">Candidate skill package</h2>
      <p>The package is intentionally uninstalled so it remains a clean candidate for validation against the frozen current skills.</p>
      <div class="hub-grid">${skillDocs.map((doc, index) => linkCard(doc, index === 0 ? 'Skill entrypoint' : 'Skill reference')).join('')}</div>
    </section>
  </main>
  <footer class="site-footer">${documents.length} dossier documents · ${skillDocs.length} candidate documents · separate verified renderers · no external runtime assets</footer>
  <script>${js}</script>
</body>
</html>`;

await writeFile(path.join(outputRoot, 'index.html'), indexHtml, 'utf8');
console.log(`Rendered ${documents.length} top-level dossier companion(s) and index.html; candidate companions were not modified`);
