import "./featured.css";
import "react-multi-carousel/lib/styles.css";
import ItemRecomended from "./ItemRecomended";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


const OffersBanner = () => {

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
    <div className="pt-5">
      <h1 className="font-bold text-2xl text-greenTitle text-center pb-3">NUESTRAS OFERTAS</h1>
      <div className="grid lg:grid-cols-8 sm:grid-cols-4 xs:grid-cols-2 md:grid-cols-4 grid-flow-row pb-3 max-sm:grid-cols-2">
        <button className="col-span-1 bg-nacionalesColor h-10 text-white rounded-lg m-1 text-sm" onClick={null}>
          Nacionales
        </button>
        <button className="col-span-1 bg-internacionalesColor h-10 text-white rounded-lg m-1 text-sm" onClick={null}>
          Internacionales
        </button>
        <button className="col-span-1 bg-gangaColor h-10 text-white rounded-lg m-1 text-sm" onClick={null}>
          Ganga
        </button>
        <button className="col-span-1 bg-escapateColor h-10 text-white rounded-lg m-1 text-sm" onClick={null}>
          Escápate
        </button>
        <button className="col-span-1 bg-remateColor h-10 text-white rounded-lg m-1 text-sm" onClick={null}>
          Remate
        </button>
        <button className="col-span-1 bg-especialesColor h-10 text-white rounded-lg m-1 text-sm" onClick={null}>
          Especiales
        </button>
        <button className="col-span-1 bg-feriadosColor h-10 text-white rounded-lg m-1 text-sm" onClick={null}>
          Feriados
        </button>
        <button className="col-span-1 bg-businessColor h-10 text-white rounded-lg m-1 text-sm" onClick={null}>
          Business
        </button>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        speed={1500}
        style={{
          "--swiper-pagination-color": "#96c121",
          "--swiper-pagination-bullet-inactive-color": "#999999",
          "--swiper-pagination-bullet-inactive-opacity": "0.5",
          "--swiper-navigation-color": "#96c121",
        }}
        breakpoints={{
          420: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        className="pb-10 px-10"
      >
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
        <SwiperSlide><ItemRecomended /></SwiperSlide>
      </Swiper>
    </div>
  );
};

export default OffersBanner;
