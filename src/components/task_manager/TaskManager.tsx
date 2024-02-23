import { useState } from "react";
import SearchBar from "../SearchBar";
import TMUserList from "./TMUserList";
import TMTaskList from "./TMTaskList";
import { useAppDispatch } from "../../redux/hooks";
import { redoTasks, undoTasks } from "../../redux/reducers/tasksSlice";

import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import { Fab } from "@mui/material";

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
      <div style={{textAlign:"right",marginTop:"-5rem",marginRight:"1rem"}}>
      <Fab sx={{marginRight:"1rem"}} onClick={()=>null}><UndoIcon/></Fab>
      <Fab onClick={()=>null}><RedoIcon/></Fab>
      </div>
      <TMTaskList
        userFilter={userFilter}
        textFilter={textFilter}
        statusFilter={statusFilter}
      ></TMTaskList>
    </>
  );
}

export default TaskManager;
