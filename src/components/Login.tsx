import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/provider/AuthProvider";
import { useUsers } from "../services/provider/UsersProvider";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Toast, notifyError, notifyWarn } from "../services/Toast";
import { ItemLogin } from "../style/style";
import User from "../types/User";
import {
  AuthActionType,
  IAuthContext,
} from "../types/providers-types/AuthProviderTypes";
import { IUserContext } from "../types/providers-types/UsersProviderTypes";

function Login() {
  const users: IUserContext = useUsers();
  const auth: IAuthContext = useAuth();
  const navigate = useNavigate();

  if (users.users === null) {
    return <></>;
  }

  function handleClick(): void {
    if (users.users.length === 0) {
      notifyError("Email o Password errata");
    }

    const email: string = (document.getElementById("email") as HTMLInputElement)
      .value;
    const password: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    if (email === "" || password === "") {
      notifyWarn("Uno o più campi vuoti");
      return;
    }

    users.users.forEach((user: User) => {
      if (user.email === email && user.checkPassword(password)) {
        auth.dispatch({
          type: AuthActionType.LOGIN,
          user: user,
        });
        navigate("/task-list");
        return;
      }
    });

    notifyError("Email o Password errata");
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <ItemLogin elevation={3}>
          <Typography variant="h4" color="primary" gutterBottom>
            Accedi al sito
          </Typography>
          <TextField
            id="email"
            type="email"
            label="Email"
            size="medium"
            fullWidth
            margin="normal"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            size="medium"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleClick}
          >
            Accedi
          </Button>
        </ItemLogin>
      </Container>
      <Toast></Toast>
    </>
  );
}

export default Login;
