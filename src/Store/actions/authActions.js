import { authAPI, cartAPI, wishlistAPI } from "../../services/api";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateCartCount,
  updateWishlistCount,
} from "../slices/authSlice";
import { toast } from "react-toastify";

// Helper function to fetch cart and wishlist counts with better error handling
const fetchUserCounts = async (token) => {
  try {
    let cartCount = 0;
    let wishlistCount = 0;

    // Fetch cart count with timeout and better error handling
    try {
      const cartResponse = await cartAPI.getCart();
      cartCount = cartResponse.data.numOfCartItems || 0;
    } catch (error) {
      console.log("Cart fetch error (non-critical):", error.message);
      // Don't throw error, just use default count
    }

    // Fetch wishlist count with timeout and better error handling
    try {
      const wishlistResponse = await wishlistAPI.getWishlist();
      wishlistCount = wishlistResponse.data.count || 0;
    } catch (error) {
      console.log("Wishlist fetch error (non-critical):", error.message);
      // Don't throw error, just use default count
    }

    return { cartCount, wishlistCount };
  } catch (error) {
    console.error("Unexpected error in fetchUserCounts:", error);
    return { cartCount: 0, wishlistCount: 0 };
  }
};

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await authAPI.login(credentials);

    if (response.data.message === "success") {
      const { token, user } = response.data;

      // First, login successfully without waiting for counts
      dispatch(
        loginSuccess({
          user,
          token,
          cartItemsCount: 0, // Set initial counts to 0
          wishlistItemsCount: 0,
        })
      );

      toast.success("Login successful!");

      // Then, try to fetch counts in background (non-blocking)
      try {
        const { cartCount, wishlistCount } = await fetchUserCounts(token);
        dispatch(updateCartCount(cartCount));
        dispatch(updateWishlistCount(wishlistCount));
      } catch (error) {
        console.log("Background count fetch failed:", error);
        // This is non-critical, so we don't show error to user
      }

      return { success: true };
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Login failed. Please try again.";
    dispatch(loginFailure(errorMessage));
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await authAPI.register(userData);

    if (response.data.message === "success") {
      toast.success("Registration successful! Please login.");
      return { success: true };
    } else {
      throw new Error(response.data.message || "Registration failed");
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.errors?.email?.msg ||
      error.response?.data?.errors?.phone?.msg ||
      error.response?.data?.message ||
      "Registration failed. Please try again.";
    dispatch(loginFailure(errorMessage));
    toast.error(errorMessage);
    return { success: false, error: errorMessage };
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  toast.success("Logged out successfully!");
};

export const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem("userToken");
  const userData = localStorage.getItem("userData");

  if (token && userData) {
    try {
      const user = JSON.parse(userData);

      // First, set basic auth state
      dispatch(
        loginSuccess({
          user,
          token,
          cartItemsCount: 0,
          wishlistItemsCount: 0,
        })
      );

      // Then try to fetch counts in background
      try {
        const { cartCount, wishlistCount } = await fetchUserCounts(token);
        dispatch(updateCartCount(cartCount));
        dispatch(updateWishlistCount(wishlistCount));
      } catch (error) {
        console.log("Background count fetch during checkAuth failed:", error);
        // Non-critical, continue without counts
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
      // If there's an error parsing user data, logout
      dispatch(logout());
    }
  }
};

// Action to update cart count
export const updateCartItemsCount = (count) => (dispatch) => {
  dispatch(updateCartCount(count));
};

// Action to update wishlist count
export const updateWishlistItemsCount = (count) => (dispatch) => {
  dispatch(updateWishlistCount(count));
};

// Action to refresh both counts
export const refreshUserCounts = () => async (dispatch, getState) => {
  const { token } = getState().auth;

  if (token) {
    try {
      const { cartCount, wishlistCount } = await fetchUserCounts(token);
      dispatch(updateCartCount(cartCount));
      dispatch(updateWishlistCount(wishlistCount));
    } catch (error) {
      console.error("Error refreshing user counts:", error);
    }
  }
};
