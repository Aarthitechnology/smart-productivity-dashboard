# 🚀 Smart Productivity Dashboard

A modern, responsive, and cloud-powered productivity management application that helps users organize tasks, build habits, and analyze productivity through interactive dashboards.

The application uses Firebase Authentication for secure user login and Firebase Firestore for cloud-based data storage, ensuring user data is available across devices and sessions.

---

## ✨ Features

### 🔐 User Authentication

* Secure user registration and login
* Firebase Authentication integration
* Persistent user sessions
* Logout functionality

---

### 📋 Task Management

* Add new tasks
* Edit existing tasks
* Delete tasks
* Mark tasks as completed
* Set priority levels (High / Medium / Low)
* Due date tracking
* Overdue and today's task highlighting
* User-specific task storage

---

### 🔍 Smart Task Filtering

* View All Tasks
* View Completed Tasks
* View Pending Tasks
* Filter by Priority
* Automatic priority-based sorting

---

### 🔁 Habit Tracker

* Add daily habits
* Edit habits
* Delete habits
* Mark habits as completed
* Track habit streaks
* User-specific habit management

---

### 📊 Analytics Dashboard

* Task completion overview
* Pending vs Completed visualization
* Priority distribution analysis
* Interactive charts powered by Chart.js

---

### 🌙 Theme Support

* Light Mode
* Dark Mode
* Theme preference persistence

---

### 📱 Responsive Design

* Mobile Friendly
* Tablet Friendly
* Desktop Friendly
* Sidebar navigation with hamburger menu

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6 Modules)

### Backend & Cloud Services

* Firebase Authentication
* Firebase Firestore

### Data Visualization

* Chart.js

### Deployment

* GitHub Pages

---

## 🗄 Database Structure

### Tasks Collection

```json
{
  "title": "Learning Firebase",
  "priority": "High",
  "dueDate": "2026-06-30",
  "completed": false,
  "userId": "USER_UID"
}
```

### Habits Collection

```json
{
  "name": "Drink Water",
  "streak": 5,
  "lastCompleted": "2026-06-22",
  "userId": "USER_UID"
}
```

---

## 📈 Key Functionalities

### Task Module

* Create Task
* Read Tasks
* Update Task
* Delete Task
* Complete Task
* Filter Tasks

### Habit Module

* Create Habit
* Update Habit
* Delete Habit
* Habit Completion Tracking
* Streak Management

### Analytics Module

* Task Status Doughnut Chart
* Priority Distribution Bar Chart
* Dynamic Dashboard Statistics

---

## 🌐 Live Demo

https://aarthitechnology.github.io/smart-productivity-dashboard/

---

## 📚 Future Enhancements

* Task Categories
* Search Functionality
* Weekly Productivity Reports
* Goal Tracking
* Email Reminders
* Export Reports

---

## 👩‍💻 Author

**Aarthi S.**
B.E. Computer Science Engineering

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
