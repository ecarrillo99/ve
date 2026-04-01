import "react-multi-carousel/lib/styles.css";
import ItemHotels from "./ItemHotels";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from "react";
import { getHotels } from "../../../controllers/info/infoController";
import ItemHotelsSkeleton from "./ItemHotelsSkeleton";

const HotelsBanner = () => {
  const [data, setData] = useState();

  useEffect(() => {
    async function fetchData() {
      try {
        getHotels()
          .then((result) => {
            if (result == 401) {
              localStorage.removeItem('datos');
              window.location.reload();
            } else {
              setData(result);
            }
          })
          .catch((error) => {});
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);

  const CustomNextArrow = (props) => (
    <button
      className="absolute top-1/2 -translate-y-1/2 -right-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md text-greenVE-600 flex items-center justify-center hover:bg-greenVE-600 hover:text-white hover:border-greenVE-600 transition-all duration-200"
      onClick={props.onClick}
      aria-label="Siguiente"
    >
      <span className="icon-[material-symbols--arrow-forward-ios] text-sm" />
    </button>
  );

  const CustomPrevArrow = (props) => (
    <button
      className="absolute top-1/2 -translate-y-1/2 -left-4 z-10 w-9 h-9 rounded-full bg-white border border-gray-200 shadow-md text-greenVE-600 flex items-center justify-center hover:bg-greenVE-600 hover:text-white hover:border-greenVE-600 transition-all duration-200"
      onClick={props.onClick}
      aria-label="Anterior"
    >
      <span className="icon-[material-symbols--arrow-back-ios-new] text-sm" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 400,
    slidesToShow: 6,
    slidesToScroll: 3,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      { breakpoint: 900,  settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 1150, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1300, settings: { slidesToShow: 4, slidesToScroll: 4 } },
    ],
  };

  return (
    <section className="mt-10 mx-5 md:mx-0">
      {/* Header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1 h-5 rounded-full bg-greenVE-500 inline-block" />
            <h2 className="font-bold text-xl text-gray-800 tracking-tight">
              Establecimientos Asociados
            </h2>
          </div>
          <p className="text-sm text-gray-500 pl-3">
            Más de <span className="font-semibold text-greenVE-600">500 ofertas</span> disponibles
          </p>
        </div>
      </div>

      {/* Slider */}
      <div className="relative px-1">
        <Slider {...settings}>
          {data
            ? data.map((item, index) => (
                <div key={index} className="px-1.5">
                  <ItemHotels hotel={item} />
                </div>
              ))
            : Array(8).fill(null).map((_, index) => (
                <div key={index} className="px-1.5">
                  <ItemHotelsSkeleton />
                </div>
              ))}
        </Slider>
      </div>
    </section>
  );
};

export default HotelsBanner;