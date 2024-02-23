import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { selectUsers } from "./reducers/usersSlice";
import User from "../types/User";
import { selectTasks } from "./reducers/tasksSlice";
import Task from "../types/Task";

//TODO hooks per users e tasks

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

/*const useUsers = () => {
  const plainUsers = useAppSelector(selectUsers);
  return plainUsers.map((user) => {
    return new User(user.id, user.name, user.email, user.role, user.password);
  });
};

const useTasks = () => {
  const plainTasks = useAppSelector(selectTasks);
  return plainTasks.map((task) => {
    return new Task(
      task.id,
      task.title,
      task.description,
      task.status,
      task.assignedTo,
      task.dueDate
    );
  });
};*/

export { useAppDispatch, useAppSelector };
//export { useUsers, useTasks };
