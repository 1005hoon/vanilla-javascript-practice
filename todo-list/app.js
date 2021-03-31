// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// event listeners
todoList.addEventListener("click", buttonClickHandler);
todoButton.addEventListener("click", addTodo);

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
    todo.remove();
  } else if (buttonClicked.classList[0] === "complete-btn") {
    const todo = buttonClicked.parentElement;
    todo.classList.toggle("completed");
  }
}
