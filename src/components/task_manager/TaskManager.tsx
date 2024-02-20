import { useState } from "react";
import SearchBar from "../SearchBar";
import TMUserList from "./TMUserList";
import TMTaskList from "./TMTaskList";

function TaskManager() {
  const [userFilter, setUserFilter] = useState<string>("");
  const [textFilter, setTextFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  return (
    <>
      <SearchBar
        onTextFilterChange={setTextFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onUserFilterChange={setUserFilter}
      ></SearchBar>

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
