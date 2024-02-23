import { Divider, ListItem, ListItemText, Typography } from "@mui/material";
import User from "../../types/User";

interface TMUserProps {
  user: User;
  onUserFilterChange: (user: string) => void;
}

function TMUser({ user, onUserFilterChange }: TMUserProps) {
  return (
    <div className="listUser" onClick={() => onUserFilterChange(user.name)}>
      <ListItem sx={{ py: 2 }}>
        <ListItemText
          primary={user.name}
          secondary={
            <>
              <Typography
                variant="body2"
                color="text.primary"
                component={"span"}
              >
                {user.email}
              </Typography>
              <br />
              {user.role}
            </>
          }
        />
      </ListItem>
      <Divider />
    </div>
  );
}

export default TMUser;
