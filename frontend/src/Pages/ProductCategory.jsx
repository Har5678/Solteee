import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { products } from '../assets/Products';
import { Link } from 'react-router-dom';

const ProductCategory = () => {
  const { currentCategory, subCategory } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = () => {
      const matchedProducts = products.filter(
        (product) =>
          product.category === currentCategory &&
          product.subCategory === subCategory
      );
      setFilteredProducts(matchedProducts);
    };

    fetchProducts();
  }, [currentCategory, subCategory]);

  return (
    <div className="px-2 sm:px-4 md:px-10 py-6 sm:py-8 md:py-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-800 text-center sm:text-left">
        Products in{' '}
        <span className="text-indigo-600">{currentCategory}</span> /{' '}
        <span className="text-indigo-600">{subCategory}</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="w-full bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300"
          >
            <Link to={`/product/${product._id}`}>
              <div className="relative">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 md:h-65 transition-all duration-300"
                />

                {product.badge && (
                  <div className="absolute top-2 left-2 bg-white text-black text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded shadow">
                    {product.badge}
                  </div>
                )}
              </div>

              <div className="p-3 sm:p-4">
                <h3 className="text-sm sm:text-md font-bold text-gray-800 line-clamp-1">
                  {product.brand ? `${product.brand}: ` : ''}
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 line-clamp-1">
                  {product.subCategory}
                </p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 mt-1">
                  ₹{product.price}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-gray-500 text-center mt-16 text-lg">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default ProductCategory;
