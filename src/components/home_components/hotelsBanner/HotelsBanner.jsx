import "./featured.css";
import "react-multi-carousel/lib/styles.css";
import ItemHotels from "./ItemHotels";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


const HotelsBanner = () => {

  return (
    <div className="pb-10">
      <h1 className="font-bold text-2xl text-greenTitle pb-5">NUESTRAS ALIADOS</h1>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={10}
        slidesPerView={8}
        navigation
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false}}
        pagination={{ clickable: true }}
        speed={1500} 
        style={{
          "--swiper-pagination-color": "#96c121",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-navigation-color":"#96c121",
        }} 
        breakpoints={{
          420: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 10,
          },
        }}
        className="pb-10 px-10"
      >
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
        <SwiperSlide><ItemHotels /></SwiperSlide>
      </Swiper>
      {/*<Carousel
        showDots={true}
        responsive={responsive}
        autoPlaySpeed={3000}
        autoPlay={true}
        infinite={true}>
          <ItemRecomended/>
          <ItemRecomended/>
          <ItemRecomended/>
          <ItemRecomended/>
  </Carousel>*/}
    </div>
  );
};

export default HotelsBanner;
