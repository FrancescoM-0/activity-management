import { Dispatch } from "react";
import User from "../User";

enum UserActionType {
  ADD = "add",
  EDIT = "edit",
  DELETE = "delete",
  INITIALVALUE = "initialValue",
}

interface IUserAction {
  type: UserActionType;
  user?: User;
  initialUsers?: User[];
}

interface IUserContext {
  users: User[];
  dispatch: Dispatch<IUserAction>;
}

export { UserActionType };
export type { IUserAction, IUserContext };
