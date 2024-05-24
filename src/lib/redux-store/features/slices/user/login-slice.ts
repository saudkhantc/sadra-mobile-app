import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../../thunks/user/login-thunk";

interface User {
  [x: string]: any;
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
    reset: () => initialState,
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
export const { reset } = loginSlice.actions;

export default loginSlice.reducer;
