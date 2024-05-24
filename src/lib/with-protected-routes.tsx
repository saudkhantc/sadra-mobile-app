import { useRouter } from "next/navigation";
import React, {  useEffect,  } from "react";
import { useAppSelector } from "./redux-store/hooks";
import { RootState } from "./redux-store/store";

const withProtectedRoute = (WrappedComponent: React.ComponentType<any>) => {
  const WithProtectedRoute: React.FC = (props) => {
    const router = useRouter();
    const state = useAppSelector((state: RootState) => state.userDetail);

    useEffect(() => {
      if (!state.token) {
        router.push("/");
      }
    }, [state.token, router]);
    return state.token ? <WrappedComponent {...props} /> : null;
  };

  return WithProtectedRoute;
};

export default withProtectedRoute;
