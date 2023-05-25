import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface login {
  email: string;
  password: string;
}

interface user extends login {
  name: string;
}

interface users {
  users: user[];
}

const initialState: users = {
  users: [],
};

export const userRegister = createAsyncThunk(
  "auth/createuser",
  async ({ name, email, password }: user) => {
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();
    return data;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
  },
});

export default userSlice.reducer;
