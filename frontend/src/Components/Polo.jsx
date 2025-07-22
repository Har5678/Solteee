import React from 'react';
import { products } from '../assets/Products';
import ProductItem from './ProductItem';

const Polo = () => {
  const Polo= products.filter(product => product.subCategory === 'Polo'); // Show 5 products

  return (
    <div className="py-5 sm:py-8 px-2 w-full mx-auto">
      <h2 className="text-4xl font-semibold mb-3 text-center" style={{
        fontFamily: 'Cormorant Garamond, serif'
      }}>Polo T-Shirts</h2>

      <div className="overflow-x-scroll scrollbar-hide">
        <div className="flex gap-3  w-max snap-x snap-mandatory py-1">
          {Polo.map((product, index) => (
            <ProductItem key={index} id={product._id} name={product.name} image={product.image} price={product.price} subCategory={product.subCategory} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Polo;
