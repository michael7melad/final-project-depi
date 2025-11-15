import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
  timeout: 10000,
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers["token"] = token;
  }
  return config;
});

// Response interceptor for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => API.post("/auth/signup", userData),
  login: (credentials) => API.post("/auth/signin", credentials),
  forgotPassword: (email) => API.post("/auth/forgotPasswords", { email }),
  verifyResetCode: (resetCode) => API.post("/auth/verifyResetCode", resetCode),
  resetPassword: (newPassword) => API.put("/auth/resetPassword", newPassword),
};

export const userAPI = {
  getProfile: () => API.get("/users/profile"),
  updateProfile: (userData) => API.put("/users/update", userData),
  changePassword: (passwords) => API.put("/users/changePassword", passwords),
};

// Add this to your existing API exports
export const productAPI = {
  getProducts: (params = {}) => API.get("/products", { params }),
  getProduct: (id) => API.get(`/products/${id}`),
  getCategories: () => API.get("/categories"),
  getBrands: () => API.get("/brands"), // Add this line
};

export const cartAPI = {
  getCart: () => API.get("/cart"),
  addToCart: (productId, count = 1) => API.post("/cart", { productId, count }),
  updateCart: (productId, count) => API.put(`/cart/${productId}`, { count }),
  removeFromCart: (productId) => API.delete(`/cart/${productId}`),
  clearCart: () => API.delete("/cart"),
};

export const wishlistAPI = {
  getWishlist: () => API.get("/wishlist"),
  addToWishlist: (productId) => API.post("/wishlist", { productId }),
  removeFromWishlist: (productId) => API.delete(`/wishlist/${productId}`),
};

export default API;
