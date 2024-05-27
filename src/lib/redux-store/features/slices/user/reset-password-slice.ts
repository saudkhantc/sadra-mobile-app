import { createSlice } from "@reduxjs/toolkit";
import { resetPasswordThunk } from "../../thunks/user/reset-password";

interface ResetPasswordState {
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ResetPasswordState = {
  loading: false,
  error: null,
  successMessage: null,
};

const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(resetPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resetPasswordThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default resetPasswordSlice.reducer;
