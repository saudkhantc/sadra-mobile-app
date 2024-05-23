import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserDetails {
  username: string;
  bio: string;
  token: string;
}

const userDetailUpdateThunk = createAsyncThunk(
  "user-detail-update",
  async ({ username, bio, token }: UserDetails) => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/auth/me/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ username, bio }),
      }
    );
  }
);

export default userDetailUpdateThunk;
