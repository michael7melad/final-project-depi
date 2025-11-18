import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiPhone, FiEdit, FiShoppingBag } from "react-icons/fi";

export const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Please login to view your profile
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 mt-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            My Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your account information
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-green-200/50 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                    <FiUser className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Member since 2024
                    </p>
                  </div>
                </div>
                <button className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors duration-200">
                  <FiEdit className="text-green-600 dark:text-green-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <FiMail className="text-green-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {user.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <FiPhone className="text-green-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="text-gray-900 dark:text-white">
                      {user.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <FiShoppingBag className="text-green-500 text-lg" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Role
                    </p>
                    <p className="text-gray-900 dark:text-white capitalize">
                      {user.role || "Customer"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-200/50 dark:border-gray-700">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Account Stats
              </h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Orders
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    5
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Wishlist
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    12
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    Reviews
                  </span>
                  <span className="font-semibold text-green-600 dark:text-green-400">
                    8
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
