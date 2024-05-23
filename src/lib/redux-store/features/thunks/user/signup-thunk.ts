import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserCredentials {
  username: string;
  email: string;
  password: string;
}


const signupThunk = createAsyncThunk(
  "signupThunk",
  async (
    { username, email, password }: UserCredentials,
    { rejectWithValue }
  ) => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    );
    const json = await resp.json();
    if (resp.ok) {
      return json;
    }

    return rejectWithValue(json);
  }
);

export default signupThunk;
