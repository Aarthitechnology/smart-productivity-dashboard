let tasks = []
export function addTask(title)
{
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    };
    tasks.push(newTask);
}
export function getTasks()
{
    return tasks;
}