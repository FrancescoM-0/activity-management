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
import UserCache from "./services/auth/UserCache";
import FetchData from "./services/auth/FetchData";

const router = createBrowserRouter([{ path: "*", Component: Root }]);

function Root() {
  return (
    <UserCache>
      <FetchData>
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
      </FetchData>
    </UserCache>
  );
}

function App() {
  return <RouterProvider router={router} />;
}

export default App;
