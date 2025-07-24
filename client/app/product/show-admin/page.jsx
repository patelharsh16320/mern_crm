'use client';
import React, { useState, useEffect } from 'react';
import { fetchAllProduct } from '../../utils/showAllData';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useSortable } from '@/app/component/common';
import { deleteProductById, deleteAllProduct } from '../../utils/allapi';

const AdminShowProduct = () => {
    const [products, setProducts] = useState([]);
    const { sortedData, sortConfig, handleSort } = useSortable(products);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

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

    const handleDelete = async (id) => {
        if (!confirm('Delete this product?')) return;
        try {
            await deleteProductById(id);
            toast.success('Product deleted');
            getProducts();
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    const getArrow = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    };

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                    🛍️ Product Management
                </h1>
                <div className="flex gap-2">
                    <p className='bg-pink-600 hover:bg-pink-700 text-white text-sm px-4 py-2 rounded-md transition duration-200 shadow'>Total Product: {products.length}</p>
                    <Link
                        href="/product/show-admin/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md transition duration-200 shadow"
                    >
                        + Add New Product
                    </Link>
                    <button
                        onClick={async () => {
                            const confirmDelete = confirm("Are you sure you want to delete all users?");
                            if (!confirmDelete) return;

                            try {
                                const res = await deleteAllProduct();
                                toast.success(res.message);
                                setUsers([]);
                            } catch (err) {
                                toast.error(err.message || "Failed to delete all users");
                            }
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                    >
                        Delete All
                    </button>
                </div>
            </div>

            {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                <>
                    <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
                        <table className="min-w-full text-sm text-gray-700">
                            <thead className="bg-blue-50 text-blue-700 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left">Index</th>
                                    <th className="px-4 py-3 text-left">Image</th>
                                    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                                        Name{getArrow('name')}
                                    </th>
                                    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('price')}>
                                        Price{getArrow('price')}
                                    </th>
                                    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('sell_price')}>
                                        Sell Price{getArrow('sell_price')}
                                    </th>
                                    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('stock')}>
                                        Stock{getArrow('stock')}
                                    </th>
                                    <th className="px-4 py-3 text-center">Created At</th>
                                    <th className="px-4 py-3 text-center">Update</th>
                                    <th className="px-4 py-3 text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {paginatedData.map((product, idx) => (
                                    <tr key={product.product_id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="h-12 w-12 rounded-lg object-cover border border-gray-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-medium">{product.name}</td>
                                        <td className="px-4 py-3">₹{Number(product.price).toFixed(2)}</td>
                                        <td className="px-4 py-3">
                                            {product.sell_price && parseFloat(product.sell_price) > 0 ? (
                                                <span className="text-green-600 font-semibold">
                                                    ₹{Number(product.sell_price).toFixed(2)}
                                                </span>
                                            ) : '—'}
                                        </td>
                                        <td className="px-4 py-3">{product.stock}</td>
                                        <td className="px-4 py-3">
                                            {new Date(product.created_at).toLocaleString('en-US', {
                                                year: 'numeric',
                                                month: '2-digit',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            }).replace(',', ' at')}
                                        </td>
                                        <td className="py-2 px-4 border-b space-x-3">
                                            <Link
                                            className='text-blue-600 hover:underline'
                                                href={{
                                                    pathname: '/product/show-admin/add',
                                                    query: {
                                                        product_id: product.product_id,
                                                        name: product.name,
                                                        desc: product.desc,
                                                        image_url: product.image_url,
                                                        stock: product.stock,
                                                        price: product.price,
                                                        sell_price: product.sell_price,
                                                        rating: product.rating,
                                                        created_at: product.created_at,
                                                    },
                                                }}
                                            >
                                                <FaEdit />
                                            </Link>

                                        </td>
                                        <td className="py-2 px-4 border-b space-x-3">
                                            <button
                                                onClick={() => handleDelete(product.product_id)}
                                                className="inline-flex items-center justify-center px-3 py-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition"
                                                title="Delete Product"
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
                        <span>
                            Showing {(currentPage - 1) * itemsPerPage + 1} -{' '}
                            {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length}
                        </span>
                        <div className="flex gap-1 items-center">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`px-3 py-1 border rounded ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                disabled={currentPage === 1}
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-16">No products found.</p>
            )}
        </div>
    );
};

export default AdminShowProduct;
