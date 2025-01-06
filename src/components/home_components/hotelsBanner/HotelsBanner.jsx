import "react-multi-carousel/lib/styles.css";
import ItemHotels from "./ItemHotels";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useEffect, useState } from "react";
import { getHotels } from "../../../controllers/info/infoController";
import ItemHotelsSkeleton from "./ItemHotelsSkeleton";


const HotelsBanner = () => {

  const [data, setData] = useState()
    useEffect(() => {
        async function fetchData() {
            try {
                getHotels()
                    .then((result) => {
                      if(result==401){
                        localStorage.removeItem('datos');
                        window.location.reload();
                      }else{
                          setData(result)
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
          className="-ml-3 z-10  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg pr-1 h-8 w-8 flex items-center justify-center"
          onClick={props.onClick}
          style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
          <span className="icon-[material-symbols--arrow-back-ios-new]"></span>
        </div>
      );
    };

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
        },
      },]
  };

  return (
    <div className="mt-10 mx-5 md:mx-0">
      <h1 className="font-bold text-xl">Establecimientos Asociados</h1>
      <div className="flex justify-between mb-4">
        <h6 className="text-md">Mas de 500 ofertas disponibles.</h6>
      </div>
      <Slider {...settings}>
        {data?(
          data.map((item, index)=>(
            <div key={index}>
              <ItemHotels hotel={item} ></ItemHotels>
            </div>
          ))):(
            Array(8).fill(null).map((item, index)=>(
              <div key={index}>
              <ItemHotelsSkeleton></ItemHotelsSkeleton>
            </div>
            ))
          )
        }
      </Slider>

    </div>
  );
};

export default HotelsBanner;

