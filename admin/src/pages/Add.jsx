import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backenUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState(""); // changed to empty string for input
  const [bestseller, setBestseller] = useState(false);

  const clothesSizes = ["S", "M", "L", "XL"];

  const [colorInput, setColorInput] = useState("");
  const [sizeQuantities, setSizeQuantities] = useState({});
  const [colors, setColors] = useState([]);

  const addColorHandler = () => {
    const trimmed = colorInput.trim().toLowerCase();
    if (!trimmed) {
      toast.error("Please enter a color name");
      return;
    }

    const selectedSizes = Object.entries(sizeQuantities)
      .filter(([_, qty]) => qty > 0)
      .map(([size, quantity]) => ({ size, quantity }));

    if (selectedSizes.length === 0) {
      toast.error("Add at least one size with quantity");
      return;
    }

    if (!colors.find(c => c.color === trimmed)) {
      setColors([...colors, { color: trimmed, sizes: selectedSizes }]);
      setColorInput("");
      setSizeQuantities({});
    } else {
      toast.error("Color already exists");
    }
  };

  const removeColorHandler = (clr) => {
    setColors(colors.filter((c) => c.color !== clr));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
        console.log(token);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', Number(price));
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestSeller', bestseller);
      formData.append('colors', JSON.stringify(colors));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response=await axios.post(backenUrl+"/api/product/add",formData,{headers:{token}});

      if (response.data.success) {
        toast.success(response.data.message);
        setName(""); setDescription(""); setPrice("");
        setImage1(false); setImage2(false); setImage3(false); setImage4(false);
        setColors([]);
        setSubCategory("");
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
              <img className='w-20' src={!img ? assets.upload_area : URL.createObjectURL(img)} alt="" />
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
        <input required value={name} onChange={(e) => setName(e.target.value)} className='w-full max-w-[500px] px-3 py-2 border' placeholder="Enter name" />
      </div>
      <div className='w-full'>
        <p>Product Description</p>
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} className='w-full max-w-[500px] px-3 py-2 border' placeholder="Enter description" />
      </div>
      <div>
        <p>Price</p>
        <input required type='number' value={price} onChange={(e) => setPrice(e.target.value)} className='px-3 py-2 border' placeholder="₹ Price" />
      </div>
      <div className='flex gap-4'>
        <div>
          <p>Category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className='border px-2 py-1'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        <div className='flex flex-col'>
          <p>Sub Category</p>
          {/* Changed from select to input for typing */}
          <input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className='border px-2 py-1 max-w-[150px]'
            placeholder="Enter subcategory"
          />
        </div>
        <div className='flex items-center gap-2'>
          <input type='checkbox' checked={bestseller} onChange={(e) => setBestseller(e.target.checked)} />
          <label>Bestseller</label>
        </div>
      </div>

      {/* Color + Sizes + Quantity */}
      <div className='w-full'>
        <p className='font-semibold mb-1'>Add Color with Sizes & Quantities</p>
        <input value={colorInput} onChange={(e) => setColorInput(e.target.value)} placeholder="Enter color name" className='border px-2 py-1 mr-2' />
        <button type='button' onClick={addColorHandler} className='bg-blue-500 text-white px-3 py-1 rounded'>Add Color</button>

        <div className='mt-3'>
          {clothesSizes.map(size => (
            <div key={size} className='flex items-center gap-2 mb-1'>
              <label className='w-10'>{size}</label>
              <input
                type="number"
                placeholder="Qty"
                min="0"
                className='w-20 px-2 py-1 border'
                value={sizeQuantities[size] || ""}
                onChange={(e) => setSizeQuantities({ ...sizeQuantities, [size]: parseInt(e.target.value) || "" })}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Show Added Colors */}
      <div className='w-full'>
        <p className='font-semibold mb-2'>Added Colors</p>
        <div className='flex flex-wrap gap-4'>
          {colors.map(({ color, sizes }) => (
            <div key={color} className='bg-gray-100 rounded p-2 mb-2 flex flex-col w-auto min-w-[150px]'>
              <p className='capitalize font-bold mb-1' style={{ color: color }}>
                {color}
              </p>
              <ul className='pl-4'>
                {sizes.map(({ size, quantity }) => (
                  <li key={size}>{size} : {quantity}</li>
                ))}
              </ul>
              <button
                type='button'
                onClick={() => removeColorHandler(color)}
                className='mt-2 text-sm text-red-600 hover:underline self-start'
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button type="submit" className='bg-green-600 px-4 py-2 text-white rounded hover:bg-green-700'>
        Add Product
      </button>
    </form>
  );
};

export default Add;
