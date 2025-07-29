'use client';

import React, { useEffect, useState } from 'react';
import { fetchUpdatedCart } from '../../(api)/utils/showAllData';
import { updateCart } from '../../(api)/utils/allapi';
import { toast } from 'react-toastify';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const loadCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.user_id;
      if (!userId) {
        toast.error('User not found');
        return;
      }
      const result = await fetchUpdatedCart(userId);
      const cartWithQty = (result.data || []).map(item => ({
        ...item,
        qty: Number(item.qty),
      }));
      setCartItems(cartWithQty);
      toast.success('Cart loaded');
    } catch (err) {
      toast.error('Failed to load cart');
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQtyChange = (index, newQty) => {
    const updatedItems = [...cartItems];
    updatedItems[index].qty = Number(newQty);
    setCartItems(updatedItems);
  };

  const handleRemoveItem = (productId) => {
    const updated = cartItems.filter(item => item.product_id !== productId);
    setCartItems(updated);
  };

  const handleGoToCheckout = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.user_id;

      if (!userId) {
        toast.error('User not found');
        return;
      }

      const createdAt = '2025-07-28 14:45:00'; // Replace with dynamic value if needed

      const products_qty = cartItems
        .filter(item => item.qty > 0)
        .map(item => ({
          product_id: item.product_id,
          qty: item.qty,
        }));

      const response = await updateCart({
        user_id: userId,
        products_qty,
        created_at: createdAt,
      });

      if (response.statusCode === 200) {
        toast.success('Cart updated before checkout');
        window.location.href = '/product/checkout';
      } else {
        toast.error(response.message || 'Failed to update cart');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while updating cart');
    }
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((acc, item) => {
      const finalPrice = item.sell_price && parseFloat(item.sell_price) > 0 && item.sell_price < item.price
        ? item.sell_price
        : item.price;
      return acc + finalPrice * item.qty;
    }, 0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">🛒 Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow text-center text-gray-500">
          Your cart is empty. Start adding products!
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow border">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
              <tr>
                <th className="px-6 py-4 text-left">#</th>
                <th className="px-6 py-4 text-left">Product</th>
                <th className="px-6 py-4 text-left">Price</th>
                <th className="px-6 py-4 text-left">Quantity</th>
                <th className="px-6 py-4 text-left">Total</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {cartItems.map((item, i) => {
                const sellPriceValid = item.sell_price && parseFloat(item.sell_price) > 0;
                const hasDiscount = sellPriceValid && item.sell_price < item.price;
                const finalPrice = hasDiscount ? item.sell_price : item.price;
                const total = finalPrice * item.qty;

                return (
                  <tr
                    key={i}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-semibold text-sm">{i + 1}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium">{item.product_name}</div>
                      {/* <div className="text-xs text-gray-400">ID: {item.product_id}</div> */}
                    </td>
                    <td className="px-6 py-4">
                      {hasDiscount ? (
                        <div>
                          <span className="text-green-600 font-semibold">₹{item.sell_price}</span>
                          <span className="line-through ml-2 text-sm text-gray-400">₹{item.price}</span>
                        </div>
                      ) : (
                        <span className="text-gray-800 font-semibold">₹{item.price}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={item.qty}
                          onChange={(e) => handleQtyChange(i, e.target.value)}
                          className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring focus:border-blue-300"
                        />
                        {item.qty === 0 && (
                          <button
                            onClick={() => handleRemoveItem(item.product_id)}
                            className="text-red-600 underline text-sm hover:text-red-800"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold">₹{total.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-semibold text-gray-800">
            Total Amount: <span className="text-blue-600">₹{calculateTotalAmount().toFixed(2)}</span>
          </div>
          <button
            onClick={handleGoToCheckout}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition duration-200"
          >
            Proceed to Checkout →
          </button>
        </div>
      )}
    </div>
  );

};

export default CartPage;
