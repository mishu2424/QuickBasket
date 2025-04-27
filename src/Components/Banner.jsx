import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination, Keyboard } from "swiper/modules";
import Slide from "./Slide";

// lotties
import banner1 from "../assets/images/banner-1.json";
import banner2 from "../assets/images/banner-2.json";
import banner3 from "../assets/images/banner-3.json";
import banner4 from "../assets/images/banner-4.json";

const Banner = () => {
  return (
    <Swiper
      direction={"vertical"}
      pagination={{
        clickable: true,
      }}
      keyboard={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
      modules={[Pagination, Keyboard, Autoplay]}
      className="mySwiper h-screen"
    >
      <SwiperSlide>
        <Slide
          text="Skip the lines and shop online. Fast delivery, top-quality items, and everything you need in just a few clicks."
          title="Groceries Made Easy"
          img={banner1}
        ></Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          text="From farm to front door — shop your favorite essentials and seasonal picks, all in one place."
          title="Fresh Groceries, Delivered Fast"
          img={banner4}
        ></Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          text="Explore our wide range of organic produce, pantry staples, and everyday essentials — delivered straight to your kitchen."
          title="Eat Fresh. Live Well."
          img={banner2}
        ></Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide
          text="From breakfast bites to dinner delights, we’ve got your family's favorites — fresh, fast, and always in stock.."
          title="Everything You Need for Every Meal"
          img={banner3}
        ></Slide>
      </SwiperSlide>
    </Swiper>
  );
};

export default Banner;
