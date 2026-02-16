export default {
  id: 'task-html-landing',
  title: 'Создайте семантический лендинг',
  scenario: `Вы создаете простую лендинг-страницу для продукта или услуги.
Страница должна использовать семантические теги HTML5 для правильной структуры: header с навигацией, main с секциями контента, aside для дополнительной информации и footer.`,

  language: 'html',
  difficulty: 'medium',

  starterCode: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лендинг - Название продукта</title>
</head>
<body>
    <!-- Ваш код здесь -->

</body>
</html>`,

  requirements: [
    'Используйте <header> с логотипом (h1) и навигацией (<nav>)',
    'Создайте <main> с минимум 2 секциями (<section>)',
    'Каждая секция должна иметь заголовок (h2)',
    'Добавьте <aside> с дополнительной информацией',
    'Используйте <footer> с копирайтом',
    'Добавьте минимум одно изображение с правильным alt',
    'Используйте списки для перечисления преимуществ или характеристик'
  ],

  hints: [
    'Структура: header > (logo + nav), main > sections, aside, footer',
    'Nav обычно содержит ul > li > a',
    'Каждая section должна иметь свой h2 заголовок',
    'Footer часто содержит копирайт с символом ©',
    'Aside может содержать призыв к действию или связанную информацию'
  ],

  hiddenChecks: [
    {
      id: 'has_header',
      type: 'must_contain',
      rule: '<header>',
      weight: 15,
      message: 'Отсутствует тег <header>'
    },
    {
      id: 'has_nav',
      type: 'must_contain',
      rule: '<nav>',
      weight: 15,
      message: 'Отсутствует тег <nav>'
    },
    {
      id: 'has_main',
      type: 'must_contain',
      rule: '<main>',
      weight: 15,
      message: 'Отсутствует тег <main>'
    },
    {
      id: 'has_sections',
      type: 'regex',
      rule: '(<section>.*?</section>.*?){2,}',
      weight: 15,
      message: 'Должно быть минимум 2 секции'
    },
    {
      id: 'has_aside',
      type: 'must_contain',
      rule: '<aside>',
      weight: 10,
      message: 'Отсутствует тег <aside>'
    },
    {
      id: 'has_footer',
      type: 'must_contain',
      rule: '<footer>',
      weight: 15,
      message: 'Отсутствует тег <footer>'
    },
    {
      id: 'has_image',
      type: 'regex',
      rule: '<img.*?alt=',
      weight: 10,
      message: 'Отсутствует изображение с alt'
    },
    {
      id: 'has_list',
      type: 'regex',
      rule: '(<ul>|<ol>)',
      weight: 5,
      message: 'Используйте списки для перечисления'
    }
  ],

  rubric: [
    {
      id: 'semantic_structure',
      maxScore: 40,
      description: 'Правильное использование семантических тегов'
    },
    {
      id: 'content_organization',
      maxScore: 25,
      description: 'Логическая организация контента в секциях'
    },
    {
      id: 'completeness',
      maxScore: 20,
      description: 'Полнота контента и выполнение всех требований'
    },
    {
      id: 'accessibility',
      maxScore: 15,
      description: 'Доступность (alt текст, правильные заголовки)'
    }
  ],

  maxAttempts: 3,
  passScore: 75,

  solutionExample: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Лендинг - Курсы веб-разработки</title>
</head>
<body>
    <header>
        <h1>WebDev Academy</h1>
        <nav>
            <ul>
                <li><a href="#about">О курсах</a></li>
                <li><a href="#features">Преимущества</a></li>
                <li><a href="#pricing">Цены</a></li>
                <li><a href="#contacts">Контакты</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <section id="hero">
            <h2>Станьте веб-разработчиком за 6 месяцев</h2>
            <p>
                Интенсивный практический курс по <strong>HTML, CSS, JavaScript и React</strong>.
                Начните карьеру в IT уже сегодня!
            </p>
            <img src="hero-image.jpg" alt="Студенты на курсах веб-разработки" width="600">
            <p>
                <a href="#signup">Записаться на курс</a>
            </p>
        </section>

        <section id="features">
            <h2>Что вы получите</h2>
            <ul>
                <li>100+ часов практических занятий</li>
                <li>Реальные проекты для портфолио</li>
                <li>Поддержку менторов 24/7</li>
                <li>Помощь в трудоустройстве</li>
                <li>Сертификат о прохождении курса</li>
            </ul>
        </section>

        <section id="program">
            <h2>Программа обучения</h2>
            <ol>
                <li>
                    <strong>Модуль 1:</strong> HTML и основы веб-страниц (2 недели)
                </li>
                <li>
                    <strong>Модуль 2:</strong> CSS и адаптивная верстка (3 недели)
                </li>
                <li>
                    <strong>Модуль 3:</strong> JavaScript и программирование (6 недель)
                </li>
                <li>
                    <strong>Модуль 4:</strong> React и современный фронтенд (5 недель)
                </li>
                <li>
                    <strong>Модуль 5:</strong> Финальный проект (2 недели)
                </li>
            </ol>
        </section>

        <aside id="cta">
            <h3>Начните обучение бесплатно!</h3>
            <p>
                Первая неделя курса - <em>абсолютно бесплатно</em>.
                Оцените качество обучения перед покупкой.
            </p>
            <p>
                <a href="#signup">Попробовать бесплатно</a>
            </p>
        </aside>
    </main>

    <footer>
        <p>&copy; 2024 WebDev Academy. Все права защищены.</p>
        <p>
            Email: <a href="mailto:info@webdevacademy.com">info@webdevacademy.com</a> |
            Телефон: <a href="tel:+79991234567">+7 (999) 123-45-67</a>
        </p>
    </footer>
</body>
</html>`
};
