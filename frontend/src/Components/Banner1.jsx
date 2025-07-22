import React from 'react'
import { assets } from '../assets/Assets'
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Navigation, Pagination, Autoplay } from "swiper/modules"

const Banner1 = () => {
  const slides = [
    assets.Banner1,
    assets.Banner2,
    assets.Sol1,
    assets.Solteeee
  ]

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full"
      >
        {
          slides.map((slide, i) => (
            <SwiperSlide key={i}>
              <img 
                src={slide} 
                alt={`Slide ${i + 1}`}
                className="w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[480px]"
              />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default Banner1
