import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { selectUsers } from "./reducers/usersSlice";
import { selectTasks } from "./reducers/tasksSlice";
import User from "../types/User";
import Task from "../types/Task";
import { selectAuthUser } from "./reducers/authSlice";

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

const useUsers = (): User[] => {
  return useAppSelector(selectUsers);
};

const useTasks = (): Task[] => {
  return useAppSelector(selectTasks);
};

const useAuthUser = (): User | null => {
  return useAppSelector(selectAuthUser);
};

export { useAppDispatch, useAppSelector };
export { useUsers, useTasks, useAuthUser };
