"""
Конфигурация pytest и фикстуры для тестов Playwright

Этот файл содержит общие фикстуры, которые используются во всех тестах.
pytest автоматически находит этот файл и делает фикстуры доступными.
"""

import pytest
from playwright.sync_api import Page, expect

# Базовый URL приложения
BASE_URL = "http://localhost:3000/study"


@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    """
    Настройка контекста браузера.
    scope="session" означает, что настройки применяются ко всей сессии тестов.
    """
    return {
        **browser_context_args,
        "base_url": BASE_URL,
        "viewport": {"width": 1280, "height": 720},
        "locale": "ru-RU",
    }


@pytest.fixture
def page(page: Page):
    """
    Фикстура для страницы с настройками по умолчанию.
    Автоматически закрывается после каждого теста.
    """
    # Устанавливаем таймауты
    page.set_default_timeout(10000)  # 10 секунд
    page.set_default_navigation_timeout(30000)  # 30 секунд для навигации
    
    yield page
    
    # Cleanup после теста (если нужно)
    # page.close() - не нужно, pytest-playwright делает это автоматически


@pytest.fixture(scope="session")
def base_url():
    """Базовый URL приложения"""
    return BASE_URL


@pytest.fixture(autouse=True)
def before_each(page: Page):
    """
    Выполняется перед каждым тестом автоматически (autouse=True).
    Можно использовать для общих действий перед тестами.
    """
    # Здесь можно добавить логику, которая нужна перед каждым тестом
    # Например, очистка LocalStorage:
    # page.evaluate("localStorage.clear()")
    pass


def pytest_configure(config):
    """
    Хук pytest для дополнительной конфигурации.
    Вызывается один раз при запуске pytest.
    """
    # Создаём директорию для отчётов, если её нет
    import os
    os.makedirs("reports", exist_ok=True)
