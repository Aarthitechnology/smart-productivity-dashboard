import { getTasks, toggleTask, deleteTask, updateTask } from "./Tasks.js";
import { getHabits, completedHabits, deleteHabit, updateHabit } from "./Habit.js";

// ================= TASKS =================
export function renderTasks(filter = "all") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = getTasks();

  // 📊 Stats
  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("completedTasks").textContent = tasks.filter(t => t.completed).length;
  document.getElementById("pendingTasks").textContent = tasks.filter(t => !t.completed).length;
  document.getElementById("highTasks").textContent = tasks.filter(t => t.priority === "High").length;

  const priorityOrder = { High: 1, Medium: 2, Low: 3 };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  pendingTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  let sortedTasks = [...pendingTasks, ...completedTasks];

  // 🔍 Filtering
  if (filter === "completed") sortedTasks = sortedTasks.filter(t => t.completed);
  else if (filter === "pending") sortedTasks = sortedTasks.filter(t => !t.completed);
  else if (["High", "Medium", "Low"].includes(filter)) {
    sortedTasks = sortedTasks.filter(t => t.priority === filter);
  }

  // Empty
  if (sortedTasks.length === 0) {
    taskList.innerHTML = "<li style='text-align:center;opacity:0.6'>No tasks 🚀</li>";
    return;
  }

  sortedTasks.forEach(task => {
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

    const today = new Date().toISOString().split("T")[0];

    if (task.dueDate && !task.completed) {
      if (task.dueDate < today) li.classList.add("overdue");
      else if (task.dueDate === today) li.classList.add("today");
    }

    left.appendChild(checkbox);
    left.appendChild(span);
    left.appendChild(date);

    // ✏ Edit Task Popup
    const editBtn = document.createElement("span");
    editBtn.textContent = "✏️";

    editBtn.addEventListener("click", () => {
      const popup = document.getElementById("editPopup");
      const titleInput = document.getElementById("editTitle");
      const priorityInput = document.getElementById("editPriority");
      const dateInput = document.getElementById("editDate");

      popup.classList.remove("hidden");

      titleInput.value = task.title;
      priorityInput.value = task.priority;
      dateInput.value = task.dueDate;

      document.getElementById("saveEdit").onclick = () => {
        updateTask(task.id, {
          title: titleInput.value,
          priority: priorityInput.value,
          dueDate: dateInput.value
        });

        popup.classList.add("hidden");
        renderTasks(filter);
      };

      document.getElementById("cancelEdit").onclick = () => {
        popup.classList.add("hidden");
      };
    });

    // ❌ Delete
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✖";

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
      <div class="habit-actions">
        <button class="habit-btn">✔</button>
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">✖</button>
      </div>
    `;

    // ✔ COMPLETE
    li.querySelector(".habit-btn").addEventListener("click", () => {
      completedHabits(habit.id);
      renderHabits();
    });

    // ✏ EDIT (POPUP FIX)
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const popup = document.getElementById("habitEditPopup");
      const input = document.getElementById("editHabitName");

      popup.classList.remove("hidden");
      input.value = habit.name;

      document.getElementById("saveHabitEdit").onclick = () => {
        const newName = input.value.trim();

        if (newName !== "") {
          updateHabit(habit.id, newName);
          popup.classList.add("hidden");
          renderHabits();
        }
      };

      document.getElementById("cancelHabitEdit").onclick = () => {
        popup.classList.add("hidden");
      };
    });

    // ❌ DELETE
    li.querySelector(".delete-btn").addEventListener("click", () => {
      deleteHabit(habit.id);
      renderHabits();
    });

    list.appendChild(li);
  });
}