import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backenUrl } from '../App';
import { toast } from 'react-toastify';

const ListShoes = ({ token }) => {
    const [shoes, setShoes] = useState([]);
    const [editShoeId, setEditShoeId] = useState(null);
    const [editedSizes, setEditedSizes] = useState([]);

    const convertToSingleArray = (sizes) => {
        try {
            if (Array.isArray(sizes) && typeof sizes[0] === 'string') {
                return JSON.parse(sizes[0]);
            }
            return Array.isArray(sizes) ? sizes : [];
        } catch (error) {
            console.error('Parsing sizes failed:', error);
            return [];
        }
    };

    const fetchShoes = async () => {
        try {
            const res = await axios.get(`${backenUrl}/api/product/all-shoes`);
            if (res.data.success) {
                setShoes(res.data.shoes || []);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            console.error(err);
            toast.error("Failed to fetch shoes");
        }
    };

    useEffect(() => {
        fetchShoes();
    }, []);

    const handleEditClick = (shoe) => {
        setEditShoeId(shoe._id);
        setEditedSizes(convertToSingleArray(shoe.sizes));
    };

    const handleCancel = () => {
        setEditShoeId(null);
        setEditedSizes([]);
    };

    const handleSizeChange = (index, value) => {
        const updated = [...editedSizes];
        updated[index].quantity = value;
        setEditedSizes(updated);
    };

    const handleSave = async (shoeId) => {
        try {
            console.log(editedSizes);
            const res = await axios.post(`${backenUrl}/api/product/updateShoesSizes`, {
                id: shoeId,
                sizes: editedSizes
            }, {
                headers: { token }
            });

            if (res.data.success) {
                toast.success("Sizes updated successfully");
                fetchShoes();
                setEditShoeId(null);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update sizes");
        }
    };

    return (
        <div className="w-full px-4 overflow-x-auto">
            <h2 className="text-2xl font-bold mb-4">List of Shoes</h2>
            <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Images</th>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Price (₹)</th>
                        <th className="border border-gray-300 px-4 py-2">Subcategory</th>
                        <th className="border border-gray-300 px-4 py-2">Bestseller</th>
                        <th className="border border-gray-300 px-4 py-2">Sizes & Quantities</th>
                    </tr>
                </thead>
                <tbody>
                    {shoes.map((shoe) => (
                        <tr key={shoe._id} className="text-center">
                            {/* Image */}
                            <td className="border border-gray-300 px-2 py-2">
                                <div className="flex gap-1 justify-center flex-wrap">
                                    <img src={shoe.image[0]} alt={shoe.name} className="w-16 h-16 object-cover" />
                                </div>
                            </td>

                            {/* Name */}
                            <td className="border border-gray-300 px-4 py-2">{shoe.name}</td>

                            {/* Price */}
                            <td className="border border-gray-300 px-4 py-2">₹{shoe.price}</td>

                            {/* Subcategory */}
                            <td className="border border-gray-300 px-4 py-2">{shoe.subCategory}</td>

                            {/* Bestseller */}
                            <td className="border border-gray-300 px-4 py-2">
                                {shoe.bestSeller ? (
                                    <span className="text-green-600 font-semibold">Yes</span>
                                ) : (
                                    "No"
                                )}
                            </td>

                            {/* Sizes - Editable */}
                            <td className="border border-gray-300 px-4 py-2" style={{ minWidth: "220px" }}>
                                {editShoeId === shoe._id ? (
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-wrap gap-3 justify-center">
                                            {editedSizes.map((sizeObj, index) => (
                                                <div key={index} className="flex items-center gap-1">
                                                    <span>{sizeObj.size}:</span>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={sizeObj.quantity}
                                                        onChange={(e) =>
                                                            handleSizeChange(index, Number(e.target.value))
                                                        }
                                                        className="w-16 border px-1 py-0.5 text-sm"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-center gap-3 mt-2">
                                            <button
                                                onClick={() => handleSave(shoe._id)}
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                className="bg-red-500 text-white px-3 py-1 rounded"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className="flex flex-wrap justify-center gap-3 cursor-pointer"
                                        onClick={() => handleEditClick(shoe)}
                                    >
                                        {convertToSingleArray(shoe.sizes).map((size, index) => (
                                            <span key={index} className="bg-gray-100 px-2 py-1 rounded border text-sm">
                                                {size.size}: {size.quantity}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListShoes;
