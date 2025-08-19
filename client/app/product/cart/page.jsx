'use client';
import React, { useEffect, useState } from 'react';
import { getCart, updateCart, deleteCartById } from '@/app/(api)/utils/allapi';
import { toast } from 'react-toastify';
import Link from 'next/link';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user?.user_id) {
          setCart([]);
          setLoading(false);
          return;
        }
        const res = await getCart(user.user_id);
        if (res?.products) {
          setCart(res.products);
        } else {
          setCart([]);
        }
      } catch (err) {
        toast.error('Failed to fetch cart');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Quantity Change
  const handleQtyChange = async (productId, qty) => {
    if (qty < 1) return;
    const updated = cart.map((item) =>
      item.product_id === productId ? { ...item, qty } : item
    );
    setCart(updated);

    const user = JSON.parse(localStorage.getItem('user'));
    await updateCart({ user_id: user.user_id, products_qty: updated });
  };

  // Remove Item
  const handleRemove = async (productId) => {
    const updated = cart.filter((item) => item.product_id !== productId);
    setCart(updated);

    const user = JSON.parse(localStorage.getItem('user'));
    await updateCart({ user_id: user.user_id, products_qty: updated });
    toast.info('Item removed');
  };

  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.qty * Number(item.sell_price || item.price || 0),
    0
  );

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          🛒 Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="text-center bg-white p-10 rounded-2xl shadow-md">
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
            <Link
              href="/product"
              className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
            >
              🛍️ Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex items-center bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition"
                >

                  <div className="ml-5 flex-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.product_name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      ₹{Number(item.sell_price || item.price).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          handleQtyChange(item.product_id, item.qty - 1)
                        }
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 bg-gray-100 rounded-lg">
                        {item.qty}
                      </span>
                      <button
                        onClick={() =>
                          handleQtyChange(item.product_id, item.qty + 1)
                        }
                        className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-gray-700 font-medium">
                      ₹{(item.qty * Number(item.sell_price || item.price)).toFixed(2)}
                    </span>
                    <button
                      onClick={() => handleRemove(item.product_id)}
                      className="mt-2 text-sm text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Order Summary
              </h3>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-bold text-gray-800 mb-6">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>

              <Link
                href="/product/checkout"
                className="w-full inline-block px-6 py-3 text-center bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
              >
                ✅ Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
