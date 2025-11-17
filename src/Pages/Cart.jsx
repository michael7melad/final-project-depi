import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Add useDispatch
import { cartAPI } from "../services/api";
import { refreshUserCounts } from "../store/actions/authActions"; // Import the action
import {
  FiShoppingCart,
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowRight,
  FiHome,
  FiShoppingBag,
  FiCreditCard,
  FiHeart,
  FiX,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { RecommendedProducts } from "../components/RecommendedProducts";

export const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [removing, setRemoving] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Add dispatch

  useEffect(() => {
    if (!user) {
      toast.error("Please login to view your cart");
      navigate("/login");
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 404) {
        setCart({ data: { products: [], totalCartPrice: 0 } });
      }
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, newCount) => {
    if (newCount < 1) return;

    try {
      setUpdating(productId);
      await cartAPI.updateCart(productId, newCount);
      const response = await cartAPI.getCart();
      setCart(response.data);

      // Refresh navbar counts after updating cart
      dispatch(refreshUserCounts());

      toast.success("Cart updated successfully");
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    } finally {
      setUpdating(false);
    }
  };

  const removeItem = async (productId) => {
    try {
      setRemoving(productId);
      await cartAPI.removeFromCart(productId);
      const response = await cartAPI.getCart();
      setCart(response.data);

      // Refresh navbar counts after removing item
      dispatch(refreshUserCounts());

      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to remove item");
    } finally {
      setRemoving(null);
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear your entire cart?"))
      return;

    try {
      await cartAPI.clearCart();
      setCart({ data: { products: [], totalCartPrice: 0 } });

      // Refresh navbar counts after clearing cart
      dispatch(refreshUserCounts());

      toast.success("Cart cleared successfully");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading your cart...
          </p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.data.products || cart.data.products.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingCart className="text-4xl text-white" />
            </div>

            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Your Cart is Empty
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Start
              shopping to discover amazing products!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                onClick={() => scrollTo(0, 0)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
              >
                <FiShoppingBag className="mr-2" />
                Start Shopping
              </Link>

              <Link
                to="/"
                onClick={() => scrollTo(0, 0)}
                className="inline-flex items-center px-6 py-3 border-2 border-green-500 text-green-600 dark:text-green-400 rounded-xl font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
              >
                <FiHome className="mr-2" />
                Go Home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const { products, totalCartPrice } = cart.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {products.length} item{products.length !== 1 ? "s" : ""} in your
              cart
            </p>
          </div>

          <div className="flex gap-3 mt-4 lg:mt-0">
            <button
              onClick={clearCart}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 flex items-center"
            >
              <FiTrash2 className="mr-2" />
              Clear Cart
            </button>

            <Link
              to="/products"
              onClick={() => scrollTo(0, 0)}
              className="px-4 py-2 border border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200 flex items-center"
            >
              <FiPlus className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            {products.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200/50 dark:border-gray-700 overflow-hidden"
              >
                <AnimatePresence>
                  {removing === item.product._id && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-red-500/10 flex items-center justify-center z-10 rounded-2xl"
                    >
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {/* Product Image */}
                  <Link
                    onClick={() => scrollTo(0, 0)}
                    to={`/products/${item.product._id}`}
                    className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600"
                  >
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/products/${item.product._id}`}
                      onClick={() => scrollTo(0, 0)}
                      className="block"
                    >
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                        {item.product.title}
                      </h3>
                    </Link>

                    <p className="text-green-600 dark:text-green-400 text-lg font-bold mb-2">
                      ${item.price}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>
                        Brand: {item.product.brand?.name || "Unknown"}
                      </span>
                      <span>Category: {item.product.category?.name}</span>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.count - 1)
                        }
                        disabled={
                          updating === item.product._id || item.count <= 1
                        }
                        className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <FiMinus />
                      </button>

                      <span className="px-4 py-1 text-gray-900 dark:text-white min-w-[50px] text-center">
                        {updating === item.product._id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-500 mx-auto"></div>
                        ) : (
                          item.count
                        )}
                      </span>

                      <button
                        onClick={() =>
                          updateQuantity(item.product._id, item.count + 1)
                        }
                        disabled={updating === item.product._id}
                        className="px-3 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.product._id)}
                      disabled={removing === item.product._id}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove item"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">
                      Item Total:
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${(item.price * item.count).toFixed(2)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200/50 dark:border-gray-700 p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Subtotal ({products.length} items)</span>
                  <span>${totalCartPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-600 dark:text-green-400">
                    Free
                  </span>
                </div>

                <div className="flex justify-between text-gray-600 dark:text-gray-300">
                  <span>Tax</span>
                  <span>${(totalCartPrice * 0.1).toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>${(totalCartPrice * 1.1).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center mb-4"
              >
                <FiCreditCard className="mr-2" />
                Proceed to Checkout
              </button>

              <Link
                to="/wishlist"
                onClick={() => scrollTo(0, 0)}
                className="w-full border border-green-500 text-green-600 dark:text-green-400 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 flex items-center justify-center"
              >
                <FiHeart className="mr-2" />
                View Wishlist
              </Link>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <FiCreditCard className="text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Secure Checkout
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Your payment information is safe with us
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommended Products */}
        <RecommendedProducts
          currentProductIds={products.map((item) => item.product._id)}
          category={
            products.length > 0 ? products[0].product.category?._id : null
          }
        />
      </div>
    </div>
  );
};
