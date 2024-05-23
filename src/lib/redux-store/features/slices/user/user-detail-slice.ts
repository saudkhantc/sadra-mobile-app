import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import userDetailThunk from "../../thunks/user/user-detail-thunk";
import userDetailUpdateThunk from "../../thunks/user/user-detail-update";

interface userState {
  success: boolean;
  user: {
    _id: string;
    username: string;
    email: string;
    password: string;
    image: string;
    bio: string;
    createdAt: string;
    updatedAt: string;
  };
}

const initialState: userState = {
  success: false,
  user: {
    _id: "",
    username: "",
    email: "",
    password: "",
    image: "",
    bio: "",
    createdAt: "",
    updatedAt: "",
  },
};

const userDetailSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(userDetailThunk.fulfilled, (state, action) => {
      Object.assign(state.user, action.payload.user);
      state.success = true;
    });
    builder.addCase(userDetailUpdateThunk.fulfilled, (state, action) => {
      Object.assign(state.user, action.payload.user);
      state.success = true;
    });
  },
});

export default userDetailSlice.reducer;
