import {
  Box,
  Theme,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";

var theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#D3D3D3",
    },
  },
});

interface ReminderProps {
  dueDate: string;
}

function Reminder({ dueDate }: ReminderProps) {
  const currentDateString: string = new Date().toISOString().slice(0, 10);
  const currentDate: Date = new Date(currentDateString);
  const due: Date = new Date(dueDate);

  const diffTime: number = Math.abs(due.getTime() - currentDate.getTime());
  const diffDays: number = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let reminderString: string = "";
  if (diffDays < 7) {
    reminderString = "Manca meno di una settimana alla scadenza";
    theme.palette.primary.main = "#c71e1e";
  } else if (diffDays < 14) {
    reminderString = "Mancano meno di due settimane alla scadenza";
    theme.palette.primary.main = "#c7b31e";
  } else if (diffDays < 30) {
    reminderString = "Manca meno di un mese alla scadenza";
    theme.palette.primary.main = "#D3D3D3";
  } else {
    return <></>;
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "25vh",
          height: "12vh",
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "-8rem",
          bgcolor: "primary.main",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <Typography variant="h5" sx={{}}>
          {reminderString}
        </Typography>
      </Box>
    </ThemeProvider>
  );
}

export default Reminder;
