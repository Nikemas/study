"""
Page Object for Knowledge tab.
"""

import re
from playwright.sync_api import Page, expect


class KnowledgePage:
    def __init__(self, page: Page):
        self.page = page

        self.python_button = page.get_by_role("tab", name=re.compile(r"Python"))
        self.javascript_button = page.get_by_role("tab", name=re.compile(r"JavaScript"))
        self.html_button = page.get_by_role("tab", name=re.compile(r"HTML"))
        self.css_button = page.get_by_role("tab", name=re.compile(r"CSS"))
        self.react_button = page.get_by_role("tab", name=re.compile(r"React"))

        self.content_area = page.locator("main").first
        self.code_blocks = page.locator("pre code")
        self.topic_title = page.locator("h1, h2").first

        self.practice_card = page.get_by_test_id("practice-challenge-card")
        self.practice_open_button = page.get_by_test_id("open-practice-challenge")
        self.practice_editor = page.get_by_test_id("practice-code-editor")
        self.practice_submit_button = page.get_by_test_id("submit-practice-solution")
        self.practice_status = page.get_by_test_id("practice-status")
        self.practice_score = page.get_by_test_id("practice-score")

    def select_python(self):
        self.python_button.click()
        self.page.wait_for_timeout(500)

    def select_javascript(self):
        self.javascript_button.click()
        self.page.wait_for_timeout(500)

    def select_html(self):
        self.html_button.click()
        self.page.wait_for_timeout(500)

    def select_css(self):
        self.css_button.click()
        self.page.wait_for_timeout(500)

    def select_react(self):
        self.react_button.click()
        self.page.wait_for_timeout(500)

    def open_first_material(self):
        self.page.locator('article[role="button"]').first.click()
        self.page.wait_for_timeout(500)

    def get_topic_title(self) -> str:
        return self.topic_title.text_content() or ""

    def has_content(self) -> bool:
        return self.content_area.is_visible()

    def get_code_blocks_count(self) -> int:
        return self.code_blocks.count()

    def has_code_examples(self) -> bool:
        return self.get_code_blocks_count() > 0

    def get_content_text(self) -> str:
        return self.content_area.text_content() or ""

    def expect_python_button_visible(self):
        expect(self.python_button).to_be_visible()

    def expect_javascript_button_visible(self):
        expect(self.javascript_button).to_be_visible()

    def expect_html_button_visible(self):
        expect(self.html_button).to_be_visible()

    def expect_css_button_visible(self):
        expect(self.css_button).to_be_visible()

    def expect_react_button_visible(self):
        expect(self.react_button).to_be_visible()

    def expect_content_visible(self):
        expect(self.content_area).to_be_visible()

    def expect_has_code_blocks(self):
        assert self.get_code_blocks_count() > 0, "No code blocks found"

    def open_practice_challenge(self):
        self.practice_open_button.click()
        self.page.wait_for_timeout(300)

    def expect_practice_challenge_visible(self):
        expect(self.practice_card).to_be_visible()

    def expect_practice_editor_visible(self):
        expect(self.practice_editor).to_be_visible()

    def submit_practice_code(self, code: str):
        self.practice_editor.fill(code)
        self.practice_submit_button.click()
        self.page.wait_for_timeout(1200)

