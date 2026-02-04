"""
Page Object для базы знаний

Управление просмотром учебных материалов по разным темам
"""

import re

from playwright.sync_api import Page, expect


class KnowledgePage:
    """база знаний с учебными материалами"""

    def __init__(self, page: Page):
        self.page = page

        # Локаторы для выбора темы (CategoryFilter задаёт role="tab",
        # accessible name = aria-label иконки + текст, поэтому regex)
        self.python_button = page.get_by_role("tab", name=re.compile(r"Python"))
        self.javascript_button = page.get_by_role("tab", name=re.compile(r"JavaScript"))
        self.html_button = page.get_by_role("tab", name=re.compile(r"HTML"))
        self.css_button = page.get_by_role("tab", name=re.compile(r"CSS"))
        self.react_button = page.get_by_role("tab", name=re.compile(r"React"))
        
        # Локаторы для контента
        self.content_area = page.locator("main").first
        self.code_blocks = page.locator("pre code")
        self.topic_title = page.locator("h1, h2").first
    
    def select_python(self):
        """Выбрать тему Python"""
        self.python_button.click()
        self.page.wait_for_timeout(500)
    
    def select_javascript(self):
        """Выбрать тему JavaScript"""
        self.javascript_button.click()
        self.page.wait_for_timeout(500)
    
    def select_html(self):
        """Выбрать тему HTML"""
        self.html_button.click()
        self.page.wait_for_timeout(500)
    
    def select_css(self):
        """Выбрать тему CSS"""
        self.css_button.click()
        self.page.wait_for_timeout(500)
    
    def select_react(self):
        """Выбрать тему React"""
        self.react_button.click()
        self.page.wait_for_timeout(500)
    
    def open_first_material(self):
        """Открыть первый материал (MaterialCard → модальное окно с кодом)"""
        self.page.locator('article[role="button"]').first.click()
        self.page.wait_for_timeout(500)

    def get_topic_title(self) -> str:
        """
        Получить заголовок текущей темы
        
        Returns:
            str: текст заголовка
        """
        return self.topic_title.text_content() or ""
    
    def has_content(self) -> bool:
        """
        Проверить наличие контента
        
        Returns:
            bool: True если контент видим
        """
        return self.content_area.is_visible()
    
    def get_code_blocks_count(self) -> int:
        """
        Получить количество блоков кода на странице
        
        Returns:
            int: количество блоков кода
        """
        return self.code_blocks.count()
    
    def has_code_examples(self) -> bool:
        """
        Проверить, что есть хотя бы один блок кода
        
        Returns:
            bool: True если есть примеры кода
        """
        return self.get_code_blocks_count() > 0
    
    def get_content_text(self) -> str:
        """
        Получить текст из контента
        
        Returns:
            str: текст контента
        """
        return self.content_area.text_content() or ""
    
    def expect_python_button_visible(self):
        """Проверить, что кнопка Python видима"""
        expect(self.python_button).to_be_visible()
    
    def expect_javascript_button_visible(self):
        """Проверить, что кнопка JavaScript видима"""
        expect(self.javascript_button).to_be_visible()
    
    def expect_html_button_visible(self):
        """Проверить, что кнопка HTML видима"""
        expect(self.html_button).to_be_visible()
    
    def expect_css_button_visible(self):
        """Проверить, что кнопка CSS видима"""
        expect(self.css_button).to_be_visible()
    
    def expect_react_button_visible(self):
        """Проверить, что кнопка React видима"""
        expect(self.react_button).to_be_visible()
    
    def expect_content_visible(self):
        """Проверить, что контент видим"""
        expect(self.content_area).to_be_visible()
    
    def expect_has_code_blocks(self):
        """Проверить, что есть блоки кода"""
        assert self.get_code_blocks_count() > 0, "Нет блоков кода на странице"
