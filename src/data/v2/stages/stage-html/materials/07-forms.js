export default {
  id: 'html-forms',
  topic: 'Формы и элементы ввода',
  content: `HTML формы позволяют пользователям вводить и отправлять данные на сервер. Формы - основа интерактивности веб-страниц.`,

  detailedContent: `
## Формы в HTML

### Тег <form>

Контейнер для элементов формы. Основные атрибуты:
- \`action\` - URL, куда отправляются данные
- \`method\` - метод отправки (GET или POST)

### Элементы ввода (Input)

Тег \`<input>\` имеет множество типов через атрибут \`type\`:

**Текстовые поля:**
- \`text\` - обычное текстовое поле
- \`email\` - поле для email (с валидацией)
- \`password\` - поле для пароля (скрыт)
- \`tel\` - поле для телефона
- \`url\` - поле для URL

**Выбор:**
- \`checkbox\` - флажок (множественный выбор)
- \`radio\` - переключатель (один из группы)

**Дата и время:**
- \`date\` - выбор даты
- \`time\` - выбор времени
- \`datetime-local\` - дата и время

**Числа:**
- \`number\` - числовое поле
- \`range\` - ползунок

**Другое:**
- \`file\` - загрузка файла
- \`color\` - выбор цвета
- \`hidden\` - скрытое поле

### Другие элементы форм

**<textarea>** - многострочное текстовое поле

**<select>** - выпадающий список с опциями (\`<option>\`)

**<button>** - кнопка (или \`<input type="submit">\`)

### Атрибуты валидации

HTML5 предоставляет встроенную валидацию:
- \`required\` - обязательное поле
- \`minlength\` / \`maxlength\` - минимум/максимум символов
- \`min\` / \`max\` - минимум/максимум для чисел
- \`pattern\` - регулярное выражение для проверки
- \`placeholder\` - подсказка в поле

### Лейблы (Labels)

Тег \`<label>\` связывает текст с элементом формы:
- Улучшает доступность
- Расширяет кликабельную область
  `.trim(),

  examples: [
    {
      title: 'Простая форма контакта',
      code: `<form action="/submit" method="POST">
  <label for="name">Имя:</label>
  <input type="text" id="name" name="name" required>

  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <label for="message">Сообщение:</label>
  <textarea id="message" name="message" rows="4" required></textarea>

  <button type="submit">Отправить</button>
</form>`,
      explanation: 'Базовая форма с текстовым полем, email и textarea. Атрибут required делает поля обязательными.'
    },
    {
      title: 'Различные типы input',
      code: `<form>
  <!-- Текст -->
  <label for="username">Логин:</label>
  <input type="text" id="username" name="username" placeholder="Введите логин">

  <!-- Email с валидацией -->
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" required>

  <!-- Пароль (скрыт) -->
  <label for="password">Пароль:</label>
  <input type="password" id="password" name="password" minlength="6" required>

  <!-- Телефон -->
  <label for="phone">Телефон:</label>
  <input type="tel" id="phone" name="phone" pattern="[0-9]{10}">

  <!-- Число -->
  <label for="age">Возраст:</label>
  <input type="number" id="age" name="age" min="18" max="100">

  <!-- Дата -->
  <label for="birthday">Дата рождения:</label>
  <input type="date" id="birthday" name="birthday">

  <button type="submit">Зарегистрироваться</button>
</form>`,
      explanation: 'Различные типы input с валидацией. HTML5 автоматически проверяет формат email, минимальную длину пароля, и т.д.'
    },
    {
      title: 'Checkbox и Radio',
      code: `<form>
  <fieldset>
    <legend>Выберите навыки:</legend>

    <!-- Checkbox (можно выбрать несколько) -->
    <label>
      <input type="checkbox" name="skills" value="html"> HTML
    </label>
    <label>
      <input type="checkbox" name="skills" value="css"> CSS
    </label>
    <label>
      <input type="checkbox" name="skills" value="js"> JavaScript
    </label>
  </fieldset>

  <fieldset>
    <legend>Уровень опыта:</legend>

    <!-- Radio (можно выбрать только один) -->
    <label>
      <input type="radio" name="level" value="beginner"> Начинающий
    </label>
    <label>
      <input type="radio" name="level" value="intermediate"> Средний
    </label>
    <label>
      <input type="radio" name="level" value="advanced"> Продвинутый
    </label>
  </fieldset>

  <button type="submit">Отправить</button>
</form>`,
      explanation: 'Checkbox для множественного выбора, radio для выбора одного варианта. Одинаковый name у radio объединяет их в группу.'
    },
    {
      title: 'Select (выпадающий список)',
      code: `<form>
  <label for="country">Страна:</label>
  <select id="country" name="country" required>
    <option value="">-- Выберите страну --</option>
    <option value="ru">Россия</option>
    <option value="us">США</option>
    <option value="uk">Великобритания</option>
    <option value="de">Германия</option>
  </select>

  <label for="city">Город:</label>
  <select id="city" name="city" multiple size="4">
    <option value="moscow">Москва</option>
    <option value="spb">Санкт-Петербург</option>
    <option value="kazan">Казань</option>
    <option value="sochi">Сочи</option>
  </select>

  <button type="submit">Отправить</button>
</form>`,
      explanation: 'Select создает выпадающий список. Атрибут multiple позволяет выбрать несколько вариантов (с Ctrl/Cmd).'
    },
    {
      title: 'Продвинутые элементы',
      code: `<form>
  <!-- Ползунок -->
  <label for="volume">Громкость:</label>
  <input type="range" id="volume" name="volume" min="0" max="100" value="50">

  <!-- Выбор цвета -->
  <label for="color">Любимый цвет:</label>
  <input type="color" id="color" name="color" value="#3B82F6">

  <!-- Загрузка файла -->
  <label for="avatar">Аватар:</label>
  <input type="file" id="avatar" name="avatar" accept="image/*">

  <!-- Скрытое поле -->
  <input type="hidden" name="user_id" value="12345">

  <button type="submit">Сохранить</button>
</form>`,
      explanation: 'Специальные типы input для ползунков, выбора цвета, загрузки файлов и скрытых данных.'
    },
    {
      title: 'Полная форма регистрации с валидацией',
      code: `<form action="/register" method="POST">
  <h2>Регистрация</h2>

  <label for="fullname">Полное имя *</label>
  <input
    type="text"
    id="fullname"
    name="fullname"
    placeholder="Иван Иванов"
    required
    minlength="2"
  >

  <label for="email">Email *</label>
  <input
    type="email"
    id="email"
    name="email"
    placeholder="ivan@example.com"
    required
  >

  <label for="password">Пароль *</label>
  <input
    type="password"
    id="password"
    name="password"
    required
    minlength="8"
    pattern="(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Минимум 8 символов, включая цифры, строчные и заглавные буквы"
  >

  <label for="age">Возраст</label>
  <input type="number" id="age" name="age" min="13" max="120">

  <fieldset>
    <legend>Согласие</legend>
    <label>
      <input type="checkbox" name="terms" required>
      Я согласен с условиями использования *
    </label>
  </fieldset>

  <button type="submit">Зарегистрироваться</button>
  <button type="reset">Очистить форму</button>
</form>`,
      explanation: 'Комплексная форма с различными типами валидации: required, minlength, pattern для пароля, min/max для возраста.'
    }
  ],

  keyPoints: [
    '<form> - контейнер для элементов формы',
    '<input> имеет множество типов: text, email, password, number, date, и др.',
    '<textarea> для многострочного текста',
    '<select> и <option> для выпадающих списков',
    '<label> связывает текст с элементом (атрибут for = id элемента)',
    'Атрибут required делает поле обязательным',
    'HTML5 предоставляет встроенную валидацию (email, minlength, pattern)',
    'Checkbox для множественного выбора, radio для одного из группы',
    'type="submit" отправляет форму, type="reset" очищает',
    'Placeholder показывает подсказку в пустом поле'
  ],

  visualAssets: []
};
