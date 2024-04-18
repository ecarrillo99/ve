import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import AboutBanner from '../aboutBanner/AboutBanner';
import AppBanner from '../appBanner/AppBanner';
import Slider from 'react-slick';

const MainBanner = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
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
      <div className={colors[index]}>
        <img
          className=" object-cover cursor-pointer h-[110px] md:h-[100%] flex items-center justify-center"
          src={item}
          onClick={() => window.open(web[index])}
        />
      </div>
    ))
  }
</Slider>
  );
}

export default MainBanner;