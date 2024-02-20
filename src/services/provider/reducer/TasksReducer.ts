import Task from "../../../types/Task";
import {
  ITaskAction,
  TaskActionType,
} from "../../../types/providers-types/TasksProviderTypes";
import { postTasks } from "../../http/tasksHttp";

function tasksReducer(tasks: Task[], action: ITaskAction): Task[] {
  let newTasks: Task[] = [];
  switch (action.type) {
    case TaskActionType.ADD: {
      newTasks = [
        ...tasks,
        new Task(
          action.task!.id,
          action.task!.title,
          action.task!.description,
          action.task!.status,
          action.task!.assignedTo,
          action.task!.dueDate
        ),
      ];
      break;
    }
    case TaskActionType.EDIT: {
      newTasks = tasks.map((task: Task) => {
        if (task.id === action.task!.id) {
          return new Task(
            task.id,
            action.task!.title,
            action.task!.description,
            action.task!.status,
            action.task!.assignedTo,
            action.task!.dueDate
          );
        } else {
          return task;
        }
      });
      break;
    }
    case TaskActionType.DELETE: {
      newTasks = tasks.filter((task: Task) => task.id !== action.task!.id);
      break;
    }
    case TaskActionType.INITIALVALUE: {
      return [...action.initalTasks!];
    }
    default: {
      throw new Error("Unknown action" + action.type);
    }
  }
  postTasks(newTasks);
  return newTasks;
}

export default tasksReducer;
