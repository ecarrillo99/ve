import "react-multi-carousel/lib/styles.css";
import ItemRecomended from "./ItemRecomended";
import React, { useEffect, useRef, useState, useCallback } from "react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getRemoteOfertas } from "../../../controllers/establecimiento/establecimientoController";
import ItemRecomendedSkeleton from "./ItemRecomendedSkeleton";

const TIPOS_ESTABLECIMIENTO = [
  { key: "", label: "Todos" },
  { key: "Hoteles", label: "Hoteles" },
  { key: "Hosterías", label: "Hosterías" },
  { key: "Resort - Spa", label: "Resort & Spa" },
  { key: "SPA", label: "SPA" },
  { key: "Hacienda", label: "Haciendas" },
  { key: "Hospedaje Familiar", label: "Hospedaje Familiar" },
];


const OffersBanner = ({ tipoEst = "", setTipoEst = () => {} }) => {

  const [data, setData] = useState(null);
  const [openTipoFilter, setOpenTipoFilter] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenTipoFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


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
          .catch((error) => { })

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
    slidesToShow: 3,
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
  
  const labelActual = TIPOS_ESTABLECIMIENTO.find((t) => t.key === tipoEst)?.label || "Todos";

  return (
    <div className="pt-5 mx-5 md:mx-0">
      {/* Filtro tipo de establecimiento */}
      <div className="flex relative mb-1" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 border-2 h-fit rounded-xl px-2 py-0.5 mb-3 text-sm cursor-pointer select-none hover:bg-gray-50 transition-colors"
          onClick={() => setOpenTipoFilter(!openTipoFilter)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Tipo: {labelActual}
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 15l5 5 5-5"/><path d="M7 9l5-5 5 5"/>
          </svg>
        </div>
        {openTipoFilter && (
          <div className="absolute top-8 flex flex-col bg-white border rounded-md shadow-xl z-50 min-w-max">
            {TIPOS_ESTABLECIMIENTO.map((tipo) => (
              <button
                key={tipo.key}
                className={`hover:bg-gray-200 px-3 py-1.5 text-sm text-left transition-colors ${tipoEst === tipo.key ? "bg-gray-100 font-medium" : ""}`}
                onClick={() => { setTipoEst(tipo.key); setOpenTipoFilter(false); }}
              >
                {tipo.label}
              </button>
            ))}
          </div>
        )}
      </div>

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