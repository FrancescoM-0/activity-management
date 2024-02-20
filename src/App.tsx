import { TasksProvider } from "./services/provider/TasksProvider";
import { UsersProvider } from "./services/provider/UsersProvider";
import {
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./services/provider/AuthProvider";
import RouteGuard from "./services/auth/RouteGuard";
import { Paths, getPathRoute } from "./services/Paths";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  return (
    <UsersProvider>
      <AuthProvider>
        <TasksProvider>
          <NavBar></NavBar>
          <Routes>
            <Route element={<RouteGuard></RouteGuard>}>
              {getPathRoute(Paths.taskView)}
              {getPathRoute(Paths.taskManager)}
              {getPathRoute(Paths.addUser)}
              {getPathRoute(Paths.userView)}
              <Route
                path="/"
                element={<Navigate to={Paths.taskView.path}></Navigate>}
              ></Route>
            </Route>

            {getPathRoute(Paths.login)}
            <Route
              path="/"
              element={<Navigate to={Paths.login.path}></Navigate>}
            ></Route>
          </Routes>
        </TasksProvider>
      </AuthProvider>
    </UsersProvider>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
