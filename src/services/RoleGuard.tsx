import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./provider/AuthProvider";
import { Paths } from "./Paths";
import { IAuthContext } from "../types/providers-types/AuthProviderTypes";

interface RoleGuardProps {
  authorizedRole: string[];
}

function RoleGuard({ authorizedRole }: RoleGuardProps) {
  const auth: IAuthContext = useAuth();

  // TODO
  /*if (auth.user === null) {
    return <></>;
  }*/

  let isAuthorized: boolean = false;

  if (authorizedRole.length === 0) {
    return <Outlet />;
  }

  for (let roleKey in authorizedRole) {
    if (auth.user!.role === authorizedRole[roleKey]) {
      isAuthorized = true;
      break;
    }
  }

  if (!isAuthorized) {
    return <Navigate to={Paths.taskView.path} replace></Navigate>;
  }

  return <Outlet />;
}

export default RoleGuard;
