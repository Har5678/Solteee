import React from 'react';
import { products } from '../assets/Products';
import ProductItem from './ProductItem';

const LatestArrival = () => {
  const latestFive = products.slice(0, 5); // Show 5 products

  return (
    <div className="py-5 sm:py-8 px-2 w-full mx-auto">
      <h2 className="text-4xl font-semibold mb-3 text-center" style={{
        fontFamily: 'Cormorant Garamond, serif'
      }}>Latest Arrivals</h2>

      <div className="overflow-x-scroll scrollbar-hide">
        <div className="flex gap-4 w-max snap-x snap-mandatory py-1 border border-gray-200">
          {latestFive.map((product, index) => (
            <ProductItem key={index} id={product._id} name={product.name} image={product.image} price={product.price} subCategory={product.subCategory} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestArrival;
