import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import Task from "../../types/Task";
import { RootState } from "../store";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  replaceAllTasks,
} from "../../services/http/tasksHttp";
import { areEqual } from "../../utils/compareArray";

interface ITasksState {
  past: Task[][];
  tasks: Task[];
  future: Task[][];
}

const initialState: ITasksState = {
  past: [],
  tasks: [],
  future: [],
};

const fetchInitialTasks = createAsyncThunk(
  "tasks/fetchInitialTasks",
  async () => {
    const response = await fetchTasks();
    const tasks = response.map((task: Task) => Object.assign({}, task));
    return tasks;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      let newTasks: Task[] = [...state.tasks];
      newTasks.push(action.payload);

      setPastAndFuture(state, newTasks);
      createTask(action.payload);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      let newTasks: Task[] = [];
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id === action.payload.id)
          newTasks.push(action.payload);
        else newTasks.push(state.tasks[i]);
      }

      setPastAndFuture(state, newTasks);
      updateTask(action.payload);
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      let newTasks: Task[] = [];
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id !== action.payload.id)
          newTasks.push(state.tasks[i]);
      }

      setPastAndFuture(state, newTasks);
      deleteTask(action.payload);
    },
    undoTasks: (state) => {
      if (
        state.past.length !== 0 &&
        !areEqual<Task>(
          current(state.tasks),
          current(state.past[state.past.length - 1])
        )
      ) {
        state.future.unshift(state.tasks);
        state.tasks = state.past.pop()!;
        replaceAllTasks(state.tasks);
      }
    },
    redoTasks: (state) => {
      if (state.future.length !== 0) {
        state.past.push(state.tasks);
        state.tasks = state.future.shift()!;
        replaceAllTasks(state.tasks);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.past.push(state.tasks);
    });
  },
});

function setPastAndFuture(state: any, newTasks: Task[]): void {
  state.past.push(state.tasks);
  state.tasks = newTasks;
  state.future = [];
}

export type { ITasksState };
export { tasksSlice, fetchInitialTasks };
export const { addTask, editTask, removeTask, undoTasks, redoTasks } =
  tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export default tasksSlice.reducer;
