export default {
  id: 'task-html-resume',
  title: 'Создайте HTML резюме',
  scenario: `Вы создаете свое профессиональное резюме в формате веб-страницы.
Резюме должно содержать вашу информацию, навыки, образование и опыт работы, правильно структурированные с помощью заголовков и списков.`,

  language: 'html',
  difficulty: 'easy',

  starterCode: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Резюме - Ваше Имя</title>
</head>
<body>
    <!-- Ваш код здесь -->

</body>
</html>`,

  requirements: [
    'Используйте <h1> для вашего имени',
    'Используйте <h2> для разделов (Контакты, Навыки, Образование, Опыт)',
    'Создайте неупорядоченный список навыков (<ul>) с минимум 4 пунктами',
    'Создайте упорядоченный список этапов образования или опыта (<ol>)',
    'Используйте параграфы (<p>) для описания',
    'Используйте теги <strong> или <em> для выделения важной информации'
  ],

  hints: [
    'Резюме обычно начинается с имени (h1), затем идут разделы (h2)',
    'Навыки логично оформить неупорядоченным списком',
    'Опыт работы или образование можно показать упорядоченным списком (от новых к старым)',
    'Не забывайте про семантическое форматирование текста'
  ],

  hiddenChecks: [
    {
      id: 'has_h1',
      type: 'must_contain',
      rule: '<h1>',
      weight: 15,
      message: 'Отсутствует заголовок h1 (имя)'
    },
    {
      id: 'has_h2',
      type: 'must_contain',
      rule: '<h2>',
      weight: 15,
      message: 'Отсутствуют заголовки h2 (разделы)'
    },
    {
      id: 'has_ul',
      type: 'must_contain',
      rule: '<ul>',
      weight: 20,
      message: 'Отсутствует неупорядоченный список'
    },
    {
      id: 'has_ol',
      type: 'must_contain',
      rule: '<ol>',
      weight: 20,
      message: 'Отсутствует упорядоченный список'
    },
    {
      id: 'has_list_items',
      type: 'regex',
      rule: '(<li>.*?</li>.*?){4,}',
      weight: 15,
      message: 'Должно быть минимум 4 элемента списка'
    },
    {
      id: 'has_paragraph',
      type: 'must_contain',
      rule: '<p>',
      weight: 10,
      message: 'Отсутствуют параграфы'
    },
    {
      id: 'has_formatting',
      type: 'regex',
      rule: '(<strong>|<em>)',
      weight: 5,
      message: 'Используйте теги strong или em для выделения'
    }
  ],

  rubric: [
    {
      id: 'structure',
      maxScore: 35,
      description: 'Правильная структура с заголовками и разделами'
    },
    {
      id: 'lists_usage',
      maxScore: 30,
      description: 'Корректное использование списков ul и ol'
    },
    {
      id: 'content_quality',
      maxScore: 20,
      description: 'Качество и полнота контента'
    },
    {
      id: 'semantics',
      maxScore: 15,
      description: 'Семантическое использование тегов форматирования'
    }
  ],

  maxAttempts: 3,
  passScore: 70,

  solutionExample: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Резюме - Иван Петров</title>
</head>
<body>
    <h1>Иван Петров</h1>
    <p>
        <strong>Должность:</strong> Frontend Разработчик<br>
        <strong>Город:</strong> Москва<br>
        <strong>Email:</strong> ivan.petrov@example.com
    </p>

    <h2>О себе</h2>
    <p>
        Я - <em>начинающий веб-разработчик</em> с большим желанием учиться и расти.
        Имею опыт создания <strong>адаптивных веб-сайтов</strong> с использованием
        современных технологий.
    </p>

    <h2>Навыки</h2>
    <ul>
        <li>HTML5 и семантическая разметка</li>
        <li>CSS3, Flexbox, Grid</li>
        <li>JavaScript (ES6+)</li>
        <li>React и создание компонентов</li>
        <li>Git и GitHub</li>
        <li>Адаптивная верстка</li>
    </ul>

    <h2>Образование</h2>
    <ol>
        <li>
            <strong>2023-2024</strong> - Курсы Frontend разработки
            <p>Изучение HTML, CSS, JavaScript и React</p>
        </li>
        <li>
            <strong>2019-2023</strong> - Университет, Факультет информатики
            <p>Бакалавр по направлению "Информационные технологии"</p>
        </li>
    </ol>

    <h2>Опыт работы</h2>
    <ol>
        <li>
            <strong>Стажер Frontend разработчик</strong> - Компания ABC (2024)
            <p>Разработка интерфейсов, верстка макетов, работа с React</p>
        </li>
        <li>
            <strong>Фрилансер</strong> - Личные проекты (2023-2024)
            <p>Создание сайтов-визиток и лендингов для малого бизнеса</p>
        </li>
    </ol>
</body>
</html>`
};
