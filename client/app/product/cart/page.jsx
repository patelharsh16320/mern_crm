'use client';
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchAllCart } from "../../(api)/utils/showAllData";
import { toast } from 'react-toastify';
const Page = () => {

  const [products, setProducts] = useState([]);

  const getCartData = async () => {
    try {
      const data = await fetchAllCart();
      console.log('data-show', data.users)
      setProducts(data.users || []);
      toast.success('Cart loaded successfully');
    } catch (err) {
      toast.error('Failed to load Cart data');
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 mb-8">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Index</th>              
              <th className="px-4 py-2 border">Price</th>
              <th className="px-4 py-2 border">Quantity</th>
              <th className="px-4 py-2 border">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => {

                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>                    
                    <td>{item.quantity * item.price}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-500">
                  Cart is empty
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Total & Actions */}
        {products.length > 0 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
            <div className="text-xl font-semibold">
              Total: ₹
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  // Optional logic to update quantities in the future
                  localStorage.setItem('products', JSON.stringify(products));
                }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Update Cart
              </button>
              <Link
                href="/product/checkout"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
