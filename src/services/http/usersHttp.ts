import User from "../../types/User";
import { fetchGraphql } from "./httpConst";

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
  let query = `mutation UpdateUser($id: ID!, $input: UserInput) {
    updateUser(id: $id, input: $input) {id name email role password}
  }`;

  let data = await fetchGraphql(query, {
    id: user.id,
    input: {
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    },
  });
  return data.updateUser;
}

async function deleteUser(userToDelete: User) {
  let query = `mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {id name email role password}
  }`;

  let data = await fetchGraphql(query, {
    id: userToDelete.id,
  });
  return data.deleteUser;
}

async function setUsers(users: User[]) {
  let query = `mutation SetUsers($input: [SetUserInput]!) {
    setUsers(input: $input)
  }`;

  let data = await fetchGraphql(query, {
    input: users,
  });
  return data.setUsers;
}

export { fetchUsers, createUser, updateUser, deleteUser, setUsers };
