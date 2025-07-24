'use client';
import React, { useState, useEffect } from 'react';
import { fetchAllProduct } from './../utils/showAllData';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Page = () => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try {
            const data = await fetchAllProduct();
            setProducts(data.users);
            toast.success('Products loaded successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to load products');
        }
    };

    useEffect(() => {
        getProducts();
    }, []);


    return (
        <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className='flex justify-between items-center mb-8'>
                <h1 className="text-3xl font-bold text-gray-700">🛍️ All Products</h1>
            </div>

            {Array.isArray(products) && products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={index}
                            className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4 space-y-2">
                                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>

                                {/* Pricing Logic */}
                                {product.sell_price && parseFloat(product.sell_price) > 0 ? (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-green-600 font-bold text-md">
                                            ₹{Number(product.sell_price).toFixed(2)}
                                        </span>
                                        <span className="text-gray-400 line-through text-sm">
                                            ₹{Number(product.price ?? 0).toFixed(2)}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-gray-800 font-semibold text-md">
                                        ₹{Number(product.price ?? 0).toFixed(2)}
                                    </span>
                                )}

                                {/* Actions */}
                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 px-2 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-full hover:bg-blue-200 transition duration-200 shadow-sm hover:shadow-md"> 🛒 Add to Cart </button>

                                    <Link href="/checkout" className="flex-1 px-2 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-full hover:bg-green-200 transition duration-200 shadow-sm hover:shadow-md text-center" >💳 Buy Now </Link>
                                </div>

                                {/* Rating & Stock */}
                                <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                                    <p>Ratings ⭐ {product.rating}</p>
                                    <p>Stocks: {product.stock}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-12">No products found.</p>
            )}
        </div>
    );
};

export default Page;
