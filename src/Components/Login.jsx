import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import {
  FiMail,
  FiLock,
  FiArrowRight,
  FiLogIn,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = React.useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(loginUser(values));
      if (result.success) {
        // Redirect to home page after successful login
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 mt-12 flex items-center justify-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to continue your shopping journey
          </p>
        </motion.div>

        <motion.form
          variants={cardVariants}
          onSubmit={formik.handleSubmit}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-green-200/50 dark:border-gray-700"
        >
          {/* Email Field */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                {...formik.getFieldProps("email")}
                type="email"
                name="email"
                id="email"
                className="w-full pl-10 pr-4 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-900 transition-all duration-200 text-white"
                placeholder="Email address"
              />
            </div>
            <AnimatePresence>
              {formik.touched.email && formik.errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {formik.errors.email}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Password Field */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                {...formik.getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="w-full pl-10 pr-12 py-3 bg-transparent border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-900 transition-all duration-200 text-white"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <AnimatePresence>
              {formik.touched.password && formik.errors.password && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {formik.errors.password}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || !formik.isValid}
            className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 shadow-lg disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
              />
            ) : (
              <FiLogIn className="mr-2 text-lg" />
            )}
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>

          {/* Sign Up Link */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => {navigate("/register"), scrollTo(0,0)}}
                className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 flex items-center justify-center mx-auto"
              >
                Sign up <FiArrowRight className="ml-1" />
              </button>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};
