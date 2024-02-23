import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import User from "../../types/User";
import { writeCacheUser } from "../../services/auth/cacheAuth";
import { RootState } from "../store";

interface IAuthUserState {
  user: User | null;
}

const initialState: IAuthUserState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      writeCacheUser(action.payload);
      state.user = action.payload;
    },
    logout: (state) => {
      writeCacheUser(null);
      state.user = null;
    },
  },
});

export type { IAuthUserState };
export { authSlice };
export const { login, logout } = authSlice.actions;
export const selectAuthUser = (state: RootState) => state.auth.user;
export default authSlice.reducer;
