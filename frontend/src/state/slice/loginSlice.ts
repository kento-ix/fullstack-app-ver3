import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginState {
  loading: boolean;
  isAuthenticated: boolean;
  user: { id: number; name: string; email: string } | null;
  token: string | null;
  error: string | null;
}

const initialState: LoginState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("token"), // Retrieve token from localStorage
  error: null,
};

// If there's a token in localStorage, consider the user authenticated
if (initialState.token) {
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Get user from localStorage
  if (user && user.id) {
    initialState.user = user;
    initialState.isAuthenticated = true;
  }
}

export const loginAsync = createAsyncThunk(
  "login/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/flask/login",
        credentials
      );

      const { access_token, user } = response.data;

      // Save token and user to localStorage
      localStorage.setItem("token", access_token);
      localStorage.setItem("user", JSON.stringify(user));

      return { token: access_token, user };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user"); // Remove user from localStorage
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.error = action.payload as string;
    });
  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
