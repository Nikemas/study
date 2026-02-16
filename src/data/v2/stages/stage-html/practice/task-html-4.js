export default {
  id: 'task-html-registration-form',
  title: 'Практика: Форма регистрации с валидацией',
  scenario: `Вы создаете форму регистрации пользователя для учебного сайта.
Форма должна использовать HTML5-валидацию: обязательные поля, проверку email, минимальную длину пароля и подтверждение согласия с правилами.`,

  language: 'html',
  difficulty: 'medium',

  starterCode: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Регистрация</title>
</head>
<body>
    <!-- Ваш код здесь -->

</body>
</html>`,

  requirements: [
    'Добавьте тег <form> с method="POST"',
    'Добавьте поле имени: input type="text" с required и minlength="2"',
    'Добавьте поле email: input type="email" с required',
    'Добавьте поле пароля: input type="password" с required и minlength="8"',
    'Добавьте поле возраста: input type="number" с min="13"',
    'Добавьте checkbox согласия с правилами с required',
    'Добавьте кнопку отправки: button type="submit"',
    'Для каждого поля добавьте соответствующий label'
  ],

  hints: [
    'Связывайте label и input через for и id',
    'Для текста ошибки браузера можно использовать атрибут title',
    'Сначала создайте структуру формы, затем добавляйте валидацию'
  ],

  hiddenChecks: [
    {
      id: 'has_form',
      type: 'must_contain',
      rule: '<form',
      weight: 15,
      message: 'Отсутствует тег <form>'
    },
    {
      id: 'has_method_post',
      type: 'must_contain',
      rule: 'method="POST"',
      weight: 10,
      message: 'У формы должен быть method="POST"'
    },
    {
      id: 'has_name_input',
      type: 'regex',
      rule: '<input[^>]*type="text"[^>]*required',
      weight: 10,
      message: 'Добавьте обязательное текстовое поле имени'
    },
    {
      id: 'has_email_input',
      type: 'regex',
      rule: '<input[^>]*type="email"[^>]*required',
      weight: 15,
      message: 'Добавьте обязательное поле email'
    },
    {
      id: 'has_password_input',
      type: 'regex',
      rule: '<input[^>]*type="password"[^>]*minlength="8"[^>]*required',
      weight: 15,
      message: 'Добавьте поле пароля с minlength="8" и required'
    },
    {
      id: 'has_age_input',
      type: 'regex',
      rule: '<input[^>]*type="number"[^>]*min="13"',
      weight: 10,
      message: 'Добавьте поле возраста с min="13"'
    },
    {
      id: 'has_terms_checkbox',
      type: 'regex',
      rule: '<input[^>]*type="checkbox"[^>]*required',
      weight: 15,
      message: 'Добавьте обязательный checkbox согласия'
    },
    {
      id: 'has_submit_button',
      type: 'regex',
      rule: '<button[^>]*type="submit"',
      weight: 10,
      message: 'Добавьте кнопку отправки формы'
    }
  ],

  rubric: [
    {
      id: 'structure',
      maxScore: 30,
      description: 'Корректная структура формы и полей'
    },
    {
      id: 'validation',
      maxScore: 40,
      description: 'Использование HTML5-валидации (required, minlength, min, type)'
    },
    {
      id: 'accessibility',
      maxScore: 20,
      description: 'Связь label и input, понятные подписи'
    },
    {
      id: 'readability',
      maxScore: 10,
      description: 'Аккуратность и читаемость кода'
    }
  ],

  maxAttempts: 3,
  passScore: 75,

  solutionExample: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Регистрация</title>
</head>
<body>
    <h1>Регистрация</h1>

    <form action="/register" method="POST">
        <label for="name">Имя *</label>
        <input type="text" id="name" name="name" required minlength="2">

        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required>

        <label for="password">Пароль *</label>
        <input type="password" id="password" name="password" required minlength="8">

        <label for="age">Возраст</label>
        <input type="number" id="age" name="age" min="13">

        <label>
            <input type="checkbox" name="terms" required>
            Я согласен с правилами
        </label>

        <button type="submit">Зарегистрироваться</button>
    </form>
</body>
</html>`
};
