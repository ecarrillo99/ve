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
        className="-mr-3  absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg h-8 w-8 flex items-center justify-center pl-1"
        onClick={props.onClick}
        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
        <span className="icon-[material-symbols--arrow-forward-ios]"></span>
      </div>
    );
  };

  const CustomPrevArrow = (props) => {
    return (
      <div
        className="-ml-3 z-40  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg pr-1 h-8 w-8 flex items-center justify-center"
        onClick={props.onClick}
        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
        <span className="icon-[material-symbols--arrow-back-ios-new]"></span>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
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
    <div className="pt-5 mx-5 md:mx-0">
      <h1 className="font-bold text-xl">Nuestras ofertas</h1>
      <div className="flex justify-between mb-4">
        <h6 className="text-md">En hoteles TOP, el mejor precio certificado. Pero en serio.</h6>
      </div>
      <div>
        <Slider {...settings} >
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
