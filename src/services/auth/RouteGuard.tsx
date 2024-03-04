import { Navigate, Outlet } from "react-router-dom";
import { useAuthUser } from "../../redux/hooks";

function RouteGuard() {
  const auth = useAuthUser();
  //console.log(auth);

  if (auth === null) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet />;
}

export default RouteGuard;
