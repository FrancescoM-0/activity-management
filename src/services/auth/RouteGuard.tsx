import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { IAuthContext } from "../../types/providers-types/AuthProviderTypes";

function RouteGuard() {
  const auth: IAuthContext = useAuth();

  if (auth.user === null) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet />;
}

export default RouteGuard;
