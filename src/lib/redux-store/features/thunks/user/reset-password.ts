import { createAsyncThunk } from "@reduxjs/toolkit";

interface resetPasswordTypes {
  token: string;
  password: string;
}

export const resetPasswordThunk = createAsyncThunk(
  "resetPasswordThunk",
  async ({ token, password }: resetPasswordTypes, { rejectWithValue }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);
