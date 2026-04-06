import { getTasks, toggleTask, deleteTask, updateTask } from "./Tasks.js";
import { getHabits, addHabit, completedHabits } from "./Habit.js";

// ================= TASKS =================
export function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();

  // 📊 Stats
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const high = tasks.filter(t => t.priority === "High").length;

  document.getElementById("totalTasks").textContent = total;
  document.getElementById("completedTasks").textContent = completed;
  document.getElementById("pendingTasks").textContent = pending;
  document.getElementById("highTasks").textContent = high;

  // 🔥 Sorting
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  pendingTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  const sortedTasks = [...pendingTasks, ...completedTasks];

  let filteredTasks = sortedTasks;

  // 🔍 Filtering
  if (filter === "completed") {
    filteredTasks = sortedTasks.filter(t => t.completed);
  } else if (filter === "pending") {
    filteredTasks = sortedTasks.filter(t => !t.completed);
  } else if (["High", "Medium", "Low"].includes(filter)) {
    filteredTasks = sortedTasks.filter(t => t.priority === filter);
  }

  // 🧾 Empty state
  if (filteredTasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tasks found 🚀";
    li.style.textAlign = "center";
    li.style.opacity = "0.6";
    taskList.appendChild(li);
    return;
  }

  // 📋 Render Tasks
  filteredTasks.forEach(task => {
    const li = document.createElement("li");

    const left = document.createElement("div");
    left.classList.add("task-left");

    const right = document.createElement("div");
    right.classList.add("task-right");

    // ✔ Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", () => {
      toggleTask(task.id);
      renderTasks(filter);
    });

    // 📝 Title
    const span = document.createElement("span");
    span.textContent = task.title;

    if (task.priority === "High") span.style.color = "red";
    else if (task.priority === "Medium") span.style.color = "orange";
    else span.style.color = "green";

    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    // 📅 Date
    const date = document.createElement("div");
    if (task.dueDate) {
      date.textContent = "📅 " + task.dueDate;
      date.style.fontSize = "12px";
      date.style.color = "gray";
    }

    // 📅 Highlight logic
    const today = new Date().toISOString().split("T")[0];

    if (task.dueDate && !task.completed) {
      if (task.dueDate < today) li.classList.add("overdue");
      else if (task.dueDate === today) li.classList.add("today");
    }

    left.appendChild(checkbox);
    left.appendChild(span);
    left.appendChild(date);

    // ✏ Edit
    const editBtn = document.createElement("span");
    editBtn.textContent = "✏️";
    editBtn.style.cursor = "pointer";

    editBtn.addEventListener("click", () => {
      const popup = document.getElementById("editPopup");
      const titleInput = document.getElementById("editTitle");
      const priorityInput = document.getElementById("editPriority");
      const dateInput = document.getElementById("editDate");

      popup.classList.remove("hidden");

      titleInput.value = task.title;
      priorityInput.value = task.priority;
      dateInput.value = task.dueDate;

      const saveBtn = document.getElementById("saveEdit");
      const cancelBtn = document.getElementById("cancelEdit");

      saveBtn.onclick = () => {
        updateTask(task.id, {
          title: titleInput.value,
          priority: priorityInput.value,
          dueDate: dateInput.value
        });

        popup.classList.add("hidden");
        renderTasks(filter);
      };

      cancelBtn.onclick = () => {
        popup.classList.add("hidden");
      };
    });

    // ❌ Delete
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✖";
    deleteBtn.style.cursor = "pointer";

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

// ================= HABITS =================
export function renderHabits() {
  const list = document.getElementById("habitList");
  const habits = getHabits();

  list.innerHTML = "";

  habits.forEach(habit => {
    const li = document.createElement("li");
    li.classList.add("habit-card");

    li.innerHTML = `
      <div class="habit-left">
        <span class="habit-name">${habit.name}</span>
        <span class="habit-streak">🔥 ${habit.streak}</span>
      </div>
      <button class="habit-btn" type="button">✔</button>
    `;

    li.querySelector(".habit-btn").addEventListener("click", () => {
      completedHabits(habit.id); // ✅ FIXED
      renderHabits();
    });

    list.appendChild(li);
  });
}