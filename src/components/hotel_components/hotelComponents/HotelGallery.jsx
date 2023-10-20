import React, { Component } from 'react';
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';



const HotelGallery = () => {

    const [currentImage, setCurrentImage] = useState(0);
    const productImages = [
        "https://i.ytimg.com/vi/zuDlrFwsfIQ/maxresdefault.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/1d/65/cb/87/caption.jpg",
        "https://images.trvl-media.com/lodging/25000000/24270000/24268000/24267946/a46ec013.jpg?impolicy=resizecrop&rw=500&ra=fit",
        "https://media-cdn.tripadvisor.com/media/photo-s/0d/cb/58/41/fb-img-1480387450949.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/0d/cb/58/41/fb-img-1480387450949.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/0d/cb/58/41/fb-img-1480387450949.jpg",
        "https://media-cdn.tripadvisor.com/media/photo-s/0d/cb/58/41/fb-img-1480387450949.jpg",

    ];
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
                    
                    {productImages.map((img, index) => (
                        <SwiperSlide>
                            <img
                                key={index}
                                src={img}
                                onClick={() => setCurrentImage(index)}
                                alt="thumbnail-image"
                                className="rounded-md cursor-pointer h-24 w-full object-cover"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='w-10/12'>
                <motion.div initial="exit" animate="enter" exit="exit" variants={imageVariants} key={currentImage}>
                    <img
                        src={productImages[currentImage]}
                        alt="main-image"
                        className="rounded-md h-gallery w-full object-cover"
                    />
                </motion.div>
            </div>
        </div>
    )
}

export default HotelGallery
