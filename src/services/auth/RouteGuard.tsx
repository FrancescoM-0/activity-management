import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../../redux/hooks";

function RouteGuard() {
  const auth = useAuthUser();

  if (auth === null) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet />;
}

export default RouteGuard;
