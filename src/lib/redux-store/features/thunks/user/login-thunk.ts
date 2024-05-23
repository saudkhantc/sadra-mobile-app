import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserCredentials {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk(
  "loginThunk",
  async ({ email, password }: UserCredentials, { rejectWithValue }) => {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await resp.json();
    if (resp.ok) {
      return json;
    }
    return rejectWithValue(json);
  }
);
