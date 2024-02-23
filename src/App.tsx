import {
  Navigate,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import NavBar from "./components/NavBar";
import RouteGuard from "./services/auth/RouteGuard";
import { Paths, getPathRoute } from "./services/Paths";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { fetchInitialUsers } from "./redux/reducers/usersSlice";
import { fetchInitialTasks } from "./redux/reducers/tasksSlice";
import UserCache from "./services/auth/UserCache";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitialUsers());
    dispatch(fetchInitialTasks());
  }, [dispatch]);

  return (
    <UserCache>
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
          path="*"
          element={<Navigate to={Paths.login.path}></Navigate>}
        ></Route>
      </Routes>
    </UserCache>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
