import React, { Suspense, lazy, useEffect, useState } from 'react';
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';
import StepsSuscription from './steps_suscription';
import { useLocation } from 'react-router-dom';
import DatafastController from '../../controllers/pago/datafast/datafastController';
import { gestionarSuscripcion } from '../../controllers/suscripcion/suscripcionController';
import { generarEsquemaSusDF } from '../../global/esquemaSuscripcionDF';
import DataSuscription from '../../components/suscription_components/data_suscription';
import Footer from '../../components/global_components/footer/Footer';
const Navbar = lazy(() => import("../../components/global_components/navbar/Navbar"));
const ImageItem = lazy(()=>import('../../components/home_components/mainBanner/ImageItem'));

var firstTime=true;

const PayPhone = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
    const location = useLocation();
    // Parsea los parámetros de consulta de la URL
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
    }
    
    return (
        <>
        {
            isMobile
            ?<Suspense><NavbarMobile activo={1}/></Suspense>
            :<Suspense><Navbar activo={1}/></Suspense>
        }
        <ImageItem src={"https://visitaecuador.com/ve/img/contenido/publicidad/banner_payphone.png"} url={"/payphone"} alt={"banner"} ></ImageItem>
        {
                    id==null
                    ?<div className="flex flex-col mx-auto mb-28 max-w-6xl py-6  sm:px-6 lg:px-8 ">
                        <StepsSuscription />
                    </div>
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
        </>
    );
};

export default PayPhone;