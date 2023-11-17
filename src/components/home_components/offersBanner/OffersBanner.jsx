import "./featured.css";
import "react-multi-carousel/lib/styles.css";
import ItemRecomended from "./ItemRecomended";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { getRemoteOfertas } from "../../../controllers/establecimiento/establecimientoController";
import ItemRecomendedSkeleton from "./ItemRecomendedSkeleton";


const OffersBanner = () => {


  const [data, setData] = useState(null);


  useEffect(() => {
    
    async function fetchData() {
      
      try {
        getRemoteOfertas()
          .then( (result) => {
            if (result) {
               setData(result);
            }
          })
          .catch((error)=>{console.log(error)})

      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);


  return (
    <div className="pt-5">
      <h1 className="font-bold text-2xl text-greenTitle pb-3">NUESTRAS OFERTAS</h1>
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
        spaceBetween={10}
        slidesPerView={4}
        navigation
        autoplay={{
          "delay": 3000,
          "disableOnInteraction": false
        }}
        pagination={{ clickable: true }}
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
            slidesPerView: 4,
            spaceBetween: 10,
          },
        }}
        className="pb-10 px-10"
      >
        {data ? (
          data.map((oferta) => (
            <SwiperSlide><ItemRecomended oferta={oferta} /></SwiperSlide>
          ))
        ) : (
          <div>
            <SwiperSlide><ItemRecomendedSkeleton/></SwiperSlide>
            <SwiperSlide><ItemRecomendedSkeleton/></SwiperSlide>
            <SwiperSlide><ItemRecomendedSkeleton/></SwiperSlide>
            <SwiperSlide><ItemRecomendedSkeleton/></SwiperSlide>
          </div>
        )
        }
      </Swiper>
    </div>
  );
};

export default OffersBanner;
