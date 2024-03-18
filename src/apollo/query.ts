import { gql } from "@apollo/client";
import Task from "../types/Task";
import User from "../types/User";
import { print } from "graphql/language/printer";

//TASKS

const GET_USER_TASKS = (...fields: Array<keyof Task>) => {
  return print(
    gql`query GetUserTasks($userName: String) {
      getUserTasks(userName: $userName) {
        ${fields.join(" ")}
      }
    }`
  );
};

const GET_TASKS = (...fields: Array<keyof Task>) => {
  return print(
    gql`query GetTasks {
      getTasks{${fields.join(" ")}}
    }`
  );
};

//USERS

const LOGIN = (...fields: Array<keyof User>) => {
  return print(
    gql`query Login($email: String, $password: String) {
      login(email: $email, password: $password) {${fields.join(" ")}}
    }`
  );
};

const GET_USERS = (...fields: Array<keyof User>) => {
  return print(
    gql`query GetUsers {
      getUsers{${fields.join(" ")}}
    }`
  );
};

export { GET_USER_TASKS, GET_TASKS };
export { LOGIN, GET_USERS };
