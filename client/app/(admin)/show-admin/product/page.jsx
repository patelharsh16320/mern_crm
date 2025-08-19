'use client';
import React, { useState, useEffect } from 'react';
import { fetchAllProduct } from '../../../(api)/utils/showAllData';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useSortable } from '@/app/component/common';
import { deleteProductById, deleteAllProduct } from '../../../(api)/utils/allapi';

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
        <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                    🛍️ Product Management
                </h1>
                <div className="flex flex-wrap gap-2">
                    <p className="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-md shadow transition">
                        Total Products: {products.length}
                    </p>
                    <Link
                        href="/show-admin/product/add"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md shadow transition"
                    >
                        + Add New Product
                    </Link>
                    <button
                        onClick={async () => {
                            const confirmDelete = confirm("Are you sure you want to delete all products?");
                            if (!confirmDelete) return;

                            try {
                                const res = await deleteAllProduct();
                                toast.success(res.message);
                                setUsers([]);
                            } catch (err) {
                                toast.error(err.message || "Failed to delete all products");
                            }
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-md shadow transition"
                    >
                        Delete All
                    </button>
                </div>
            </div>

            {Array.isArray(paginatedData) && paginatedData.length > 0 ? (
                <>
                    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow">
                        <table className="min-w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-700 font-semibold">
                                <tr>
                                    <th className="px-4 py-3 text-left">#</th>
                                    <th className="px-4 py-3 text-left">Image</th>
                                    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('name')}>
                                        Name {getArrow('name')}
                                    </th>
                                    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('price')}>
                                        Price {getArrow('price')}
                                    </th>
                                    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('sell_price')}>
                                        Sell Price {getArrow('sell_price')}
                                    </th>
                                    <th className="px-4 py-3 text-left cursor-pointer" onClick={() => handleSort('stock')}>
                                        Stock {getArrow('stock')}
                                    </th>
                                    <th className="px-4 py-3 text-center">Created At</th>
                                    <th className="px-4 py-3 text-center">Edit</th>
                                    <th className="px-4 py-3 text-center">Delete</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-800">
                                {paginatedData.map((product, idx) => (
                                    <tr key={product.product_id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                        <td className="px-4 py-3">
                                            <img
                                                src={product.image_url}
                                                alt={product.name}
                                                className="w-12 h-12 object-cover rounded-md border border-gray-200"
                                            />
                                        </td>
                                        <td className="px-4 py-3 font-medium">{product.name}</td>
                                        <td className="px-4 py-3 text-gray-700">₹{Number(product.price).toFixed(2)}</td>
                                        <td className="px-4 py-3">
                                            {product.sell_price && parseFloat(product.sell_price) > 0 ? (
                                                <span className="text-green-600 font-semibold">
                                                    ₹{Number(product.sell_price).toFixed(2)}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3">{product.stock}</td>
                                        <td className="px-4 py-3 text-center">
                                            {new Date(product.created_at).toLocaleString('en-IN', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: '2-digit',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <Link
                                                className="text-blue-600 hover:text-blue-800"
                                                href={{
                                                    pathname: '/show-admin/product/add',
                                                    query: { ...product },
                                                }}
                                            >
                                                <FaEdit />
                                            </Link>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button
                                                onClick={() => handleDelete(product.product_id)}
                                                className="bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200"
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
                                disabled={currentPage === 1}
                                className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                Prev
                            </button>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`px-3 py-1 rounded border ${currentPage === i + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white hover:bg-gray-100'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 rounded border bg-white hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500 text-lg mt-20">No products found.</p>
            )}
        </div>
    );

};

export default AdminShowProduct;
