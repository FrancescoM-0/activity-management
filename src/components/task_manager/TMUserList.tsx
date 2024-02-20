import {
  FormControl,
  InputLabel,
  List,
  MenuItem,
  Paper,
  Select,
  Theme,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useUsers } from "../../services/provider/UsersProvider";
import TMUser from "./TMUser";
import User from "../../types/User";
import { IUserContext } from "../../types/providers-types/UsersProviderTypes";

interface TMUserListProps {
  onUserFilterChange: (user: string) => void;
}

function TMUserList({ onUserFilterChange }: TMUserListProps) {
  const theme: Theme = useTheme();
  const isMobile: boolean = useMediaQuery(theme.breakpoints.down("sm"));
  const users: IUserContext = useUsers();

  if (users.users === null) {
    return <></>;
  }

  let usersJsx: JSX.Element[] = users.users.map((user: User) => {
    return (
      <TMUser
        user={user}
        onUserFilterChange={onUserFilterChange}
        key={user.id}
      ></TMUser>
    );
  });

  let usersOptions: JSX.Element[] = [];
  for (let i = 0; i < users.users.length; i++) {
    usersOptions.push(
      <MenuItem key={users.users[i].id} value={users.users[i].name}>
        {users.users[i].name}
      </MenuItem>
    );
  }

  const mobileSelectUsers = (
    <FormControl
      sx={{
        marginBottom: "5%",
        marginTop: "0.1%",
        width: "200px",
        minWidth: "150px",
      }}
    >
      <InputLabel id="demo-multiple-name-label">Utenti</InputLabel>
      <Select
        labelId="demo-multiple-name-label"
        id="demo-multiple-name"
        onChange={(e) => {
          onUserFilterChange(e.target.value as string);
        }}
      >
        {usersOptions}
      </Select>
    </FormControl>
  );

  return (
    <>
      {isMobile ? (
        mobileSelectUsers
      ) : (
        <div style={{ float: "left", marginRight: "3rem" }}>
          <Paper
            elevation={3}
            sx={{ maxWidth: 300, margin: "auto", textAlign: "left" }}
          >
            <List sx={{ bgcolor: "background.paper" }}>{usersJsx}</List>
          </Paper>
        </div>
      )}
    </>
  );
}

export default TMUserList;
