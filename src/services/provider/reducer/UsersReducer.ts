import User from "../../../types/User";
import {
  IUserAction,
  UserActionType,
} from "../../../types/providers-types/UsersProviderTypes";
import { postUsers } from "../../http/usersHttp";

function usersReducer(users: User[], action: IUserAction): User[] {
  let newUsers: User[] = [];
  switch (action.type) {
    case UserActionType.ADD: {
      newUsers = [
        ...users,
        new User(
          action.user!.id,
          action.user!.name,
          action.user!.email,
          action.user!.role,
          action.user!.password
        ),
      ];
      break;
    }
    case UserActionType.EDIT: {
      newUsers = users.map((user: User) => {
        if (user.id === action.user!.id) {
          return new User(
            user.id,
            action.user!.name,
            action.user!.email,
            action.user!.role,
            action.user!.password
          );
        } else {
          return user;
        }
      });
      break;
    }
    case UserActionType.DELETE: {
      newUsers = users.filter((user: User) => user.id !== action.user!.id);
      break;
    }
    case UserActionType.INITIALVALUE: {
      return [...action.initialUsers!];
    }
    default: {
      throw new Error("Unknown action" + action.type);
    }
  }
  postUsers(newUsers);
  return newUsers;
}

export default usersReducer;
