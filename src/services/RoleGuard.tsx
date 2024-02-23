import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "./Paths";
import { useAppSelector } from "../redux/hooks";
import { selectAuthUser } from "../redux/reducers/authSlice";

interface RoleGuardProps {
  authorizedRole: string[];
}

function RoleGuard({ authorizedRole }: RoleGuardProps) {
  const auth = useAppSelector(selectAuthUser);

  let isAuthorized: boolean = false;

  if (authorizedRole.length === 0) {
    return <Outlet />;
  }

  for (let roleKey in authorizedRole) {
    if (auth!.role === authorizedRole[roleKey]) {
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
