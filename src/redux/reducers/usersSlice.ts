import {
  PayloadAction,
  createAsyncThunk,
  createSlice,
  current,
} from "@reduxjs/toolkit";
import User from "../../types/User";
import { RootState } from "../store";
import {
  createUser,
  deleteUser,
  fetchUsers,
  setUsers,
  updateUser,
} from "../../services/http/usersHttp";
import { areEqual } from "../../utils/compareArray";

interface IUsersState {
  past: User[][];
  users: User[];
  future: User[][];
}

const initialState: IUsersState = {
  past: [],
  users: [],
  future: [],
};

const fetchInitialUsers = createAsyncThunk(
  "users/fetchInitialUsers",
  async () => {
    const response = await fetchUsers();
    const users = response.map((user: User) => Object.assign({}, user));
    return users;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      let newUsers: User[] = [...state.users];
      newUsers.push(action.payload);

      setPastAndFuture(state, newUsers);
      createUser(action.payload);
    },
    editUser: (state, action: PayloadAction<User>) => {
      let newUsers: User[] = [];
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id === action.payload.id)
          newUsers.push(action.payload);
        else newUsers.push(state.users[i]);
      }

      setPastAndFuture(state, newUsers);
      updateUser(action.payload);
    },
    removeUser: (state, action: PayloadAction<User>) => {
      let newUsers: User[] = [];
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id !== action.payload.id)
          newUsers.push(state.users[i]);
      }

      setPastAndFuture(state, newUsers);
      deleteUser(action.payload);
    },
    undoUsers: (state) => {
      if (
        state.past.length !== 0 &&
        !areEqual<User>(
          current(state.users),
          current(state.past[state.past.length - 1])
        )
      ) {
        state.future.unshift(state.users);
        state.users = state.past.pop()!;
        setUsers(state.users);
      }
    },
    redoUsers: (state) => {
      if (state.future.length !== 0) {
        state.past.push(state.users);
        state.users = state.future.shift()!;
        setUsers(state.users);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.past.push(state.users);
    });
  },
});

function setPastAndFuture(state: any, newUsers: User[]): void {
  state.past.push(state.users);
  state.users = newUsers;
  state.future = [];
}

export type { IUsersState };
export { usersSlice, fetchInitialUsers };
export const { addUser, editUser, removeUser, undoUsers, redoUsers } =
  usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;
export default usersSlice.reducer;
