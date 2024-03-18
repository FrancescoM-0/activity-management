import {
  CREATE_TASK,
  DELETE_TASK,
  REPLACE_ALL_TASKS,
  UPDATE_TASK,
} from "../../apollo/mutation";
import { GET_TASKS, GET_USER_TASKS } from "../../apollo/query";
import Task from "../../types/Task";
import { fetchGraphql } from "./httpConst";

async function fetchUserTasks(userName: string, ...fields: Array<keyof Task>) {
  let data = await fetchGraphql(GET_USER_TASKS(...fields), {
    userName: userName,
  });
  return data.getUserTasks;
}

async function fetchTasks(...fields: Array<keyof Task>) {
  let data = await fetchGraphql(GET_TASKS(...fields), {});
  return data.getTasks;
}

async function createTask(newTask: Task, ...fields: Array<keyof Task>) {
  let data = await fetchGraphql(CREATE_TASK(...fields), {
    input: {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status,
      assignedTo: newTask.assignedTo,
      dueDate: newTask.dueDate,
    },
  });
  return data.createTask;
}

async function updateTask(task: Task) {
  let data = await fetchGraphql(UPDATE_TASK, {
    input: {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      assignedTo: task.assignedTo,
      dueDate: task.dueDate,
    },
  });
  return data.updateTask;
}

async function deleteTask(taskToDelete: Task) {
  let data = await fetchGraphql(DELETE_TASK, {
    id: taskToDelete.id,
  });
  return data.deleteTask;
}

async function replaceAllTasks(tasks: Task[]) {
  let data = await fetchGraphql(REPLACE_ALL_TASKS, {
    input: tasks,
  });
  return data.replaceAllTasks;
}

export {
  fetchUserTasks,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  replaceAllTasks,
};
