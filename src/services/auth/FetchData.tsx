import { ReactNode } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAuthUser } from "../../redux/hooks";
import { fetchInitialUsers } from "../../redux/reducers/usersSlice";
import { fetchInitialTasks } from "../../redux/reducers/tasksSlice";
import { Paths } from "../Paths";

interface FetchDataProps {
  children: ReactNode;
}

function FetchData({ children }: FetchDataProps) {
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();

  useEffect(() => {
    if (authUser !== null) {
      let name = authUser.name;

      for (let index in Paths.taskManager.role) {
        if (authUser.role.localeCompare(Paths.taskManager.role[index]) === 0) {
          name = "";
          break;
        }
      }

      for (let index in Paths.addUser.role) {
        if (authUser.role.localeCompare(Paths.addUser.role[index]) === 0) {
          dispatch(fetchInitialUsers());
          break;
        }
      }

      dispatch(fetchInitialTasks(name));
    }
  }, [authUser, dispatch]);

  return <>{children}</>;
}

export default FetchData;
