import React from 'react'
import { Link } from 'react-router-dom'

const ProductItem = ({ id,name,image,price,subCategory}) => {
    return (
        <Link className='cursor-pointer' to={`/product/${id}`}>
        <div
            key={id}
            className=" my-2 shadow-md rounded-2xl p-2 w-[220px] sm:w-[260px] md:w-[280px] lg:w-[302px] flex-shrink-0 snap-start hover:shadow-lg transition duration-300"
        >
            <div className="overflow-hidden rounded-xl ">
                <img
                    src={image[0]}
                    alt={name}
                    className=" w-full h-[160px] sm:h-[220px] md:h-[250px] lg:h-[340px] transform hover:scale-105 transition duration-300"
                />
            </div>
            <h3 className="text-base sm:text-lg font-semibold mt-3">{name}</h3>
            <hr />
            <p className="text-gray-500 text-sm">{subCategory}</p>
            <p className="text-indigo-600 font-bold mt-1">₹{price}</p>
        </div>
        </Link>
    )
}

export default ProductItem