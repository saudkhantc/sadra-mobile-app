import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./features/slices/user/sign-up-slice";
import loginReducer from "./features/slices/user/login-slice";
import userDetail from "./features/slices/user/user-detail-slice";
import requestResetPasswordReducer from "./features/slices/user/request-reset-password-slice";
import resetPasswordReducer from "./features/slices/user/reset-password-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      signupReducer,
      loginReducer,
      userDetail,
      requestResetPasswordReducer,
      resetPasswordReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
