import { auth } from "./Firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { addTask } from "./Tasks.js";
import { renderTasks, renderHabits } from "./UI.js";
import { renderCharts } from "./Stats.js";
import { addHabit } from "./Habit.js";


// ================= AUTHENTICATION =================

onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "Login.html";
    return;
  }

  await renderTasks();
  await renderHabits();

});


// ================= DOM CONTENT =================

document.addEventListener("DOMContentLoaded", function () {

  // ================= TASK ELEMENTS =================

  const form = document.getElementById("taskForm");
  const input = document.getElementById("taskInput");
  const priorityInput = document.getElementById("priorityInput");
  const dueDateInput = document.getElementById("dueDate");

  // 🔍 Filter buttons
  const filterButtons = document.querySelectorAll("#filters button");

  // 🔎 Search input
  const searchInput = document.getElementById("searchInput");


  // ================= NAVIGATION =================

  const navTasks = document.getElementById("navTasks");
  const navStats = document.getElementById("navStats");
  const navHabits = document.getElementById("navHabits");

  const tasksSection = document.getElementById("tasksSection");
  const statsSection = document.getElementById("statsSection");
  const habitsSection = document.getElementById("habitsSection");


  // ================= SIDEBAR =================

  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("overlay");

  const pageTitle = document.getElementById("pageTitle");


  // ================= HABITS =================

  const habitForm = document.getElementById("habitForm");
  const habitInput = document.getElementById("habitInput");


  // ================= CURRENT FILTER & SEARCH =================

  let currentFilter = "all";
  let currentSearch = "";


  // ================= ADD HABIT =================

  habitForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = habitInput.value.trim();

    if (!name) {
      return;
    }

    await addHabit(name);

    await renderHabits();

    habitInput.value = "";

  });


  // ================= SIDEBAR OPEN =================

  menuToggle.addEventListener("click", () => {

    sidebar.classList.add("open");

    overlay.classList.remove("hidden");

  });


  // ================= SIDEBAR CLOSE =================

  overlay.addEventListener("click", () => {

    sidebar.classList.remove("open");

    overlay.classList.add("hidden");

  });


  // ================= SHOW SECTION =================

  function showSection(section) {

    tasksSection.classList.add("hidden");

    statsSection.classList.add("hidden");

    habitsSection.classList.add("hidden");


    section.classList.remove("hidden");


    navTasks.classList.remove("active");

    navStats.classList.remove("active");

    navHabits.classList.remove("active");

  }


  // ================= TASK NAVIGATION =================

  navTasks.addEventListener("click", () => {

    showSection(tasksSection);

    navTasks.classList.add("active");

    pageTitle.textContent = "Dashboard";

  });


  // ================= STATS NAVIGATION =================

  navStats.addEventListener("click", () => {

    showSection(statsSection);

    navStats.classList.add("active");

    pageTitle.textContent = "Analytics";


    setTimeout(async () => {

      await renderCharts();

    }, 300);

  });


  // ================= HABITS NAVIGATION =================

  navHabits.addEventListener("click", async () => {

    showSection(habitsSection);

    navHabits.classList.add("active");

    pageTitle.textContent = "Habits";

    await renderHabits();

  });


  // ================= AUTO CLOSE SIDEBAR =================

  [navTasks, navStats, navHabits].forEach(nav => {

    nav.addEventListener("click", () => {

      sidebar.classList.remove("open");

      overlay.classList.add("hidden");

    });

  });


  // ================= FILTER TASKS =================

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      // Remove active from all buttons
      filterButtons.forEach(btn => {
        btn.classList.remove("active");
      });


      // Add active to clicked button
      button.classList.add("active");


      // Get selected filter
      currentFilter = button.dataset.filter;


      // Render with current search
      renderTasks(
        currentFilter,
        currentSearch
      );

    });

  });


  // ================= SEARCH TASKS =================

  if (searchInput) {

    searchInput.addEventListener("input", () => {

      currentSearch = searchInput.value.trim();


      // Render with current filter
      renderTasks(
        currentFilter,
        currentSearch
      );

    });

  }


  // ================= THEME =================

  const toggleBtn = document.getElementById("themeToggle");


  // Load saved theme
  if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    toggleBtn.textContent = "☀️";

  }


  // Toggle theme
  toggleBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");


    if (document.body.classList.contains("dark")) {

      localStorage.setItem("theme", "dark");

      toggleBtn.textContent = "☀️";

    } 
    else {

      localStorage.setItem("theme", "light");

      toggleBtn.textContent = "🌙";

    }


    // Refresh charts for theme colors
    renderCharts();

  });


  // ================= ADD TASK =================

  form.addEventListener("submit", async function (e) {

    e.preventDefault();


    const title = input.value.trim();

    const priority = priorityInput.value;

    const dueDate = dueDateInput.value;


    // Check task title
    if (!title) {

      return;

    }


    // Check priority
    if (!priority) {

      alert("Please select a priority");

      return;

    }


    // Add task to Firebase
    await addTask(
      title,
      priority,
      dueDate
    );


    // Refresh tasks
    // Keep current filter AND search
    await renderTasks(
      currentFilter,
      currentSearch
    );


    // Clear form
    input.value = "";

    dueDateInput.value = "";

    priorityInput.selectedIndex = 0;

  });

});


// ================= LOGOUT =================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "Login.html";

  });

}