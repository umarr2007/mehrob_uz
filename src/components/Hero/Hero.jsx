import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./hero.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

function Hero() {
  const [todayData, setTodayData] = useState(null);

  return (
    <div className="hero">
      <div className="hero_wrapper">
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          speed={700}
          className="hero_swiper"
        >
          <SwiperSlide>
            <img src="/img1.png" alt="slide 1" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/img2.png" alt="slide 2" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/img3.jpg" alt="slide 3" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

export default Hero;
