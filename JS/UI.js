import { getTasks, toggleTask, deleteTask } from "./Tasks.js";

export function renderTasks(filter = "all") {

  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();

  // 🔥 Sort by priority
  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t =>t.completed);
  pendingTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  const sortedTasks = [...pendingTasks, ...completedTasks];

  // 📊 Stats
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const high = tasks.filter(t => t.priority === "High").length;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;
  document.getElementById("highTasks").textContent = high;

  // 🔍 Filter
  let filteredTasks = sortedTasks;

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } 
  else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  } 
  else if (["High", "Medium", "Low"].includes(filter)) {
    filteredTasks = tasks.filter(t => t.priority === filter);
  }

  // 🎯 Render
  filteredTasks.forEach(task => {

    const li = document.createElement("li");

    // LEFT
    const left = document.createElement("div");
    left.classList.add("task-left");

    // checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
      renderTasks(filter);
    });

    // text
    const span = document.createElement("span");
    span.textContent = task.title;

    // priority color
    if (task.priority === "High") span.style.color = "red";
    else if (task.priority === "Medium") span.style.color = "orange";
    else span.style.color = "green";

    // completed style
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    left.appendChild(checkbox);
    left.appendChild(span);

    // DELETE
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✖";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
      renderTasks(filter);
    });

    // FINAL
    li.appendChild(left);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}