import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backenUrl } from '../App';

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState({ productId: null, colorIndex: null });
  const [editedSizes, setEditedSizes] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(backenUrl + '/api/product/all', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const response = await axios.post(backenUrl + "/api/product/remove", { id });
      if (response.data.success) {
        toast.success("Product deleted successfully!");
        setProducts(products.filter(product => product._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const convertToSingleArray = (colors) => {
    try {
      if (Array.isArray(colors) && typeof colors[0] === 'string') {
        return JSON.parse(colors[0]);
      }
      return Array.isArray(colors) ? colors : [];
    } catch (error) {
      console.error('Parsing colors failed:', error);
      return [];
    }
  };

  const handleColorClick = (productId, colorIndex, sizes) => {
    setEditing({ productId, colorIndex });
    setEditedSizes([...sizes]);
  };

  const handleSizeChange = (index, field, value) => {
    const updated = [...editedSizes];
    updated[index][field] = field === 'quantity' ? parseInt(value) : value;
    setEditedSizes(updated);
  };

  const saveSizes = async (productId, colorIndex) => {
    try {
      const product = products.find(p => p._id === productId);
      const updatedColors = convertToSingleArray(product.colors);
      updatedColors[colorIndex].sizes = editedSizes;


      const response = await axios.post(backenUrl + "/api/product/update-colors", {
        id: productId,
        colors: updatedColors
      });

      if (response.data.success) {
        toast.success("Sizes updated successfully!");
        fetchProducts();
        setEditing({ productId: null, colorIndex: null });
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <table className="table-auto border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          <th className="border px-2 py-1">Image</th>
          <th className="border px-2 py-1">Name</th>
          <th className="border px-2 py-1">Description</th>
          <th className="border px-2 py-1">Price</th>
          <th className="border px-2 py-1">Category</th>
          <th className="border px-2 py-1">Sub Category</th>
          <th className="border px-2 py-1">Quantity</th>
          <th className="border px-2 py-1">Bestseller</th>
          <th className="border px-2 py-1">Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map(product => {
          const colors = convertToSingleArray(product.colors);

          return (
            <tr key={product._id}>
              <td className="border px-2 py-1">
                <img src={product.image[0]} alt={product.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="border px-2 py-1">{product.name}</td>
              <td className="border px-2 py-1">{product.description}</td>
              <td className="border px-2 py-1">₹{product.price}</td>
              <td className="border px-2 py-1">{product.category}</td>
              <td className="border px-2 py-1">{product.subCategory}</td>
              <td className="border px-2 py-1" style={{ minWidth: '220px' }}>
                {colors.map((color, index) => (
                  <div key={index} className="mb-2">
                    <span
                      onClick={() => handleColorClick(product._id, index, color.sizes)}
                      style={{ color: color.color, fontWeight: 'bold', cursor: 'pointer' }}
                    >
                      ● {color.color}
                    </span>

                    {editing.productId === product._id && editing.colorIndex === index ? (
                      <div className="mt-2">
                        {editedSizes.map((size, idx) => (
                          <div key={idx} className="flex items-center mb-1">
                            <input
                              type="text"
                              value={size.size}
                              onChange={(e) => handleSizeChange(idx, 'size', e.target.value)}
                              className="border px-2 py-1 mr-2 w-20"
                              placeholder="Size"
                            />
                            <input
                              type="number"
                              value={size.quantity}
                              onChange={(e) => handleSizeChange(idx, 'quantity', e.target.value)}
                              className="border px-2 py-1 w-20"
                              placeholder="Qty"
                            />
                          </div>
                        ))}
                        <div className="mt-2">
                          <button
                            onClick={() => saveSizes(product._id, index)}
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditing({ productId: null, colorIndex: null })}
                            className="bg-gray-300 text-black px-3 py-1 rounded"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="ml-2">
                        {color.sizes.map((size, i) => (
                          <span key={i} className="mr-2">
                            {size.size}: {size.quantity}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                ))}
              </td>
              <td className="border px-2 py-1">{product.bestseller ? 'Yes' : 'No'}</td>
              <td className="border px-2 py-1">
                <button
                  onClick={() => deleteProduct(product._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default List;
