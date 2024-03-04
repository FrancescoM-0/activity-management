import { Button, TextField, Tooltip, Typography } from "@mui/material";
import User from "../../types/User";
import { Toast, notifySucces, notifyWarn } from "../../services/Toast";
import { StyledPaperUserView } from "../../style/style";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectAuthUser } from "../../redux/reducers/authSlice";
import { editUser } from "../../redux/reducers/usersSlice";

function UserView() {
  const auth = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();

  function handleClick(): void {
    const newPassword: string = (
      document.getElementById("newPassword") as HTMLInputElement
    ).value;

    if (newPassword === "") {
      notifyWarn("Uno o più campi vuoti");
      return;
    }
    const resetField = () => {
      (document.getElementById("newPassword") as HTMLInputElement).value = "";
    };

    let user = new User(
      auth!.id,
      auth!.name,
      auth!.email,
      auth!.role,
      newPassword
    );

    dispatch(editUser(Object.assign({}, user)));

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
          <Typography variant="h5">{auth!.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {auth!.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {auth!.role}
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
