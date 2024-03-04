import User from "../../types/User";
import { fetchGraphql } from "./httpConst";

async function loginGetUser(email: string, password: string) {
  let query = `query Login($email: String, $password: String) {
    login(email: $email, password: $password) {id name email role password}
  }`;

  let data = await fetchGraphql(query, { email: email, password: password });
  return data.login;
}

async function fetchUsers() {
  let query = `query GetUsers {
    getUsers{id name email role password}
  }`;

  let data = await fetchGraphql(query);
  return data.getUsers;
}

async function createUser(newUser: User) {
  let query = `mutation CreateUser($input: UserInput) {
    createUser(input: $input) {id name email role password}
  }`;

  let data = await fetchGraphql(query, {
    input: {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      password: newUser.password,
    },
  });
  return data.createUser;
}

async function updateUser(user: User) {
  let query = `mutation UpdateUser($input: UserInput) {
    updateUser(input: $input) {id name email role password}
  }`;

  let data = await fetchGraphql(query, {
    input: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    },
  });
  return data.updateUser;
}

async function deleteUser(userToDelete: User) {
  let query = `mutation DeleteUser($input: UserInput) {
    deleteUser(input: $input) {id name email role password}
  }`;

  let data = await fetchGraphql(query, {
    id: userToDelete.id,
  });
  return data.deleteUser;
}

async function replaceAllUsers(users: User[]) {
  let query = `mutation ReplaceAllUsers($input: [UserInput]!) {
    replaceAllUsers(input: $input)
  }`;

  let data = await fetchGraphql(query, {
    input: users,
  });
  return data.replaceAllUsers;
}

export {
  loginGetUser,
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  replaceAllUsers,
};
