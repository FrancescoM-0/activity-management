import { useTasks } from "../../services/provider/TasksProvider";
import { Fab, Stack } from "@mui/material";
import { useUsers } from "../../services/provider/UsersProvider";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TMTask from "./TMTask";
import TMAddTask from "./TMAddTask";
import Task from "../../types/Task";
import { ITaskContext } from "../../types/providers-types/TasksProviderTypes";
import { IUserContext } from "../../types/providers-types/UsersProviderTypes";

interface TMTaskListProps {
  userFilter: string;
  textFilter: string;
  statusFilter: string;
}

function TMTaskList({ userFilter, textFilter, statusFilter }: TMTaskListProps) {
  const tasks: ITaskContext = useTasks();
  const users: IUserContext = useUsers();
  const [addTask, setAddTask] = useState<boolean>(false);

  if (tasks.tasks === null || users.users === null) {
    return <></>;
  }

  let tasksJsx = tasks.tasks
    .filter((task: Task) => {
      if (
        task.assignedTo.toLowerCase().indexOf(userFilter.toLowerCase()) !==
          -1 &&
        task.title.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1 &&
        task.status.toLowerCase().indexOf(statusFilter.toLowerCase()) !== -1
      ) {
        return true;
      }
      return false;
    })
    .map((task: Task) => <TMTask task={task} key={task.id}></TMTask>);

  return (
    <div>
      <Stack
        spacing={2}
        direction="column"
        alignItems="center"
        marginTop={"-1rem"}
      >
        {tasksJsx}
        {addTask && <TMAddTask newTaskId={tasks.tasks.length + 1}></TMAddTask>}
      </Stack>
      <div
        style={{
          margin: 0,
          top: "auto",
          right: 20,
          bottom: 20,
          left: "auto",
          position: "fixed",
        }}
      >
        <Fab
          variant="circular"
          size="medium"
          onClick={() => {
            setAddTask(!addTask);
          }}
        >
          {addTask ? <RemoveIcon /> : <AddIcon />}
        </Fab>
      </div>
    </div>
  );
}

export default TMTaskList;
