import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserDetails {
  username: string;
  bio: string;
  token: string;
}

const userDetailUpdateThunk = createAsyncThunk(
  "user-detail-update",
  async ({ username, bio, token }: UserDetails, { rejectWithValue }) => {
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
    const json = await resp.json();
    if (resp.ok) {
      return json;
    }
    return rejectWithValue(json);
  }
);

export default userDetailUpdateThunk;
