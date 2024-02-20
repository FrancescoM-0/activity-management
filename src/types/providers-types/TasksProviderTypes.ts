import { Dispatch } from "react";
import Task from "../Task";

enum TaskActionType {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
  INITIALVALUE = "initialValue",
}

interface ITaskAction {
  type: TaskActionType;
  task?: Task;
  initalTasks?: Task[];
}

interface ITaskContext {
  tasks: Task[];
  dispatch: Dispatch<ITaskAction>;
}

export { TaskActionType };
export type { ITaskAction, ITaskContext };
