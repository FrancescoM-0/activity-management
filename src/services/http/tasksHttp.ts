import { Dispatch } from "react";
import Task from "../../types/Task";
import {
  ITaskAction,
  TaskActionType,
} from "../../types/providers-types/TasksProviderTypes";
import { addressTasks } from "./httpConst";

function fetchTasks(dispatch: Dispatch<ITaskAction>) {
  fetch(addressTasks)
    .then((res) => {
      return res.json();
    })
    .then((jsonTasks: Task[]) => {
      let t = jsonTasks.map((task: Task) => {
        return new Task(
          task.id,
          task.title,
          task.description,
          task.status,
          task.assignedTo,
          task.dueDate
        );
      });
      dispatch({
        type: TaskActionType.INITIALVALUE,
        initalTasks: t,
      });
    });
}

function postTasks(newTasks: Task[]): void {
  fetch(addressTasks, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTasks),
  });
}

export { fetchTasks, postTasks };
