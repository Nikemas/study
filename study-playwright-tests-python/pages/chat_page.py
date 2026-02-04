"""
Page Object для функционала AI-чата

Управление чатом: отправка сообщений, получение ответов, оценка ответов
"""

from typing import List
from playwright.sync_api import Page, expect, Locator


class ChatPage:
    """Функционал AI-чата"""
    
    def __init__(self, page: Page):
        self.page = page
        
        # Локаторы для чата
        self.message_input = page.get_by_placeholder("Задайте вопрос по курсу...")
        self.send_button = page.get_by_role("button", name="Отправить сообщение")

        # Локаторы для сообщений
        # user: article с flex-row-reverse, текст в <p>
        # ai: article без flex-row-reverse, контент в .prose
        self.user_messages = page.locator("article.flex-row-reverse p")
        self.ai_messages = page.locator("article:not(.flex-row-reverse) .prose")

        # Локаторы для оценки
        self.like_button = page.get_by_role("button", name="Отметить как полезный")
        self.dislike_button = page.get_by_role("button", name="Отметить как неполезный")
    
    def send_message(self, message: str):
        """
        Отправить сообщение в чат
        
        Args:
            message: текст сообщения
        """
        self.message_input.fill(message)
        self.send_button.click()
    
    def wait_for_ai_response(self, timeout: int = 15000):
        """
        Подождать ответа от AI
        
        Args:
            timeout: максимальное время ожидания в миллисекундах
        """
        # Ждем появления сообщения от AI
        self.page.wait_for_selector(
            "article:not(.flex-row-reverse) .prose",
            state="visible",
            timeout=timeout
        )

        # Ждем, пока не исчезнет индикатор загрузки (role="status")
        loading_indicator = self.page.locator('[role="status"]')
        try:
            if loading_indicator.is_visible():
                loading_indicator.wait_for(state="hidden", timeout=5000)
        except Exception:
            pass
    
    def get_user_messages(self) -> List[str]:
        """
        Получить все сообщения пользователя
        
        Returns:
            List[str]: список текстов сообщений
        """
        return self.user_messages.all_text_contents()
    
    def get_ai_messages(self) -> List[str]:
        """
        Получить все сообщения от AI
        
        Returns:
            List[str]: список текстов ответов AI
        """
        return self.ai_messages.all_text_contents()
    
    def get_last_ai_message(self) -> str:
        """
        Получить последнее сообщение от AI
        
        Returns:
            str: текст последнего ответа AI
        """
        messages = self.get_ai_messages()
        return messages[-1] if messages else ""
    
    def is_chat_empty(self) -> bool:
        """
        Проверить, что чат пустой
        
        Returns:
            bool: True если чат пустой
        """
        user_count = self.user_messages.count()
        ai_count = self.ai_messages.count()
        return user_count == 0 and ai_count == 0
    
    def like_last_message(self):
        """Лайкнуть последнее сообщение"""
        like_buttons = self.like_button.all()
        if like_buttons:
            like_buttons[-1].click()
    
    def dislike_last_message(self):
        """Дизлайкнуть последнее сообщение"""
        dislike_buttons = self.dislike_button.all()
        if dislike_buttons:
            dislike_buttons[-1].click()
    
    def clear_chat(self):
        """Очистить чат"""
        self.clear_button.click()
    
    def has_input_field(self) -> bool:
        """
        Проверить наличие поля ввода
        
        Returns:
            bool: True если поле ввода видимо
        """
        return self.message_input.is_visible()
    
    def expect_message_input_visible(self):
        """Проверить, что поле ввода видимо"""
        expect(self.message_input).to_be_visible()
    
    def expect_send_button_visible(self):
        """Проверить, что кнопка отправки видима"""
        expect(self.send_button).to_be_visible()
    
    def expect_user_message_contains(self, text: str):
        """Проверить, что есть сообщение пользователя с заданным текстом"""
        expect(self.user_messages).to_contain_text(text)
    
    def expect_ai_response_not_empty(self):
        """Проверить, что ответ AI не пустой"""
        last_message = self.get_last_ai_message()
        assert len(last_message) > 10, "AI ответ слишком короткий или пустой"
