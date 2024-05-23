import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./features/slices/user/sign-up-slice";
import loginReducer from "./features/slices/user/login-slice";
import userDetail from "./features/slices/user/user-detail-slice";

export const makeStore = () => {
  return configureStore({
    reducer: { signupReducer, loginReducer, userDetail },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
