let $todoInput;
let $addBtn;
let $errorInfo;
let $ulList;
let $popup;
let $popupInfo;
let $todoToEdit;
let $popupInput;
let $popupAddBtn;
let $popupCloseBtn;
// let newToDo;

const prepareDOMElements = () => {
  $todoInput = document.querySelector(".todo__header-todoInput");
  $addBtn = document.querySelector(".todo__header-btnAdd");
  $errorInfo = document.querySelector(".todo__todoList-errorInfo");
  $ulList = document.querySelector(".todo__todoList ul");
  $popup = document.querySelector(".popup");
  $popupInfo = document.querySelector(".popup__popupBody-popupInfo");
  $popupInput = document.querySelector(".popup__popupBody-popupInput");
  $popupAddBtn = document.querySelector(".accept");
  $popupCloseBtn = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
  const createToDoItem = () => {
    if ($todoInput.value !== "") {
      const newToDo = document.createElement("li");
      newToDo.textContent = $todoInput.value;

      addTools(newToDo);

      $ulList.append(newToDo);

      $todoHeading.textContent = "Your TodoList: ";
      $todoInput.value = "";
      $errorInfo.textContent = "";
    } else {
      $errorInfo.textContent = "Enter the task text!";
    }
  };

  const addTools = (newToDo) => {
    const toolsDiv = document.createElement("div");
    toolsDiv.classList.add("tools");
    newToDo.append(toolsDiv);

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit");
    editBtn.textContent = "EDIT";

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

    toolsDiv.append(completeBtn, editBtn, deleteBtn);
  };

  const checkClick = (e) => {
    if (e.target.matches(".complete")) {
      e.target.closest("li").classList.toggle("completed");
      e.target.classList.toggle("completed");
    } else if (e.target.matches(".edit")) {
      editTodo(e);
    } else if (e.target.matches(".delete")) {
      deleteTodo(e);
    }
  };

  const editTodo = (e) => {
    $todoToEdit = e.target.closest("li");
    $popupInput.value = $todoToEdit.firstChild.textContent;
    console.log($todoToEdit.firstChild);
    $popup.style.display = "flex";
  };

  const changeTodoText = () => {
    if ($popupInput.value !== "") {
      $todoToEdit.firstChild.textContent = $popupInput.value;
      console.log($todoToEdit.firstChild.textContent);
      $popup.style.display = "none";
      $popupInfo.textContent = "";
    } else {
      $popupInfo.textContent = "You must provide some content!";
    }
  };

  const deleteTodo = (e) => {
    e.target.closest("li").remove();

    const allTodos = $ulList.querySelectorAll("li");

    if (allTodos.length === 0) {
      $todoHeading.textContent = "Add your first todo!";
      $errorInfo.textContent = "There are no tasks in the list.";
    }
  };

  const enterKeyCheck = (e) => {
    if (e.key === "Enter") {
      createToDoItem();
    }
  };
  const closePopup = () => {
    $popup.style.display = "none";
    $popupInfo.textContent = "";
  };

  $addBtn.addEventListener("click", createToDoItem);
  $ulList.addEventListener("click", checkClick);
  $popupCloseBtn.addEventListener("click", closePopup);
  $popupAddBtn.addEventListener("click", changeTodoText);
  $todoInput.addEventListener("keyup", enterKeyCheck);
};

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

document.addEventListener("DOMContentLoaded", main);
