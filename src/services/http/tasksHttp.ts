import Task from "../../types/Task";
import { fetchGraphql } from "./httpConst";

async function fetchUserTasks(userName: string) {
  let query = `query GetUserTasks($userName: String) {
    getUserTasks(userName: $userName) {
      id title description status assignedTo dueDate
    }
  }`;

  let data = await fetchGraphql(query, { userName: userName });
  return data.getUserTasks;
}

async function fetchTasks() {
  let query = `query GetTasks {
    getTasks{id title description status assignedTo dueDate}
  }`;

  let data = await fetchGraphql(query);
  return data.getTasks;
}

async function createTask(newTask: Task) {
  let query = `mutation CreateTask($input: TaskInput) {
    createTask(input: $input) {id title description status assignedTo dueDate}
  }`;

  let data = await fetchGraphql(query, {
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
  let query = `mutation UpdateTask($id: ID!, $input: TaskInput) {
    updateTask(id: $id, input: $input) {id title description status assignedTo dueDate}
  }`;

  let data = await fetchGraphql(query, {
    id: task.id,
    input: {
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
  let query = `mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {id title description status assignedTo dueDate}
  }`;

  let data = await fetchGraphql(query, {
    id: taskToDelete.id,
  });
  return data.deleteTask;
}

async function setTasks(tasks: Task[]) {
  let query = `mutation SetTasks($input: [SetTaskInput]!) {
    setTasks(input: $input)
  }`;

  let data = await fetchGraphql(query, {
    input: tasks,
  });
  return data.setTasks;
}

export {
  fetchUserTasks,
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  setTasks,
};
