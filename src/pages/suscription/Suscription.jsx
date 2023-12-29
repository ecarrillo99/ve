import React, { useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import SuscriptionForm from "../../components/suscription_components/FormSuscription/suscription_form";
import PayOption from "../../components/suscription_components/choosePaySuscription/PayOption";
import Productlist from "../../components/suscription_components/chooseSuscription/ProductList";
import Slider from 'react-slick';
import PayPhoneForm from "../../components/suscription_components/FormPayment/PayPhoneForm";
import DatafastFormUI from "../../components/suscription_components/FormPayment/DatafastFormUI";
import DataFastForm from "../../components/suscription_components/FormPayment/DataFastForm";
import Icons from "../../global/icons";
import FormPayment from "../../components/suscription_components/FormPayment/FormPayment";


const Suscription = () => {
    const [producto, setProducto] = useState()
    const [suscripcion, setSuscripcion] = useState()
    const [tarjeta, setTarjeta] = useState();
    const [diferido, setDiferido] = useState();
    const [formPago, setformPago] = useState(<PayPhoneForm></PayPhoneForm>);

    const sliderRef = React.createRef();
    const icons = new Icons();

    const cambioSlider = (index) => {
        sliderRef.current.slickGoTo(index);
    };

    const productoSeleccionado = (prod) => {
        setProducto(prod)
    }

    const tarjetaSeleccionada = (tar) => {
        setTarjeta(tar)
        console.log(tarjeta)
    }

    const diferidoSeleccionado = (dif) => {
        setDiferido(dif)
    }

    const pagoSeleccionado = (pago) => {
        setformPago(pago)
    }

    const suscripcionForm = (sus) => {
        setSuscripcion(sus)
    }

    const settings = {
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        arrows: false
    };
    return (

        <div>
            <Navbar></Navbar>
            <div className="md:w-full justify-center py-10 md:flex-row mx-auto max-w-6xl sm:px-6 lg:px-8">
                <Slider ref={sliderRef} {...settings} spaceBetween={10}>
                    <div className="md:mx-auto sm:mx-4 lg:mx-8"> {/* Añadir márgenes en dispositivos móviles */}
                        <Productlist cambioSlider={cambioSlider} productoSeleccionado={productoSeleccionado}></Productlist>
                    </div>
                    <div className="md:mx-auto sm:mx-4 lg:mx-8"> {/* Añadir márgenes en dispositivos móviles */}
                        <SuscriptionForm cambioSlider={cambioSlider} suscripcionForm={suscripcionForm}></SuscriptionForm>
                    </div>
                    <div className="md:mx-auto sm:mx-4 lg:mx-8"> {/* Añadir márgenes en dispositivos móviles */}
                        <PayOption cambioSlider={cambioSlider} tarjetaSeleccionada={tarjetaSeleccionada} diferidoSeleccionado={diferidoSeleccionado} pagoSeleccionado={pagoSeleccionado}></PayOption>
                    </div>
                    <div className="md:mx-auto sm:mx-4 lg:mx-8"> {/* Añadir márgenes en dispositivos móviles */}
                        <FormPayment cambioSlider={cambioSlider} formPago={formPago}></FormPayment>
                    </div>
                </Slider>
            </div>
            <Footer></Footer>
        </div>

    );
}

export default Suscription;