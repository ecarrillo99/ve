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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };


  return (
    <div className="pt-20">
      <h1 className="font-bold text-2xl text-greenTitle text-center pb-5">NUESTRAS ALIADOS</h1>
      
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={5}
        navigation
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false}}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
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
            slidesPerView: 5,
            spaceBetween: 50,
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
