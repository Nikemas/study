export default {
  id: 'task-html-final-business-card',
  title: 'Финальный проект HTML: Сайт-визитка',
  scenario: `Вы делаете одностраничный сайт-визитку специалиста или малого проекта.
Нужно показать, что вы освоили HTML: структуру документа, семантические теги, текст, списки, ссылки, изображения, формы и таблицы.`,

  language: 'html',
  difficulty: 'hard',

  starterCode: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сайт-визитка</title>
</head>
<body>
    <!-- Ваш код здесь -->

</body>
</html>`,

  requirements: [
    'Используйте семантическую структуру: header, main, section, footer',
    'Добавьте заголовок h1 и минимум 3 заголовка h2',
    'Добавьте минимум одно изображение с корректным alt',
    'Добавьте список услуг/навыков (ul или ol) минимум из 4 пунктов',
    'Добавьте блок с контактами и минимум 2 ссылки (mailto, tel или соцсети)',
    'Добавьте таблицу с минимум 3 строками данных и заголовками th',
    'Добавьте форму обратной связи с минимум 3 полями и кнопкой submit',
    'Для полей формы используйте required минимум в двух местах'
  ],

  hints: [
    'Сначала соберите каркас страницы, потом наполняйте контентом',
    'Для таблицы используйте thead и tbody',
    'Форму можно разместить в секции "Связаться со мной"',
    'Проверяйте, что каждый label связан с input через for/id'
  ],

  hiddenChecks: [
    {
      id: 'has_header',
      type: 'must_contain',
      rule: '<header>',
      weight: 10,
      message: 'Добавьте тег <header>'
    },
    {
      id: 'has_main',
      type: 'must_contain',
      rule: '<main>',
      weight: 10,
      message: 'Добавьте тег <main>'
    },
    {
      id: 'has_footer',
      type: 'must_contain',
      rule: '<footer>',
      weight: 10,
      message: 'Добавьте тег <footer>'
    },
    {
      id: 'has_h1',
      type: 'must_contain',
      rule: '<h1>',
      weight: 10,
      message: 'Добавьте главный заголовок h1'
    },
    {
      id: 'has_h2',
      type: 'regex',
      rule: '(<h2>.*?</h2>.*?){3,}',
      weight: 10,
      message: 'Добавьте минимум 3 подзаголовка h2'
    },
    {
      id: 'has_image_alt',
      type: 'regex',
      rule: '<img[^>]*alt=',
      weight: 10,
      message: 'Добавьте изображение с alt'
    },
    {
      id: 'has_list_items',
      type: 'regex',
      rule: '(<li>.*?</li>.*?){4,}',
      weight: 10,
      message: 'Добавьте список минимум из 4 пунктов'
    },
    {
      id: 'has_links',
      type: 'regex',
      rule: '(<a[^>]*>.*?</a>.*?){2,}',
      weight: 10,
      message: 'Добавьте минимум 2 ссылки'
    },
    {
      id: 'has_table',
      type: 'regex',
      rule: '<table[\\s\\S]*?<thead>[\\s\\S]*?<tbody>',
      weight: 10,
      message: 'Добавьте таблицу с thead и tbody'
    },
    {
      id: 'has_form',
      type: 'regex',
      rule: '<form[\\s\\S]*?<button[^>]*type="submit"',
      weight: 10,
      message: 'Добавьте форму и кнопку отправки'
    }
  ],

  rubric: [
    {
      id: 'html_structure',
      maxScore: 30,
      description: 'Полная и корректная HTML-структура страницы'
    },
    {
      id: 'semantics',
      maxScore: 25,
      description: 'Использование семантических тегов и логичная разметка'
    },
    {
      id: 'data_and_forms',
      maxScore: 25,
      description: 'Качество реализации таблицы и формы'
    },
    {
      id: 'content_quality',
      maxScore: 20,
      description: 'Информативность и аккуратность контента'
    }
  ],

  maxAttempts: 3,
  passScore: 80,

  solutionExample: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Сайт-визитка - Анна Иванова</title>
</head>
<body>
    <header>
        <h1>Анна Иванова</h1>
        <p>Frontend-разработчик</p>
    </header>

    <main>
        <section>
            <h2>Обо мне</h2>
            <img src="photo.jpg" alt="Фото Анны Ивановой" width="200">
            <p>Разрабатываю простые и удобные веб-интерфейсы.</p>
        </section>

        <section>
            <h2>Навыки</h2>
            <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript</li>
                <li>Адаптивная верстка</li>
            </ul>
        </section>

        <section>
            <h2>Услуги и цены</h2>
            <table>
                <thead>
                    <tr>
                        <th>Услуга</th>
                        <th>Срок</th>
                        <th>Цена</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Лендинг</td>
                        <td>5 дней</td>
                        <td>$200</td>
                    </tr>
                    <tr>
                        <td>Сайт-визитка</td>
                        <td>3 дня</td>
                        <td>$120</td>
                    </tr>
                    <tr>
                        <td>Правки верстки</td>
                        <td>1 день</td>
                        <td>$50</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <section>
            <h2>Связаться со мной</h2>
            <p>
                Email: <a href="mailto:anna@example.com">anna@example.com</a><br>
                Телефон: <a href="tel:+996700123456">+996 700 123 456</a>
            </p>

            <form action="/contact" method="POST">
                <label for="name">Имя</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>

                <label for="message">Сообщение</label>
                <textarea id="message" name="message" rows="4"></textarea>

                <button type="submit">Отправить</button>
            </form>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Анна Иванова</p>
    </footer>
</body>
</html>`
};
