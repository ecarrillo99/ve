import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import AboutBanner from '../aboutBanner/AboutBanner';
import AppBanner from '../appBanner/AppBanner';

const MainBanner = () => {
    return (
        <Swiper
            className='z-0 h-1/6'
            modules={[Scrollbar, A11y, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{
                "delay": 5000,
                "disableOnInteraction": false
            }}
            pagination={{ clickable: true }}
            speed={1500}>
            <SwiperSlide>
                <div className="bg-cover bg-center h-auto" style={{ backgroundImage: "url('/img/main_banner_background.jpg')" }}>
                    <div className="grid grid-cols-2 mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 ">
                        <div class="flex items-center justify-center">
                            <div>
                                <img src="/img/ve_logo.svg" style={{ width: "100px", height: "auto" }} class="mx-auto" />
                                <h2 className="items-center text-2xl text-white font-semibold">En hoteles top, el mejor<br />precio certificado.<br /><span className="border-b-4 border-white">Pero en serio.</span></h2>
                                <img src="/img/ve_best_price.svg" style={{ width: "100px", height: "auto" }} class="mx-auto pt-7" />
                            </div>

                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <AboutBanner/>
            </SwiperSlide>
            <SwiperSlide>
                <AppBanner/>
            </SwiperSlide>
        </Swiper>

    )
}

export default MainBanner;