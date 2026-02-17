"""
Knowledge tests including practice challenge flow.
"""

import pytest
from playwright.sync_api import Page, expect
from pages import MainPage, KnowledgePage


@pytest.mark.regression
@pytest.mark.knowledge
class TestKnowledge:
    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        main_page = MainPage(page)
        main_page.goto()
        main_page.open_knowledge()

    def test_view_python_materials(self, page: Page):
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_python()
        knowledge_page.expect_content_visible()

        content = knowledge_page.get_content_text().lower()
        assert any(k in content for k in ["python", "перемен", "цикл", "функц"])

        knowledge_page.open_first_material()
        knowledge_page.expect_has_code_blocks()

    def test_practice_modal_opens_and_has_starter_code(self, page: Page):
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_python()
        knowledge_page.expect_practice_challenge_visible()
        knowledge_page.open_practice_challenge()
        knowledge_page.expect_practice_editor_visible()

        editor_value = knowledge_page.practice_editor.input_value()
        assert len(editor_value) > 10

    def test_unsuccessful_attempt_updates_status(self, page: Page):
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_python()
        knowledge_page.open_practice_challenge()
        knowledge_page.submit_practice_code("pass")
        expect(knowledge_page.practice_status).to_contain_text("failed")

    def test_three_failed_attempts_disable_submit(self, page: Page):
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_python()
        knowledge_page.open_practice_challenge()

        for _ in range(3):
            knowledge_page.submit_practice_code("pass")

        expect(knowledge_page.practice_submit_button).to_be_disabled()

    def test_quiz_without_practice_does_not_complete_stage(self, page: Page):
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_python()
        page.get_by_role("button", name="Пройти тест").click()
        page.get_by_role("button", name="Проверить").click()
        page.get_by_role("button", name="Далее").click()
        page.get_by_role("button", name="Проверить").click()
        page.get_by_role("button", name="Далее").click()
        page.get_by_role("button", name="Проверить").click()
        page.get_by_role("button", name="Далее").click()
        page.get_by_role("button", name="Проверить").click()
        page.get_by_role("button", name="Далее").click()
        page.get_by_role("button", name="Проверить").click()
        page.get_by_role("button", name="Завершить").click()
        page.get_by_role("button", name="Закрыть").click()

        expect(knowledge_page.practice_status).not_to_contain_text("passed")

