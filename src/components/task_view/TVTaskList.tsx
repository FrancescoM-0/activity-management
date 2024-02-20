import { Stack } from "@mui/material";
import { useAuth } from "../../services/provider/AuthProvider";
import { useTasks } from "../../services/provider/TasksProvider";
import TVTask from "./TVTask";
import { ITaskContext } from "../../types/providers-types/TasksProviderTypes";
import { IAuthContext } from "../../types/providers-types/AuthProviderTypes";
import Task from "../../types/Task";

interface TVTaskListProps {
  textFilter: string;
  statusFilter: string;
}

function TVTaskList({ textFilter, statusFilter }: TVTaskListProps) {
  const tasks: ITaskContext = useTasks();
  const auth: IAuthContext = useAuth();

  if (tasks.tasks === null || auth.user === null) {
    return <></>;
  }

  let tasksJsx = tasks.tasks
    .filter((task: Task) => {
      if (
        task.assignedTo.toLowerCase().indexOf(auth.user!.name.toLowerCase()) !==
          -1 &&
        task.title.toLowerCase().indexOf(textFilter.toLowerCase()) !== -1 &&
        task.status.toLowerCase().indexOf(statusFilter.toLowerCase()) !== -1
      ) {
        return true;
      }
      return false;
    })
    .map((task: Task) => <TVTask task={task} key={task.id}></TVTask>);

  return (
    <Stack spacing={2} direction={"column"}>
      {tasksJsx}
    </Stack>
  );
}

export default TVTaskList;
