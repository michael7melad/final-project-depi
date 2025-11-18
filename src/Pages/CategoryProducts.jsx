import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { productAPI } from "../services/api";
import {
  FiGrid,
  FiList,
  FiStar,
  FiArrowLeft,
  FiShoppingBag,
} from "react-icons/fi";

export const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);

        // Fetch all categories to get the current category name
        const categoriesResponse = await productAPI.getCategories();
        setCategories(categoriesResponse.data.data);

        // Find the current category
        const currentCategory = categoriesResponse.data.data.find(
          (cat) => cat._id === id
        );
        setCategory(currentCategory);

        // Fetch products for this category
        const params = { category: id, limit: 12 };
        if (sort) params.sort = sort;

        const productsResponse = await productAPI.getProducts(params);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [id, sort]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Category Not Found
          </h2>
          <Link
            to="/categories"
            onClick={() => scrollTo(0, 0)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb and Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Link
              to="/"
              onClick={() => scrollTo(0, 0)}
              className="hover:text-green-600 transition-colors duration-200"
            >
              Home
            </Link>
            <span>/</span>
            <Link
              to="/categories"
              onClick={() => scrollTo(0, 0)}
              className="hover:text-green-600 transition-colors duration-200"
            >
              Categories
            </Link>
            <span>/</span>
            <span className="text-green-600 dark:text-green-400">
              {category.name}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                to="/categories"
                onClick={() => scrollTo(0, 0)}
                className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
              >
                <FiArrowLeft className="mr-2" />
                Back to Categories
              </Link>

              <div className="flex items-center gap-3">
                {category.image && (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    {products.data?.length || 0} products found
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Sort Options */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Sort By</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-ratingsAverage">Highest Rated</option>
                <option value="-sold">Most Popular</option>
                <option value="-createdAt">Newest First</option>
              </select>

              {/* View Mode */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${
                    viewMode === "grid"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <FiGrid />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${
                    viewMode === "list"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  <FiList />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        {products.data && products.data.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className={`grid ${
              viewMode === "grid"
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                : "grid-cols-1"
            } gap-6`}
          >
            {products.data.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-green-200/50 dark:border-gray-700 ${
                  viewMode === "list" ? "flex" : ""
                }`}
              >
                <Link
                  to={`/products/${product._id}`}
                  onClick={() => scrollTo(0, 0)}
                  className={`${viewMode === "list" ? "flex flex-1" : "block"}`}
                >
                  <div
                    className={`${
                      viewMode === "list" ? "w-48 flex-shrink-0" : "h-48"
                    }`}
                  >
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className={`w-full h-full object-cover transition-transform duration-300 hover:scale-110 ${
                        viewMode === "list" ? "h-full" : "h-48"
                      }`}
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        ${product.price}
                      </span>
                      <div className="flex items-center">
                        <FiStar className="text-yellow-400" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                          {product.ratingsAverage} ({product.ratingsQuantity})
                        </span>
                      </div>
                    </div>
                    {viewMode === "list" && (
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Sold: {product.sold}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          In Stock
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiShoppingBag className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              There are no products available in this category at the moment.
            </p>
            <Link
              to="/categories"
              onClick={() => scrollTo(0, 0)}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              Browse Other Categories
            </Link>
          </motion.div>
        )}

        {/* Pagination */}
        {products.pagination && products.pagination.totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-12"
          >
            <div className="flex gap-2">
              {[...Array(products.pagination.totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className={`px-4 py-2 rounded-lg ${
                    products.pagination.currentPage === index + 1
                      ? "bg-green-500 text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  } border border-green-200/50 dark:border-gray-700`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Categories Sidebar for larger screens */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:hidden mt-12"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-green-200/50 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Other Categories
            </h3>
            <div className="space-y-2">
              {categories
                .filter((cat) => cat._id !== id)
                .slice(0, 5)
                .map((cat) => (
                  <Link
                    key={cat._id}
                    onClick={() => scrollTo(0, 0)}
                    to={`/categories/${cat._id}`}
                    className="block py-2 px-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    {cat.name}
                  </Link>
                ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
