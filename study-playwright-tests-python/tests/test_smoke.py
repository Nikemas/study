"""
Smoke тесты - базовая проверка работоспособности приложения

Эти тесты должны выполняться быстро и проверять критичные функции.
Используем маркер @pytest.mark.smoke для группировки.
"""

import re

import pytest
from playwright.sync_api import Page, expect
from pages import MainPage, ChatPage, KnowledgePage


@pytest.mark.smoke
class TestSmoke:
    """Smoke тесты для Educational AI Platform"""
    
    def test_application_loads_successfully(self, page: Page):
        """Приложение загружается успешно"""
        main_page = MainPage(page)
        main_page.goto()
        
        # Проверяем, что страница загрузилась
        expect(page).to_have_title(re.compile(r"React App", re.IGNORECASE))
        
        # Проверяем наличие основных элементов навигации
        main_page.expect_chat_tab_visible()
        main_page.expect_knowledge_tab_visible()
        main_page.expect_history_tab_visible()
    
    def test_navigation_between_tabs_works(self, page: Page):
        """Навигация между вкладками работает"""
        main_page = MainPage(page)
        main_page.goto()

        # Открываем вкладку "Знания" — проверяем aria-selected (SPA, URL не меняется)
        main_page.open_knowledge()
        expect(page.get_by_role("tab", name="База знаний")).to_have_attribute("aria-selected", "true")

        # Открываем вкладку "История"
        main_page.open_history()
        expect(page.get_by_role("tab", name="История")).to_have_attribute("aria-selected", "true")

        # Возвращаемся к чату
        main_page.open_chat()
        expect(page.get_by_role("tab", name="Чат")).to_have_attribute("aria-selected", "true")
    
    def test_theme_toggle_works(self, page: Page):
        """Переключение темы работает"""
        main_page = MainPage(page)
        main_page.goto()
        
        # Получаем текущую тему
        initial_theme = main_page.get_current_theme()
        
        # Переключаем тему
        main_page.toggle_theme()
        page.wait_for_timeout(500)
        
        # Проверяем, что тема изменилась
        new_theme = main_page.get_current_theme()
        assert new_theme != initial_theme, "Тема не изменилась после переключения"
    
    def test_chat_input_field_is_displayed(self, page: Page):
        """Поле ввода чата отображается"""
        main_page = MainPage(page)
        chat_page = ChatPage(page)
        
        main_page.goto()
        main_page.open_chat()
        
        # Проверяем наличие поля ввода и кнопки отправки
        chat_page.expect_message_input_visible()
        chat_page.expect_send_button_visible()
    
    def test_knowledge_base_contains_all_topics(self, page: Page):
        """База знаний содержит все темы"""
        main_page = MainPage(page)
        knowledge_page = KnowledgePage(page)
        
        main_page.goto()
        main_page.open_knowledge()
        
        # Проверяем наличие всех кнопок тем
        knowledge_page.expect_python_button_visible()
        knowledge_page.expect_javascript_button_visible()
        knowledge_page.expect_html_button_visible()
        knowledge_page.expect_css_button_visible()
        knowledge_page.expect_react_button_visible()
    
    def test_page_title_is_correct(self, page: Page):
        """Заголовок страницы корректный"""
        main_page = MainPage(page)
        main_page.goto()
        
        # Проверяем, что title не пустой
        title = page.title()
        assert len(title) > 0, "Заголовок страницы пустой"
