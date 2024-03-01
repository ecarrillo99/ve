import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import AboutBanner from '../aboutBanner/AboutBanner';
import AppBanner from '../appBanner/AppBanner';

const MainBanner = () => {
  const banners=[
      "/img/banner1.png",
      "/img/banner2.webp",
      "/img/banner3.webp"
    ]
  const colors=[
    "md:h-80 bg-[#f2f7e8] flex items-end justify-center ",
    "md:h-80 bg-greenVE-500 flex items-end justify-center ",
    "md:h-80 bg-[#f2f7e8] flex items-end justify-center "
  ]
  const i =Math.floor(Math.random() * 3);
    return (
        <div className={colors[i]}>
          {<img className='h-[100%] object-cover cursor-pointer' src={banners[i]} onClick={()=>window.open("https://play.google.com/store/search?q=visitaecuador.com")}/>}
          {/*<div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 lg:px-8 w-full">
            <h1 className='text-white text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl'>
              Busca ofertas Hoteleras
            </h1>
            <h1 className='text-white text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl'>
              Encuentra <b>el mejor precio certificado. Pero en serio.</b>
            </h1>
          </div>*/}
        </div>
      );
}

export default MainBanner;