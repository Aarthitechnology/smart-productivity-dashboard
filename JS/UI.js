import { getTasks, toggleTask, deleteTask, updateTask } from "./Tasks.js";
import { getHabits, completedHabits, deleteHabit, updateHabit } from "./Habit.js";

// ================= TASKS =================
export async function renderTasks(filter = "all", searchTerm = "") {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  const tasks = await getTasks();

  // 📊 Stats
  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("completedTasks").textContent =
    tasks.filter(t => t.completed).length;
  document.getElementById("pendingTasks").textContent =
    tasks.filter(t => !t.completed).length;
  document.getElementById("highTasks").textContent =
    tasks.filter(t => t.priority === "High").length;

  const priorityOrder = {
    High: 1,
    Medium: 2,
    Low: 3
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  // Sort pending tasks by priority
  pendingTasks.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );

  let sortedTasks = [...pendingTasks, ...completedTasks];

  // 🔍 Filter by status / priority
  if (filter === "completed") {
    sortedTasks = sortedTasks.filter(t => t.completed);
  } 
  else if (filter === "pending") {
    sortedTasks = sortedTasks.filter(t => !t.completed);
  } 
  else if (["High", "Medium", "Low"].includes(filter)) {
    sortedTasks = sortedTasks.filter(t => t.priority === filter);
  }

  // 🔎 Search tasks
  if (searchTerm) {
    sortedTasks = sortedTasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Empty result
  if (sortedTasks.length === 0) {
    taskList.innerHTML =
      "<li style='text-align:center;opacity:0.6'>No tasks 🚀</li>";
    return;
  }

  // ================= DISPLAY TASKS =================

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

    checkbox.addEventListener("change", async () => {
      await toggleTask(task.id, task.completed);
      await renderTasks(filter, searchTerm);
    });

    // 📝 Task Title
    const span = document.createElement("span");
    span.textContent = task.title;

    // Priority color
    if (task.priority === "High") {
      span.style.color = "red";
    } 
    else if (task.priority === "Medium") {
      span.style.color = "orange";
    } 
    else {
      span.style.color = "green";
    }

    // Completed task style
    if (task.completed) {
      span.style.textDecoration = "line-through";
      span.style.opacity = "0.6";
    }

    // 📅 Due Date
    const date = document.createElement("div");

    if (task.dueDate) {
      date.textContent = "📅 " + task.dueDate;
      date.style.fontSize = "12px";
      date.style.color = "gray";
    }

    // 📅 Today's date
    const today = new Date().toISOString().split("T")[0];

    // 🚨 Overdue / Today
    if (task.dueDate && !task.completed) {
      if (task.dueDate < today) {
        li.classList.add("overdue");
      } 
      else if (task.dueDate === today) {
        li.classList.add("today");
      }
    }

    left.appendChild(checkbox);
    left.appendChild(span);
    left.appendChild(date);

    // ================= EDIT TASK =================

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

      // Save edited task
      document.getElementById("saveEdit").onclick = async () => {

        const updatedTitle = titleInput.value.trim();

        if (!updatedTitle) {
          return;
        }

        await updateTask(task.id, {
          title: updatedTitle,
          priority: priorityInput.value,
          dueDate: dateInput.value
        });

        popup.classList.add("hidden");

        // Keep current search and filter
        await renderTasks(filter, searchTerm);
      };

      // Cancel edit
      document.getElementById("cancelEdit").onclick = () => {
        popup.classList.add("hidden");
      };
    });

    // ================= DELETE TASK =================

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✖";

    deleteBtn.addEventListener("click", async () => {

      await deleteTask(task.id);

      // Keep current search and filter
      await renderTasks(filter, searchTerm);
    });

    right.appendChild(editBtn);
    right.appendChild(deleteBtn);

    li.appendChild(left);
    li.appendChild(right);

    taskList.appendChild(li);
  });
}


// ================= HABITS =================

export async function renderHabits() {

  const list = document.getElementById("habitList");

  const habits = await getHabits();

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

    // ✔ COMPLETE HABIT
    li.querySelector(".habit-btn").addEventListener(
      "click",
      async () => {

        await completedHabits(
          habit.id,
          habit.streak,
          habit.lastCompleted
        );

        await renderHabits();
      }
    );

    // ✏ EDIT HABIT
    li.querySelector(".edit-btn").addEventListener(
      "click",
      () => {

        const popup =
          document.getElementById("habitEditPopup");

        const input =
          document.getElementById("editHabitName");

        popup.classList.remove("hidden");

        input.value = habit.name;

        // Save habit
        document.getElementById("saveHabitEdit").onclick =
          async () => {

            const newName = input.value.trim();

            if (newName !== "") {

              await updateHabit(
                habit.id,
                newName
              );

              popup.classList.add("hidden");

              await renderHabits();
            }
          };

        // Cancel
        document.getElementById("cancelHabitEdit").onclick =
          () => {

            popup.classList.add("hidden");

          };
      }
    );

    // ❌ DELETE HABIT
    li.querySelector(".delete-btn").addEventListener(
      "click",
      async () => {

        await deleteHabit(habit.id);

        await renderHabits();
      }
    );

    list.appendChild(li);
  });
}