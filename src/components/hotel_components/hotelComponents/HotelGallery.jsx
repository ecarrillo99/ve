import React, { useState } from 'react';
import { Galleria } from 'primereact/galleria';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const HotelGallery = (props) => {
    const { Galeria } = props;
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const images = Galeria.map(item => ({
        itemImageSrc: item["Valor"],
        thumbnailImageSrc: item["Valor"],
        alt: 'Gallery Image',
        title: 'Gallery Image'
    }));

    const handleBackgroundClick = (e) => {
        if (e.target === e.currentTarget) {
            setIsFullscreen(false);
        }
    };

    const handleNavigation = (direction) => {
        if (direction === 'prev') {
            setActiveIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
        } else {
            setActiveIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
        }
    };

    const itemTemplate = (item) => {
        return (
            <div
                onClick={() => setIsFullscreen(true)}
                className="cursor-pointer relative w-full h-[500px] overflow-hidden"
            >
                <img
                    className="absolute inset-0 w-full h-full object-contain"
                    src={item.itemImageSrc}
                    alt={item.alt}
                />
            </div>
        );
    }

    const thumbnailTemplate = (item) => {
        return (
            <div className="w-36 h-20 overflow-hidden">
                <img
                    className="w-full h-full object-cover"
                    src={item.thumbnailImageSrc}
                    alt={item.alt}
                />
            </div>
        );
    }

    const fullscreenItemTemplate = (item) => {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen" onClick={handleBackgroundClick}>
                <div className="relative max-w-7xl mx-auto">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 z-50 text-white hover:text-gray-300 transition-colors"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation('prev');
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                        aria-label="Previous"
                    >
                        <ChevronLeft size={40} />
                    </button>

                    <img
                        src={images[activeIndex].itemImageSrc}
                        alt={images[activeIndex].alt}
                        className="max-h-[90vh] max-w-[90vw] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation('next');
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
                        aria-label="Next"
                    >
                        <ChevronRight size={40} />
                    </button>
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto max-w-[90vw] p-2" onClick={(e) => e.stopPropagation()}>
                    {images.map((img, idx) => (
                        <img
                            key={idx}
                            src={img.thumbnailImageSrc}
                            alt={`Thumbnail ${idx + 1}`}
                            onClick={() => setActiveIndex(idx)}
                            className={`w-20 h-20 object-cover cursor-pointer transition-opacity
                                ${activeIndex === idx ? 'opacity-100' : 'opacity-50'} 
                                hover:opacity-100`}
                        />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <Galleria
                value={images}
                numVisible={5}
                item={itemTemplate}
                thumbnailsPosition="bottom"
                thumbnail={thumbnailTemplate}
                circular
                autoPlay={!isFullscreen}
                transitionInterval={3000}
                activeIndex={activeIndex}
                onItemChange={(e) => !isFullscreen && setActiveIndex(e.index)}
                className="w-full"
                style={{ maxWidth: '100%' }}
            />

            {isFullscreen && (
                <div
                    className="fixed inset-0 z-50 bg-black bg-opacity-80"
                    onClick={handleBackgroundClick}
                >
                    <div onClick={(e) => e.stopPropagation()}>
                        {fullscreenItemTemplate(images[activeIndex])}
                    </div>
                </div>
            )}
        </div>
    );
}

export default HotelGallery;


/*import React, { Component } from 'react';
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';



const HotelGallery = (props) => {
    const {Galeria}=props
    const [currentImage, setCurrentImage] = useState(0);

    const imageVariants = {
        exit: { opacity: 0, y: 20, scale: 0.98, transition: { duration: 0.4 } },
        enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    };
    return (
        <div className=' flex gap-3 pt-4'>
            <div className='w-2/12 flex flex-col  gap-2'>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    direction={'vertical'}
                    className='h-gallery'
                    spaceBetween={8}
                    slidesPerView={4}
                    autoplay={{
                        "delay": 1500,
                        "disableOnInteraction": false
                      }}
                      speed={1000}
                    >

                    {Galeria.map((img, index) => (
                        <SwiperSlide key={index}>
                            <img
                                key={index}
                                src={img.Valor}
                                onClick={() => setCurrentImage(index)}
                                className="rounded-md cursor-pointer h-24 w-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='w-10/12'>
                <motion.div initial="exit" animate="enter" exit="exit" variants={imageVariants} key={currentImage}>
                    <img
                        src={Galeria[currentImage].Valor}
                        className="rounded-md h-gallery w-full object-cover"
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default HotelGallery*/
