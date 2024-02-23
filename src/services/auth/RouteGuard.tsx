import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthUser } from "../../redux/reducers/authSlice";

function RouteGuard() {
  const auth = useAppSelector(selectAuthUser);

  if (auth === null) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet />;
}

export default RouteGuard;
