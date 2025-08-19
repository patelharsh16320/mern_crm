'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllProduct } from '../(api)/utils/showAllData';
import { createCart, updateCart, getCart } from '../(api)/utils/allapi';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = user?.user_id;

  // Fetch products & cart
  useEffect(() => {
    fetchAllProduct()
      .then((res) => setProducts(res.users || []))
      .catch(() => toast.error("Failed to load products"));

    const syncCart = async () => {
      if (!userId) return;
      const res = await getCart(userId);
      if (res?.products) {
        setCart(res.products);
        localStorage.setItem("cart_id", res.cart_id);
        localStorage.setItem("cart", JSON.stringify(res.products));
      }
    };

    syncCart();
  }, [userId]);

  // Add to Cart handler
  const addToCart = async (product) => {
    if (!userId) return toast.error("Please login to add items to cart");

    setLoading(true);
    try {
      const existingCart = await getCart(userId);
      let response;

      if (existingCart && existingCart.products.length > 0) {
        // cart exists → update
        const updatedProducts = [...existingCart.products];
        const index = updatedProducts.findIndex((i) => i.product_id === product.product_id);

        if (index > -1) {
          updatedProducts[index].qty += 1;
        } else {
          updatedProducts.push({
            product_id: product.product_id,
            qty: 1,
            price: product.price,
          });
        }

        response = await updateCart({
          user_id: userId,
          products_qty: updatedProducts,
        });
        setCart(updatedProducts);
      } else {
        // no cart → create
        response = await createCart({
          user_id: userId,
          products_qty: [
            { product_id: product.product_id, qty: 1, price: product.price },
          ],
        });
        setCart([{ product_id: product.product_id, qty: 1, price: product.price }]);
      }

      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success(`${product.name} added to cart!`);
      } else {
        toast.error(response.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Add to Cart Error:", err);
      toast.error("Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  // Get product qty from cart
  const getCartQty = (productId) => {
    const item = cart.find((c) => c.product_id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-semibold text-gray-700 mb-10 text-center">
          🛒 Shop Products
        </h1>

        {products?.length ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product, index) => (
              <motion.div
                key={product.product_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <div className="p-4 space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800">
                    <Link href={`/product/${product.product_id}`}>
                      {product.name}
                    </Link>
                  </h2>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    {product.sell_price && product.sell_price > 0 ? (
                      <>
                        <span className="text-green-600 font-bold text-md">
                          ₹{Number(product.sell_price).toFixed(2)}
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          ₹{Number(product.price).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-green-600 font-bold text-md">
                        ₹{Number(product.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart / Buy Now */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={loading}
                      className="flex-1 px-3 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-xl font-medium transition disabled:opacity-50"
                    >
                      {getCartQty(product.product_id) > 0
                        ? `Qty: ${getCartQty(product.product_id)}`
                        : loading
                        ? "Adding..."
                        : "🛒 Add to Cart"}
                    </button>
                    <Link
                      href="/product/checkout"
                      className="flex-1 px-3 py-2 text-sm text-green-600 bg-green-100 hover:bg-green-200 rounded-xl text-center font-medium transition"
                    >
                      💳 Buy Now
                    </Link>
                  </div>

                  {/* Rating + Stock */}
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      ⭐ {product.rating}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      Stock: {product.stock}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-12">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
