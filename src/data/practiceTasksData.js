// Practice challenges mapped to current knowledge categories.
// In this MVP we use category id as stage id.

export const PRACTICE_TASKS = [
  {
    id: 'task_python_core_1',
    stageId: 'python',
    title: 'Input Validation for Registration',
    scenario: 'You are implementing backend validation for a registration form in a learning platform.',
    language: 'python',
    difficulty: 'easy',
    starterCode: `def validate_user(name, age, email):
    # return {"ok": bool, "errors": list[str]}
    pass`,
    requirements: [
      'Reject empty name',
      'Age must be between 13 and 120',
      'Email must contain "@" and "."',
      'Return dictionary with keys "ok" and "errors"',
    ],
    hiddenChecks: [
      { id: 'function_exists', type: 'must_contain', rule: 'def validate_user', weight: 20 },
      { id: 'returns_dict', type: 'must_contain', rule: '"ok"', weight: 10 },
      { id: 'has_email_check', type: 'must_contain', rule: '@', weight: 10 },
      { id: 'no_placeholder', type: 'must_not_contain', rule: 'pass', weight: 15 },
      { id: 'uses_errors_collection', type: 'must_contain', rule: 'errors', weight: 10 },
    ],
    rubric: [
      { id: 'correctness', maxScore: 40 },
      { id: 'code_quality', maxScore: 20 },
      { id: 'edge_cases', maxScore: 25 },
      { id: 'readability', maxScore: 15 },
    ],
    maxAttempts: 3,
    passScore: 85,
  },
  {
    id: 'task_javascript_core_1',
    stageId: 'javascript',
    title: 'Filter and Sort Product List',
    scenario: 'You are building product search in an online marketplace.',
    language: 'javascript',
    difficulty: 'medium',
    starterCode: `function prepareProducts(products, minPrice, query) {
  // return array filtered by minPrice and query, sorted by price asc
}`,
    requirements: [
      'Filter by minimum price',
      'Filter by query in product title, case-insensitive',
      'Sort result by price ascending',
      'Do not mutate original array',
    ],
    hiddenChecks: [
      { id: 'function_exists', type: 'must_contain', rule: 'function prepareProducts', weight: 20 },
      { id: 'uses_filter', type: 'must_contain', rule: '.filter(', weight: 10 },
      { id: 'uses_sort', type: 'must_contain', rule: '.sort(', weight: 10 },
      { id: 'case_insensitive', type: 'must_contain', rule: 'toLowerCase', weight: 10 },
      { id: 'no_todo', type: 'must_not_contain', rule: 'TODO', weight: 10 },
    ],
    rubric: [
      { id: 'correctness', maxScore: 40 },
      { id: 'code_quality', maxScore: 20 },
      { id: 'edge_cases', maxScore: 25 },
      { id: 'readability', maxScore: 15 },
    ],
    maxAttempts: 3,
    passScore: 85,
  },
  {
    id: 'task_html_core_1',
    stageId: 'html',
    title: 'Accessible Login Form',
    scenario: 'Create a semantic login form for a real product sign-in page.',
    language: 'html_css',
    difficulty: 'easy',
    starterCode: `<main class="login-page">
  <!-- build form here -->
</main>`,
    requirements: [
      'Use semantic tags (main, form, label, input, button)',
      'Each input must have matching label',
      'Email field should use type="email"',
      'Password field should use type="password"',
    ],
    hiddenChecks: [
      { id: 'has_form', type: 'regex', rule: '<form[\\s\\S]*?>', weight: 20 },
      { id: 'has_label', type: 'regex', rule: '<label[\\s\\S]*?>', weight: 15 },
      { id: 'email_type', type: 'must_contain', rule: 'type="email"', weight: 10 },
      { id: 'password_type', type: 'must_contain', rule: 'type="password"', weight: 10 },
      { id: 'has_button', type: 'regex', rule: '<button[\\s\\S]*?>', weight: 10 },
    ],
    rubric: [
      { id: 'correctness', maxScore: 40 },
      { id: 'code_quality', maxScore: 20 },
      { id: 'edge_cases', maxScore: 25 },
      { id: 'readability', maxScore: 15 },
    ],
    maxAttempts: 3,
    passScore: 85,
  },
  {
    id: 'task_css_core_1',
    stageId: 'css',
    title: 'Responsive Card Layout',
    scenario: 'Design a responsive card grid for a dashboard.',
    language: 'html_css',
    difficulty: 'medium',
    starterCode: `.cards {
  /* build responsive layout */
}

.card {
}`,
    requirements: [
      'Use grid or flex layout',
      'Cards must wrap on smaller screens',
      'Keep spacing between cards',
      'Add hover state for card',
    ],
    hiddenChecks: [
      { id: 'uses_layout', type: 'regex', rule: 'display:\\s*(grid|flex)', weight: 20 },
      { id: 'has_gap', type: 'must_contain', rule: 'gap', weight: 10 },
      { id: 'responsive_rule', type: 'must_contain', rule: '@media', weight: 10 },
      { id: 'hover_state', type: 'must_contain', rule: ':hover', weight: 10 },
      { id: 'no_inline_style', type: 'must_not_contain', rule: 'style=', weight: 5 },
    ],
    rubric: [
      { id: 'correctness', maxScore: 40 },
      { id: 'code_quality', maxScore: 20 },
      { id: 'edge_cases', maxScore: 25 },
      { id: 'readability', maxScore: 15 },
    ],
    maxAttempts: 3,
    passScore: 85,
  },
  {
    id: 'task_react_core_1',
    stageId: 'react',
    title: 'Task List Component with Filters',
    scenario: 'Build a mini feature for a project board with state and filtering.',
    language: 'javascript',
    difficulty: 'medium',
    starterCode: `import { useState } from "react";

export default function TaskList({ tasks = [] }) {
  // Implement filter by status and render list
  return null;
}`,
    requirements: [
      'Use useState for active filter',
      'Render filtered list from props.tasks',
      'Show empty state when no tasks',
      'Use stable key for each item',
    ],
    hiddenChecks: [
      { id: 'uses_usestate', type: 'must_contain', rule: 'useState(', weight: 20 },
      { id: 'renders_map', type: 'must_contain', rule: '.map(', weight: 10 },
      { id: 'has_key', type: 'must_contain', rule: 'key=', weight: 10 },
      { id: 'empty_state', type: 'must_contain', rule: 'length', weight: 10 },
      { id: 'no_todo', type: 'must_not_contain', rule: 'TODO', weight: 10 },
    ],
    rubric: [
      { id: 'correctness', maxScore: 40 },
      { id: 'code_quality', maxScore: 20 },
      { id: 'edge_cases', maxScore: 25 },
      { id: 'readability', maxScore: 15 },
    ],
    maxAttempts: 3,
    passScore: 85,
  },
];

export const getPracticeTaskByStage = (stageId) =>
  PRACTICE_TASKS.find((task) => task.stageId === stageId) || null;

