import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../assets/Products';
import { assets } from '../assets/Assets';
import RelatedProducts from './RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const [productData, setProductData] = useState("");
    const [image, setImage] = useState("");
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");

    const availableColors = ["black", "white", "red", "green", "yellow"];

    const fetchProducts = async () => {
        const data = products.find((product) => product._id === productId);
        setProductData(data);
        setImage(data.image[0]);
    };

    useEffect(() => {
        fetchProducts();
    }, [productId]);

    return productData ? (
        <>
            <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
                <div className='pt-10 transition-opacity ease-in duration-500 opacity-100'>

                    {/*--- PRODUCT MAIN SECTION ---*/}
                    <div className='flex flex-col sm:flex-row gap-10'>

                        {/* Product Images */}
                        <div className='flex-1 flex flex-row gap-4 overflow-auto'>
                            {/* Thumbnails */}
                            <div className='flex flex-col gap-2 w-[22%] min-w-[80px]'>
                                {productData.image.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item}
                                        onClick={() => setImage(item)}
                                        className={`w-full aspect-square object-cover rounded border cursor-pointer ${item === image ? 'border-orange-500' : ''
                                            }`}
                                        alt={`product-img-${index}`}
                                    />
                                ))}
                            </div>

                            {/* Main Image */}
                            <div className='w-[78%]'>
                                <img src={image} alt='Main product' className='w-full h-auto rounded' />
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className='flex-1 px-2'>
                            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                            <div className='flex items-center gap-1 mt-1'>
                                {[...Array(5)].map((_, i) => (
                                    <img key={i} className='w-3.5' src={assets.starIcon} alt="star" />
                                ))}
                                <p className='pl-2'>(122)</p>
                            </div>
                            <p className='mt-2 text-3xl font-medium'>{productData.price}</p>
                            <p className='mt-2 text-gray-500 md:w-4/5'>{productData.description}</p>

                            <div className='flex flex-col gap-4 my-5'>
                                {/* Size Selection */}
                                <div>
                                    <p className='mb-2'>Select Size</p>
                                    <div className='flex gap-2 flex-wrap'>
                                        {productData.sizes.map((item, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSize(item)}
                                                className={`border py-2 bg-gray-100 px-4 ${item === size ? 'border-orange-500' : ''
                                                    }`}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Selection */}
                                <div>
                                    <p className='mt-4 mb-2'>Select Color</p>
                                    <div className='flex gap-2'>
                                        {availableColors.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => setColor(item)}
                                                className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                                                    color === item ? 'border-orange-500 scale-110' : 'border-gray-300'
                                                }`}
                                                style={{ backgroundColor: item }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Display selected */}
                                {(size || color) && (
                                    <p className='text-sm text-gray-600 mt-2'>
                                        {size && <>Size: <span className='font-medium'>{size}</span> </>}
                                        {color && <>Color: <span className='font-medium capitalize'>{color}</span></>}
                                    </p>
                                )}
                            </div>

                            <div className='flex gap-4 mt-4'>
                                <button className='bg-black text-white px-8 py-2 text-sm active:bg-gray-700'>
                                    ADD TO CART
                                </button>
                                <button className=' text-black bg-yellow-300 px-8 py-2 text-sm text-black hover:bg-gray-100 active:bg-gray-200'>
                                    ADD TO WISHLIST
                                </button>
                            </div>

                            <hr className='mt-5 sm:w-4/5' />
                            <div className='text-sm text-gray-500 mt-3 flex flex-col gap-1'>
                                <p>100% Original product.</p>
                                <p>Cash on delivery on this product.</p>
                                <p>Easy return and exchange policy within 7 days</p>
                            </div>
                        </div>
                    </div>

                    {/*--- DESCRIPTION & REVIEWS ---*/}
                    <div className='mt-20'>
                        <div className='flex'>
                            <b className='border px-5 py-3 text-sm'>Description</b>
                            <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
                        </div>
                        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600'>
                            <p>
                                E-commerce, put simply, is the practice of buying and selling goods or services using the Internet.
                                It has gained immense popularity as a way of doing business because it's convenient and accessible at the same time.
                            </p>
                            <p>
                                E-commerce is defined as the exchange of goods and services between two or more entities. It typically involves buying and selling things of value.
                                Commerce can take place between businesses, between consumers, or between businesses and consumers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/*--- RELATED PRODUCTS ---*/}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </>
    ) : (
        <div className='opacity-0'></div>
    );
};

export default Product;
