'use client';

import React, { useEffect, useState } from 'react';
import { fetchUpdatedCart } from '../../(api)/utils/showAllData';
import { toast } from 'react-toastify';
import { updateCart } from '../../(api)/utils/showAllData'; // import the new API function

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

  return (
    <div className="max-w-6xlpx-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">No items in cart.</p>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Cart ID</th>
              <th className="border px-4 py-2">Product Name</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Quantity</th>
              <th className="border px-4 py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, i) => {
              const sellPriceValid = item.sell_price && parseFloat(item.sell_price) > 0;
              const hasDiscount = sellPriceValid && item.sell_price < item.price;
              const finalPrice = hasDiscount ? item.sell_price : item.price;
              const total = finalPrice * item.qty;

              return (
                <tr key={i}>
                  <td className="border px-4 py-2">{i + 1}</td>
                  <td className="border px-4 py-2">{item.product_id} - {item.product_name}</td>
                  <td className="border px-4 py-2">
                    {hasDiscount ? (
                      <div>
                        {/* <span className="line-through text-gray-500 mr-2">₹{item.price}</span> */}
                        <span>₹{item.sell_price}</span>
                      </div>
                    ) : (
                      <span>₹{item.price}</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={item.qty}
                      onChange={(e) => handleQtyChange(i, e.target.value)}
                      className="w-16 px-2 py-1 border rounded text-center"
                    />
                  </td>
                  <td className="border px-4 py-2 font-medium">₹{total.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

      )}
 {cartItems.length > 0 && (
  <div className="mt-6 flex justify-end">
    <button
      onClick={async () => {
        try {
          const user = JSON.parse(localStorage.getItem('user'));
          const userId = user?.user_id;

          if (!userId) {
            toast.error('User not found');
            return;
          }

          const grouped = {};
          cartItems.forEach(item => {
            if (!grouped[item.cart_id]) grouped[item.cart_id] = [];
            grouped[item.cart_id].push({ product_id: item.product_id, qty: item.qty });
          });

          // Call update API for each cart_id
          const updatePromises = Object.entries(grouped).map(([cartId, items]) =>
            updateCart(cartId, userId, items)
          );

          await Promise.all(updatePromises);
          toast.success('Cart updated before checkout');

          // Redirect after update
          window.location.href = '/product/checkout';
        } catch (err) {
          toast.error('Failed to update cart');
        }
      }}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
    >
      Go to Checkout
    </button>
  </div>
)}


    </div>
  );
};

export default CartPage;