import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const VideosBanner = () => {
    const CustomNextArrow = (props) => {
        return (
            <div
                className="-mr-3  absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer"
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
                className="-ml-3 z-30  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer"
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
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,

    };

    return (
        <div className="mt-10 ">
            <div className='flex md:gap-8  flex-col md:flex-row gap-7'>
                <div className='mx-5 md:mx-0 md:w-[31.5%]'>
                    <h1 className="font-bold text-xl pl-1">VisitaEcuador.com</h1>
                    <Slider {...settings}>
                        <div className="bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center rounded-lg border-4 border-white cursor-pointer" onClick={() => { window.open('https://www.youtube.com/watch?v=E7wBH85tJZM&list=PLoJIl4RxrOuipCFIrm3o1b5ejtkjmc1Bf', '_blank'); }}>
                            <div className="flex items-center justify-center">
                                <img src="./img/web/ve_quees.png" className="h-[170px]"/>
                            </div>
                        </div>
                        <div className="bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center rounded-lg border-4 border-white cursor-pointer" onClick={() => { window.open('https://www.youtube.com/watch?v=zYZLhoMEy8o&list=PLoJIl4RxrOugErlsERXyOzEjkmRpoOxp6', '_blank'); }}>
                            <div className="flex items-center justify-center">
                                <img src="./img/web/ve_influencer.png" className="h-[170px]" />
                            </div>
                        </div>
                        <div className="bg-[#f3f7e8] aspect-w-16 aspect-h-9 flex justify-center items-center rounded-lg border-4 border-white cursor-pointer" onClick={() => { window.open('https://www.youtube.com/watch?v=hMwe4kteLOo&list=PLoJIl4RxrOuhixQkJ5DEXEsdzF-C5UgCb', '_blank'); }}>
                            <div className="flex items-center justify-center">
                                <img src="./img/web/ve_bicipet.png" className="h-[170px]" />
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className='mx-5 md:mx-0 md:w-[31.5%]'>
                    <h1 className="font-bold text-xl pl-1">Recomendados</h1>
                    <Slider {...settings}>
                    <div className="bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center rounded-lg border-4 border-white cursor-pointer relative overflow-hidden" onClick={() => { window.open('https://www.youtube.com/watch?v=L7VatuY-UZ8&list=PL9GTu60V_TJqk4buTJOqv2LKWqZPnKKIe', '_blank'); }}>
                        <div className="flex items-center relative z-10">
                            <img src="./img/web/hoteles.jpg" className="h-[170px] w-full object-cover" />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
                        <div className="absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center">
                            <div className="text-white text-4xl font-bold">HOTELES</div>
                        </div>
                    </div>
                    <div className="bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center rounded-lg border-4 border-white cursor-pointer relative overflow-hidden" onClick={() => { window.open('https://www.youtube.com/watch?v=02tXe1JTdoo&list=PL9GTu60V_TJoIoNqd2KFsvVtHG8l1-kQw', '_blank'); }}>
                        <div className="flex items-center relative z-10">
                            <img src="./img/web/huecas.jpg" className="h-[170px] w-full object-cover"  />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
                        <div className="absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center">
                            <div className="text-white text-4xl font-bold">HUECAS</div>
                        </div>
                    </div>
                    <div className="bg-greenVE-500 aspect-w-16 aspect-h-9 flex justify-center items-center rounded-lg border-4 border-white cursor-pointer relative overflow-hidden" onClick={() => { window.open('https://www.youtube.com/watch?v=lxwvngPafOs&list=PL9GTu60V_TJp4t7oyuHPJVVbRzBq2lbk2', '_blank'); }}>
                        <div className="flex items-center relative z-10">
                            <img src="./img/web/aventuras.jpg" className="h-[170px] w-full object-cover"  />
                        </div>
                        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-20"></div>
                        <div className="absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center">
                            <div className="text-white text-4xl font-bold">AVENTURAS</div>
                        </div>
                    </div>
                    </Slider>
                </div>
                <div className='mx-5 md:mx-0 md:w-[31.5%]'>
                    <h1 className="font-bold text-xl pl-1">Disney Destinations Concierge</h1>
                    <Slider  {...settings}>
                        <div className="bg-[#f3f7e8] aspect-w-16 aspect-h-9 flex justify-center items-center rounded-lg border-4 border-white cursor-pointer" onClick={() => { window.open('https://www.youtube.com/watch?v=1gAbSh17SVQ&list=PLfJNkC1lghoyfHnPpgKZJNggpRD5_H41L', '_blank'); }}>
                            <div className="flex items-center justify-center">
                                <img src="./img/web/dc_quees.png" className="h-[170px] w-full object-cover rounded-md border" />
                            </div>
                        </div>
                        <div className="bg-[#f3f7e8] aspect-w-16 aspect-h-9 flex justify-center items-center rounded-lg border-4 border-white cursor-pointer" onClick={() => { window.open('https://www.youtube.com/watch?v=O2tgG_eKjck&list=PLfJNkC1lghozWVHIAVCF-mipEwHZH8fxi', '_blank'); }}>
                            <div className="flex items-center justify-center">
                                <img src="./img/web/dc_minuto.png" className="h-[170px] w-full object-cover rounded-md border" />
                            </div>
                        </div>
                    </Slider>
                </div>
            </div>
            
        </div>
    )
}

export default VideosBanner;