import User from "../../../types/User";
import {
  AuthActionType,
  IAuthAction,
  IAuthUserState,
} from "../../../types/providers-types/AuthProviderTypes";
import { writeCacheUser } from "../../auth/cacheAuth";

function authReducer(
  _user: IAuthUserState,
  action: IAuthAction
): IAuthUserState {
  switch (action.type) {
    case AuthActionType.LOGIN: {
      writeCacheUser(action.user!);
      return new User(
        action.user!.id,
        action.user!.name,
        action.user!.email,
        action.user!.role,
        action.user!.password
      );
    }
    case AuthActionType.LOGOUT: {
      writeCacheUser(null);
      return null;
    }
    default: {
      throw new Error("Unknown action" + action.type);
    }
  }
}

export default authReducer;
