import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import '../index.css';
import { products } from '../assets/Products';
import ProductItem from './ProductItem';

const BestSeller = () => {
  return (
    <div className="py-10 px-4 w-full mx-auto max-w-[1300px]">
      <h2
        className="text-2xl sm:text-3xl font-bold mb-6 text-center text-black"
        style={{
          fontFamily: 'Cormorant Garamond, serif',
        }}
      >
        Best Sellers
      </h2>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        slidesPerGroup={1}
        loop={false}
        breakpoints={{
          320: {
            slidesPerView: 1.1, // a bit of next slide visible
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
      >
        {products.slice(0, 8).map((product, index) => (
          <SwiperSlide key={index} className="px-2">
            <ProductItem
              id={product._id}
              name={product.name}
              image={product.image}
              price={product.price}
              subCategory={product.subCategory}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BestSeller;
