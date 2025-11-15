import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiShoppingBag,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiLinkedin,
  FiMail,
  FiPhone,
  FiMapPin,
  FiArrowUp,
} from "react-icons/fi";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerSections = [
    {
      title: "Quick Links",
      links: [
        { path: "/", label: "Home" },
        { path: "/products", label: "Products" },
        { path: "/categories", label: "Categories" },
        { path: "/about", label: "About Us" },
        { path: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { path: "/help", label: "Help Center" },
        { path: "/shipping", label: "Shipping Info" },
        { path: "/returns", label: "Returns" },
        { path: "/size-guide", label: "Size Guide" },
        { path: "/faq", label: "FAQ" },
      ],
    },
    {
      title: "Company",
      links: [
        { path: "/about", label: "About" },
        { path: "/careers", label: "Careers" },
        { path: "/press", label: "Press" },
        { path: "/sustainability", label: "Sustainability" },
        { path: "/blog", label: "Blog" },
      ],
    },
  ];

  const socialLinks = [
    { icon: FiFacebook, url: "#", label: "Facebook" },
    { icon: FiTwitter, url: "#", label: "Twitter" },
    { icon: FiInstagram, url: "#", label: "Instagram" },
    { icon: FiLinkedin, url: "#", label: "LinkedIn" },
  ];

  const contactInfo = [
    { icon: FiMail, text: "support@ecoshop.com" },
    { icon: FiPhone, text: "+20 100 000 0000" },
    { icon: FiMapPin, text: "Cairo, Egypt" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Link
              to="/"
              onClick={() => scrollTo(0, 0)}
              className="flex items-center space-x-2 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                <FiShoppingBag className="text-white text-2xl" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                EcoShop
              </span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Your premier destination for sustainable shopping. We offer
              high-quality products with a commitment to environmental
              responsibility and customer satisfaction.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <item.icon className="text-green-400" />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  whileHover={{ scale: 1.2, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-700 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="text-xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4 text-green-400">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to={link.path}
                        onClick={() => scrollTo(0, 0)}
                        className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center group"
                      >
                        <FiArrowUp className="transform rotate-90 mr-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        {link.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
            </div>
            <div className="flex space-x-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 flex-grow md:flex-grow-0"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-medium transition-all duration-200"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 EcoShop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-lg flex items-center justify-center text-white z-40"
        aria-label="Scroll to top"
      >
        <FiArrowUp className="text-xl" />
      </motion.button>
    </footer>
  );
};
