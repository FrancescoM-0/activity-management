import {
  CREATE_USER,
  DELETE_USER,
  REPLACE_ALL_USERS,
  UPDATE_USER,
} from "../../apollo/mutation";
import { GET_USERS, LOGIN } from "../../apollo/query";
import User from "../../types/User";
import { fetchGraphql } from "./httpConst";

async function loginGetUser(
  email: string,
  password: string,
  ...fields: Array<keyof User>
) {
  let data = await fetchGraphql(LOGIN(...fields), {
    email: email,
    password: password,
  });
  return data.login;
}

async function fetchUsers(...fields: Array<keyof User>) {
  let data = await fetchGraphql(GET_USERS(...fields), {});
  return data.getUsers;
}

async function createUser(newUser: User, ...fields: Array<keyof User>) {
  let data = await fetchGraphql(CREATE_USER(...fields), {
    input: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      password: newUser.password,
    },
  });
  return data.createUser;
}

async function updateUser(user: User) {
  let data = await fetchGraphql(UPDATE_USER, {
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
  let data = await fetchGraphql(DELETE_USER, {
    id: userToDelete.id,
  });
  return data.deleteUser;
}

async function replaceAllUsers(users: User[]) {
  let data = await fetchGraphql(REPLACE_ALL_USERS, {
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
