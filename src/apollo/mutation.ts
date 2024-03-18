import { gql } from "@apollo/client";
import Task from "../types/Task";
import User from "../types/User";
import { print } from "graphql/language/printer";

//TASKS

const CREATE_TASK = (...fields: Array<keyof Task>) => {
  return print(
    gql`mutation CreateTask($input: TaskInput) {
        createTask(input: $input) {${fields.join(" ")}}
    }`
  );
};

const UPDATE_TASK = print(
  gql`
    mutation UpdateTask($input: TaskInput) {
      updateTask(input: $input)
    }
  `
);

const DELETE_TASK = print(
  gql`
    mutation DeleteTask($input: TaskInput) {
      deleteTask(input: $input)
    }
  `
);

const REPLACE_ALL_TASKS = print(
  gql`
    mutation ReplaceAllTasks($input: [TaskInput]!) {
      replaceAllTasks(input: $input)
    }
  `
);

//USERS

const CREATE_USER = (...fields: Array<keyof User>) => {
  return print(
    gql`mutation CreateUser($input: UserInput) {
        createUser(input: $input) {${fields.join(" ")}}
    }`
  );
};

const UPDATE_USER = print(
  gql`
    mutation UpdateUser($input: UserInput) {
      updateUser(input: $input)
    }
  `
);

const DELETE_USER = print(
  gql`
    mutation DeleteUser($input: UserInput) {
      deleteUser(input: $input)
    }
  `
);

const REPLACE_ALL_USERS = print(
  gql`
    mutation ReplaceAllUsers($input: [UserInput]!) {
      replaceAllUsers(input: $input)
    }
  `
);

export { CREATE_TASK, UPDATE_TASK, DELETE_TASK, REPLACE_ALL_TASKS };
export { CREATE_USER, UPDATE_USER, DELETE_USER, REPLACE_ALL_USERS };
