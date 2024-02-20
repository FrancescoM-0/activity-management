import { useState } from "react";
import { useTasks } from "../../services/provider/TasksProvider";
import Task from "../../types/Task";
import { Button, Stack, Typography } from "@mui/material";

import { useUsers } from "../../services/provider/UsersProvider";
import Status from "../../types/Status";
import { ItemTMTask } from "../../style/style";
import {
  ITaskContext,
  TaskActionType,
} from "../../types/providers-types/TasksProviderTypes";
import { IUserContext } from "../../types/providers-types/UsersProviderTypes";
import TMEditedTask from "./TMEditedTask";

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

  let statusKey: string | undefined = Object.keys(Status).find(
    (key: string) => Status[key].name === task.status
  );

  if (isEditing) {
    return (
      <TMEditedTask
        task={task}
        dispatch={tasks.dispatch}
        statusKey={statusKey}
        users={users.users}
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
        <h3 style={{ float: "right", marginRight: "2rem", width: "10rem" }}>
          {task.dueDate}
        </h3>
        <br />
        <div style={{ marginTop: "-1.5rem" }}>{Status[statusKey!].icon}</div>
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
