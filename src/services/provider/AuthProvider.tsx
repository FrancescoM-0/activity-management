import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { readCacheUser } from "../auth/cacheAuth";
import { useNavigate } from "react-router-dom";
import {
  AuthActionType,
  IAuthContext,
  IAuthUserState,
} from "../../types/providers-types/AuthProviderTypes";
import authReducer from "./reducer/AuthReducer";

const initialUser: IAuthUserState = null;

const AuthContext = createContext<IAuthContext>({
  user: initialUser,
  dispatch: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, dispatch] = useReducer(authReducer, initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    let cacheUser = readCacheUser();

    if (cacheUser !== null) {
      dispatch({
        type: AuthActionType.LOGIN,
        user: cacheUser,
      });
      navigate("/");
    }
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): IAuthContext {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("useAuth must be used within a Provider");
  }
  return auth;
}

export { AuthProvider, useAuth };
