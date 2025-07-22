import React from 'react'
import { assets } from '../assets/Assets'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

const Banner2 = () => {
  const slides = [
    assets.s1,
    assets.B2,
    assets.B3,
    assets.B4
  ]

  return (
    <div className="w-full py-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full relative"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <img 
              src={slide} 
              alt={`Slide ${i + 1}`}
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[350px] object-contain rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom container for pagination bullets below the slider */}
      <div className="swiper-pagination mt-4 flex justify-center" />
    </div>
  )
}

export default Banner2
