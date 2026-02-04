"""
Page Object Model для главной страницы Educational AI Platform

Этот класс инкапсулирует все локаторы и действия для главной страницы приложения.
Использование POM делает тесты более читаемыми и поддерживаемыми.
"""

import re

from playwright.sync_api import Page, expect


class MainPage:
    """Главная страница приложения с навигацией и переключением темы"""

    def __init__(self, page: Page):
        self.page = page

        # Локаторы для навигации (TabButton задаёт role="tab")
        self.chat_tab = page.get_by_role("tab", name="Чат")
        self.knowledge_tab = page.get_by_role("tab", name="База знаний")
        self.history_tab = page.get_by_role("tab", name="История")

        # Локатор для переключения темы (aria-label динамический из i18n)
        self.theme_toggle = page.get_by_role("button", name=re.compile(r"включить.*тему", re.IGNORECASE))
    
    def goto(self):
        """Открыть главную страницу приложения"""
        self.page.goto("/")
        # Ждем, пока страница полностью загрузится
        self.page.wait_for_load_state("networkidle")
    
    def open_chat(self):
        """Переключить на вкладку 'Чат'"""
        self.chat_tab.click()
        self.page.wait_for_timeout(500)
    
    def open_knowledge(self):
        """Переключить на вкладку 'Знания'"""
        self.knowledge_tab.click()
        self.page.wait_for_timeout(500)
    
    def open_history(self):
        """Переключить на вкладку 'История'"""
        self.history_tab.click()
        self.page.wait_for_timeout(500)
    
    def toggle_theme(self):
        """Переключить тему (светлая/темная)"""
        self.theme_toggle.click()
    
    def is_loaded(self) -> bool:
        """Проверить, что приложение загрузилось"""
        self.page.wait_for_selector("body", state="visible")
        return True
    
    def get_current_theme(self) -> str:
        """
        Получить текущую тему приложения
        
        Returns:
            str: 'dark' или 'light'
        """
        app_root = self.page.locator("div.app")
        class_list = app_root.get_attribute("class") or ""
        return "dark" if "dark" in class_list else "light"
    
    def expect_chat_tab_visible(self):
        """Проверить, что вкладка 'Чат' видима"""
        expect(self.chat_tab).to_be_visible()
    
    def expect_knowledge_tab_visible(self):
        """Проверить, что вкладка 'Знания' видима"""
        expect(self.knowledge_tab).to_be_visible()
    
    def expect_history_tab_visible(self):
        """Проверить, что вкладка 'История' видима"""
        expect(self.history_tab).to_be_visible()
