'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { updateProductById, createNewProduct } from '../../../../(api)/utils/allapi';
import { toast } from 'react-toastify';

const ProductFormPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isEditMode = Boolean(searchParams.get('product_id'));

  const initialProduct = {
    product_id: searchParams.get('product_id') || '',
    name: searchParams.get('name') || '',
    desc: searchParams.get('desc') || '',
    image_url: searchParams.get('image_url') || '',
    stock: searchParams.get('stock') || '',
    price: searchParams.get('price') || '',
    sell_price: searchParams.get('sell_price') || '',
    rating: searchParams.get('rating') || '',
    created_at: searchParams.get('created_at') || '',
    modified_at: new Date().toISOString(),
    deleted_at: null,
  };

  const [formData, setFormData] = useState(initialProduct);

  useEffect(() => {
    setFormData(initialProduct);
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await updateProductById(formData);
        toast.success('Product updated successfully!');
      } else {
        await createNewProduct(formData);
        toast.success('Product created successfully!');
      }

      router.push('/product/show-admin');
    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
        {isEditMode ? '📝 Update Product' : '➕ Add New Product'}
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {isEditMode && (
          <input type="hidden" name="product_id" value={formData.product_id} />
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded mt-1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded mt-1"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sell Price (₹)</label>
            <input
              type="number"
              name="sell_price"
              value={formData.sell_price}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
              step="0.01"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1"
              step="0.1"
              min="0"
              max="5"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mt-4"
        >
          {isEditMode ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;
