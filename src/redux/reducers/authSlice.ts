import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";
import { writeCacheUser } from "../../services/auth/cacheAuth";
import { RootState } from "../store";
import { loginGetUser } from "../../services/http/usersHttp";

interface IAuthUserState {
  user: User | null;
}

const initialState: IAuthUserState = {
  user: null,
};

const login = createAsyncThunk("auth/login", async (user: User) => {
  return Object.assign({}, await loginGetUser(user.email, user.password));
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginFromCache: (state, action: PayloadAction<User>) => {
      writeCacheUser(action.payload);
      state.user = action.payload;
    },
    logout: (state) => {
      writeCacheUser(null);
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload !== null) {
        writeCacheUser(action.payload);
        state.user = action.payload;
        return state;
      }
      return undefined;
    });
  },
});

export type { IAuthUserState };
export { authSlice, login };
export const { loginFromCache, logout } = authSlice.actions;
export const selectAuthUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
