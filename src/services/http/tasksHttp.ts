import Task from "../../types/Task";
import { addressTasks } from "./httpConst";

async function fetchTasks() {
  const res = await fetch(addressTasks);
  const jsonTasks = await res.json();
  let tasks = jsonTasks.map((task: Task) => {
    return new Task(
      task.id,
      task.title,
      task.description,
      task.status,
      task.assignedTo,
      task.dueDate
    );
  });
  return tasks;
}

function postTasks(newTasks: Task[]): void {
  fetch(addressTasks, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTasks),
  });
}

export { fetchTasks, postTasks };
