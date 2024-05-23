import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux-store/hooks";
import userDetailThunk from "@/lib/redux-store/features/thunks/user/user-detail-thunk";

export const UserContainer = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.loginReducer);
  const userDetails = useAppSelector((state) => state.userDetail);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      dispatch(userDetailThunk(token));
    }
  }, [token]);

  useEffect(() => {
    if (state.token) {
      setToken(state.token);
    }
  }, [state.token]);

  return (
    <div>
      {!token ? (
        <div className="flex gap-3">
          <Link
            className="bg-white border-2 border-white hover:border-orange-700 hover:bg-orange-600 hover:text-white px-2 py-1 rounded-md font-medium"
            href="/auth/login"
          >
            Login
          </Link>
          <Link
            className="bg-white border-2 border-white hover:border-orange-700 hover:bg-orange-600 hover:text-white px-2 py-1 rounded-md font-medium"
            href="/auth/sign-up"
          >
            SignUp
          </Link>
        </div>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={userDetails.user.image} />
              <AvatarFallback>{userDetails.user.username}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{userDetails.user.username.slice(0, 10) ?? "Account"}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/auth/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};
