import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Task from "../../types/Task";
import { RootState } from "../store";
import { fetchTasks, postTasks } from "../../services/http/tasksHttp";

interface ITasksState {
  tasks: Task[];
}

const initialState: ITasksState = {
  tasks: [],
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
      state.tasks.push(action.payload);
      postTasks(state.tasks);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id === action.payload.id)
          state.tasks[i] = action.payload;
      }
      postTasks(state.tasks);
    },
    removeTask: (state, action: PayloadAction<Task>) => {
      let newTasks: Task[] = [];
      for (let i = 0; i < state.tasks.length; i++) {
        if (state.tasks[i].id !== action.payload.id)
          newTasks.push(state.tasks[i]);
      }
      state.tasks = newTasks;
      postTasks(state.tasks);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    });
  },
});

export type { ITasksState };
export { tasksSlice, fetchInitialTasks };
export const { addTask, editTask, removeTask } = tasksSlice.actions;
export const selectTasks = (state: RootState) => state.tasks.tasks;
export default tasksSlice.reducer;
