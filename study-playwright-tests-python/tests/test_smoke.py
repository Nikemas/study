"""
Smoke tests.
"""

import re

import pytest
from playwright.sync_api import Page, expect
from pages import MainPage, ChatPage, KnowledgePage


@pytest.mark.regression
@pytest.mark.smoke
class TestSmoke:
    def test_application_loads_successfully(self, page: Page):
        main_page = MainPage(page)
        main_page.goto()

        expect(page).to_have_title(re.compile(r"React App", re.IGNORECASE))
        main_page.expect_chat_tab_visible()
        main_page.expect_knowledge_tab_visible()
        main_page.expect_history_tab_visible()

    def test_navigation_between_tabs_works(self, page: Page):
        main_page = MainPage(page)
        main_page.goto()

        main_page.open_knowledge()
        expect(page.get_by_role("tab", name="База знаний")).to_have_attribute("aria-selected", "true")

        main_page.open_history()
        expect(page.get_by_role("tab", name="История")).to_have_attribute("aria-selected", "true")

        main_page.open_chat()
        expect(page.get_by_role("tab", name="Чат")).to_have_attribute("aria-selected", "true")

    def test_chat_input_field_is_displayed(self, page: Page):
        main_page = MainPage(page)
        chat_page = ChatPage(page)
        main_page.goto()
        main_page.open_chat()
        chat_page.expect_message_input_visible()
        chat_page.expect_send_button_visible()

    def test_knowledge_base_contains_all_topics(self, page: Page):
        main_page = MainPage(page)
        knowledge_page = KnowledgePage(page)
        main_page.goto()
        main_page.open_knowledge()
        knowledge_page.expect_python_button_visible()
        knowledge_page.expect_javascript_button_visible()
        knowledge_page.expect_html_button_visible()
        knowledge_page.expect_css_button_visible()
        knowledge_page.expect_react_button_visible()

    def test_practice_challenge_card_visible_for_category(self, page: Page):
        main_page = MainPage(page)
        knowledge_page = KnowledgePage(page)
        main_page.goto()
        main_page.open_knowledge()
        knowledge_page.select_python()
        knowledge_page.expect_practice_challenge_visible()

