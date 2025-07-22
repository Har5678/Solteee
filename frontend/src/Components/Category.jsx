import React from 'react';
import { assets } from '../assets/Assets';

const categories = [
  { name: 'Polo T-Shirts', image: assets.Product9 },
  { name: 'T-Shirts', image: assets.Product8 },
  { name: 'Oversized', image: assets.Product7 },
  { name: 'Shirts', image: assets.Product6 }
];

const Category = () => {
  return (
    <div className="w-full py-7 px-2 mx-auto">
      <h2 className="text-4xl font-semibold mb-6 text-center" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
        Category
      </h2>

      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-3 px-1 w-max flex-nowrap py-1">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300 flex-shrink-0 w-[200px] md:w-[300px] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-[160px] sm:h-[220px] md:h-[250px] lg:h-[320px] transform hover:scale-105 transition duration-300"
              />
              <div className="p-3 text-center">
                <h3 className="text-md font-semibold">{cat.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
