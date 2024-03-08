import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import AboutBanner from '../aboutBanner/AboutBanner';
import AppBanner from '../appBanner/AppBanner';
import Slider from 'react-slick';

const MainBanner = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    rows: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  const banners = [
    "./img/banner_cpn.png",
    "./img/banner1.png",
    "./img/banner2.webp",
    "./img/banner3.webp",
  ]
  const colors = [
    "md:h-80 bg-[#434142] flex items-end justify-center ",
    "md:h-80 bg-[#f2f7e8] flex items-end justify-center ",
    "md:h-80 bg-greenVE-500 flex items-end justify-center ",
    "md:h-80 bg-[#f2f7e8] flex items-end justify-center ",
  ]
  const web = [
    "https://cpn.visitaecuador.com/",
    "https://play.google.com/store/search?q=visitaecuador.com",
    "https://play.google.com/store/search?q=visitaecuador.com",
    "https://play.google.com/store/search?q=visitaecuador.com",
  ]
  const i = Math.floor(Math.random() * 4);
  return (
    <Slider {...settings} >
  {
    banners.map((item, index) => (
      <div className={colors[index]}>
        <img
          className="h-[100%] object-cover cursor-pointer mx-auto"
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