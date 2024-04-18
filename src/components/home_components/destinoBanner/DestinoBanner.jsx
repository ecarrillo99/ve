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
                .catch((error) => { console.log(error) })
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
                            .catch((error) => { console.log(error) })
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
            className="-mr-3  absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg h-8 w-8 flex items-center justify-center pl-1"
            onClick={props.onClick}
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
            <span className="icon-[material-symbols--arrow-forward-ios]"></span>
          </div>
        );
      };
    
      const CustomPrevArrow = (props) => {
        return (
          <div
            className="-ml-3 z-40  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg pr-1 h-8 w-8 flex items-center justify-center"
            onClick={props.onClick}
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
            <span className="icon-[material-symbols--arrow-back-ios-new]"></span>
          </div>
        );
      };

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
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
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 4,
                },
            },]
    };

    return (
        <div className="mt-10 md:mx-0 mx-5">
            <h1 className="font-bold text-xl">Destino Express</h1>
            <div className="flex justify-between mb-4">
                <h6 className="text-md">Descubre la emoción de escapadas cercanas. ¡Vive la aventura sin largos trayectos!</h6>
            </div>
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
    );
}

export default DestinoBanner;