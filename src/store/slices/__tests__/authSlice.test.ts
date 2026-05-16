import { describe, expect, it } from "vitest";

import authReducer, { initializeAuth, logout, setCredentials } from "../authSlice";

const user = {
  id: 1,
  email: "admin@example.com",
  name: "Admin",
};

const token = "test-token";

describe("authSlice", () => {
  it("returns initial state", () => {
    const state = authReducer(undefined, { type: "unknown" });

    expect(state).toEqual({
      user: null,
      token: null,
      isAuthenticated: false,
      isInitialized: false,
    });
  });

  it("sets credentials", () => {
    const state = authReducer(undefined, setCredentials({ user, token }));

    expect(state.user).toEqual(user);
    expect(state.token).toBe(token);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isInitialized).toBe(true);
  });

  it("initializes auth with saved credentials", () => {
    const state = authReducer(undefined, initializeAuth({ user, token }));

    expect(state.user).toEqual(user);
    expect(state.token).toBe(token);
    expect(state.isAuthenticated).toBe(true);
    expect(state.isInitialized).toBe(true);
  });

  it("initializes auth without saved credentials", () => {
    const state = authReducer(undefined, initializeAuth(null));

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isInitialized).toBe(true);
  });

  it("logs out user", () => {
    const authenticatedState = authReducer(undefined, setCredentials({ user, token }));
    const state = authReducer(authenticatedState, logout());

    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isInitialized).toBe(true);
  });
});
