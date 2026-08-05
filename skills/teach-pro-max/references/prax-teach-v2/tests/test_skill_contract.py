from __future__ import annotations

import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class SkillContractTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls) -> None:
        source = (ROOT / "SKILL.md").read_text(encoding="utf-8")
        cls.skill = " ".join(source.split())
        protocol = (ROOT / "references" / "TEACHING-PROTOCOL.md").read_text(
            encoding="utf-8"
        )
        cls.protocol = " ".join(protocol.split())

    def test_live_lesson_gate_requires_turn_boundary_and_complete_close(self) -> None:
        required = (
            "end the current turn at that attempt",
            "Do not call a named hint ladder progressive unless",
            "After an incorrect attempt, give exactly one next-needed hint",
            "end that tutor turn before any stronger hint or explanatory model",
            "no learner performance has been observed",
            "explicit retention horizon",
        )
        for phrase in required:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, self.skill)

    def test_course_consent_gate_exposes_ephemeral_path_before_consent(self) -> None:
        self.assertIn(
            "continue ephemerally without learner-state files",
            self.skill,
        )
        self.assertIn("before asking for persistence consent", self.skill)

    def test_resume_gate_preserves_scaffold_metadata_and_retests(self) -> None:
        required = (
            "original response and exact hint level",
            "unchanged and inspectable",
            "fresh unassisted retrieval or discrimination prompt",
            "If the workspace path or topic is missing",
            "Never infer a filesystem path, score, timestamp, or prior attempt",
        )
        for phrase in required:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, self.skill)

    def test_post_error_hint_turn_precedes_substantive_feedback(self) -> None:
        required = (
            "Immediate post-error return gate",
            "exactly one next-needed hint",
            "end the tutor turn",
            "substantive feedback contract applies only after that revised learner turn",
        )
        for phrase in required:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, self.protocol)

    def test_unbundled_interaction_response_keeps_accessibility_claim_bounded(
        self,
    ) -> None:
        required = (
            "delivered through host chat with no custom artifact controls or scripts",
            "every learner action in an explicit text label in reading order",
            "complete static instructions and equivalent data",
            "host-UI keyboard, focus, reduced-motion, and assistive-technology behavior remains unverified",
        )
        for phrase in required:
            with self.subTest(phrase=phrase):
                self.assertIn(phrase, self.skill)


if __name__ == "__main__":
    unittest.main()
