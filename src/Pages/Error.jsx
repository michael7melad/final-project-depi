import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiArrowLeft, FiAlertTriangle } from "react-icons/fi";

export const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md mx-auto text-center"
      >
        {/* Error Icon */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-20 h-20 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <FiAlertTriangle className="text-3xl text-white" />
        </motion.div>

        {/* Error Content */}
        <h1 className="text-8xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            onClick={() => scrollTo(0, 0)}
            className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            <FiHome className="mr-2" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center px-6 py-3 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};
