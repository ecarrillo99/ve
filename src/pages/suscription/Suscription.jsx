import React, { useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import SuscriptionForm from "../../components/suscription_components/FormSuscription/suscription_form";
import PayOption from "../../components/suscription_components/choosePaySuscription/PayOption";
import Productlist from "../../components/suscription_components/chooseSuscription/ProductList";
import Slider from 'react-slick';


const Suscription = () => {
    const [producto, setProducto] = useState()
    const sliderRef = React.createRef();

    const cambioSlider = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    const setearProducto=(prod)=>{
        setProducto(prod)
    }

    const settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
    };
    return (
        <div>
            <Navbar></Navbar>
            <div className=" w-full justify-center py-10  md:flex-row mx-auto max-w-6xl sm:px-6 lg:px-8">
                <Slider ref={sliderRef} {...settings} spaceBetween={10}>
                    <Productlist cambioSlider={cambioSlider} ></Productlist>
                    <SuscriptionForm cambioSlider={cambioSlider}></SuscriptionForm>
                    <PayOption></PayOption>
                </Slider>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Suscription;