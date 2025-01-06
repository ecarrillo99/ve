import React, { useState } from 'react';
import JardinAzuayoController from '../../../controllers/pago/jardinazuayo/jardinAzuayoController';
import { useNavigate } from 'react-router-dom';

const JardinAzuayo = ({ persona, producto, setOpcion, codigo }) => {
    const [cedula, setCedula] = useState();
    const [cuenta, setCuenta] = useState();
    const [errorCedula, setErrorCedula] = useState(false);
    const [errorCuenta, setErrorCuenta] = useState(false);
    const [codigoOPT, setCodigoOTP] = useState();
    const [errorCodigo, setErrorCodigo] = useState();
    const [error, setError] = useState();
    const [siguiente, setSiguiente] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangeCedula = (event) => {
        setCedula(event.target.value);
    }

    const handleChangeCuenta = (event) => {
        setCuenta(event.target.value);
    }

    const handleChangeCodigoOTP = (event) => {
        setCodigoOTP(event.target.value);
    }

    const handleClickContinuar = () => {
        setError();
        var error = false;
        if (!cedula) {
            setErrorCedula(true); error = true;
        } else {
            setErrorCedula(false);
        }
        if (!cuenta) {
            setErrorCuenta(true); error = true;
        } else {
            setErrorCuenta(false);
        }
        if (!error) {
            setLoading(true);
            var pagoJa = new JardinAzuayoController();

            pagoJa.checkCuenta(cedula, cuenta, producto.Titulo, (producto.PrecioProducto * 1.12).toFixed(2)).then((resp) => {
                if (resp) {
                    if (resp.estado) {
                        setSiguiente(true);
                    } else {
                        var mensaje = resp.msj.split(" ")[1].replaceAll("_", " ")
                        setError(mensaje.charAt(0).toUpperCase() + mensaje.slice(1).toLowerCase());
                    }
                } else {
                    setError("Error desconocido");
                }
                setLoading(false)
            })
        }
    }

    const handleClickPagar = () =>{
        setError();
        var error = false;
        if (!codigoOPT) {
            setErrorCodigo(true); error = true;
        } else {
            setErrorCodigo(false);
        }

        if(!error){
            setLoading(true);
            var pagoJa = new JardinAzuayoController();
            pagoJa.checkOtp(cedula, cuenta, producto.Titulo, (producto.PrecioProducto * 1.12).toFixed(2), codigoOPT).then((resp)=>{
                if(resp){
                    if (resp.estado) {
                        var pago=resp.data;
                        pago.tipo_pago_boton=8;
                        navigate('/bienvenida', { state: { persona, producto, codigo, pago } });
                    } else {
                        var mensaje = resp.msj.replaceAll("_", " ")
                        setError(mensaje.charAt(0).toUpperCase() + mensaje.slice(1).toLowerCase());
                    }
                } else {
                    setError("Error desconocido");
                }
                setLoading(false)
            });
        }
    }

    return (
        <div className='flex w-full justify-center items-center mt-4'>
            <div className='shadow-xl rounded-xl flex flex-col gap-3 pb-7 justify-center items-center'>
                <div className="bg-[#f7f9f3] max-w-md md:w-[400px] h-16 flex items-center justify-center px-10 py-4 rounded-t-xl">
                    <img src="https://www.jardinazuayo.fin.ec/wp-content/uploads/2023/09/Frame-3.png"></img>
                </div>
                {
                    !siguiente
                        ? <div className='flex flex-col items-center justify-center gap-3 '>
                            <label className='text-xs mt-2 text-center'>Ingrese los siguientes datos para pagar con Jardín Azuayo:</label>
                            <div key="cedula" className='flex '>
                                <div className={`border ${errorCedula ? "border-red-500" : "border-gray-300"} flex items-center justify-center px-2 rounded-l-lg border-r-0`}>
                                    <span className={`icon-[material-symbols-light--id-card-outline-rounded] h-6 w-6 ${errorCedula ? "text-red-500" : "text-gray-600"}`}></span>
                                </div>
                                <div className={`border ${errorCedula ? "border-red-500" : "border-gray-300"} bg-white flex  items-center px-3 py-1.5 gap-2 rounded-r-lg border-l-0`}>
                                    <input
                                    value={cedula}
                                        onChange={handleChangeCedula}
                                        className={`text-sm w-full focus:outline-none focus:ring-0 focus:border-transparent border-0 ${errorCedula ? "placeholder:text-red-500" : ""}`}
                                        placeholder='Documento de Identidad'
                                    ></input>
                                </div>
                            </div>
                            <div key="cuenta" className='flex '>
                                <div className={`border ${errorCedula ? "border-red-500" : "border-gray-300"} flex items-center justify-center px-2 rounded-l-lg border-r-0`}>
                                    <span className={`icon-[material-symbols-light--account-balance-wallet-outline] h-6 w-6 ${errorCedula ? "text-red-500" : "text-gray-600"}`}></span>
                                </div>
                                <div className={`border ${errorCedula ? "border-red-500" : "border-gray-300"} bg-white flex  items-center px-3 py-1.5 gap-2 rounded-r-lg border-l-0`}>
                                    <input
                                        value={cuenta}
                                        onChange={handleChangeCuenta}
                                        className={`text-sm w-full focus:outline-none focus:ring-0 focus:border-transparent border-0 ${errorCuenta ? "placeholder:text-red-500" : ""}`}
                                        placeholder='Número de cuenta'
                                    ></input>
                                </div>
                            </div>
                            <div className='flex justify-center pt-3 '>
                                <button onClick={loading ? () => { } : () => { handleClickContinuar() }} className={`${false ? 'bg-gray-500' : 'bg-[#ff6400]'} px-4 py-1.5 text-sm text-white font-semibold rounded-xl w-28`}>
                                    {loading ? <span className="icon-[eos-icons--loading]"></span> : "Continuar"}
                                </button>
                            </div>
                        </div>
                        :<div key="codigo" className='flex flex-col items-center justify-center gap-3  max-w-md px-2'>
                            <label className='text-xs mt-2 text-center'>Ingrese el código OPT enviado a su correo electrónico y/o mensajería móvil registrado en Jardín Azuayo:</label>
                            <div className='flex '>
                                <div className={`border ${errorCodigo ? "border-red-500" : "border-gray-300"} flex items-center justify-center px-2 rounded-l-lg border-r-0`}>
                                    <span className={`icon-[material-symbols--password-rounded] h-6 w-6 ${errorCodigo ? "text-red-500" : "text-gray-600"}`}></span>
                                </div>
                                <div className={`border ${errorCodigo ? "border-red-500" : "border-gray-300"} bg-white flex  items-center px-3 py-1.5 gap-2 rounded-r-lg border-l-0`}>
                                    <input
                                        value={codigoOPT}
                                        onChange={handleChangeCodigoOTP}
                                        className={`text-sm w-full focus:outline-none focus:ring-0 focus:border-transparent border-0 ${errorCodigo ? "placeholder:text-red-500" : ""}`}
                                        placeholder='Código OTP'
                                    ></input>
                                </div>
                            </div>
                            <div className='flex justify-center pt-3 '>
                                <button onClick={loading ? () => { } : () => { handleClickPagar() }} className={`${false ? 'bg-gray-500' : 'bg-[#ff6400]'} px-4 py-1.5 text-sm text-white font-semibold rounded-xl w-28`}>
                                    {loading ? <span className="icon-[eos-icons--loading]"></span> : "Pagar"}
                                </button>
                            </div>
                        </div>
                }

                {
                    error && <div className='h-6 text-red-500 flex items-center gap-1'>
                        <span className="icon-[fluent--error-circle-24-regular]"></span>
                        <label className='text-xs font-medium'>{error}</label>
                    </div>
                }
            </div>
        </div>
    );
};

export default JardinAzuayo;