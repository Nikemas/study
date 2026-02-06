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
        """Open the main app page."""
        # Ensure onboarding is disabled for the app load
        self.page.add_init_script(
            "() => { try { window.localStorage.setItem('onboarding_completed', 'true'); } catch (e) {} }"
        )
        self.page.goto("/")
        # Wait for app to settle
        self.page.wait_for_load_state("networkidle")
        self.dismiss_onboarding_if_present()

    def dismiss_onboarding_if_present(self):
        """Close onboarding modal if it appears."""
        marker = self.page.get_by_text("AI Study Platform", exact=False)
        if marker.count() == 0 or not marker.first.is_visible():
            return

        close_button = self.page.locator("button.absolute.top-4.right-4")
        if close_button.count() > 0 and close_button.first.is_visible():
            close_button.first.click()
            self.page.wait_for_timeout(150)
            return

        # Fallback: try clicking primary action button in modal
        primary_button = self.page.locator("div.fixed.inset-0 button").last
        if primary_button.is_visible():
            primary_button.click()

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
