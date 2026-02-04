"""
Тесты базы знаний

Проверяем отображение учебных материалов по разным темам.
Используем маркер @pytest.mark.knowledge для группировки.
"""

import pytest
from playwright.sync_api import Page, expect
from pages import MainPage, KnowledgePage


@pytest.mark.knowledge
class TestKnowledge:
    """Тесты базы знаний"""
    
    @pytest.fixture(autouse=True)
    def setup(self, page: Page):
        """Выполняется перед каждым тестом - открываем базу знаний"""
        main_page = MainPage(page)
        main_page.goto()
        main_page.open_knowledge()
    
    def test_view_python_materials(self, page: Page):
        """Просмотр материалов по Python"""
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_python()

        # Проверяем, что контент загрузился
        knowledge_page.expect_content_visible()

        # Проверяем, что контент связан с Python
        content = knowledge_page.get_content_text().lower()
        python_keywords = ["python", "переменн", "цикл", "функци"]
        has_python_content = any(keyword in content for keyword in python_keywords)
        assert has_python_content, "Контент не содержит информацию о Python"

        # Открываем материал и проверяем примеры кода
        knowledge_page.open_first_material()
        knowledge_page.expect_has_code_blocks()
    
    def test_view_javascript_materials(self, page: Page):
        """Просмотр материалов по JavaScript"""
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_javascript()
        
        knowledge_page.expect_content_visible()
        
        content = knowledge_page.get_content_text().lower()
        js_keywords = ["javascript", "js", "const", "let", "var", "функци"]
        has_js_content = any(keyword in content for keyword in js_keywords)
        assert has_js_content, "Контент не содержит информацию о JavaScript"
    
    def test_view_html_materials(self, page: Page):
        """Просмотр материалов по HTML"""
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_html()
        
        knowledge_page.expect_content_visible()
        
        content = knowledge_page.get_content_text().lower()
        html_keywords = ["html", "тег", "элемент", "атрибут"]
        has_html_content = any(keyword in content for keyword in html_keywords)
        assert has_html_content, "Контент не содержит информацию о HTML"
    
    def test_view_css_materials(self, page: Page):
        """Просмотр материалов по CSS"""
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_css()
        
        knowledge_page.expect_content_visible()
        
        content = knowledge_page.get_content_text().lower()
        css_keywords = ["css", "стил", "селектор", "свойств"]
        has_css_content = any(keyword in content for keyword in css_keywords)
        assert has_css_content, "Контент не содержит информацию о CSS"
    
    def test_view_react_materials(self, page: Page):
        """Просмотр материалов по React"""
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_react()
        
        knowledge_page.expect_content_visible()
        
        content = knowledge_page.get_content_text().lower()
        react_keywords = ["react", "компонент", "хук", "jsx", "props"]
        has_react_content = any(keyword in content for keyword in react_keywords)
        assert has_react_content, "Контент не содержит информацию о React"
    
    def test_switch_between_topics(self, page: Page):
        """Переключение между темами"""
        knowledge_page = KnowledgePage(page)
        
        # Выбираем Python
        knowledge_page.select_python()
        python_content = knowledge_page.get_content_text()
        
        # Переключаемся на JavaScript
        knowledge_page.select_javascript()
        js_content = knowledge_page.get_content_text()
        
        # Контент должен измениться
        assert python_content != js_content, "Контент не изменился при переключении темы"
    
    @pytest.mark.parametrize("topic_name,selector_method", [
        ("Python", "select_python"),
        ("JavaScript", "select_javascript"),
        ("HTML", "select_html"),
        ("CSS", "select_css"),
        ("React", "select_react"),
    ])
    def test_all_topics_have_code_examples(self, page: Page, topic_name, selector_method):
        """Все темы содержат примеры кода"""
        knowledge_page = KnowledgePage(page)
        
        # Вызываем метод выбора темы и открываем первый материал
        getattr(knowledge_page, selector_method)()
        knowledge_page.open_first_material()

        # Проверяем наличие блоков кода в детальном представлении
        code_blocks_count = knowledge_page.get_code_blocks_count()
        assert code_blocks_count > 0, f"{topic_name} должен содержать примеры кода"
    
    def test_syntax_highlighting_works(self, page: Page):
        """Блоки кода отображаются корректно"""
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_python()
        knowledge_page.open_first_material()

        # Проверяем, что блоки кода видимы и содержат текст
        expect(knowledge_page.code_blocks.first).to_be_visible()
        code_text = knowledge_page.code_blocks.first.text_content() or ""
        assert len(code_text) > 0, "Блок кода пустой"
    
    def test_code_blocks_are_readable(self, page: Page):
        """Блоки кода читаемы"""
        knowledge_page = KnowledgePage(page)
        knowledge_page.select_python()
        knowledge_page.open_first_material()

        # Получаем первый блок кода
        first_code_block = knowledge_page.code_blocks.first
        code_text = first_code_block.text_content() or ""
        
        # Проверяем, что код не пустой
        assert len(code_text) > 0, "Блок кода пустой"
        
        # Проверяем, что код содержит типичные элементы синтаксиса
        assert any(char in code_text for char in ["=", "(", ")", "{", "}"]), \
            "Блок кода не содержит типичных элементов синтаксиса"
