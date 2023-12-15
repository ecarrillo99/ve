import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import AboutBanner from '../aboutBanner/AboutBanner';
import AppBanner from '../appBanner/AppBanner';

const MainBanner = () => {
    return (
        <div className='md:h-48 bg-greenVE-500 flex items-end justify-start pb-2 sm:pb-10'>
          <div className="mx-auto max-w-6xl py-6 px-4 sm:px-6 lg:px-8 w-full">
            <h1 className='text-white text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl'>
              Busca ofertas Hoteleras
            </h1>
            <h1 className='text-white text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl'>
              Encuentra <b>el mejor precio certificado. Pero en serio.</b>
            </h1>
          </div>
        </div>
      );
}

export default MainBanner;