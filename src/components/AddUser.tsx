import {
  Box,
  Button,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import User from "../types/User";
import { Toast, notifySucces, notifyWarn } from "../services/Toast";
import { StyledPaperAddUser } from "../style/style";
import { useAppDispatch, useUsers } from "../redux/hooks";
import { addUser } from "../redux/reducers/usersSlice";

function AddUser() {
  const users = useUsers();
  const dispatch = useAppDispatch();
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  let password: string = User.generateInitialPassword(10);

  function handleClick(): void {
    const name: string = (document.getElementById("name") as HTMLInputElement)
      .value;
    const email: string = (document.getElementById("email") as HTMLInputElement)
      .value;
    const role: string = (document.getElementById("role") as HTMLInputElement)
      .value;

    if (name === "" || email === "" || role === "") {
      notifyWarn("Uno o più campi vuoti");
      return;
    }

    const resetField = () => {
      (document.getElementById("name") as HTMLInputElement).value = "";
      (document.getElementById("email") as HTMLInputElement).value = "";
      (document.getElementById("role") as HTMLInputElement).value = "";
    };

    let user = new User(users.length + 1, name, email, role, password);

    dispatch(addUser(Object.assign({}, user)));

    notifySucces("Utente aggiunto");
    resetField();
  }

  return (
    <>
      <StyledPaperAddUser elevation={3}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Aggiungi un Utente
        </Typography>
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <TextField
            sx={{ marginBottom: isMobile ? 2 : 1 }}
            id="name"
            type="text"
            label="Nome"
            size="medium"
            fullWidth
          />
          <TextField
            sx={{ marginBottom: isMobile ? 2 : 1 }}
            id="email"
            type="email"
            label="Email"
            size="medium"
            fullWidth
          />
          <TextField
            sx={{ marginBottom: isMobile ? 2 : 1 }}
            id="role"
            type="text"
            label="Ruolo"
            size="medium"
            fullWidth
          />
          <label style={{ marginBottom: isMobile ? 2 : 1 }} id="role">
            Password: {password}
          </label>
        </Box>
        <Box sx={{ textAlign: "center", mt: isMobile ? 2 : 1 }}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Aggiungi Utente
          </Button>
        </Box>
      </StyledPaperAddUser>
      <Toast></Toast>
    </>
  );
}

export default AddUser;
