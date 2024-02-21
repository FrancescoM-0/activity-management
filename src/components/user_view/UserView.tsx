import { Button, TextField, Tooltip, Typography } from "@mui/material";
import { useAuth } from "../../services/provider/AuthProvider";
import { useUsers } from "../../services/provider/UsersProvider";
import User from "../../types/User";
import { Toast, notifySucces, notifyWarn } from "../../services/Toast";
import { StyledPaperUserView } from "../../style/style";
import {
  IUserContext,
  UserActionType,
} from "../../types/providers-types/UsersProviderTypes";
import { IAuthContext } from "../../types/providers-types/AuthProviderTypes";

function UserView() {
  const auth: IAuthContext = useAuth();
  const users: IUserContext = useUsers();

  if (users.users === null || auth.user === null) {
    return <></>;
  }

  function handleClick(): void {
    const newPassword: string = (
      document.getElementById("newPassword") as HTMLInputElement
    ).value;

    if (newPassword === "") {
      notifyWarn("Uno o più campi vuoti");
      return;
    }
    const resetField=()=>{
      (document.getElementById("newPassword")as HTMLInputElement).value="";
    }

    users.dispatch({
      type: UserActionType.EDIT,
      user: new User(
        auth.user!.id,
        auth.user!.name,
        auth.user!.email,
        auth.user!.role,
        User.encryptPassword(newPassword)
      ),
    });

    notifySucces("Password modificata");
    resetField();
  }

  return (
    <>
      <StyledPaperUserView elevation={3}>
        <Typography variant="h4" gutterBottom>
          Utenti
        </Typography>
        <div style={{ textAlign: "left", marginTop: "2rem" }}>
          <Typography variant="h5">{auth.user!.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {auth.user!.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {auth.user!.role}
          </Typography>
          <br />
          <Tooltip title="Cambia password">
            <TextField
              sx={{ marginBottom: "1rem", marginTop: "2rem" }}
              id="newPassword"
              label="Nuova Password"
              size="medium"
              type="password"
              fullWidth
            />
          </Tooltip>
        </div>
        <div style={{ textAlign: "left", marginTop: "2rem" }}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Cambia password
          </Button>
        </div>
      </StyledPaperUserView>
      <Toast></Toast>
    </>
  );
}

export default UserView;
