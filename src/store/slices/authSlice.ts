import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
  id: number;
  email: string;
  name?: string | null;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

type AuthPayload = {
  user: AuthUser;
  token: string;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeAuth: (state, action: PayloadAction<AuthPayload | null>) => {
      state.isInitialized = true;

      if (!action.payload) {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        return;
      }

      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    setCredentials: (state, action: PayloadAction<AuthPayload>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isInitialized = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
  },
});

export const { initializeAuth, setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
