'use client';

import React, { useEffect, useState } from 'react';
import { fetchAllProduct } from '../../(api)/utils/showAllData';
import { createCart, updateCart, getCart, updateProductById } from '../../(api)/utils/allapi';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CiHeart } from "react-icons/ci";
import { IoIosHeart } from "react-icons/io";
import { gsap } from "gsap";

const WishlistPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState({}); 

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const userId = user?.user_id;

  // Animate page load
  useEffect(() => {
    gsap.from(".wishlist-card", {
      opacity: 0,
      y: 40,
      duration: 0.6,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, [products]);

  // Fetch products
  useEffect(() => {
    fetchAllProduct()
      .then((res) => {
        const list = res.users || res.products || [];
        const filtered = list.filter((p) => p.wishlist === 1);
        setProducts(filtered);

        const wl = {};
        filtered.forEach(p => {
          wl[p.product_id] = p.wishlist === 1;
        });
        setWishlist(wl);
      })
      .catch(() => toast.error("Failed to load wishlist"));

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

  // Toggle wishlist
  const toggleWishlist = async (product) => {
    const newStatus = !wishlist[product.product_id];
    setWishlist((prev) => ({ ...prev, [product.product_id]: newStatus }));

    try {
      await updateProductById({
        ...product,
        wishlist: newStatus ? 1 : 0,
      });

      toast.success(
        newStatus
          ? `${product.name || product.product_name} added to wishlist ❤️`
          : `${product.name || product.product_name} removed`
      );

      if (!newStatus) {
        setProducts((prev) => prev.filter((p) => p.product_id !== product.product_id));
      }
    } catch (err) {
      toast.error("Failed to update wishlist");
      setWishlist((prev) => ({ ...prev, [product.product_id]: !newStatus }));
    }
  };

  // Add to Cart
  const addToCart = async (product) => {
    if (!userId) return toast.error("Please login to add items to cart");

    setLoading(true);
    try {
      const existingCart = await getCart(userId);
      let response;
      if (existingCart && existingCart.products.length > 0) {
        const updatedProducts = [...existingCart.products];
        const index = updatedProducts.findIndex((i) => i.product_id === product.product_id);
        if (index > -1) {
          updatedProducts[index].qty += 1;
        } else {
          updatedProducts.push({ product_id: product.product_id, qty: 1, price: product.price });
        }
        response = await updateCart({ user_id: userId, products_qty: updatedProducts });
        setCart(updatedProducts);
      } else {
        response = await createCart({
          user_id: userId,
          products_qty: [{ product_id: product.product_id, qty: 1, price: product.price }],
        });
        setCart([{ product_id: product.product_id, qty: 1, price: product.price }]);
      }

      if (response.statusCode === 200 || response.statusCode === 201) {
        toast.success(`${product.product_name || product.name} added to cart!`);
      } else {
        toast.error("Failed to add to cart");
      }
    } catch {
      toast.error("Error adding to cart");
    } finally {
      setLoading(false);
    }
  };

  const getCartQty = (productId) => {
    const item = cart.find((c) => c.product_id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">❤️ My Wishlist</h1>
          <p className="text-gray-500">All your favorite items saved in one place</p>
        </div>

        {/* Product Grid */}
        {products?.length ? (
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product.product_id}
                className="wishlist-card bg-white border border-gray-100 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 relative overflow-hidden group"
              >
                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 text-2xl text-red-500 hover:scale-125 transition"
                >
                  {wishlist[product.product_id] ? <IoIosHeart /> : <CiHeart />}
                </button>

                {/* Product Image */}
                <div className="overflow-hidden rounded-t-2xl">
                  <img
                    src={product.image_url || "/placeholder.png"}
                    alt={product.product_name || product.name}
                    className="w-full h-52 object-cover transform group-hover:scale-110 transition duration-500"
                  />
                </div>

                {/* Product Details */}
                <div className="p-5 space-y-3">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    <Link href={`/product/${product.product_id}`}>
                      {product.product_name || product.name}
                    </Link>
                  </h2>

                  {/* Price */}
                  <div className="flex items-center space-x-2">
                    {product.sell_price && product.sell_price > 0 ? (
                      <>
                        <span className="text-xl font-bold text-pink-600">
                          ₹{Number(product.sell_price).toFixed(2)}
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          ₹{Number(product.price).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-bold text-pink-600">
                        ₹{Number(product.price).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={loading}
                      className="flex-1 px-3 py-2 text-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 rounded-xl font-medium shadow-md transition disabled:opacity-50"
                    >
                      {getCartQty(product.product_id) > 0
                        ? `Qty: ${getCartQty(product.product_id)}`
                        : loading
                          ? "Adding..."
                          : "🛒 Add to Cart"}
                    </button>
                    <Link
                      href="/product/checkout"
                      className="flex-1 px-3 py-2 text-sm text-purple-700 bg-purple-100 hover:bg-purple-200 rounded-xl text-center font-medium transition"
                    >
                      💳 Buy Now
                    </Link>
                  </div>

                  {/* Rating & Stock */}
                  <div className="flex justify-between text-xs text-gray-500 mt-3">
                    <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      ⭐ {product.rating || 0}
                    </span>
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full">
                      Stock: {product.stock || 0}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg mt-12">No wishlist items yet.</p>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;