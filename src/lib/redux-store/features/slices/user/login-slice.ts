import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../../thunks/user/login-thunk";

interface User {
  token?: string;
  success?: boolean;
  error?: string | null;
}

const initialState: User = {
  token: "",
  success: false,
  error: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    saveTokenToLocalStorage(state) {
      if (state.token) {
        localStorage.setItem("token", state.token);
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.success = true;
      })
      .addCase(loginThunk.rejected, (state, action: any) => {
        state.success = false;
        state.error = action.payload.error;
      });
  },
});

export const { saveTokenToLocalStorage } = loginSlice.actions;

export default loginSlice.reducer;
