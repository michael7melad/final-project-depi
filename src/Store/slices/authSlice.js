import { createSlice } from "@reduxjs/toolkit";

// Get initial state from localStorage
const getInitialState = () => {
  const token = localStorage.getItem("userToken");
  const userData = localStorage.getItem("userData");

  return {
    user: userData ? JSON.parse(userData) : null,
    token: token || null,
    isLoading: false,
    error: null,
    cartItemsCount: 0,
    wishlistItemsCount: 0,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    loginStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.cartItemsCount = action.payload.cartItemsCount || 0;
      state.wishlistItemsCount = action.payload.wishlistItemsCount || 0;
      state.error = null;

      // Save to localStorage
      localStorage.setItem("userToken", action.payload.token);
      localStorage.setItem("userData", JSON.stringify(action.payload.user));
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.cartItemsCount = 0;
      state.wishlistItemsCount = 0;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    },
    updateCartCount: (state, action) => {
      state.cartItemsCount = action.payload;
    },
    updateWishlistCount: (state, action) => {
      state.wishlistItemsCount = action.payload;
    },
    // New action to initialize auth state from localStorage
    initializeAuth: (state) => {
      const token = localStorage.getItem("userToken");
      const userData = localStorage.getItem("userData");

      if (token && userData) {
        state.user = JSON.parse(userData);
        state.token = token;
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  updateCartCount,
  updateWishlistCount,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
