import "./featured.css";
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
                        if (result) {
                            setData(result)
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
    <div className="mt-10 ">
      <h1 className="font-bold text-xl">Establecimientos Asociados</h1>
      <div className="flex justify-between mb-4">
        <h6 className="text-md">Mas de 500 ofertas disponibles.</h6>
      </div>
      <Slider {...settings}>
        {data?(
          data.map((item)=>(
            <div>
              <ItemHotels hotel={item} ></ItemHotels>
            </div>
          ))):(
            Array(8).fill(null).map((item)=>(
              <div>
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

