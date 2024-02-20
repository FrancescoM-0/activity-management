import { Fragment, useState } from "react";
import { useTasks } from "../../services/provider/TasksProvider";
import Task from "../../types/Task";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers/";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useUsers } from "../../services/provider/UsersProvider";
import Status from "../../types/Status";
import { ItemTMTask } from "../../style/style";
import {
  ITaskContext,
  TaskActionType,
} from "../../types/providers-types/TasksProviderTypes";
import { IUserContext } from "../../types/providers-types/UsersProviderTypes";

interface TMTaskProps {
  task: Task;
}

function TMTask({ task }: TMTaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const tasks: ITaskContext = useTasks();
  const users: IUserContext = useUsers();

  if (users.users === null || tasks.tasks === null) {
    return <></>;
  }

  let usersOptions: JSX.Element[] = [];
  for (let i = 0; i < users.users.length; i++) {
    usersOptions.push(
      <MenuItem key={users.users[i].id} value={users.users[i].name}>
        {users.users[i].name}
      </MenuItem>
    );
  }
  let editedTask: Task = new Task(
    task.id,
    task.title,
    task.description,
    task.status,
    task.assignedTo,
    task.dueDate
  );

  let status: string | undefined = Object.keys(Status).find(
    (key: string) => Status[key].name === task.status
  );

  if (isEditing) {
    return (
      <ItemTMTask>
        <Typography variant="h6" color="primary">
          Aggiorna la task
        </Typography>
        <TextField
          id="outlined-basic"
          label="Inserisci il titolo"
          size="medium"
          fullWidth
          margin="normal"
          value={task.title}
          onChange={(e) => {
            editedTask.title = e.target.value;
            tasks.dispatch({
              type: TaskActionType.EDIT,
              task: editedTask,
            });
          }}
        />
        <TextField
          id="outlined-basic"
          label="Inserisci la descrizione"
          size="medium"
          fullWidth
          margin="normal"
          value={task.description}
          onChange={(e) => {
            editedTask.description = e.target.value;
            tasks.dispatch({
              type: TaskActionType.EDIT,
              task: editedTask,
            });
          }}
        />
        {Status[status!].icon}
        <FormControl fullWidth margin="normal">
          <InputLabel id="demo-multiple-name-label">Utenti</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            input={<OutlinedInput label="Name" />}
            value={editedTask.assignedTo}
            onChange={(e) => {
              editedTask.assignedTo = e.target.value;
              tasks.dispatch({
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
              tasks.dispatch({
                type: TaskActionType.EDIT,
                task: editedTask,
              });
            }}
          />
        </LocalizationProvider>
        <Button onClick={() => setIsEditing(!isEditing)}>Save</Button>
      </ItemTMTask>
    );
  } else {
    return (
      <ItemTMTask>
        <Stack direction="row">
          <div>
            <Typography
              variant="h4"
              sx={{ float: "left", marginRight: "1rem" }}
            >
              {task.title}
            </Typography>
            <br />
            <Typography
              variant="h5"
              sx={{ float: "left", marginBottom: "2rem" }}
            >
              {task.description}
            </Typography>
            <br />
            <Typography
              variant="h5"
              sx={{ float: "left", marginBottom: "2rem" }}
            >
              {task.assignedTo}
            </Typography>
          </div>
        </Stack>
        <h3 style={{ float: "right", marginRight: "2rem", width: "10rem" }}>
          {task.dueDate}
        </h3>
        <br />
        <div style={{ marginTop: "-1.5rem" }}>{Status[status!].icon}</div>
        <Button onClick={() => setIsEditing(!isEditing)}>Edit</Button>
        <Button
          onClick={() =>
            tasks.dispatch({
              type: TaskActionType.DELETE,
              task: task,
            })
          }
        >
          Delete
        </Button>
      </ItemTMTask>
    );
  }
}

export default TMTask;
