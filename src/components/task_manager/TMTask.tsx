import { useState } from "react";
import Task from "../../types/Task";
import { Fab, Stack, Typography } from "@mui/material";
import Status from "../../types/Status";
import { ItemTMTask } from "../../style/style";
import TMEditedTask from "./TMEditedTask";
import { useAppDispatch, useUsers } from "../../redux/hooks";
import { removeTask } from "../../redux/reducers/tasksSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface TMTaskProps {
  task: Task;
}

function TMTask({ task }: TMTaskProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const users = useUsers();
  const dispatch = useAppDispatch();

  let statusKey: string | undefined = Object.keys(Status).find(
    (key: string) => Status[key].name === task.status
  );

  if (isEditing) {
    return (
      <TMEditedTask
        task={task}
        statusKey={statusKey}
        users={users}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      ></TMEditedTask>
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
        <div
          style={{
            float: "right",
            marginRight: "-1.5rem",
            width: "10rem",
            marginTop: "-11rem",
          }}
        >
          {Status[statusKey!].icon}
        </div>
        <br />
        <br />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "-1.3rem",
          }}
        >
          <h3>{task.dueDate}</h3>
          <div
            style={{
              display: "flex",
              alignItems: "right",
              marginBottom: "-1.5rem",
            }}
          >
            <Fab
              sx={{ marginRight: "1rem" }}
              onClick={() => setIsEditing(!isEditing)}
            >
              <EditIcon />
            </Fab>
            <Fab onClick={() => dispatch(removeTask(Object.assign({}, task)))}>
              <DeleteIcon />
            </Fab>
          </div>
        </div>
      </ItemTMTask>
    );
  }
}

export default TMTask;
