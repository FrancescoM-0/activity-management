import { Dispatch } from "react";
import {
  IUserAction,
  UserActionType,
} from "../../types/providers-types/UsersProviderTypes";
import User from "../../types/User";
import { addressUsers } from "./httpConst";

function fetchUsers(dispatch: Dispatch<IUserAction>) {
  fetch(addressUsers)
    .then((res) => {
      return res.json();
    })
    .then((jsonUsers: User[]) => {
      let u = jsonUsers.map((user: User) => {
        return new User(
          user.id,
          user.name,
          user.email,
          user.role,
          user.password
        );
      });
      dispatch({
        type: UserActionType.INITIALVALUE,
        initialUsers: u,
      });
    });
}

function postUsers(newUsers: User[]): void {
  fetch(addressUsers, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUsers),
  });
}

export { fetchUsers, postUsers };
