import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backenUrl } from '../App';
import { toast } from 'react-toastify';

const AddShoe = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const category = "Shoes";
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);

  const shoeSizes = [6, 7, 8, 9, 10];
  const [sizeQuantities, setSizeQuantities] = useState({});

  const handleSizeQuantityChange = (size, quantity) => {
    setSizeQuantities(prev => ({
      ...prev,
      [size]: Number(quantity)
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const selectedSizes = Object.entries(sizeQuantities)
        .filter(([_, qty]) => qty > 0)
        .map(([size, quantity]) => ({ size, quantity }));

      if (selectedSizes.length === 0) {
        return toast.error("Please enter quantity for at least one shoe size");
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', Number(price));
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestSeller', bestseller);
      formData.append('sizes', JSON.stringify(selectedSizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(`${backenUrl}/api/product/add-shoes`, formData, {
        headers: { token },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setName(""); setDescription(""); setPrice("");
        setImage1(false); setImage2(false); setImage3(false); setImage4(false);
        setSubCategory(""); setBestseller(false); setSizeQuantities({});
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-4'>

      {/* Upload Images */}
      <div>
        <p className='mb-2'>Upload Images</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((img, i) => (
            <label key={i} htmlFor={`image${i + 1}`}>
              <img className='w-20 h-20 object-cover border' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
              <input hidden type="file" id={`image${i + 1}`} onChange={(e) => {
                const setter = [setImage1, setImage2, setImage3, setImage4][i];
                setter(e.target.files[0]);
              }} />
            </label>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className='w-full'>
        <p>Product Name</p>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2 border'
          placeholder="Enter shoe name"
        />
      </div>

      <div className='w-full'>
        <p>Product Description</p>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2 border'
          placeholder="Enter description"
        />
      </div>

      <div>
        <p>Price (₹)</p>
        <input
          required
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='px-3 py-2 border'
          placeholder="Price"
        />
      </div>

      <div className='w-full'>
        <p>Subcategory (e.g., Running, Sneakers)</p>
        <input
          required
          value={subCategory}
          onChange={(e) => setSubCategory(e.target.value)}
          className='w-full max-w-[500px] px-3 py-2 border'
          placeholder="Enter subcategory"
        />
      </div>

      {/* Bestseller - INLINE */}
      <div className='flex items-center gap-2'>
        <label htmlFor="bestseller">Bestseller</label>
        <input
          id="bestseller"
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
      </div>

      {/* Shoe Sizes & Quantities */}
      <div className='w-full'>
        <p className='mb-2'>Available Sizes & Quantities</p>
        <div className='grid grid-cols-2 gap-4 max-w-[500px]'>
          {shoeSizes.map((size) => (
            <div key={size} className='flex items-center gap-2'>
              <label>Size {size}:</label>
              <input
                type='number'
                min={0}
                value={sizeQuantities[size] || ""}
                onChange={(e) => handleSizeQuantityChange(size, e.target.value)}
                placeholder='Qty'
                className='border px-2 py-1 w-24'
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type='submit'
        className='mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
      >
        Add Shoe
      </button>
    </form>
  );
};

export default AddShoe;
