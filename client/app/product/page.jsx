'use client';
import React, { useEffect, useState } from 'react';
import { fetchAllProduct } from '../(api)/utils/showAllData';
import { createCart, updateCart } from '../(api)/utils/allapi';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { motion } from 'framer-motion';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProduct()
      .then(res => {
        setProducts(res.users);
        toast.success('Products loaded');
      })
      .catch(() => toast.error('Failed to load products'));
  }, []);

  const addToCart = async (product) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.user_id;
      if (!userId) return toast.error('User not logged in');

      let cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const index = cart.findIndex(i => i.product_id === product.product_id);
      index !== -1 ? cart[index].qty++ : cart.push({ product_id: product.product_id, qty: 1 });

      localStorage.setItem('cart', JSON.stringify(cart));
      toast.success(`${product.name} added to cart`);

      const cartId = localStorage.getItem('cart_id');
      const payload = { user_id: userId, products_qty: cart };
      const res = cartId ? await updateCart(payload) : await createCart(payload);
      if (!cartId && res.cart_id) localStorage.setItem('cart_id', res.cart_id);
    } catch (err) {
      toast.error('Error adding to cart');
    }
  };

return (
  <div className="min-h-screen bg-gray-50 py-10 px-4">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold text-gray-700 mb-10 text-center">🛒 Shop Products</h1>

      {products?.length ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={index}
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
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

                <div className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold text-md">
                    ₹{Number(product.sell_price || product.price).toFixed(2)}
                  </span>
                  {product.sell_price && (
                    <span className="text-gray-400 line-through text-sm">
                      ₹{Number(product.price).toFixed(2)}
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 px-3 py-2 text-sm text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-xl font-medium transition"
                  >
                    🛒 Add to Cart
                  </button>
                  <Link
                    href="/product/checkout"
                    className="flex-1 px-3 py-2 text-sm text-green-600 bg-green-100 hover:bg-green-200 rounded-xl text-center font-medium transition"
                  >
                    💳 Buy Now
                  </Link>
                </div>

                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">⭐ {product.rating}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded-full">Stock: {product.stock}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">No products found.</p>
      )}
    </div>
  </div>
);

};

export default ProductPage;
