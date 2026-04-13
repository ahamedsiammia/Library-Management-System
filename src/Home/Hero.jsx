import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <div className=" w-full min-h-[500px] py-10 flex items-center shadow-sm rounded-2xl">
      <div className="container w-full mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="flex-1 ">
          <h1 className="text-4xl md:text-6xl font-extrabold text-teal-500 leading-tight">
            Digital Library <br /> Management System
          </h1>
          <p className="mt-4 text-primary text-lg">
            Manage all your college books now with one click. Modern and easy
            library solution.
          </p>
          <button className="mt-8 px-8 py-3 bg-zinc-100/50  border border-zinc-200/80 text-teal-500 font-bold rounded-full shadow-lg hover:scale-105 transition-transform">
            Get Started
          </button>
        </div>

        <div className="h-[400px] w-full md:w-[600px] shrink-0">
          <Swiper
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Pagination, Autoplay]}
            className="mySwiper h-full rounded-2xl "
          >
            <SwiperSlide className="flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                className="w-[450px] h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                src="https://i.pinimg.com/1200x/56/cd/ba/56cdba52308639041a8fd19e0406c588.jpg"
                // src="/src/assets/Book1.jpg"
                alt="Library Book"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                src="https://i.pinimg.com/736x/6f/96/da/6f96da668c0966f4e0bbd0b050e63020.jpg"
                // src="/src/assets/Book1.jpg"
                alt="Library Book"
              />
            </SwiperSlide>
            <SwiperSlide className="flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                className="w-[450px] h-full object-cover object-center transition-transform duration-500 hover:scale-110"
                src="https://i.pinimg.com/736x/29/3e/61/293e610a26cf0164e8a9a7d1b066d657.jpg"
                // src="/src/assets/Book1.jpg"
                alt="Library Book"
              />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
