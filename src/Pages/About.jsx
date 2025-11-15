import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiShoppingBag,
  FiUsers,
  FiAward,
  FiTruck,
  FiHeart,
  FiGlobe,
  FiArrowRight,
  FiStar,
} from "react-icons/fi";

import michael from "../assets/michael.jpg";
import abdallah from "../assets/abdallah.jpg";
import karim from "../assets/karim.jpg";
import sally from "../assets/sally.jpg"
import salma from "../assets/salma.jpg"
import rawan from "../assets/rawan.jpg"

export const About = () => {
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

  const stats = [
    { number: "10,000+", label: "Happy Customers", icon: FiUsers },
    { number: "500+", label: "Products Available", icon: FiShoppingBag },
    { number: "50+", label: "Brand Partners", icon: FiAward },
    { number: "24/7", label: "Customer Support", icon: FiHeart },
  ];

  const values = [
    {
      icon: FiHeart,
      title: "Customer First",
      description:
        "We prioritize customer satisfaction above all else, ensuring the best shopping experience.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: FiGlobe,
      title: "Sustainability",
      description:
        "Committed to eco-friendly practices and sustainable product sourcing.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FiAward,
      title: "Quality Assurance",
      description:
        "Every product is carefully selected and tested for maximum quality.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: FiTruck,
      title: "Fast Delivery",
      description:
        "Quick and reliable shipping to get your products to you faster.",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const team = [
    {
      name: "Michael Melad",
      role: "Full Stack Web Developer",
      image: michael,
      description:
        "Student at Faculty of Science , Benha University ",
    },
    {
      name: "AbdAllah Kamal",
      role: "Full Stack Web Developer",
      image: abdallah,
      description: "Student at El-Shorouk Academy Faculty of Computer and Information Sciences ",
    },
    {
      name: "Karim Ehab",
      role: "Front-End Developer",
      image: karim,
      description: "Student at Faculty of Computer and Artificial Intelligence , Benha University ",
    },
    {
      name: "Sally AbdElNaby",
      role: "React Front-End Developer",
      image: sally,
      description: "Student at Faculty of Computer and Artificial Intelligence , Benha University ",
    },
    {
      name: "Salma Nader",
      role: "Full Stack Web Developer",
      image: salma,
      description: "Student at Faculty of Computer and Artificial Intelligence , Benha University ",
    },
    {
      name: "Rawan Mohammed",
      role: "React Front-End Developer",
      image: rawan,
      description: "Student at Faculty of Computer and Artificial Intelligence , Benha University ",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 mt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6"
            >
              About{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
                EcoShop
              </span>
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            >
              We're revolutionizing online shopping with a commitment to
              quality, sustainability, and exceptional customer experiences
              since 2022.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <stat.icon className="text-2xl text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2022, EcoShop began as a small passion project with
                  a big vision: to create an online shopping experience that
                  puts people and the planet first.
                </p>
                <p>
                  What started as a curated selection of eco-friendly products
                  has grown into a comprehensive marketplace offering thousands
                  of quality items across multiple categories.
                </p>
                <p>
                  Today, we're proud to serve customers worldwide while
                  maintaining our commitment to sustainability, quality, and
                  exceptional customer service.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
              >
                <Link
                  to="/products"
                  onClick={() => scrollTo(0, 0)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
                >
                  Explore Our Products <FiArrowRight className="ml-2" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Our Mission</h3>
                  <p className="text-green-100 leading-relaxed">
                    To make sustainable shopping accessible and enjoyable for
                    everyone, while supporting ethical brands and practices.
                  </p>

                  <h3 className="text-2xl font-bold mt-6">Our Vision</h3>
                  <p className="text-green-100 leading-relaxed">
                    A world where every purchase makes a positive impact on
                    people and the planet.
                  </p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-400 rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  <value.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The passionate people behind EcoShop
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-200/50 dark:border-gray-700"
              >
                <div className="relative inline-block">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="relative w-54 h-54 rounded-full mx-auto mb-4 object-cover border-4 border-green-200 dark:border-green-800 transition-all duration-300 hover:scale-110 hover:border-green-300 dark:hover:border-green-500 z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-0 hover:opacity-50 transition-opacity duration-300 scale-110"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-green-600 dark:text-green-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {member.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Ready to Shop with Purpose?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-green-100 mb-8"
          >
            Join thousands of satisfied customers who choose EcoShop for quality
            and sustainability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/products"
              onClick={() => scrollTo(0, 0)}
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
            >
              Start Shopping
            </Link>
            <Link
              to="/contact"
              onClick={() => scrollTo(0, 0)}
              className="px-8 py-4 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-all duration-200"
            >
              Get In Touch
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
