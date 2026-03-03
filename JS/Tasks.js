let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
export function addTask(title,priority)
{
    const newTask = {
        id: Date.now(),
        title,
        priority,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
}
export function getTasks()
{
    return tasks;
}
function saveTasks()
{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
export function toggleTask(id)
{
    tasks = tasks.map(task=>
        task.id===id ? {...task,completed: !task.completed} : task
    );
    saveTasks();
}
export function deleteTask(id)
{
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
}