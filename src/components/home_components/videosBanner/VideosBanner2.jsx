import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VideosBanner = () => {
    const CustomNextArrow = (props) => {
        return (
            <div
                className="-mr-3 z-50 absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer"
                onClick={props.onClick}
                style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
                <svg className="h-7 w-7" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <circle style={{ fill: '#eaeaea' }} cx="256" cy="256" r="256"></circle>
                        <path style={{ fill: '#eaeaea' }} d="M321.188,503.613c75.616-19.852,137.561-73.419,168.814-143.665L386.055,256.002L270.295,361.66 l-40.482,50.579L321.188,503.613z"></path>
                        <polygon style={{ fill: '#96c121' }} points="229.812,412.238 201.775,384.202 329.98,256.002 201.776,127.798 229.814,99.762 386.053,256.002 "></polygon>
                        <polygon style={{ fill: '#96c121' }} points="386.053,256.002 229.812,412.238 201.775,384.202 329.98,256.002 "></polygon>
                    </g>
                </svg>
            </div>
        );
    };

    const CustomPrevArrow = (props) => {
        return (
            <div
                className="-ml-3 z-50  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer"
                onClick={props.onClick}
                style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
                <svg className="h-7 w-7" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xmlSpace="preserve" fill="#000000" transform="rotate(180)" >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <circle style={{ fill: '#eaeaea' }} cx="256" cy="256" r="256"></circle>
                        <path style={{ fill: '#eaeaea' }} d="M321.188,503.613c75.616-19.852,137.561-73.419,168.814-143.665L386.055,256.002L270.295,361.66 l-40.482,50.579L321.188,503.613z"></path>
                        <polygon style={{ fill: '#96c121' }} points="229.812,412.238 201.775,384.202 329.98,256.002 201.776,127.798 229.814,99.762 386.053,256.002 "></polygon>
                        <polygon style={{ fill: '#96c121' }} points="386.053,256.002 229.812,412.238 201.775,384.202 329.98,256.002 "></polygon>
                    </g>
                </svg>
            </div>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 4000,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
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
        <div className="mt-10">
            <h1 className="font-bold text-xl">Entérate de las ventajas de ser Suscriptor</h1>
            <Slider {...settings}>
                <div className=" bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center p-4 rounded-lg border-4 border-white cursor-pointer" onClick={()=>{window.open('https://youtu.be/VFjswE0are8?feature=shared', '_blank');}}>
                    <div className="text-white font-bold text-center flex flex-col items-center justify-between">
                        <label>¿Cómo descargar <br />la aplicación?</label>
                        <img src="/img/ve_logo.svg" className="mt-4" style={{ width: "110px", height: "auto" }} alt="Logo" />
                    </div>
                </div>
                <div className="bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center p-4 rounded-lg border-4 border-white cursor-pointer" onClick={()=>{window.open('https://youtu.be/7pAur5LY7_Y?feature=shared', '_blank');}}>
                    <div className="text-white font-bold text-center flex flex-col items-center justify-between">
                        <label>¿Cómo realizar <br />una reserva?</label>
                        <img src="/img/ve_logo.svg" className="mt-4" style={{ width: "110px", height: "auto" }} alt="Logo" />
                    </div>
                </div>
                <div className="bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center p-4 rounded-lg border-4 border-white cursor-pointer" onClick={()=>{window.open('https://youtu.be/PJKuhZO96DI?feature=shared', '_blank');}}>
                    <div className="text-white font-bold text-center flex flex-col items-center justify-between">
                        <label>¿Cómo comprar <br />una suscripción?</label>
                        <img src="/img/ve_logo.svg" className="mt-4" style={{ width: "110px", height: "auto" }} alt="Logo" />
                    </div>
                </div>
                <div className="bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center p-4 rounded-lg border-4 border-white cursor-pointer" onClick={()=>{window.open('https://youtu.be/roZ8H-RT-j0?feature=shared', '_blank');}}>
                    <div className="text-white font-bold text-center flex flex-col items-center justify-between">
                        <label>¿Cómo generar <br />un certificado?</label>
                        <img src="/img/ve_logo.svg" className="mt-4" style={{ width: "110px", height: "auto" }} alt="Logo" />
                    </div>
                </div>
            </Slider>
        </div>
    )
}

export default VideosBanner;