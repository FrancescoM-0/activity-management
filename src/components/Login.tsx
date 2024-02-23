import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Toast, notifyError, notifyWarn } from "../services/Toast";
import { ItemLogin } from "../style/style";
import User from "../types/User";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { login } from "../redux/reducers/authSlice";
import { selectUsers } from "../redux/reducers/usersSlice";

function Login() {
  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClick(): void {
    if (users.length === 0) {
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

    users.forEach((user: User) => {
      if (user.email === email && User.checkPassword(password, user.password)) {
        dispatch(login(Object.assign({}, user)));
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
