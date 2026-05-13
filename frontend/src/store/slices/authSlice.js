import { createSlice } from "@reduxjs/toolkit";

const ADMIN_KEY = "scoopiez_admin";
const BIO_KEY = "scoopiez_bio";
const ADMIN_ID = "admin";
const ADMIN_PASS = "scoopiez123";

const initialState = {
  isLoggedIn: sessionStorage.getItem(ADMIN_KEY) === "true",
  shopBio: localStorage.getItem(BIO_KEY) || "Welcome to Scoopiez! We specialize in artisanal gelato, freshly baked decadence, and handcrafted mixology. Our ingredients are sourced globally—from Sicilian pistachios to Madagascar bourbon vanilla—to ensure every scoop is a masterpiece of flavor.",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { id, password } = action.payload;
      const ok = id === ADMIN_ID && password === ADMIN_PASS;
      if (ok) {
        state.isLoggedIn = true;
        sessionStorage.setItem(ADMIN_KEY, "true");
      }
      return state;
    },
    logout(state) {
      state.isLoggedIn = false;
      sessionStorage.removeItem(ADMIN_KEY);
    },
    updateBio(state, action) {
      state.shopBio = action.payload;
      localStorage.setItem(BIO_KEY, action.payload);
    },
  },
});

export const { login, logout, updateBio } = authSlice.actions;
export default authSlice.reducer;
