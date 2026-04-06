let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

// ➕ Add Habit
export function addHabit(name) {
  habits.push({
    id: Date.now(),
    name,
    streak: 0,
    lastCompleted: null
  });
  saveHabits();
}

// 📥 Get Habits
export function getHabits() {
  return habits;
}

// ✔ Complete Habit (STREAK LOGIC)
export function completedHabits(id) {
  const today = new Date().toISOString().split("T")[0];

  habits = habits.map(habit => {
    if (habit.id === id) {
      // ✅ If not completed today → increase streak
      if (habit.lastCompleted !== today) {
        habit.streak += 1;
        habit.lastCompleted = today;
      }
    }
    return habit;
  });

  saveHabits();
}