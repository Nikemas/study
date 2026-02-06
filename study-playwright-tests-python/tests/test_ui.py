"""
UI/visual regression tests.

Snapshots are stored by pytest-playwright when first created.
Re-run with snapshot update to refresh baselines when UI changes intentionally.
"""

import os
from pathlib import Path

import pytest
from playwright.sync_api import Page, expect
from pages import MainPage, ChatPage, KnowledgePage


def _disable_animations(page: Page) -> None:
    page.add_style_tag(
        content="""
*,
*::before,
*::after {
  animation: none !important;
  transition: none !important;
  caret-color: transparent !important;
}
"""
    )


SNAPSHOT_DIR = Path(__file__).parent / "snapshots"
ACTUAL_DIR = SNAPSHOT_DIR / "__actual__"


def _assert_screenshot(page: Page, name: str, full_page: bool = True) -> None:
    actual_bytes = page.screenshot(full_page=full_page)
    snapshot_path = SNAPSHOT_DIR / name

    if os.getenv("UPDATE_SNAPSHOTS") == "1" or not snapshot_path.exists():
        SNAPSHOT_DIR.mkdir(parents=True, exist_ok=True)
        snapshot_path.write_bytes(actual_bytes)
        return

    expected_bytes = snapshot_path.read_bytes()
    if actual_bytes != expected_bytes:
        ACTUAL_DIR.mkdir(parents=True, exist_ok=True)
        (ACTUAL_DIR / name).write_bytes(actual_bytes)
        raise AssertionError(
            f"Screenshot mismatch for {name}. "
            f"Actual saved to {ACTUAL_DIR / name}. "
            "Set UPDATE_SNAPSHOTS=1 to обновить baseline."
        )


@pytest.mark.regression
@pytest.mark.ui
class TestUI:
    """UI snapshot checks for main app surfaces."""

    def test_ui_chat_tab_snapshot(self, page: Page):
        main_page = MainPage(page)
        chat_page = ChatPage(page)

        main_page.goto()
        _disable_animations(page)
        main_page.open_chat()

        chat_page.expect_message_input_visible()
        _assert_screenshot(page, "ui-chat-tab.png", full_page=True)

    def test_ui_knowledge_tab_snapshot(self, page: Page):
        main_page = MainPage(page)
        knowledge_page = KnowledgePage(page)

        main_page.goto()
        _disable_animations(page)
        main_page.open_knowledge()

        knowledge_page.expect_content_visible()
        _assert_screenshot(page, "ui-knowledge-tab.png", full_page=True)

    def test_ui_history_tab_snapshot(self, page: Page):
        main_page = MainPage(page)

        main_page.goto()
        _disable_animations(page)
        main_page.open_history()

        _assert_screenshot(page, "ui-history-tab.png", full_page=True)
