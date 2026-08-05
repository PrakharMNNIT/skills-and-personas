#!/usr/bin/env python3
"""Black-box visual-routing contract tests."""

from __future__ import annotations

import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CLI = ROOT / "scripts" / "prax_teach.py"
FIXTURES = ROOT / "fixtures" / "routing-cases.json"


class VisualRoutingTest(unittest.TestCase):
    def run_cli(self, *args: str) -> dict[str, object]:
        completed = subprocess.run(
            [sys.executable, str(CLI), *args],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stderr)
        return json.loads(completed.stdout)

    def test_public_visual_cases_choose_smallest_semantic_route(self) -> None:
        fixtures = json.loads(FIXTURES.read_text())
        for case in fixtures["visual_cases"]:
            args = ["visual-route", "--job", case["job"]]
            if case.get("exact_quantitative"):
                args.append("--exact-quantitative")
            if "static_sufficient" in case:
                args.extend(
                    ("--static-sufficient", str(case["static_sufficient"]).lower())
                )
            result = self.run_cli(*args)
            self.assertEqual(result["route"], case["expected_route"], case["id"])
            self.assertIn(result["route"], {"none", "static", "interactive", "motion"})
            self.assertTrue(result["reason"])
            if result["route"] != "none":
                self.assertTrue(result["fallback"])

    def test_unbundled_interaction_and_motion_fail_closed_to_static_delivery(
        self,
    ) -> None:
        for requested in ("interactive", "motion"):
            result = self.run_cli(
                "visual-route",
                "--job",
                "Let the learner manipulate state and watch it change",
                "--force",
                requested,
            )
            self.assertEqual(result["route"], requested)
            self.assertEqual(result["delivery_route"], "static")
            self.assertFalse(result["bundled_renderer_supported"])
            self.assertEqual(
                result["runtime_requirement"],
                "separately-versioned-tested-and-manually-reviewed",
            )
            self.assertIn("static", result["delivery_reason"].lower())

    def test_flint_is_optional_only_after_static_quantitative_route(self) -> None:
        result = self.run_cli(
            "visual-route",
            "--job",
            "Compare a distribution across twelve groups where a table alone is hard to scan",
            "--exact-quantitative",
        )
        self.assertEqual(result["route"], "static")
        self.assertTrue(result["flint_eligible"])
        self.assertEqual(result["flint_required"], False)
        self.assertIn("table", result["fallback"].lower())

        prose = self.run_cli(
            "visual-route",
            "--job",
            "Define the term",
            "--exact-quantitative",
            "--static-sufficient",
            "true",
            "--force",
            "none",
        )
        self.assertEqual(prose["route"], "none")
        self.assertFalse(prose["flint_eligible"])

    def test_retrieval_mode_declares_unperformed_checks_for_every_fallback(
        self,
    ) -> None:
        for route in ("static", "interactive", "motion"):
            result = self.run_cli(
                "visual-route",
                "--job",
                "Assess the learner's prediction before revealing the correct state",
                "--retrieval",
                "--force",
                route,
            )
            safety = result["retrieval_safety"]
            self.assertTrue(safety["required"])
            self.assertEqual(safety["verification_status"], "not_run")
            self.assertFalse(safety["checks_performed"])
            self.assertIn("attempt_before_reveal", safety["required_checks"])
            self.assertIn("alt_text", safety["surfaces_to_check"])
            self.assertIn("source_code", safety["surfaces_to_check"])
            self.assertNotIn("checked_surfaces", safety)


if __name__ == "__main__":
    unittest.main()
