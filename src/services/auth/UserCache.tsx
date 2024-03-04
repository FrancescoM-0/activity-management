import { ReactNode, useEffect } from "react";
import { readCacheUser } from "./cacheAuth";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { loginFromCache } from "../../redux/reducers/authSlice";

interface UserCacheProps {
  children: ReactNode;
}

function UserCache({ children }: UserCacheProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let cacheUser = readCacheUser();
    if (cacheUser !== null) {
      dispatch(loginFromCache(Object.assign({}, cacheUser)));
      navigate("/");
    }
  }, [dispatch, navigate]);

  return <>{children}</>;
}

export default UserCache;
