import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/actions/authActions";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    phone: Yup.string()
      .matches(
        /^01[0125][0-9]{8}$/,
        "Phone number must be a valid Egyptian number"
      )
      .required("Phone number is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await dispatch(registerUser(values));
      if (result.success) {
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4 mt-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Join Us Today
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Create your account and start your shopping journey
          </p>
        </motion.div>

        <motion.form
          variants={itemVariants}
          onSubmit={formik.handleSubmit}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-green-200/50 dark:border-gray-700"
        >
          {/* Form fields remain the same as before, but remove text-white from inputs */}
          {/* Name Field */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className={`w-full pl-10 pr-4 py-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                    : "border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-900"
                }`}
                placeholder="Full Name"
              />
            </div>
            <AnimatePresence>
              {formik.touched.name && formik.errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {formik.errors.name}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Email Field */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="email"
                name="email"
                id="email"
                className={`w-full pl-10 pr-4 py-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                    : "border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-900"
                }`}
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
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="password"
                id="password"
                className={`w-full pl-10 pr-4 py-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                    : "border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-900"
                }`}
                placeholder="Password"
              />
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

          {/* Confirm Password Field */}
          <motion.div variants={itemVariants} className="relative mb-6">
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                name="rePassword"
                id="rePassword"
                className={`w-full pl-10 pr-4 py-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white ${
                  formik.touched.rePassword && formik.errors.rePassword
                    ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                    : "border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-900"
                }`}
                placeholder="Confirm password"
              />
            </div>
            <AnimatePresence>
              {formik.touched.rePassword && formik.errors.rePassword && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {formik.errors.rePassword}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Phone Field */}
          <motion.div variants={itemVariants} className="relative mb-8">
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="tel"
                name="phone"
                id="phone"
                className={`w-full pl-10 pr-4 py-3 bg-transparent border rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 text-white ${
                  formik.touched.phone && formik.errors.phone
                    ? "border-red-500 focus:ring-red-200 dark:focus:ring-red-900"
                    : "border-gray-300 dark:border-gray-600 focus:border-green-500 focus:ring-green-200 dark:focus:ring-green-900"
                }`}
                placeholder="Phone number (Egyptian)"
              />
            </div>
            <AnimatePresence>
              {formik.touched.phone && formik.errors.phone && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {formik.errors.phone}
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
              <FiCheckCircle className="mr-2 text-lg" />
            )}
            {isLoading ? "Creating Account..." : "Create Account"}
          </motion.button>

          {/* Login Link */}
          <motion.div variants={itemVariants} className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => {
                  navigate("/login"), scrollTo(0, 0);
                }}
                className="text-green-600 hover:text-green-700 font-semibold transition-colors duration-200 flex items-center justify-center mx-auto"
              >
                Sign in <FiArrowRight className="ml-1" />
              </button>
            </p>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
};