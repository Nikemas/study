// src/locales/en/courses.js
// English course and materials translations

export default {
  title: "Web Development Fundamentals",

  courses: [
    { id: 'python', name: 'Python' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'html', name: 'HTML' },
    { id: 'css', name: 'CSS' },
    { id: 'react', name: 'React' }
  ],

  materials: {
    python: [
      {
        id: 1,
        topic: "Variables and Data Types",
        content: "Python has several basic data types: int (integers), float (floating-point numbers), str (strings), bool (boolean). Variables are created by simple assignment: x = 10. Python is a dynamically typed language, the type is determined automatically."
      },
      {
        id: 2,
        topic: "Loops",
        content: "Python has two main types of loops: for and while. The for loop is used to iterate over sequence elements: for i in range(10). The while loop runs while the condition is true: while x < 100. Use break for early exit, continue to skip to the next iteration."
      },
      {
        id: 3,
        topic: "Functions",
        content: "Functions in Python are defined using the def keyword. Syntax: def function_name(parameters): function body. A function can return a value using return. Arguments can be positional, keyword, or have default values. Example: def sum(a, b=0): return a + b"
      },
      {
        id: 4,
        topic: "Lists",
        content: "A list is a mutable ordered collection of elements. Creation: my_list = [1, 2, 3] or my_list = list(). Main methods: append() — add element, remove() — delete, sort() — sort, len() — get length. Indexing starts at 0, slicing is supported: my_list[1:3]"
      }
    ],
    javascript: [
      {
        id: 5,
        topic: "Variables in JavaScript",
        content: "JavaScript has three ways to declare variables: var (deprecated), let (mutable) and const (constant). Use const by default, let when you need to change the value. JavaScript is a dynamically typed language."
      },
      {
        id: 6,
        topic: "Functions and Arrow Functions",
        content: "Functions are declared using function or arrow syntax (=>). Arrow functions are shorter and don't have their own this. Functions are first-class objects and can be passed as arguments."
      },
      {
        id: 7,
        topic: "Arrays and Methods",
        content: "Arrays in JS are objects. Main methods: map() (transformation), filter() (filtering), reduce() (reduction), forEach() (iteration), find() (search). All methods except forEach return a new array."
      },
      {
        id: 8,
        topic: "Asynchronous: Promises and async/await",
        content: "Promise is an object for handling asynchronous operations. Has states: pending, fulfilled, rejected. async/await is syntactic sugar over promises. Async function always returns a Promise, await waits for completion."
      }
    ],
    html: [
      {
        id: 9,
        topic: "HTML Document Structure",
        content: "An HTML document consists of DOCTYPE, html tag with head and body. Head contains metadata (title, meta, link). Body contains page content. All tags must be closed (except self-closing ones)."
      },
      {
        id: 10,
        topic: "Semantic Tags",
        content: "Semantic tags describe the meaning of content: header (header), nav (navigation), main (main content), article (article), section (section), aside (sidebar), footer (footer). They improve SEO and accessibility."
      },
      {
        id: 11,
        topic: "Forms and Input Elements",
        content: "Forms are created with the form tag. Main input types: text, email, password, number, date, checkbox, radio, file. Attributes: name (for submission), placeholder (hint), required (mandatory), pattern (validation)."
      }
    ],
    css: [
      {
        id: 12,
        topic: "CSS Selectors",
        content: "Selectors choose elements for styling. Types: element (div), class (.class), id (#id), attribute ([type='text']), pseudo-classes (:hover, :focus), pseudo-elements (::before, ::after). Combinators: descendant (space), child (>), adjacent (+)."
      },
      {
        id: 13,
        topic: "Flexbox",
        content: "Flexbox is one-dimensional layout (row or column). Container: display: flex, flex-direction, justify-content (main axis), align-items (cross axis), gap (spacing). Items: flex-grow, flex-shrink, flex-basis."
      },
      {
        id: 14,
        topic: "Grid Layout",
        content: "Grid is two-dimensional layout (rows and columns). Container: display: grid, grid-template-columns/rows (grid definition), gap (spacing). Items: grid-column, grid-row (placement), grid-area (named areas)."
      },
      {
        id: 15,
        topic: "Responsive Design",
        content: "Media queries for different screens: @media (max-width: 768px). Mobile-first approach: styles for mobile first, then for larger screens. Units: rem (relative to root), em (relative to parent), vw/vh (viewport), % (percent of parent)."
      }
    ],
    react: [
      {
        id: 16,
        topic: "Components and JSX",
        content: "Components are the building blocks of React. Functional components are regular JS functions that return JSX. JSX is a syntax similar to HTML, but it's JavaScript. Use className instead of class, camelCase for attributes."
      },
      {
        id: 17,
        topic: "Hooks: useState and useEffect",
        content: "useState is for component state. Returns [value, setter function]. useEffect is for side effects (requests, subscriptions). Runs after render. Dependency array controls re-execution."
      },
      {
        id: 18,
        topic: "Props and Data Passing",
        content: "Props are component properties, passed from parent to child. They are immutable. Destructuring for convenience: ({name, age}). Children prop for nested content. PropTypes for type validation."
      },
      {
        id: 19,
        topic: "Conditional Rendering and Lists",
        content: "Conditional rendering: ternary operator (condition ? <A/> : <B/>), logical operator (condition && <Component/>). Lists: map() to transform array into components. Unique key is required for optimization."
      }
    ]
  },

  faq: [
    {
      id: 1,
      question: "How to install Python?",
      answer: "Download the installer from python.org, run it and make sure to check 'Add Python to PATH'. After installation, verify in command line: python --version",
      category: "python"
    },
    {
      id: 2,
      question: "Which IDE to use for Python?",
      answer: "For beginners, PyCharm Community (free) or VS Code with Python extension is recommended. Jupyter Notebook is also great for interactive work and learning.",
      category: "python"
    },
    {
      id: 3,
      question: "What's the difference between let and const?",
      answer: "const is used for variables that won't be reassigned. let is for variables that may change. const doesn't make the object immutable, it only prevents reassignment of the variable itself.",
      category: "javascript"
    },
    {
      id: 4,
      question: "How to connect CSS to HTML?",
      answer: "Three ways: 1) External file via <link rel='stylesheet' href='style.css'> in head. 2) Internal styles via <style> tag in head. 3) Inline styles via style attribute on element. External file is recommended.",
      category: "css"
    },
    {
      id: 5,
      question: "How to create a React application?",
      answer: "Use the command: npx create-react-app my-app. Then cd my-app and npm start to run. Or use Vite for faster builds: npm create vite@latest my-app -- --template react",
      category: "react"
    },
    {
      id: 6,
      question: "What is closure in JavaScript?",
      answer: "A closure is a function that remembers variables from the outer scope, even after the outer function has finished. Used for creating private variables and modules.",
      category: "javascript"
    }
  ],

  initialMessage: "Hello! I'm the AI assistant of the educational platform. I'll help with questions about **Python**, **JavaScript**, **HTML**, **CSS** and **React**. Ask any questions!"
};
