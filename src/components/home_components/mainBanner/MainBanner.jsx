import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import AboutBanner from '../aboutBanner/AboutBanner';
import AppBanner from '../appBanner/AppBanner';
import { getBanners } from "../../../controllers/info/infoController";
import Slider from 'react-slick';
import ImageItem from './ImageItem';
import { useEffect, useState } from 'react';

var firstTime=true;

const CustomNextArrow = (props) => {
  return (
    <div
      className="mr-3  absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer  text-lg h-7 w-7 md:h-10 md:w-10 flex items-center justify-center pl-1"
      onClick={props.onClick}
      style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
      <span className="icon-[material-symbols--arrow-forward-ios] z-50 h-7 w-7 md:h-10 :mdw-10"></span>
    </div>
  );
};

const CustomPrevArrow = (props) => {
  return (
    <div
      className="ml-3 z-20  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full text-lg pr-1 h-7 w-7 md:h-10 md:w-10 flex items-center justify-center"
      onClick={props.onClick}
      style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
      <span className="icon-[material-symbols--arrow-back-ios-new] z-50 h-7 w-7 md:h-10 :mdw-10"></span>
    </div>
  );
};

const MainBanner = () => {
  const [banners, setBanners] = useState();
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 1000,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  useEffect(()=>{
    if(firstTime){
      firstTime=false;
      getBanners().then((resp)=>{
        if(resp){
          firstTime=true;
          setBanners(resp);
        }
      })
    }
  },[])
  /*Tomar en cuenta que el fondo toma el color del primer pixel de la esquina superior izquierda*/
  return (
      banners!=null
      ?<Slider {...settings } >
      {
        banners.map((item, index) => (
              <ImageItem alt={""} src={item.Icono} key={index} url={item.Valor}/>
        ))
      }
    </Slider>
      :<div className='bg-gray-100 md:h-[300px] animate-pulse'></div>
  );
}

export default MainBanner;