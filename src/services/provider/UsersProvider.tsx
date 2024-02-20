import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import User from "../../types/User";
import { IUserContext } from "../../types/providers-types/UsersProviderTypes";
import usersReducer from "./reducer/UsersReducer";
import { fetchUsers } from "../http/usersHttp";

const UsersContext = createContext<IUserContext>({
  users: [],
  dispatch: () => {},
});

const initialUsers: User[] = [];

interface UsersProviderProps {
  children: ReactNode;
}

function UsersProvider({ children }: UsersProviderProps) {
  const [users, dispatch] = useReducer(usersReducer, initialUsers);

  useEffect(() => {
    fetchUsers(dispatch);
  }, []);

  return (
    <UsersContext.Provider value={{ users, dispatch }}>
      {children}
    </UsersContext.Provider>
  );
}

function useUsers(): IUserContext {
  const users = useContext(UsersContext);
  if (!users) {
    throw new Error("useUsers must be used within a Provider");
  }
  return users;
}

export { UsersProvider, useUsers };
