import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetRequestPasswordThunk } from "../../thunks/user/request-reset-password-thunk";

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
      .addCase(resetRequestPasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(resetRequestPasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(resetRequestPasswordThunk.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default resetPasswordSlice.reducer;
