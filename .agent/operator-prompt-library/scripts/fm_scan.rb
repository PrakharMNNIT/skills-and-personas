# frozen_string_literal: true
# Frontmatter conformance scan for skills/*/SKILL.md — real YAML parse.
require "yaml"

bad_fm, no_desc, no_triggers, bad_yaml = [], [], [], []
Dir["skills/*/SKILL.md"].sort.each do |p|
  slug = File.basename(File.dirname(p))
  next if slug.start_with?("_")
  t = File.read(p)
  parts = t.split(/\A---\n(.*)\n---\n/m, 2)
  if parts.length < 2
    bad_fm << slug
    next
  end
  begin
    d = YAML.safe_load(parts[1])
    raise "empty frontmatter" if d.nil?
    no_desc << slug unless d.is_a?(Hash) && !d["description"].to_s.empty?
    no_triggers << slug unless d.is_a?(Hash) && Array(d["triggers"]).length.positive?
  rescue StandardError => e
    bad_yaml << "#{slug} (#{e.class}: #{e.message[0, 60]})"
  end
end
puts "skills scanned: #{Dir['skills/*/SKILL.md'].length}"
puts "unparseable/no-frontmatter: #{bad_fm.inspect}"
puts "invalid YAML: #{bad_yaml.inspect}"
puts "missing description: #{no_desc.inspect}"
puts "missing triggers: #{no_triggers.inspect}"
exit(bad_fm.empty? && bad_yaml.empty? && no_desc.empty? && no_triggers.empty?)
