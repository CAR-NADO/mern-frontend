import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  id?: string;
  token?: string;
}

const initialState: AuthState = {
  id: undefined,
  token: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("State & Action:", { state, action });
      return { ...state, ...action.payload };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
