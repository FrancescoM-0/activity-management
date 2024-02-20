import { Paper, styled } from "@mui/material";

const StyledPaperAddUser = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: "auto",
  marginTop: theme.spacing(10),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
}));

const ItemLogin = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  maxWidth: 400,
  margin: "auto",
  marginTop: theme.spacing(8),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const ItemTMAddTask = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2E3B4E" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const ItemTMTask = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2E3B4E" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: "12px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));

const ItemTVTask = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const StyledPaperUserView = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: 400,
  height: 400,
  margin: "auto",
  marginTop: theme.spacing(7),
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[5],
}));

export {
  StyledPaperAddUser,
  ItemLogin,
  ItemTMAddTask,
  ItemTMTask,
  ItemTVTask,
  StyledPaperUserView,
};
