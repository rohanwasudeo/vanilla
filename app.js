const todoList = document.getElementById('todo-list');
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const toggleDark = document.getElementById('toggle-dark');

function getTodos() {
  return JSON.parse(localStorage.getItem('todos') || '[]');
}

function saveTodos(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  const todos = getTodos();
  todoList.innerHTML = '';
  todos.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => {
      todos[idx].completed = checkbox.checked;
      saveTodos(todos);
      renderTodos();
    });
    const span = document.createElement('span');
    span.textContent = todo.text;
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.title = 'Delete';
    delBtn.addEventListener('click', () => {
      todos.splice(idx, 1);
      saveTodos(todos);
      renderTodos();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;
  const todos = getTodos();
  todos.push({ text, completed: false });
  saveTodos(todos);
  todoInput.value = '';
  renderTodos();
});

// Dark mode
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark');
    localStorage.setItem('darkMode', '1');
    toggleDark.textContent = '☀️';
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('darkMode', '0');
    toggleDark.textContent = '🌙';
  }
}

toggleDark.addEventListener('click', () => {
  const isDark = document.body.classList.contains('dark');
  setDarkMode(!isDark);
});

// On load
window.addEventListener('DOMContentLoaded', () => {
  renderTodos();
  const darkPref = localStorage.getItem('darkMode');
  if (darkPref === '1' || (darkPref === null && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setDarkMode(true);
  } else {
    setDarkMode(false);
  }
});
