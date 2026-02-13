import React, { useEffect, useState } from "react";
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
import BuySuscription from "../../components/suscription_components/buy_suscription";
import { useLocation } from "react-router-dom";
import DataSuscription from "../../components/suscription_components/data_suscription";
import DatafastController from "../../controllers/pago/datafast/datafastController";
import { generarEsquemaSusDF } from "../../global/esquemaSuscripcionDF";
import { gestionarSuscripcion } from "../../controllers/suscripcion/suscripcionController";

var firstTime=true;

const Suscription = () => {
    const datafastController = new DatafastController({});
    const [loadingPago, setLoadingPago]=useState(false);
    const [errorPago, setErrorPago] = useState(false);
    const [errorCuenta, setErrorCuenta] = useState(false);
    const [nombre, setNombre] = useState();
    const [msjErrorPago, setMsjErrorPago] = useState("");
    const [dataSuscription, setDataSuscription] =useState();
    const [producto, setProducto] = useState()
    const [suscripcion, setSuscripcion] = useState()
    const [tarjeta, setTarjeta] = useState();
    const [diferido, setDiferido] = useState();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil
    const location = useLocation();
    // Parsea los parámetros de consulta de la URL
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');


    const hadleClickCreateSuscription=async ()=>{
        if(id!=null){
            setLoadingPago(true);
            const pagoValido = await datafastController.checkRemotePaymentV3(id);
            if(pagoValido){
                setLoadingPago(false);
                if(!pagoValido.estado){
                    
                    gestionarSuscripcion(generarEsquemaSusDF(pagoValido.data)).then((result)=>{
                        if(result){
                            setNombre(pagoValido.data["customer"]["givenName"])
                            if(result.estado){
                                setDataSuscription(result.data)
                            }else{
                                setErrorCuenta(true);
                            }
                        }else{
                            setErrorCuenta(true);
                        }
                    })
                }else{
                    setErrorPago(true);
                    setMsjErrorPago(pagoValido.msj)
                }
            }else{
                setLoadingPago(false);
                setErrorPago(true);
                setMsjErrorPago("Ha ocurrido un error desconocido. Si existen cargos a su tarjeta comuníquese a nuestra central de reservas.")
            }
        }else{
        }
    }

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        };

        if(id!=null&&firstTime){
            firstTime=false;
            hadleClickCreateSuscription()
        }else{
        }

        window.addEventListener('resize', handleResize);

        return () => {
        window.removeEventListener('resize', handleResize);
        };
    }, []);

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
    }

    const diferidoSeleccionado = (dif) => {
        setDiferido(dif)
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
          <Navbar/>
            
                {/*
                    <iframe
                        src="https://visitaecuador.com/compra"
                        width="100%"
                        height="1010px"
                        >
                    </iframe>*/
                }
                {
                    id==null
                    ?<BuySuscription/>
                    :loadingPago?
                        <div className="flex flex-col  mt-10 mx-auto mb-28 max-w-6xl py-6  sm:px-6 lg:px-8 items-center justify-center h-60">
                            <span className="icon-[eos-icons--bubble-loading] text-greenVE-500 h-14 w-14 mb-10"></span>
                            <label className='text-greenVE-600 font-medium text-lg'>Estamos verificando su pago.</label>
                            <label className='text-greenVE-600 font-medium text-lg'>No cierre esta ventana por favor.</label>
                        </div>
                    :errorPago
                    ?<div className="flex flex-col  mt-10 mx-auto mb-28 max-w-6xl py-6  sm:px-6 lg:px-8 items-center justify-center h-60">
                        <span className="icon-[material-symbols-light--credit-card-off-outline] text-red-600 h-14 w-14 mb-10"></span>
                        <label className='text-red-600 font-medium text-lg'>Error al procesar pago.</label>
                        <label className='text-red-600 font-medium text-lg'>{msjErrorPago}.</label>
                    </div>
                    :<DataSuscription accountData={dataSuscription} nombre={nombre}/>
            }
            <Footer></Footer>
        </div>
    );
}

export default Suscription;
