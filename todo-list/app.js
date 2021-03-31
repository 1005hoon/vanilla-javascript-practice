// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoFilter = document.querySelector(".filter");
const todoList = document.querySelector(".todo-list");

// event listeners
todoList.addEventListener("click", buttonClickHandler);
todoButton.addEventListener("click", addTodo);
todoFilter.addEventListener("change", filterTodo);

// controller functions

function addTodo(e) {
  e.preventDefault();
  const userInput = todoInput.value.trim();
  if (!userInput) {
    return;
  }
  addTodoItem(userInput);
  todoInput.value = "";
}

function addTodoItem(userInput) {
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

  todoList.appendChild(todoDiv);
}

function buttonClickHandler(e) {
  // e.stopPropagation();
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
