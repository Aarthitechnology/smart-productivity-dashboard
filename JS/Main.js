import { addTask } from "./Tasks.js";
import { renderTasks } from "./UI.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("taskForm");
  const input = document.getElementById("taskInput");
  const priorityInput = document.getElementById("priorityInput");
  const dueDateInput = document.getElementById("dueDate");
  const filterButtons = document.querySelectorAll("#filters button");
  const navTasks = document.getElementById("navTasks");
  const navStats = document.getElementById("navStats");
  const navHabits = document.getElementById("navHabits");
  const tasksSection = document.getElementById("tasksSection");
  const statsSection = document.getElementById("statsSection");
  const habitsSection = document.getElementById("habitsSection"); 
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("overlay");
  const pageTitle = document.getElementById("pageTitle");
  menuToggle.addEventListener("click",() => {
    sidebar.classList.add("open");
    overlay.classList.remove("hidden");
  });
  overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.add("hidden");
});
  function showSection(section)
  {
    tasksSection.classList.add("hidden");
    statsSection.classList.add("hidden");
    habitsSection.classList.add("hidden");
    section.classList.remove("hidden");
    navTasks.classList.remove("active");
    navStats.classList.remove("active");
    navHabits.classList.remove("active");
  }
  navTasks.addEventListener("click",() => {
    showSection(tasksSection);
    navTasks.classList.add("active");
    pageTitle.textContent="Dashboard";
  });
  navStats.addEventListener("click" ,() => {
    showSection(statsSection);
    navStats.classList.add("active");
    setTimeout(() => {
      renderTasks(currentFilter);
    },100);
    pageTitle.textContent="Analytics";
  });
  navHabits.addEventListener("click" , () => {
    showSection(habitsSection);
    navHabits.classList.add("active");
    pageTitle.textContent="Habits";
  });
  let currentFilter = "all";
  
  [navTasks, navStats, navHabits].forEach(nav => {
  nav.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.add("hidden");
  });
});

  // 🔍 Filter buttons
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.dataset.filter;
      renderTasks(currentFilter);
    });
  });

  const toggleBtn = document.getElementById("themeToggle");
  if(localStorage.getItem("theme")==="dark")
  {
    document.body.classList.add("dark");
    toggleBtn.textContent="☀️";
  }
  toggleBtn.addEventListener("click",() => {
    document.body.classList.toggle("dark");
    if(document.body.classList.contains("dark"))
    {
      localStorage.setItem("theme","dark");
      toggleBtn.textContent="☀️";
    }
    else
    {
      localStorage.setItem("theme","light");
      toggleBtn.textContent="🌙";
    }
  });
  // ➕ Add Task
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = input.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (!title) return;

    // Optional: if no priority selected
    if (!priority) {
      alert("Please select a priority");
      return;
    }

    addTask(title, priority, dueDate);

    renderTasks(currentFilter);

    // 🔄 Reset form
    input.value = "";
    dueDateInput.value = "";
    priorityInput.selectedIndex = 0; // reset dropdown
  });

  renderTasks(currentFilter);
});