import { createAsyncThunk } from "@reduxjs/toolkit";

interface uploadImagePayload {
  imageFile: File;
  token: string;
}

const uploadImageThunk = createAsyncThunk(
  "user/uploadImage",
  async ({ imageFile, token }: uploadImagePayload, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/upload`, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const json = await response.json();
    if (response.ok) {
      return json;
    }
    return rejectWithValue(json);
  }
);

export default uploadImageThunk;
