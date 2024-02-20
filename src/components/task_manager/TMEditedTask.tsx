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
import { ItemTMTask } from "../../style/style";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import Task from "../../types/Task";
import { Dispatch } from "react";
import {
  ITaskAction,
  TaskActionType,
} from "../../types/providers-types/TasksProviderTypes";
import Status from "../../types/Status";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import User from "../../types/User";
import dayjs from "dayjs";

interface TMEditedTaskProps {
  task: Task;
  dispatch: Dispatch<ITaskAction>;
  statusKey: string | undefined;
  users: User[];
  isEditing: boolean;
  setIsEditing: Dispatch<React.SetStateAction<boolean>>;
}

function TMEditedTask({
  task,
  dispatch,
  statusKey,
  users,
  isEditing,
  setIsEditing,
}: TMEditedTaskProps) {
  let editedTask: Task = new Task(
    task.id,
    task.title,
    task.description,
    task.status,
    task.assignedTo,
    task.dueDate
  );

  let usersOptions: JSX.Element[] = [];
  for (let i = 0; i < users.length; i++) {
    usersOptions.push(
      <MenuItem key={users[i].id} value={users[i].name}>
        {users[i].name}
      </MenuItem>
    );
  }

  return (
    <ItemTMTask>
      <Typography variant="h6" color="primary">
        Aggiorna la task
      </Typography>
      <TextField
        label="Inserisci il titolo"
        size="medium"
        fullWidth
        margin="normal"
        value={task.title}
        onChange={(e) => {
          editedTask.title = e.target.value;
          dispatch({
            type: TaskActionType.EDIT,
            task: editedTask,
          });
        }}
      />
      <TextField
        label="Inserisci la descrizione"
        size="medium"
        fullWidth
        margin="normal"
        value={task.description}
        onChange={(e) => {
          editedTask.description = e.target.value;
          dispatch({
            type: TaskActionType.EDIT,
            task: editedTask,
          });
        }}
      />
      {Status[statusKey!].icon}
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-multiple-name-label">Utenti</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          input={<OutlinedInput label="Name" />}
          value={editedTask.assignedTo}
          onChange={(e) => {
            editedTask.assignedTo = e.target.value;
            dispatch({
              type: TaskActionType.EDIT,
              task: editedTask,
            });
          }}
        >
          {usersOptions}
        </Select>
      </FormControl>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Scadenza"
          value={dayjs(task.dueDate)}
          onChange={(newDate) => {
            editedTask.dueDate = newDate!.toISOString().slice(0, 10);
            dispatch({
              type: TaskActionType.EDIT,
              task: editedTask,
            });
          }}
        />
      </LocalizationProvider>
      <Button onClick={() => setIsEditing(!isEditing)}>Save</Button>
    </ItemTMTask>
  );
}

export default TMEditedTask;
