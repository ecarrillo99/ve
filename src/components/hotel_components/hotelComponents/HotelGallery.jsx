
import React, { useState, useEffect } from 'react';
import { Galleria } from 'primereact/galleria';
import { RadioButton } from 'primereact/radiobutton';

const HotelGallery= (props)=> {
    const [position, setPosition] = useState('bottom');
    const {Galeria}=props;
    const positionOptions = [
        {
            label: 'Bottom',
            value: 'bottom'
        },
        {
            label: 'Top',
            value: 'top'
        },
        {
            label: 'Left',
            value: 'left'
        },
        {
            label: 'Right',
            value: 'right'
        }
    ];
    var images= []
    Galeria.forEach((item)=>{
        images.push(
            {
                itemImageSrc: item["Valor"],
                thumbnailImageSrc: item["Valor"],
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
        );
    });

    
    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    const itemTemplate = (item) => {
        return <img className='w-[1000px] object-cover h-[350px]' src={item.itemImageSrc} />
    }

    const thumbnailTemplate = (item) => {
        return <img className='w-36 object-cover h-20 p-1'  src={item.thumbnailImageSrc} />
    }

    return (
        <Galleria value={images} numVisible={5} item={itemTemplate} thumbnailsPosition={"bottom"} thumbnail={thumbnailTemplate} 
        circular autoPlay transitionInterval={3000}/>
    )
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
