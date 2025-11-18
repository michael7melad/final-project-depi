import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { wishlistAPI, cartAPI } from "../services/api";
import { refreshUserCounts } from "../store/actions/authActions";
import {
  FiHeart,
  FiShoppingCart,
  FiTrash2,
  FiStar,
  FiShoppingBag,
  FiHome,
  FiArrowRight,
  FiPlus,
  FiEye,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { RecommendedProducts } from "../components/RecommendedProducts";

export const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      toast.error("Please login to view your wishlist");
      navigate("/login");
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistAPI.getWishlist();
      setWishlist(response.data.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      if (error.response?.status === 404) {
        setWishlist([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Get the most common category from wishlist for better recommendations
  const getRecommendedCategory = () => {
    if (wishlist.length === 0) return null;

    const categoryCounts = {};
    wishlist.forEach((item) => {
      if (item.category?._id) {
        categoryCounts[item.category._id] =
          (categoryCounts[item.category._id] || 0) + 1;
      }
    });

    // Find the category with the highest count
    const mostCommonCategory = Object.keys(categoryCounts).reduce(
      (a, b) => (categoryCounts[a] > categoryCounts[b] ? a : b),
      null
    );

    return mostCommonCategory;
  };

  const removeFromWishlist = async (productId) => {
    try {
      setRemoving(productId);
      await wishlistAPI.removeFromWishlist(productId);
      setWishlist(wishlist.filter((item) => item._id !== productId));
      dispatch(refreshUserCounts());
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item");
    } finally {
      setRemoving(null);
    }
  };

  const addToCartFromWishlist = async (productId) => {
    try {
      setAddingToCart(productId);
      await cartAPI.addToCart(productId, 1);
      dispatch(refreshUserCounts());
      toast.success("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setAddingToCart(null);
    }
  };

  const moveAllToCart = async () => {
    if (wishlist.length === 0) return;

    try {
      const promises = wishlist.map((item) => cartAPI.addToCart(item._id, 1));
      await Promise.all(promises);
      dispatch(refreshUserCounts());
      toast.success("All items added to cart!");
    } catch (error) {
      console.error("Error moving items to cart:", error);
      toast.error("Failed to add some items to cart");
    }
  };

  const clearWishlist = async () => {
    if (wishlist.length === 0) return;
    if (!window.confirm("Are you sure you want to clear your entire wishlist?"))
      return;

    try {
      const promises = wishlist.map((item) =>
        wishlistAPI.removeFromWishlist(item._id)
      );
      await Promise.all(promises);
      setWishlist([]);
      dispatch(refreshUserCounts());
      toast.success("Wishlist cleared successfully");
    } catch (error) {
      console.error("Error clearing wishlist:", error);
      toast.error("Failed to clear wishlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading your wishlist...
          </p>
        </div>
      </div>
    );
  }

  const recommendedCategory = getRecommendedCategory();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <FiHeart className="text-3xl text-white" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Wishlist
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300">
            {wishlist.length} item{wishlist.length !== 1 ? "s" : ""} saved for
            later
          </p>
        </motion.div>

        {/* Action Buttons */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-3 justify-center mb-8"
          >
            <button
              onClick={moveAllToCart}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center shadow-lg"
            >
              <FiShoppingCart className="mr-2" />
              Add All to Cart
            </button>

            <button
              onClick={clearWishlist}
              className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 flex items-center"
            >
              <FiTrash2 className="mr-2" />
              Clear Wishlist
            </button>

            <Link
              to="/products"
              onClick={() => scrollTo(0, 0)}
              className="px-6 py-3 border-2 border-green-500 text-green-600 dark:text-green-400 rounded-xl font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200 flex items-center"
            >
              <FiPlus className="mr-2" />
              Continue Shopping
            </Link>
          </motion.div>
        )}

        {/* Wishlist Items */}
        {wishlist.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {wishlist.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200/50 dark:border-gray-700 overflow-hidden group relative"
              >
                <AnimatePresence>
                  {(removing === product._id ||
                    addingToCart === product._id) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/80 dark:bg-gray-800/80 flex items-center justify-center z-10 rounded-2xl"
                    >
                      <div
                        className={`animate-spin rounded-full h-8 w-8 border-b-2 ${
                          removing === product._id
                            ? "border-red-500"
                            : "border-green-500"
                        }`}
                      ></div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Product Image */}
                <Link
                  to={`/products/${product._id}`}
                  onClick={() => scrollTo(0, 0)}
                  className="block relative h-48 overflow-hidden"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          addToCartFromWishlist(product._id);
                        }}
                        disabled={addingToCart === product._id}
                        className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
                        title="Add to Cart"
                      >
                        <FiShoppingCart />
                      </button>

                      <Link
                        to={`/products/${product._id}`}
                        onClick={() => scrollTo(0, 0)}
                        className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                        title="View Details"
                      >
                        <FiEye />
                      </Link>
                    </div>
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link
                    to={`/products/${product._id}`}
                    onClick={() => scrollTo(0, 0)}
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price and Rating */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ${product.price}
                    </span>
                    <div className="flex items-center">
                      <FiStar className="text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </div>

                  {/* Category and Brand */}
                  <div className="flex items-center gap-2 mb-4">
                    {product.brand && (
                      <span className="inline-block bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                        {product.brand.name}
                      </span>
                    )}
                    {product.category && (
                      <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                        {product.category.name}
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCartFromWishlist(product._id)}
                      disabled={addingToCart === product._id}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 px-3 rounded-lg text-sm font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingToCart === product._id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <>
                          <FiShoppingCart className="mr-1" size={14} />
                          Add to Cart
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      disabled={removing === product._id}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Remove from Wishlist"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12"
          >
            <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiHeart className="text-4xl text-white" />
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Your Wishlist is Empty
            </h3>

            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
              Save items you love to your wishlist. Review them anytime and
              easily move them to your cart.
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
        )}

        {/* Recommended Products Section */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200/50 dark:border-gray-700 p-6">
              <RecommendedProducts
                currentProductIds={wishlist.map((item) => item._id)}
                category={recommendedCategory} // Use the calculated category
                limit={4}
                title="Recommended For You"
                showViewAll={true}
              />
            </div>
          </motion.div>
        )}

        {/* Wishlist Stats */}
        {wishlist.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {wishlist.length}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Items Saved
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                $
                {wishlist
                  .reduce((total, item) => total + item.price, 0)
                  .toFixed(2)}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Total Value
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                {new Set(wishlist.map((item) => item.category?.name)).size}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                Categories
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
