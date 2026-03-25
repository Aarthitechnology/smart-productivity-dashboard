import { getTasks, toggleTask, deleteTask,updateTask } from "./Tasks.js";

export function renderTasks(filter = "all")
{
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  pendingTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const sortedTasks = [...pendingTasks, ...completedTasks];

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const high = tasks.filter(t => t.priority === "High").length;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;
  document.getElementById("highTasks").textContent = high;

  let filteredTasks = sortedTasks;

  if (filter === "completed") {
    filteredTasks = sortedTasks.filter(t => t.completed);
  } 
  else if (filter === "pending") {
    filteredTasks = sortedTasks.filter(t => !t.completed);
  } 
  else if (["High", "Medium", "Low"].includes(filter)) {
    filteredTasks = sortedTasks.filter(t => t.priority === filter);
  }

  filteredTasks.forEach(task =>
  {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.classList.add("task-left");
    const right = document.createElement("div");
    right.classList.add("task-right");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
      renderTasks(filter);
    });

    const span = document.createElement("span");
    span.textContent = task.title;

    if (task.priority === "High") span.style.color = "red";
    else if (task.priority === "Medium") span.style.color = "orange";
    else span.style.color = "green";

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    const date = document.createElement("div");
    if (task.dueDate) {
      date.textContent = "📅 " + task.dueDate;
      date.style.fontSize = "12px";
      date.style.color = "gray";
    }

    const today = new Date().toISOString().split("T")[0];
    if (task.dueDate && task.dueDate < today && !task.completed) {
      li.style.border = "2px solid red";
    }

    left.appendChild(checkbox);
    left.appendChild(span);
    left.appendChild(date);
    
    const editBtn = document.createElement("span");
    editBtn.textContent="✏️";
    editBtn.style.cursor = "pointer";
    editBtn.addEventListener("click",() => {
      const newTitle = prompt("Edit Task",task.title);
      if(newTitle === null)
      {
        return;
      }
      const newPriority = prompt("Priority (High/Medium/Low)",task.priority);
      const newDate = prompt("Due Date(YYYY-MM-DD)",task.dueDate);
      updateTask(task.id,{
        title: newTitle,
        priority: newPriority,
        dueDate: newDate
      });
      renderTasks(filter);
    });
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✖";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
      deleteTask(task.id);
      renderTasks(filter);
    });
    right.appendChild(editBtn);
    right.appendChild(deleteBtn);
    li.appendChild(left);
    li.appendChild(right);

    taskList.appendChild(li);
  });
}