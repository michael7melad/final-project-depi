// NavBar

import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  checkAuth,
  refreshUserCounts,
} from "../store/actions/authActions";
import {
  FiShoppingBag,
  FiUser,
  FiHeart,
  FiSearch,
  FiMenu,
  FiX,
  FiLogOut,
  FiShoppingCart,
} from "react-icons/fi";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, cartItemsCount, wishlistItemsCount } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    // Refresh counts when component mounts
    if (user) {
      dispatch(refreshUserCounts());
    }
  }, [dispatch, user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/categories", label: "Categories" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const iconItems = [
    { icon: FiSearch, label: "Search", action: () => console.log("Search") },
    {
      icon: FiHeart,
      label: "Wishlist",
      path: "/wishlist",
      count: wishlistItemsCount,
    },
    {
      icon: FiShoppingCart,
      label: "Cart",
      path: "/cart",
      count: cartItemsCount,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
            <Link
              onClick={() => scrollTo(0, 0)}
              to="/"
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <FiShoppingBag className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                EcoShop
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => scrollTo(0, 0)}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
                  }`}
                >
                  {item.label}
                  {location.pathname === item.path && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {iconItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                {item.path ? (
                  <Link
                    to={item.path}
                    onClick={() => scrollTo(0, 0)}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                  >
                    <item.icon className="text-xl" />
                    {item.count > 0 && (
                      <span className="absolute top-3 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count > 99 ? "99+" : item.count}
                      </span>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={item.action}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                  >
                    <item.icon className="text-xl" />
                  </button>
                )}
              </motion.div>
            ))}

            {/* User Profile / Login */}
            {user ? (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/profile"
                    onClick={() => scrollTo(0, 0)}
                    className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center"
                  >
                    <FiUser className="text-xl mr-1" />
                    <span className="text-sm font-medium">{user.name}</span>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg text-sm font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to="/login"
                  onClick={() => scrollTo(0, 0)}
                  className="p-2 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 flex items-center"
                >
                  <FiUser className="text-xl mr-1" />
                  <span className="text-sm font-medium">Login</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 focus:outline-none"
            >
              {isOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => {
                    setIsOpen(false);
                    scrollTo(0, 0);
                  }}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="border-t dark:border-gray-700 pt-4 mt-4">
                <div className="grid grid-cols-4 gap-4 mb-4">
                  {iconItems.map((item) => (
                    <motion.div
                      key={item.label}
                      whileHover={{ scale: 1.1 }}
                      className="flex justify-center relative"
                    >
                      {item.path ? (
                        <Link
                          to={item.path}
                          onClick={() => {
                            setIsOpen(false);
                            scrollTo(0, 0);
                          }}
                          className="p-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                        >
                          <item.icon className="text-xl" />
                          {item.count > 0 && (
                            <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {item.count > 99 ? "99+" : item.count}
                            </span>
                          )}
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            item.action();
                            setIsOpen(false);
                            scrollTo(0, 0);
                          }}
                          className="p-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                        >
                          <item.icon className="text-xl" />
                        </button>
                      )}
                    </motion.div>
                  ))}

                  {/* Mobile User Profile/Login */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex justify-center"
                  >
                    {user ? (
                      <Link
                        to="/profile"
                        onClick={() => {
                          setIsOpen(false);
                          scrollTo(0, 0);
                        }}
                        className="p-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                      >
                        <FiUser className="text-xl" />
                      </Link>
                    ) : (
                      <Link
                        to="/login"
                        onClick={() => {
                          setIsOpen(false);
                          scrollTo(0, 0);
                        }}
                        className="p-3 text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200"
                      >
                        <FiUser className="text-xl" />
                      </Link>
                    )}
                  </motion.div>
                </div>

                {user ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-center text-sm text-gray-600 dark:text-gray-400">
                      Welcome, {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center justify-center"
                    >
                      <FiLogOut className="mr-2" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => {
                        setIsOpen(false);
                        scrollTo(0, 0);
                      }}
                      className="block w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium text-center hover:from-green-600 hover:to-emerald-700 transition-all duration-200"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block w-full px-4 py-3 border border-green-500 text-green-600 rounded-lg font-medium text-center hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
