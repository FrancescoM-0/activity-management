import { useNavigate } from "react-router-dom";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Toast, notifyError, notifyWarn } from "../services/Toast";
import { ItemLogin } from "../style/style";
import User from "../types/User";
import { useAppDispatch } from "../redux/hooks";
import { login, loginFromCache } from "../redux/reducers/authSlice";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleClick(): void {
    const email: string = (document.getElementById("email") as HTMLInputElement)
      .value;
    const password: string = (
      document.getElementById("password") as HTMLInputElement
    ).value;

    if (email === "" || password === "") {
      notifyWarn("Uno o più campi vuoti");
      return;
    }

    const user = new User(-1, "", email, "", password);
    if (dispatch(login(user)) !== undefined) {
      dispatch(loginFromCache(Object.assign({}, user)));
      navigate("/task-list");
    }

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
