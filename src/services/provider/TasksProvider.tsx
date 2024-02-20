import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import Task from "../../types/Task";
import { ITaskContext } from "../../types/providers-types/TasksProviderTypes";
import tasksReducer from "./reducer/TasksReducer";
import { fetchTasks } from "../http/tasksHttp";

const initialTasks: Task[] = [];

const TasksContext = createContext<ITaskContext>({
  tasks: initialTasks,
  dispatch: () => {},
});

interface TasksProviderProps {
  children: ReactNode;
}

function TasksProvider({ children }: TasksProviderProps) {
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  useEffect(() => {
    fetchTasks(dispatch);
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TasksContext.Provider>
  );
}

function useTasks(): ITaskContext {
  const tasks = useContext(TasksContext);
  if (!tasks) {
    throw new Error("useTasks must be used within a Provider");
  }
  return tasks;
}

export { TasksProvider, useTasks };
