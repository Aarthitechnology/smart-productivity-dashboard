import { getTasks } from "./Tasks.js";

let taskChartInstance;
let priorityChartInstance;

export function renderCharts() {
  const tasks = getTasks();

  const taskCtx = document.getElementById("taskChart");
  const priorityCtx = document.getElementById("priorityChart");

  if (!taskCtx || !priorityCtx) return;

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;

  const high = tasks.filter(t => t.priority === "High").length;
  const medium = tasks.filter(t => t.priority === "Medium").length;
  const low = tasks.filter(t => t.priority === "Low").length;

  // 🔄 Destroy previous charts
  if (taskChartInstance) taskChartInstance.destroy();
  if (priorityChartInstance) priorityChartInstance.destroy();

  const isDark = document.body.classList.contains("dark");

  // ✅ FIXED COLORS (important)
  const textColor = isDark ? "#e5e7eb" : "#111827"; // 🔥 FIX
  const gridColor = isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.1)"; // 🔥 FIX

  // 🔵 1. Task Status
  taskChartInstance = new Chart(taskCtx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Pending"],
      datasets: [{
        data: [completed, pending],
        backgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          labels: {
            color: textColor,
            font: { size: 12 }
          }
        }
      }
    }
  });

  // 🔵 2. Priority Distribution
  priorityChartInstance = new Chart(priorityCtx, {
    type: "bar",
    data: {
      labels: ["High", "Medium", "Low"],
      datasets: [{
        data: [high, medium, low],
        backgroundColor: ["#f87171", "#fbbf24", "#4ade80"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      layout: {
        padding: {
          bottom: 10
        }
      },

      plugins: {
        legend: {
          display: false
        }
      },

      scales: {
        x: {
          ticks: {
            color: textColor,
            padding: 10
          },
          grid: {
            color: gridColor
          }
        },
        y: {
          ticks: {
            color: textColor,
            padding: 5
          },
          grid: {
            color: gridColor
          }
        }
      }
    }
  });
}