import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { productAPI, cartAPI, wishlistAPI } from "../services/api";
import { useSelector, useDispatch } from "react-redux";
import {
  FiStar,
  FiShoppingCart,
  FiHeart,
  FiTruck,
  FiShield,
  FiArrowLeft,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { RecommendedProducts } from "../components/RecommendedProducts"; // Import the component

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const productResponse = await productAPI.getProduct(id);
        const productData = productResponse.data.data;
        setProduct(productData);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error("Please login to add items to cart");
      return;
    }

    try {
      await cartAPI.addToCart(product._id, quantity);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      toast.error("Please login to add items to wishlist");
      return;
    }

    try {
      await wishlistAPI.addToWishlist(product._id);
      toast.success("Product added to wishlist!");
    } catch (error) {
      toast.error("Failed to add product to wishlist");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center mt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Product Not Found
          </h2>
          <Link
            to="/products"
            onClick={() => scrollTo(0, 0)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/products"
            onClick={() => scrollTo(0, 0)}
            className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Products
          </Link>
        </motion.div>

        {/* Product Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
        >
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 border border-green-200/50 dark:border-gray-700">
              <img
                src={
                  product.images
                    ? product.images[selectedImage]
                    : product.imageCover
                }
                alt={product.title}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index
                        ? "border-green-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {product.title}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  <FiStar className="text-yellow-400" />
                  <span className="ml-1 text-gray-600 dark:text-gray-300">
                    {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                  </span>
                </div>
                <span className="text-gray-500 dark:text-gray-400">
                  {product.category?.name}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  Sold: {product.sold}
                </span>
              </div>
            </div>

            <div>
              <span className="text-4xl font-bold text-green-600 dark:text-green-400">
                ${product.price}
              </span>
              {product.priceAfterDiscount && (
                <span className="ml-2 text-2xl line-through text-gray-500 dark:text-gray-400">
                  ${product.priceAfterDiscount}
                </span>
              )}
            </div>

            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900 dark:text-white">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
              >
                <FiShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button
                onClick={handleAddToWishlist}
                className="p-3 border border-green-500 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors duration-200"
                title="Add to Wishlist"
              >
                <FiHeart />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <FiTruck className="text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield className="text-green-500" />
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  2-Year Warranty
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Related Products using the RecommendedProducts component */}
        <RecommendedProducts
          currentProductIds={[product._id]} // Pass current product ID to filter it out
          category={product.category?._id} // Pass category for better recommendations
          limit={4} // Show 4 related products
          title="Related Products" // Custom title for this section
        />
      </div>
    </div>
  );
};
