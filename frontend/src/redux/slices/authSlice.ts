import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

// Async Thunks
export const signUp = createAsyncThunk(
  "auth/signUp",
  async (userData: { name: string; email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/signup", userData);
      return response.data; // Assume it returns { user, token }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Sign-up failed");
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", credentials);
      return response.data; // Assume it returns { user, token }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(signUp.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logIn.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.status = "idle";
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(logIn.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logOut } = authSlice.actions;
export default authSlice.reducer;
