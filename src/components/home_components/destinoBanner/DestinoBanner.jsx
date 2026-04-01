import { useEffect, useState } from "react";
import { getDestinoExpress } from "../../../controllers/info/infoController";
import Slider from 'react-slick';
import DestinoItem from "./DestinoItem";


const DestinoBanner = () => {
    const [coordenadas, setCoordenadas] = useState(null);
    const [data, setData] = useState(null)

    useEffect(() => {
        try {
            getDestinoExpress()
                .then((result) => {
                    if (result) {
                        if(result==401){
                            localStorage.removeItem('datos');
                            window.location.reload();
                        }else{
                            setData(result)
                        }
                    }
                })
                .catch((error) => {  })
        } catch (error) {
            console.error("Error:", error);
        }
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCoordenadas({ latitud: latitude, longitud: longitude });
                    try {
                        getDestinoExpress(latitude, longitude)
                            .then((result) => {
                                if (result) {
                                    if(result==401){
                                        localStorage.removeItem('datos');
                                        window.location.reload();
                                    }else{
                                        setData(result)
                                    }
                                }
                            })
                            .catch((error) => { })
                    } catch (error) {
                        console.error("Error:", error);
                    }
                },
                (error) => {
                    console.error('Error al obtener la ubicación:', error);
                }
            );
        } else {
            console.error('La geolocalización no es compatible con este navegador.');
        }
    }, []);

    const CustomNextArrow = (props) => {
        return (
          <div
            className="-mr-3 z-40 absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer rounded-full bg-white shadow-lg text-gray-800 text-lg h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={props.onClick}>
            <span className="icon-[material-symbols--arrow-forward-ios]"></span>
          </div>
        );
      };
    
      const CustomPrevArrow = (props) => {
        return (
          <div
            className="-ml-3 z-40 absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full bg-white shadow-lg text-gray-800 text-lg h-10 w-10 flex items-center justify-center hover:bg-gray-100 transition-colors"
            onClick={props.onClick}>
            <span className="icon-[material-symbols--arrow-back-ios-new]"></span>
          </div>
        );
      };

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 5000,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
        responsive: [
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ]
    };

    return (
        <div className="mt-10 md:mx-0 mx-5">
            <h1 className="font-bold text-2xl mb-2">Destino Express</h1>
            <div className="flex justify-between mb-6">
                <h6 className="text-gray-600 text-base">Descubre la emoción de escapadas cercanas. ¡Vive la aventura sin largos trayectos!</h6>
            </div>
            <div className="">
                <Slider {...settings}>
                    {data ? (
                        data.map((item, index) => (
                            <div key={index}>
                                <DestinoItem destino={item}></DestinoItem>
                            </div>
                        ))) : (<></>
                    )
                    }
                </Slider>
            </div>
        </div>
    );
}

export default DestinoBanner;