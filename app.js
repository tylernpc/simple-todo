const userInput = document.querySelector(".user-input");
const addButton = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

// userinput limiter to 55 characters
userInput.addEventListener("input", function () {
  if (userInput.value.length > 55) {
    userInput.value = userInput.value.slice(0, 55);
  }
});

// main event/logic
addButton.addEventListener("click", function (event) {
  event.preventDefault(); // so the submit doesn't refresh the page

  // blank checker
  if (userInput.value.trim() === "") {
    alert("Please input a value");
    return;
  }

  // creating top layer of todo, li subitem will go inside | imagine this is a bucket
  const topItem = document.createElement("div");
  topItem.classList.add("single-item");

  // creating the list item | imagine this is a item inside of the bucket
  const subItem = document.createElement("li");
  subItem.innerText = userInput.value.trim();
  subItem.classList.add("todo-item");
  topItem.appendChild(subItem);
  subItem.setAttribute("contenteditable", "true");

  // keeps it less than 55 characters, weird slice activity though
  subItem.addEventListener("input", function () {
    if (subItem.innerText.length > 55) {
      subItem.innerText = subItem.innerText.slice(0, 55);
    }
  });

  // creating a trash button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-btn");
  trashButton.style.margin = "0em 0em 1em 0em";
  trashButton.innerText = "Junk";
  topItem.appendChild(trashButton);
  todoList.appendChild(topItem);

  // creating a complete button
  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-btn");
  completeButton.innerText = "Done";
  topItem.appendChild(completeButton);
  todoList.appendChild(topItem);

  trashButton.addEventListener("click", function () {
    topItem.remove();
  });

  completeButton.addEventListener("click", function () {
    completedItem(subItem);
  });

  userInput.value = "";
});

function completedItem(subItem) {
  if (subItem.style.textDecoration === "line-through") {
    subItem.style.textDecoration = "none";
    subItem.setAttribute("contenteditable", true);
  } else {
    subItem.style.textDecoration = "line-through";
    subItem.style.overflow = "hidden";
    subItem.setAttribute("contenteditable", "false");
  }
}