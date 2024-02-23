import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";
import { RootState } from "../store";
import { fetchUsers, postUsers } from "../../services/http/usersHttp";

interface IUsersState {
  users: User[];
}

const initialState: IUsersState = {
  users: [],
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
      state.users.push(action.payload);
      postUsers(state.users);
    },
    editUser: (state, action: PayloadAction<User>) => {
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id === action.payload.id)
          state.users[i] = action.payload;
      }
      postUsers(state.users);
    },
    removeUser: (state, action: PayloadAction<User>) => {
      let newUsers: User[] = [];
      for (let i = 0; i < state.users.length; i++) {
        if (state.users[i].id !== action.payload.id)
          newUsers.push(state.users[i]);
      }
      state.users = newUsers;
      postUsers(state.users);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export type { IUsersState };
export { usersSlice, fetchInitialUsers };
export const { addUser, editUser, removeUser } = usersSlice.actions;
export const selectUsers = (state: RootState) => state.users.users;
export default usersSlice.reducer;
