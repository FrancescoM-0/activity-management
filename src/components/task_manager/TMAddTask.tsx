import { useTasks } from "../../services/provider/TasksProvider";
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
import { useUsers } from "../../services/provider/UsersProvider";
import Task from "../../types/Task";
import { ItemTMAddTask } from "../../style/style";
import {
  ITaskContext,
  TaskActionType,
} from "../../types/providers-types/TasksProviderTypes";
import { IUserContext } from "../../types/providers-types/UsersProviderTypes";

interface TMAddTaskProps {
  newTaskId: number;
}

function TMAddTask({ newTaskId }: TMAddTaskProps) {
  const tasks: ITaskContext = useTasks();
  const users: IUserContext = useUsers();

  if (users.users === null || tasks.tasks === null) {
    return <></>;
  }

  let newTask: Task = new Task(newTaskId, "", "", Status.Planned.name, "", "");
  let usersOptions: JSX.Element[] = [];
  for (let i = 0; i < users.users.length; i++) {
    usersOptions.push(
      <MenuItem key={users.users[i].id} value={users.users[i].name}>
        {users.users[i].name}
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
      <Button
        onClick={() =>
          tasks.dispatch({
            type: TaskActionType.ADD,
            task: newTask,
          })
        }
      >
        Add
      </Button>
    </ItemTMAddTask>
  );
}

export default TMAddTask;
