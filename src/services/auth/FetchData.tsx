import { ReactNode } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAuthUser } from "../../redux/hooks";
import { fetchInitialUsers } from "../../redux/reducers/usersSlice";
import { fetchInitialTasks } from "../../redux/reducers/tasksSlice";

interface FetchDataProps {
  children: ReactNode;
}

function FetchData({ children }: FetchDataProps) {
  const dispatch = useAppDispatch();
  const authUser = useAuthUser();

  useEffect(() => {
    dispatch(fetchInitialTasks());
    dispatch(fetchInitialUsers());
  }, [authUser, dispatch]);

  return <>{children}</>;
}

export default FetchData;
