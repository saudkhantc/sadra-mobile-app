import { createSlice } from "@reduxjs/toolkit";
import signupThunk from "../../thunks/user/signup-thunk";

interface stateTypes {
  error: string | null;
  success: string | null;
}

const initialState: stateTypes = {
  error: null,
  success: null,
};

const signupSlice = createSlice({
  name: "registerUserSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.success = action.payload.success || null;
        state.error = null;
      })
      .addCase(signupThunk.rejected, (state, action: any) => {
        state.error = action.payload.error || null;
        state.success = null;
      });
  },
});

export default signupSlice.reducer;
