import { Dispatch } from "react";
import User from "../User";

type IAuthUserState = User | null;

enum AuthActionType {
  LOGIN = "login",
  LOGOUT = "logout",
}

interface IAuthAction {
  type: AuthActionType;
  user?: IAuthUserState;
}

interface IAuthContext {
  user: IAuthUserState;
  dispatch: Dispatch<IAuthAction>;
}

export { AuthActionType };
export type { IAuthUserState, IAuthAction, IAuthContext };
