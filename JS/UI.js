import { getTasks, toggleTask, deleteTask } from "./Tasks.js";

export function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();  
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const high = tasks.filter(t => t.priority === "High").length;
  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;
  document.getElementById("highTasks").textContent = high;

  let filteredTasks = tasks; 

  if (filter === "completed") {
    filteredTasks = tasks.filter(t => t.completed);
  } 
  else if (filter === "pending") {
    filteredTasks = tasks.filter(t => !t.completed);
  } 
  else if (["High", "Medium", "Low"].includes(filter)) {
    filteredTasks = tasks.filter(t => t.priority === filter);
  }

  filteredTasks.forEach(task => {

    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    const span = document.createElement("span");
    span.textContent = `${task.title} (${task.priority})`;

    if (task.priority === "High") {
      span.style.color = "red";
    } 
    else if (task.priority === "Medium") {
      span.style.color = "orange";
    } 
    else {
      span.style.color = "green";
    }

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    span.addEventListener("click", () => {
      toggleTask(task.id);
      renderTasks(filter);  
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
      renderTasks(filter);  
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}