import { Stack } from "@mui/material";
import TVTask from "./TVTask";
import Task from "../../types/Task";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthUser } from "../../redux/reducers/authSlice";
import { selectTasks } from "../../redux/reducers/tasksSlice";

interface TVTaskListProps {
  textFilter: string;
  statusFilter: string;
}

function TVTaskList({ textFilter, statusFilter }: TVTaskListProps) {
  const auth = useAppSelector(selectAuthUser);
  const tasks = useAppSelector(selectTasks);

  let tasksJsx = tasks
    .filter((task: Task) => {
      if (
        task.assignedTo.toLowerCase().indexOf(auth!.name.toLowerCase()) !==
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
