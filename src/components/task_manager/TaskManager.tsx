import { useState } from "react";
import SearchBar from "../SearchBar";
import TMUserList from "./TMUserList";
import TMTaskList from "./TMTaskList";
import { useAppDispatch } from "../../redux/hooks";
import { redoTasks, undoTasks } from "../../redux/reducers/tasksSlice";

function TaskManager() {
  const [userFilter, setUserFilter] = useState<string>("");
  const [textFilter, setTextFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const dispatch = useAppDispatch();

  return (
    <>
      <SearchBar
        onTextFilterChange={setTextFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onUserFilterChange={setUserFilter}
      ></SearchBar>
      <button
        onClick={() => {
          dispatch(undoTasks());
        }}
      >
        undo
      </button>
      <button
        onClick={() => {
          dispatch(redoTasks());
        }}
      >
        redo
      </button>
      <TMUserList onUserFilterChange={setUserFilter}></TMUserList>
      <TMTaskList
        userFilter={userFilter}
        textFilter={textFilter}
        statusFilter={statusFilter}
      ></TMTaskList>
    </>
  );
}

export default TaskManager;
