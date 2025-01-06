import React from 'react';
import Footer from '../../components/global_components/footer/Footer';
import NavbarLanding from '../../components/global_components/navbar/NavbarLanding';
import Slider from 'react-slick';
import ImageItem from '../../components/home_components/mainBanner/ImageItem';
const CustomNextArrow = (props) => {
    return (
        <div
            className="mr-3  absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer  text-lg h-7 w-7 md:h-10 md:w-10 flex items-center justify-center pl-1"
            onClick={props.onClick}
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
            <span className="icon-[material-symbols--arrow-forward-ios] z-50 h-7 w-7 md:h-10 :mdw-10"></span>
        </div>
    );
};

const CustomPrevArrow = (props) => {
    return (
        <div
            className="ml-3 z-20  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full text-lg pr-1 h-7 w-7 md:h-10 md:w-10 flex items-center justify-center"
            onClick={props.onClick}
            style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
            <span className="icon-[material-symbols--arrow-back-ios-new] z-50 h-7 w-7 md:h-10 :mdw-10"></span>
        </div>
    );
};
const Promo = () => {
    var banners = [
        {
            Icono: "https://visitaecuador.com/ve/img/contenido/publicidad/banner_ja.jpg",
            Valor: ""
        },
        {
            Icono: "https://visitaecuador.com/ve/img/contenido/publicidad/banner_payphone.png",
            Valor: ""
        },
    ]

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 8000,
        speed: 1000,
        rows: 1,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow />,
    };

    return (
        <div>
            <NavbarLanding />
            <div className='h-[300px]'>
                <Slider {...settings}>
                    {banners.map((item, index) => (
                        <div key={index}>
                            <ImageItem alt={""} src={item.Icono} url={item.Valor} />
                        </div>
                    ))}
                </Slider>
            </div>
            <Footer />
        </div>
    );
};

export default Promo;