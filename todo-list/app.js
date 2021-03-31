// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoFilter = document.querySelector(".filter");
const todoList = document.querySelector(".todo-list");

// event listeners
document.addEventListener("DOMContentLoaded", getTodosFromLocalStorage);
todoList.addEventListener("click", buttonClickHandler);
todoButton.addEventListener("click", addTodo);
todoFilter.addEventListener("change", filterTodo);

// controller functions

function addTodo(e) {
  e.preventDefault();
  const userInput = todoInput.value.trim();
  todoInput.value = "";

  if (!userInput) {
    return;
  }

  saveToLocalStorage(userInput);
  const newTodoItem = createTodoItem(userInput);

  todoList.appendChild(newTodoItem);
}

function createTodoItem(userInput) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoItem = document.createElement("li");
  todoItem.innerText = userInput;
  todoItem.classList.add("todo-item");

  todoDiv.appendChild(todoItem);

  const checkButton = document.createElement("button");
  checkButton.innerHTML = `<i class='fas fa-check'></i>`;
  checkButton.classList.add("complete-btn");
  todoDiv.appendChild(checkButton);

  const removeButton = document.createElement("button");
  removeButton.innerHTML = `<i class='fas fa-trash'></i>`;
  removeButton.classList.add("remove-btn");
  todoDiv.appendChild(removeButton);

  return todoDiv;
}

function buttonClickHandler(e) {
  const buttonClicked = e.target;

  if (buttonClicked.classList[0] === "remove-btn") {
    const todo = buttonClicked.parentElement;
    todo.classList.toggle("deleting");

    setTimeout(() => {
      todo.remove();
    }, 500);
  } else if (buttonClicked.classList[0] === "complete-btn") {
    const todo = buttonClicked.parentElement;
    todo.classList.toggle("completed");
    updateTodoStatus(todo.children[0].innerText);
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveToLocalStorage(todo) {
  let todos;

  // check if todo exists
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);

  localStorage.setItem("todos", JSON.stringify(todos));
}

function deleteFromLocalStorage(todo) {}

function updateTodoStatus(todo) {
  const todos = JSON.parse(localStorage.getItem("todos"));
  console.log(todos, todo);
}
function getTodosFromLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos"));

  todos.forEach((todo) => {
    const todoDiv = createTodoItem(todo);
    todoList.appendChild(todoDiv);
  });
}
