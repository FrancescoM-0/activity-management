import { Route } from "react-router-dom";
import RoleGuard from "./RoleGuard";
import TaskView from "../components/task_view/TaskView";
import TaskManager from "../components/task_manager/TaskManager";
import AddUser from "../components/AddUser";
import UserView from "../components/user_view/UserView";
import Login from "../components/Login";

interface IPath {
  name: string;
  path: string;
  role: string[];
  component: JSX.Element;
}

const Paths: { [key: string]: IPath } = {
  taskView: {
    name: "Lista task",
    path: "/task-list",
    role: [],
    component: <TaskView></TaskView>,
  },
  taskManager: {
    name: "Task manager",
    path: "/task-manager",
    role: ["Manager", "Team Leader"],
    component: <TaskManager></TaskManager>,
  },
  addUser: {
    name: "Aggiungi utente",
    path: "/add-user",
    role: ["Amministrazione"],
    component: <AddUser></AddUser>,
  },
  userView: {
    name: "Dati personali",
    path: "/user-view",
    role: [],
    component: <UserView></UserView>,
  },
  login: {
    name: "Login",
    path: "/login",
    role: [],
    component: <Login></Login>,
  },
};

function getPathRoute(path: IPath) {
  return (
    <Route element={<RoleGuard authorizedRole={path.role}></RoleGuard>}>
      <Route path={path.path} element={path.component}></Route>
    </Route>
  );
}

export { Paths, getPathRoute };
export type { IPath };
