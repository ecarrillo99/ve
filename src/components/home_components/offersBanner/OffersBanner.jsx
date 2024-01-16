import "react-multi-carousel/lib/styles.css";
import ItemRecomended from "./ItemRecomended";
import React, { useEffect, useState } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getRemoteOfertas } from "../../../controllers/establecimiento/establecimientoController";
import ItemRecomendedSkeleton from "./ItemRecomendedSkeleton";


const OffersBanner = () => {


  const [data, setData] = useState(null);


  useEffect(() => {

    async function fetchData() {

      try {
        getRemoteOfertas()
          .then((result) => {
            if (result) {
              if(result==401){
                localStorage.removeItem("datos");
                window.location.reload();
              }else{
                setData(result);
              }
            }
          })
          .catch((error) => { console.log(error) })

      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);



  const CustomNextArrow = (props) => {
    return (
      <div
        className="-mr-3 z-50 absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer"
        onClick={props.onClick}
        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
        <svg className="h-7 w-7" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <circle style={{ fill: '#eaeaea' }} cx="256" cy="256" r="256"></circle>
            <path style={{ fill: '#eaeaea' }} d="M321.188,503.613c75.616-19.852,137.561-73.419,168.814-143.665L386.055,256.002L270.295,361.66 l-40.482,50.579L321.188,503.613z"></path>
            <polygon style={{ fill: '#96c121' }} points="229.812,412.238 201.775,384.202 329.98,256.002 201.776,127.798 229.814,99.762 386.053,256.002 "></polygon>
            <polygon style={{ fill: '#96c121' }} points="386.053,256.002 229.812,412.238 201.775,384.202 329.98,256.002 "></polygon>
          </g>
        </svg>
      </div>
    );
  };

  const CustomPrevArrow = (props) => {
    return (
      <div
        className="-ml-3 z-50  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer"
        onClick={props.onClick}
        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
        <svg className="h-7 w-7" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000" transform="rotate(180)" >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <circle style={{ fill: '#eaeaea' }} cx="256" cy="256" r="256"></circle>
            <path style={{ fill: '#eaeaea' }} d="M321.188,503.613c75.616-19.852,137.561-73.419,168.814-143.665L386.055,256.002L270.295,361.66 l-40.482,50.579L321.188,503.613z"></path>
            <polygon style={{ fill: '#96c121' }} points="229.812,412.238 201.775,384.202 329.98,256.002 201.776,127.798 229.814,99.762 386.053,256.002 "></polygon>
            <polygon style={{ fill: '#96c121' }} points="386.053,256.002 229.812,412.238 201.775,384.202 329.98,256.002 "></polygon>
          </g>
        </svg>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 500,
    rows: 1,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2, // Cambié el número de elementos a mostrar en una fila
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3, // Cambié el número de elementos a mostrar en una fila
        },
      },
    ],
  };
  
  return (
    <div className="pt-5">
      <h1 className="font-bold text-xl">Nuestras ofertas</h1>
      <div className="flex justify-between mb-4">
        <h6 className="text-md">En hoteles TOP, el mejor precio certificado. Pero en serio.</h6>
      </div>
      <div>
        <Slider {...settings} spaceBetween={10}>
          {data ? (
            data.map((oferta, index) => (
              <div key={index} className="border-4 border-white">
                <ItemRecomended oferta={oferta} />
              </div>
            ))
          ) : (
            Array(5).fill(null).map((item, index)=>(
              <div key={index} className="border-4 border-white">
                <ItemRecomendedSkeleton />
              </div>
            ))
          )}
        </Slider>
      </div>
    </div>
  );  
};

export default OffersBanner;
