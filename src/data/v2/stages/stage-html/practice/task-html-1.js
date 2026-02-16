export default {
  id: 'task-html-first-page',
  title: 'Создайте свою первую HTML страницу',
  scenario: `Вы создаете свою первую веб-страницу - страницу "Обо мне".
Она должна содержать базовую HTML структуру с заголовком, описанием и списком ваших интересов.`,

  language: 'html',
  difficulty: 'easy',

  starterCode: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обо мне</title>
</head>
<body>
    <!-- Ваш код здесь -->

</body>
</html>`,

  requirements: [
    'Используйте тег <h1> для главного заголовка "Обо мне"',
    'Добавьте параграф (<p>) с коротким описанием о себе',
    'Создайте неупорядоченный список (<ul>) с минимум 3 пунктами ваших интересов',
    'Используйте семантически правильные теги'
  ],

  hints: [
    'Неупорядоченный список создается с помощью <ul>, а каждый пункт - с помощью <li>',
    'Не забудьте закрывающие теги!',
    'Теги должны быть правильно вложены'
  ],

  hiddenChecks: [
    {
      id: 'has_h1',
      type: 'must_contain',
      rule: '<h1>',
      weight: 20,
      message: 'Отсутствует заголовок h1'
    },
    {
      id: 'has_paragraph',
      type: 'must_contain',
      rule: '<p>',
      weight: 20,
      message: 'Отсутствует параграф'
    },
    {
      id: 'has_list',
      type: 'must_contain',
      rule: '<ul>',
      weight: 20,
      message: 'Отсутствует неупорядоченный список'
    },
    {
      id: 'has_list_items',
      type: 'regex',
      rule: '(<li>.*?</li>.*?){3,}',
      weight: 20,
      message: 'Должно быть минимум 3 пункта списка'
    },
    {
      id: 'proper_nesting',
      type: 'validation',
      rule: 'checkHTMLNesting',
      weight: 20,
      message: 'Проверьте правильность вложенности тегов'
    }
  ],

  rubric: [
    {
      id: 'correctness',
      maxScore: 40,
      description: 'Корректность HTML структуры'
    },
    {
      id: 'completeness',
      maxScore: 30,
      description: 'Выполнены все требования'
    },
    {
      id: 'semantics',
      maxScore: 20,
      description: 'Использование семантических тегов'
    },
    {
      id: 'code_quality',
      maxScore: 10,
      description: 'Читаемость и форматирование кода'
    }
  ],

  maxAttempts: 3,
  passScore: 70,

  solutionExample: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обо мне</title>
</head>
<body>
    <h1>Обо мне</h1>
    <p>
        Привет! Меня зовут Алексей, я начинающий веб-разработчик.
        Изучаю HTML, CSS и JavaScript для создания современных веб-сайтов.
    </p>
    <h2>Мои интересы:</h2>
    <ul>
        <li>Веб-разработка</li>
        <li>Чтение технических книг</li>
        <li>Игра на гитаре</li>
        <li>Путешествия</li>
    </ul>
</body>
</html>`
};
