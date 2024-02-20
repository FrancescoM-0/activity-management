import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import Reminder from "../Reminder";
import { useTasks } from "../../services/provider/TasksProvider";
import Status from "../../types/Status";
import Task from "../../types/Task";
import { ItemTVTask } from "../../style/style";
import {
  ITaskContext,
  TaskActionType,
} from "../../types/providers-types/TasksProviderTypes";

interface TVTaskProps {
  task: Task;
}

function TVTask({ task }: TVTaskProps) {
  const tasks: ITaskContext = useTasks();

  if (tasks.tasks === null) {
    return <></>;
  }

  let editedTask: Task = new Task(
    task.id,
    task.title,
    task.description,
    task.status,
    task.assignedTo,
    task.dueDate
  );

  let statusOptions: JSX.Element[] = [];
  for (let key in Status) {
    statusOptions.push(
      <MenuItem key={key} value={Status[key].name}>
        {Status[key].name}
      </MenuItem>
    );
  }

  return (
    <ItemTVTask>
      <Stack direction="row">
        <div>
          <Typography variant="h4" sx={{ float: "left", marginRight: "1rem" }}>
            {task.title}
          </Typography>
          <br />
          <Typography variant="h5" sx={{ float: "left", marginBottom: "2rem" }}>
            {task.description}
          </Typography>
        </div>
      </Stack>
      <h3 style={{ float: "right", marginRight: "2rem", width: "10rem" }}>
        {task.dueDate}
      </h3>
      <br />
      <div style={{ marginTop: "-1.5rem" }}>
        <FormControl
          sx={{
            float: "right",
            marginRight: "2%",
            marginTop: "-6%",
            width: "10%",
            minWidth: 120,
          }}
        >
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={task.status}
            label="Status"
            onChange={(e) => {
              editedTask.status = e.target.value;
              tasks.dispatch({
                type: TaskActionType.EDIT,
                task: editedTask,
              });
            }}
          >
            {statusOptions}
          </Select>
        </FormControl>
      </div>
      <Reminder dueDate={task.dueDate}></Reminder>
    </ItemTVTask>
  );
}

export default TVTask;
