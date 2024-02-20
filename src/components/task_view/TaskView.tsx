import { useState } from "react";
import SearchBar from "../SearchBar";
import TVTaskList from "./TVTaskList";

function TaskView() {
  const [textFilter, setTextFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");

  return (
    <>
      <SearchBar
        onTextFilterChange={setTextFilter}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      ></SearchBar>
      <br />
      <br />
      <TVTaskList
        textFilter={textFilter}
        statusFilter={statusFilter}
      ></TVTaskList>
    </>
  );
}

export default TaskView;
