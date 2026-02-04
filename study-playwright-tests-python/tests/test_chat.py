"""
Функциональные тесты AI-чата

Проверяем работу AI-помощника и взаимодействие с чатом.
Используем маркер @pytest.mark.chat для группировки.
"""

import pytest
from playwright.sync_api import Page
from pages import MainPage, ChatPage


@pytest.mark.chat
class TestChat:
    """Функциональные тесты чата"""
    
    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        """Выполняется перед каждым тестом - открываем чат"""
        main_page = MainPage(page)
        main_page.goto()
        main_page.open_chat()
    
    def test_send_message_to_chat(self, page: Page):
        """Отправка сообщения в чат"""
        chat_page = ChatPage(page)
        test_message = "Привет! Что такое переменная в Python?"
        
        # Отправляем сообщение
        chat_page.send_message(test_message)
        
        # Проверяем, что сообщение появилось
        chat_page.expect_user_message_contains(test_message)
    
    @pytest.mark.slow
    def test_ai_responds_to_questions(self, page: Page):
        """AI отвечает на вопросы"""
        chat_page = ChatPage(page)
        test_message = "Объясни что такое функция"
        
        # Отправляем сообщение
        chat_page.send_message(test_message)
        
        # Ждем ответа от AI (максимум 15 секунд)
        chat_page.wait_for_ai_response(timeout=15000)
        
        # Проверяем, что получили ответ
        ai_messages = chat_page.get_ai_messages()
        assert len(ai_messages) > 0, "AI не ответил на вопрос"
        
        # Проверяем, что ответ не пустой
        chat_page.expect_ai_response_not_empty()
    
    def test_send_multiple_messages(self, page: Page):
        """Отправка нескольких сообщений подряд"""
        chat_page = ChatPage(page)
        messages = [
            "Что такое HTML?",
            "Расскажи про CSS",
            "Как работает JavaScript?"
        ]
        
        for message in messages:
            chat_page.send_message(message)
            page.wait_for_timeout(1000)  # Небольшая задержка между сообщениями
        
        # Проверяем, что все сообщения отправлены
        user_messages = chat_page.get_user_messages()
        assert len(user_messages) >= len(messages), "Не все сообщения отправились"
    
    def test_empty_message_not_sent(self, page: Page):
        """Пустое сообщение не отправляется"""
        chat_page = ChatPage(page)
        
        # Проверяем, что чат изначально пустой
        initial_empty = chat_page.is_chat_empty()
        
        # Пробуем отправить пустое сообщение
        chat_page.message_input.fill("")
        
        # Если кнопка не задизейблена, пробуем отправить
        is_disabled = chat_page.send_button.is_disabled()
        
        if not is_disabled:
            chat_page.send_button.click()
            page.wait_for_timeout(500)
            # Проверяем, что чат остался пустым
            still_empty = chat_page.is_chat_empty()
            assert still_empty == initial_empty, "Пустое сообщение было отправлено"
        else:
            assert is_disabled, "Кнопка отправки должна быть неактивна для пустого сообщения"
    
    def test_long_message_handling(self, page: Page):
        """Работа с длинным сообщением"""
        chat_page = ChatPage(page)
        long_message = "Расскажи подробно про " * 20 + "веб-разработку"
        
        chat_page.send_message(long_message)
        
        # Проверяем, что длинное сообщение отправилось
        user_messages = chat_page.get_user_messages()
        sent_message = user_messages[-1]
        assert "веб-разработку" in sent_message, "Длинное сообщение не отправилось корректно"
    
    @pytest.mark.slow
    def test_ai_understands_context(self, page: Page):
        """AI понимает контекст темы"""
        chat_page = ChatPage(page)

        # Учитываем начальное welcome-сообщение от AI
        initial_ai_count = len(chat_page.get_ai_messages())

        # Отправляем вопрос про Python
        chat_page.send_message("Что такое список в Python?")
        chat_page.wait_for_ai_response()

        # Отправляем уточняющий вопрос
        chat_page.send_message("Как добавить элемент?")
        chat_page.wait_for_ai_response()

        # Проверяем, что AI ответил на оба вопроса
        ai_messages = chat_page.get_ai_messages()
        assert len(ai_messages) == initial_ai_count + 2, "AI должен был ответить на оба вопроса"

        # Последний ответ должен содержать информацию про методы списка
        last_response = ai_messages[-1].lower()
        keywords = ["append", "insert", "extend", "добавить"]
        has_keyword = any(keyword in last_response for keyword in keywords)
        assert has_keyword, "AI не понял контекст вопроса про списки Python"
    
    def test_chat_input_accepts_special_characters(self, page: Page):
        """Поле ввода принимает специальные символы"""
        chat_page = ChatPage(page)
        special_message = "Привет! Можно ли использовать @#$%^&*() в коде?"
        
        chat_page.send_message(special_message)
        
        user_messages = chat_page.get_user_messages()
        assert special_message in user_messages[-1], "Спецсимволы не обработались корректно"
