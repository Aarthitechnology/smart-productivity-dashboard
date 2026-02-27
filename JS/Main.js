import { addTask } from "./Tasks.js";
import { renderTasks } from "./UI.js";
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taskForm");
  const input = document.getElementById("taskInput");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const title = input.value.trim();
    if (title === "") return;
    addTask(title);
    renderTasks();
    input.value = "";
  });
});