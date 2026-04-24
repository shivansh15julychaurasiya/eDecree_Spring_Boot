import { createSlice } from "@reduxjs/toolkit";

const stored = JSON.parse(localStorage.getItem("auth"));

const initialState = {
  user: stored?.user || null,
  token: stored?.token || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { username, roles, token } = action.payload;

      state.user = { username, roles };
      state.token = token;

      localStorage.setItem(
        "auth",
        JSON.stringify({
          user: state.user,
          token: state.token,
        })
      );
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("auth");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;