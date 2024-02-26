import Status from "../../types/Status";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Task from "../../types/Task";
import { ItemTMAddTask } from "../../style/style";
import { useAppDispatch, useUsers } from "../../redux/hooks";
import { addTask } from "../../redux/reducers/tasksSlice";

interface TMAddTaskProps {
  newTaskId: number;
}

function TMAddTask({ newTaskId }: TMAddTaskProps) {
  const users = useUsers();
  const dispatch = useAppDispatch();

  let newTask: Task = new Task(newTaskId, "", "", Status.Planned.name, "", "");
  let usersOptions: JSX.Element[] = [];
  for (let i = 0; i < users.length; i++) {
    usersOptions.push(
      <MenuItem key={users[i].id} value={users[i].name}>
        {users[i].name}
      </MenuItem>
    );
  }

  return (
    <ItemTMAddTask>
      <Typography variant="h6" color="primary">
        Aggiungi la task
      </Typography>
      <TextField
        label="Inserisci il titolo"
        size="medium"
        fullWidth
        margin="normal"
        onChange={(e) => {
          newTask.title = e.target.value;
        }}
      />
      <TextField
        label="Inserisci la descrizione"
        size="medium"
        fullWidth
        margin="normal"
        onChange={(e) => {
          newTask.description = e.target.value;
        }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-multiple-name-label">Utenti</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          input={<OutlinedInput label="Name" />}
          defaultValue={""}
          onChange={(e) => {
            newTask.assignedTo = e.target.value as string;
          }}
        >
          {usersOptions}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Scadenza"
          onChange={(newDate) => {
            newTask.dueDate = (newDate as Date).toISOString().slice(0, 10);
          }}
        />
      </LocalizationProvider>
      <Button onClick={() => dispatch(addTask(Object.assign({}, newTask)))}>
        Add
      </Button>
    </ItemTMAddTask>
  );
}

export default TMAddTask;
