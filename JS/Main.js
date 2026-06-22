import { auth } from "./Firebase.js";
import { onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { addTask } from "./Tasks.js";
import { renderTasks } from "./UI.js";
import { renderCharts } from "./Stats.js";
import { renderHabits } from "./UI.js";
import { addHabit } from "./Habit.js";
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "Login.html";
        return;
    }

    await renderTasks();
    await renderHabits();
});
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

  const habitForm = document.getElementById("habitForm");
  const habitInput = document.getElementById("habitInput");

  habitForm.addEventListener("submit",async (e) => {
    e.preventDefault();
    const name = habitInput.value.trim();
    if(!name) return;
    await addHabit(name);
    await renderHabits();
    habitInput.value="";
  });
  let currentFilter = "all";

  // ☰ Sidebar open
  menuToggle.addEventListener("click", () => {
    sidebar.classList.add("open");
    overlay.classList.remove("hidden");
  });

  // ❌ Sidebar close
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.add("hidden");
  });

  function showSection(section) {
    tasksSection.classList.add("hidden");
    statsSection.classList.add("hidden");
    habitsSection.classList.add("hidden");

    section.classList.remove("hidden");

    navTasks.classList.remove("active");
    navStats.classList.remove("active");
    navHabits.classList.remove("active");
  }

  // 🧭 Navigation
  navTasks.addEventListener("click", () => {
    showSection(tasksSection);
    navTasks.classList.add("active");
    pageTitle.textContent = "Dashboard";
  });

  navStats.addEventListener("click", () => {
  showSection(statsSection);
  navStats.classList.add("active");
  pageTitle.textContent = "Analytics";

  setTimeout(async () => {
    await renderCharts();
  }, 300);
});

  navHabits.addEventListener("click", () => {
    showSection(habitsSection);
    navHabits.classList.add("active");
    pageTitle.textContent = "Habits";
    renderHabits();
  });

  // Auto close sidebar
  [navTasks, navStats, navHabits].forEach(nav => {
    nav.addEventListener("click", () => {
      sidebar.classList.remove("open");
      overlay.classList.add("hidden");
    });
  });

  // 🔍 Filters
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      currentFilter = button.dataset.filter;
      renderTasks(currentFilter);
    });
  });

  // 🌙 Theme
  const toggleBtn = document.getElementById("themeToggle");

  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    toggleBtn.textContent = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    toggleBtn.textContent = "🌙";
  }

  // ✅ IMPORTANT FIX
  renderCharts();
});

  // ➕ Add Task
  form.addEventListener("submit",  async function (e) {
    e.preventDefault();

    const title = input.value.trim();
    const priority = priorityInput.value;
    const dueDate = dueDateInput.value;

    if (!title) return;

    if (!priority) {
      alert("Please select a priority");
      return;
    }

    await addTask(title, priority, dueDate);
    await renderTasks(currentFilter);

    input.value = "";
    dueDateInput.value = "";
    priorityInput.selectedIndex = 0;
  });
});
const logoutBtn = document.getElementById("logoutBtn");
if(logoutBtn)
{
  logoutBtn.addEventListener("click",async () => {
    await signOut(auth);
    window.location.href = "Login.html";
  });
}