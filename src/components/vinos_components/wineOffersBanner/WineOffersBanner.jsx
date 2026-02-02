import "react-multi-carousel/lib/styles.css";
import WineOfferItem from "./WineOfferItem";
import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getWineOffers } from "../../../core/vinoApiService";
import WineOfferItemSkeleton from "./WineOfferItemSkeleton";

const WineOffersBanner = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getWineOffers();
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching wine offers:", error);
        setError("No se pudieron cargar las ofertas");
      }
    }

    fetchData();
  }, []);

  const CustomNextArrow = (props) => {
    return (
      <div
        className="-mr-3 absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer rounded-full bg-amber-50 text-amber-600 text-lg h-8 w-8 flex items-center justify-center pl-1 hover:bg-amber-100 transition-colors"
        onClick={props.onClick}
        style={{ filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3))" }}
      >
        <span className="icon-[material-symbols--arrow-forward-ios]"></span>
      </div>
    );
  };

  const CustomPrevArrow = (props) => {
    return (
      <div
        className="-ml-3 z-40 absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full bg-amber-50 text-amber-600 text-lg pr-1 h-8 w-8 flex items-center justify-center hover:bg-amber-100 transition-colors"
        onClick={props.onClick}
        style={{ filter: "drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.3))" }}
      >
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
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="pt-5 mx-5 md:mx-0">
      {/* Header con icono de vino */}
      <div className="flex items-center gap-2 mb-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-amber-600"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M6 3l-.01 6.62c0 1.59.51 3.13 1.46 4.42l.05.07c.9 1.22 1.47 2.69 1.5 4.26V21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.63c.03-1.57.6-3.04 1.5-4.26l.05-.07c.95-1.29 1.46-2.83 1.46-4.42L17 3H6zm3.11 9.71l-.11.15c-.7.95-1.21 2.04-1.5 3.18-1.18-1.88-1.51-4.16-1.29-6.04h7.58c.22 1.88-.11 4.16-1.29 6.04-.29-1.14-.8-2.23-1.5-3.18l-.11-.15c-.52-.71-.89-1.54-.89-2.39V5h-2v5.33c0 .85-.37 1.68-.89 2.38z" />
        </svg>
        <h1 className="font-bold text-xl text-gray-800">
          Ofertas Exclusivas de Vinos
        </h1>
      </div>

      <div className="flex justify-between mb-4">
        <h6 className="text-md text-gray-600">
          Descubre promociones especiales con regalos incluidos de nuestros
          establecimientos asociados
        </h6>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Slider */}
      <div>
        <Slider {...settings}>
          {data
            ? data.map((offer, index) => (
                <div key={offer.id || index} className="border-4 border-white">
                  <WineOfferItem offer={offer} />
                </div>
              ))
            : Array(5)
                .fill(null)
                .map((item, index) => (
                  <div key={index} className="border-4 border-white">
                    <WineOfferItemSkeleton />
                  </div>
                ))}
        </Slider>
      </div>

      {/* Empty state */}
      {data && data.length === 0 && (
        <div className="text-center py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-300 mx-auto mb-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 3l-.01 6.62c0 1.59.51 3.13 1.46 4.42l.05.07c.9 1.22 1.47 2.69 1.5 4.26V21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.63c.03-1.57.6-3.04 1.5-4.26l.05-.07c.95-1.29 1.46-2.83 1.46-4.42L17 3H6z" />
          </svg>
          <p className="text-gray-500">
            No hay ofertas disponibles en este momento
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Vuelve pronto para ver nuevas promociones
          </p>
        </div>
      )}
    </div>
  );
};

export default WineOffersBanner;