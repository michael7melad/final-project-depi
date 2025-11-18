// components/RecommendedProducts.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { productAPI } from "../services/api";
import { FiArrowRight, FiStar, FiTag } from "react-icons/fi";

export const RecommendedProducts = ({
  currentProductIds = [],
  category = null,
  limit = 4,
}) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedProducts = async () => {
      try {
        setLoading(true);

        let params = {
          page: 1,
          limit: limit + currentProductIds.length, // Get extra to filter out current products
          sort: "-sold,-ratingsAverage", // Show popular and highly rated products
        };

        // If we have a category, use it for better recommendations
        if (category) {
          params.category = category;
        }

        const response = await productAPI.getProducts(params);
        let products = response.data.data || [];

        // Filter out current products
        if (currentProductIds.length > 0) {
          products = products.filter(
            (product) => !currentProductIds.includes(product._id)
          );
        }

        // Take only the required limit
        setRecommendedProducts(products.slice(0, limit));
      } catch (error) {
        console.error("Error fetching recommended products:", error);
        setRecommendedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedProducts();
  }, [currentProductIds, category, limit]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            You Might Also Like
          </h2>
          <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4 animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg mb-3"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }

  if (recommendedProducts.length === 0) {
    return null; // Don't show section if no recommendations
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="mt-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          You Might Also Like
        </h2>
        <Link
          onClick={() => scrollTo(0, 0)}
          to="/products"
          className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 flex items-center transition-colors duration-200"
        >
          View All <FiArrowRight className="ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recommendedProducts.map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-green-200/50 dark:border-gray-700"
          >
            <Link
              to={`/products/${product._id}`}
              onClick={() => scrollTo(0, 0)}
              className="block"
            >
              <div className="h-48">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Brand */}
                {product.brand && (
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                      <FiTag className="mr-1" size={12} />
                      {product.brand.name}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    ${product.price}
                  </span>
                  <div className="flex items-center">
                    <FiStar className="text-yellow-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                      {product.ratingsAverage || 0}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
