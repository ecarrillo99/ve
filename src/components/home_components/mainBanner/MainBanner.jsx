import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import AboutBanner from '../aboutBanner/AboutBanner';
import AppBanner from '../appBanner/AppBanner';
import Slider from 'react-slick';

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
      className="ml-3 z-50  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full text-lg pr-1 h-7 w-7 md:h-10 md:w-10 flex items-center justify-center"
      onClick={props.onClick}
      style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
      <span className="icon-[material-symbols--arrow-back-ios-new] z-50 h-7 w-7 md:h-10 :mdw-10"></span>
    </div>
  );
};

const MainBanner = () => {
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  const banners = [
    "./img/web/banner1.png",
    "./img/web/banner2.webp",
    //"./img/web/banner3.webp",
  ]
  const colors = [
    "bg-[#f2f7e8] flex items-center justify-center",
    "bg-greenVE-500 flex items-center justify-center ",
    "bg-[#f2f7e8] flex items-center justify-center ",
  ]
  const web = [
    "https://play.google.com/store/search?q=visitaecuador.com",
    "https://play.google.com/store/search?q=visitaecuador.com",
    //"https://play.google.com/store/search?q=visitaecuador.com",
  ]
  const i = Math.floor(Math.random() * banners.length+1);
  return (
    <Slider {...settings } >
  {
    banners.map((item, index) => (
      <div className={`${colors[index]} flex items-center justify-center z-0`}>
        <div className='w-full  flex justify-center items-center'>
          <img
            className=" object-cover cursor-pointer h-[110px] md:h-[100%] "
            src={item}
            onClick={() => window.open(web[index])}
          />
        </div>
      </div>
    ))
  }
</Slider>
  );
}

export default MainBanner;