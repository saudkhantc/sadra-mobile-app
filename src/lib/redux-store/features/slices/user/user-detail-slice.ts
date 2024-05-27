import { createSlice } from "@reduxjs/toolkit";
import userDetailThunk from "../../thunks/user/user-detail-thunk";
import userDetailUpdateThunk from "../../thunks/user/user-detail-update";
import uploadImageThunk from "../../thunks/upload/upload-image-thunk";

interface userState {
  success: boolean;
  token: string;
  message: string;
  loading: boolean;
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
  message: "",
  token: "",
  loading:true,
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
  reducers: {
    logoutUser(_) {
      localStorage.removeItem("token");
      return initialState;
    },
    loginUser(state, user) {
      localStorage.setItem("token", user.payload.token);
      state.token = user.payload.token;
      state.success = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userDetailThunk.fulfilled, (state, action) => {
        Object.assign(state.user, action.payload.user);
        state.success = true;
        state.loading = false;
      })
      .addCase(userDetailThunk.rejected, (state, action: any) => {
        state.message = action.payload.message;
        state.success = false;
        state.loading = false;
        state.token = ""
      });
    builder.addCase(userDetailUpdateThunk.fulfilled, (state, action) => {
      Object.assign(state.user, action.payload.user);
      state.success = true;
    });
    builder.addCase(uploadImageThunk.fulfilled, (state, action) => {
      state.user.image = action.payload.data.secure_url;
    });
  },
});

export const { logoutUser, loginUser } = userDetailSlice.actions;

export default userDetailSlice.reducer;
