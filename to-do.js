document.addEventListener("DOMContentLoaded", loadTasks);

document.getElementById("add-task-button").addEventListener("click", addTask);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task.text, task.completed));
}

function addTask() {
  const taskInput = document.getElementById("new-task");
  const taskText = taskInput.value.trim();

  if (taskText) {
    addTaskToDOM(taskText);
    saveTask(taskText);
    taskInput.value = "";
  }
}

function addTaskToDOM(taskText, completed = false) {
  const taskList = document.getElementById("task-list");

  const li = document.createElement("li");
  li.textContent = taskText;
  if (completed) {
    li.classList.add("completed");
  }

  const completeButton = document.createElement("button");
  completeButton.textContent = "Complete";
  completeButton.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateTask(taskText, li.classList.contains("completed"));
  });

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    li.remove();
    deleteTask(taskText);
  });

  li.appendChild(completeButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTask(taskText, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.text === taskText);
  if (task) {
    task.completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function deleteTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t.text !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
