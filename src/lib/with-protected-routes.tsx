import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "./redux-store/hooks";
import { RootState } from "./redux-store/store";
import { Spinner } from "@/components/spinner";

const withProtectedRoute = (WrappedComponent: React.ComponentType<any>) => {
  const WithProtectedRoute: React.FC = (props) => {
    const router = useRouter();
    const state = useAppSelector((state: RootState) => state.userDetail);

    if (state.loading) {
      return (
        <div className="flex items-center justify-center h-[500px]">
          <Spinner />
        </div>
      );
    }

    if (!state.token) {
      router.push("/");
    }

    return <WrappedComponent {...props} />;
  };

  return WithProtectedRoute;
};

export default withProtectedRoute;
