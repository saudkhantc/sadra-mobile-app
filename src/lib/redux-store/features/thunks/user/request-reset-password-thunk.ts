import { createAsyncThunk } from "@reduxjs/toolkit";

export const resetRequestPasswordThunk = createAsyncThunk(
  "resetRequestPasswordThunk",
  async ({ email }: { email: string }, { rejectWithValue }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/auth/request-password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      return data;
    }
    return rejectWithValue(data);
  }
);
