import { addTask } from "./Tasks.js";
import { renderTasks } from "./UI.js";
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taskForm");
  const input = document.getElementById("taskInput");
  const priorityInput = document.getElementById("priorityInput");
  const filterButtons = document.querySelectorAll("#filters button");
  let currentFilter = "all";
  filterButtons.forEach(button=>{
    button.addEventListener("click",()=>{
      const filter = button.dataset.filter;
      renderTasks(filter);
    });
  });
  renderTasks(currentFilter);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = input.value.trim();
    const priority = priorityInput.value;
    if (!title) return;
    addTask(title,priority);
    renderTasks(currentFilter);
    input.value = "";
    priorityInput.value = "Low";
  });
});