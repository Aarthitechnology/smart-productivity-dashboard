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

  // Destroy previous charts
  if (taskChartInstance) taskChartInstance.destroy();
  if (priorityChartInstance) priorityChartInstance.destroy();

  const textColor = document.body.classList.contains("dark") ? "#fff" : "#000";

  // 🔵 Doughnut Chart
  taskChartInstance = new Chart(taskCtx, {
    type: "doughnut",
    data: {
      labels: ["Completed", "Pending"],
      datasets: [{
        data: [completed, pending],
        backgroundColor: ["#22c55e", "#ef4444"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      plugins: {
        legend: { labels: { color: textColor } }
      }
    }
  });

  // 🔵 Priority Chart
  priorityChartInstance = new Chart(priorityCtx, {
    type: "bar",
    data: {
      labels: ["High", "Medium", "Low"],
      datasets: [{
        label: "Tasks",
        data: [high, medium, low],
        backgroundColor: ["#ef4444", "#f59e0b", "#22c55e"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: textColor } }
      },
      scales: {
        x: { ticks: { color: textColor } },
        y: { ticks: { color: textColor } }
      }
    }
  });

}