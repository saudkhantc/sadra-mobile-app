import { createAsyncThunk } from "@reduxjs/toolkit";

const userDetailThunk = createAsyncThunk(
  "detail thunk",
  async (token: string, { rejectWithValue }) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    const json = await resp.json();
    if (resp.ok) {
      return json;
    }
    return rejectWithValue(json);
  }
);

export default userDetailThunk;
