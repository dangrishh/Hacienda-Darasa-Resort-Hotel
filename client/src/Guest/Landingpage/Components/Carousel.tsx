import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Slide1 from "./Slide1";
import Slide2 from "./Slide2";
import Slide3 from "./Slide3";

const Carousel: React.FC = () => {
  return (
    <div className="h-[920px] w-full relative">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        className="h-full w-full"
      >
        {/*
        <SwiperSlide>
          <Slide1 />
        </SwiperSlide>
        <SwiperSlide>
          <Slide2 />
        </SwiperSlide>*/}
        <SwiperSlide>
          <Slide3 />
        </SwiperSlide>
      </Swiper>

      {/* ✅ Move Pagination Up & Style Bullets */}
      <style>
        {`
          .swiper-pagination {
            bottom: 50px !important; /* Moves pagination up */
          }

          .swiper-pagination-bullet {
            width: 20px;
            height: 20px;
            background-color: white;
            opacity: 0.7;
            border-radius: 50%;
          }

          .swiper-pagination-bullet-active {
            background-color: gray;
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
