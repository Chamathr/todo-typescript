/* Define an interface for Todo */
interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

/* Todo list state */
let todos: ITodo[] = [];

/**
 * Function to add a new todo
 * @param {string} title - The title of the todo to be added
 * @returns {void}
 */
function addTodo(title: string): void {
  try {
    if (title.length < 3) {
      throw new Error("Title must be at least 3 characters long");
    }

    const newTodo: ITodo = {
      id: Date.now(),
      title,
      completed: false,
    };
    todos.push(newTodo);
    renderTodos();
  } catch (error) {
    alert(error.message);
  }
}

/**
 * Function to complete a todo
 * @param {number} id - ID of the todo to complete
 * @returns {void}
 */
function completeTodo(id: number): void {
  try {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    renderTodos();
  } catch (error) {
    alert("Error completing todo: " + error.message);
  }
}

/**
 * Function to delete a todo
 * @param {number} id - ID of the todo to delete
 * @returns {void}
 */
function deleteTodo(id: number): void {
  try {
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
  } catch (error) {
    alert("Error deleting todo: " + error.message);
  }
}

/**
 * Function to render the list of todos
 * @returns {void}
 */
function renderTodos(): void {
  const todoList = document.getElementById("todo-list");
  if (!todoList) return;
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = todo.completed ? "completed" : "";
    li.innerHTML = `
    <span class="${todo.completed ? 'completed' : ''}">${todo.title}</span>
    <div>
        <button class="complete" onclick="completeTodo(${todo.id})" ${todo.completed ? 'disabled' : ''}>Complete</button>
        <button class="delete" onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
`;
    todoList.appendChild(li);
  });
}

/* Attach event listener to form submission */
const form = document.getElementById("todo-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.getElementById("todo-input") as HTMLInputElement;
    if (input.value.trim()) {
      addTodo(input.value);
      input.value = "";
    } else {
      alert("Please enter a valid todo title.");
    }
  });
}
