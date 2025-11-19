import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { productAPI } from "../services/api";
import {
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiStar,
  FiTag,
} from "react-icons/fi";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    brand: searchParams.get("brand") || "",
    sort: searchParams.get("sort") || "",
  });
  const [viewMode, setViewMode] = useState("grid");
  const [searchInput, setSearchInput] = useState(filters.search); // Local state for search input

  // Debounce effect for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchInput !== filters.search) {
        handleFilterChange("search", searchInput);
      }
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Build API params based on filters
        const apiParams = {
          page: 1,
          limit: 1000,
        };

        // Add filters to API params
        if (filters.search) apiParams.keyword = filters.search;
        if (filters.category) apiParams.category = filters.category;
        if (filters.brand) apiParams.brand = filters.brand;
        if (filters.sort) apiParams.sort = filters.sort;

        console.log("Fetching with params:", apiParams);

        const [productsResponse, categoriesResponse, brandsResponse] =
          await Promise.all([
            productAPI.getProducts(apiParams),
            productAPI.getCategories(),
            productAPI.getBrands?.(apiParams) ||
              Promise.resolve({ data: { data: [] } }),
          ]);

        setProducts(productsResponse.data.data || []);
        setCategories(categoriesResponse.data.data || []);
        setBrands(brandsResponse.data.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v && v !== "") params.set(k, v);
    });
    setSearchParams(params);
  };

  const handleSearchInputChange = (value) => {
    setSearchInput(value);
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      category: "",
      brand: "",
      sort: "",
    });
    setSearchInput(""); // Clear local search input too
    setSearchParams(new URLSearchParams());
  };

  // Apply local sorting only
  const sortedProducts = [...products].sort((a, b) => {
    if (!filters.sort) return 0;

    switch (filters.sort) {
      case "price":
        return a.price - b.price;
      case "-price":
        return b.price - a.price;
      case "-ratingsAverage":
        return (b.ratingsAverage || 0) - (a.ratingsAverage || 0);
      case "-sold":
        return (b.sold || 0) - (a.sold || 0);
      case "-createdAt":
        return new Date(b.createdAt) - new Date(a.createdAt);
      default:
        return 0;
    }
  });

  const displayProducts = filters.sort ? sortedProducts : products;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover {displayProducts.length} amazing products tailored for you
          </p>

          {/* Active Filters */}
          {(filters.category || filters.brand || filters.search) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 mt-4 flex-wrap"
            >
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Active filters:
              </span>
              {filters.search && (
                <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-3 py-1 rounded-full text-sm">
                  Search: "{filters.search}"
                </span>
              )}
              {filters.category && (
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm">
                  Category:{" "}
                  {categories.find((c) => c._id === filters.category)?.name ||
                    "Selected"}
                </span>
              )}
              {filters.brand && (
                <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm">
                  Brand:{" "}
                  {brands.find((b) => b._id === filters.brand)?.name ||
                    "Selected"}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 text-sm font-medium"
              >
                Clear all
              </button>
            </motion.div>
          )}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-green-200/50 dark:border-gray-700"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput} // Use local state
                onChange={(e) => handleSearchInputChange(e.target.value)} // Use local handler
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            {/* Brand Filter */}
            <select
              value={filters.brand}
              onChange={(e) => handleFilterChange("brand", e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={filters.sort}
              onChange={(e) => handleFilterChange("sort", e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="">Sort By</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="-ratingsAverage">Highest Rated</option>
              <option value="-sold">Most Popular</option>
              <option value="-createdAt">Newest First</option>
            </select>
          </div>

          {/* View Mode and Results Count */}
          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {displayProducts.length > 0 ? (
                <>
                  Showing {displayProducts.length} products
                  {filters.search || filters.category || filters.brand
                    ? " (filtered)"
                    : ""}
                </>
              ) : (
                "No products found"
              )}
            </div>

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
        </motion.div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className={`grid ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1"
              } gap-6`}
            >
              {displayProducts.map((product, index) => (
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
                    className={`${
                      viewMode === "list" ? "flex flex-1" : "block"
                    }`}
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

                      {/* Brand and Category */}
                      <div className="flex items-center gap-2 mb-3">
                        {product.brand && (
                          <span className="inline-flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full text-xs">
                            <FiTag className="mr-1" size={12} />
                            {product.brand.name}
                          </span>
                        )}
                        {product.category && (
                          <span className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                            {product.category.name}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                          ${product.price}
                        </span>
                        <div className="flex items-center">
                          <FiStar className="text-yellow-400" />
                          <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                            {product.ratingsAverage || 0} (
                            {product.ratingsQuantity || 0})
                          </span>
                        </div>
                      </div>
                      {viewMode === "list" && (
                        <div className="mt-3 flex items-center justify-between">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Sold: {product.sold || 0}
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
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiSearch className="text-4xl text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              No Products Found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {filters.search || filters.category || filters.brand
                ? "Try adjusting your filters or search terms"
                : "There are no products available at the moment."}
            </p>
            {(filters.search || filters.category || filters.brand) && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};
