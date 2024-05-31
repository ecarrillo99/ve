import React, { useState } from 'react';
import PayPhoneController from '../../../controllers/pago/payphone/payphoneController';
import PayPhoneBPController from '../../../controllers/pago/payphone/PayPhoneBPController';
import { setOptions } from 'leaflet';
import { useNavigate } from 'react-router-dom';

const PayPhoneBP = ({ persona, producto, setOpcion, codigo}) => {
    const [celular, setCelular] = useState(persona.telefono);
    const [errorCelular, setErrorCelular] = useState();
    const [errorCodigoPais, setErrorCodigoPais] = useState();
    const [loading, setloading] = useState(false);
    const [mensaje, setMensaje] = useState();
    const codigos = ["+57", "+593", "+1", "+51"]
    const [selectedOption, setSelectedOption] = useState("+593");
    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleChangePhone = (event) => {
        setCelular(event.target.value)
    }

    const handleClickPagar = () => {
        setErrorCelular(false);
        var error = false;
        if (celular == null||celular=="") {
            setErrorCelular(true);
            error=true;
        }
        if (!error) {
            setMensaje(
                <div className='flex flex-col items-center justify-center gap-2 mt-3 text-greenVE-700'>
                    <span className="icon-[eos-icons--bubble-loading]"></span>
                    <label className='text-[12px] text-center'>Verificando pago, <br></br>abra su app PayPhone para continuar.</label>
                </div>
            )
            setloading(true);
            const personalInfo = {
                dni: persona.cedula,
                email: persona.correo,
                countryCode: selectedOption,
                phone: celular
            }

            const product = {
                precio_producto: parseFloat(producto.PrecioProducto),
                titulo: producto.Titulo
            }

            const mv = new PayPhoneBPController();
            mv.loadDataPayphone(product, personalInfo).then((resp) => {

                if (resp) {
                    console.log(resp)
                    setloading(false);
                    if (resp.code == -1) {
                        setMensaje(
                            <div className='flex flex-col items-center justify-center gap-2 mt-3 text-amber-600'>
                                <span className="icon-[lucide--circle-alert]"></span>
                                <label className='text-[12px] text-center'>Ha ocurrido un error, <br></br>revise su número e intente nuevamente.</label>
                            </div>
                        )
                    }
                    if (resp.code == 0) {
                        setMensaje(
                            <div className='flex flex-col items-center justify-center gap-2 mt-3 text-red-600'>
                                <span className="icon-[icomoon-free--cancel-circle]"></span>
                                <label className='text-[12px] text-center'>El pago ha sido cancelado.</label>
                            </div>
                        )
                    }
                    if(resp.code==1){//poner 1 para produccion
                        var pago={
                            tipo_pago_boton:7,
                            phone:celular,
                            dni: persona.cedula,
                            email: persona.correo,
                            countryCode: selectedOption,
                        };
                        navigate('/bienvenida', { state: { persona, producto, codigo, pago } });
                    }
                } else {
                    setloading(false);
                }
            })
        }
    }

    return (
        <div className='flex w-full justify-center items-center mt-4'>
            <div className='shadow-xl rounded-xl flex flex-col gap-3 pb-7 justify-center items-center'>
                <div className="bg-[#ff6400] max-w-md w-auto px-10 py-2 rounded-t-xl">
                    <img src="https://assets-global.website-files.com/66041f2aa7176fac4965cba4/6605bf7c0b772f88302329e2_logoyeii-low.svg"></img>
                </div>
                <label className='text-xs mt-2'>Ingresa un número de teléfono registrado en payphone.</label>
                <div className='flex '>
                    <div className={`border ${errorCelular ? "border-red-500" : "border-gray-300"} flex items-center justify-center px-2 rounded-l-lg border-r-0`}>
                        <span className={`icon-[material-symbols-light--phone-iphone-outline] h-6 w-6 ${errorCelular ? "text-red-500" : "text-gray-600"}`}></span>
                    </div>
                    <div className={`border ${errorCelular ? "border-red-500" : "border-gray-300"}  flex border-l-0`}>
                        <select
                            className='bg-white text-xs'
                            value={selectedOption}
                            onChange={handleSelectChange}
                        >
                            {
                                codigos.map((item, index) => (
                                    <option value={item} key={index}>
                                        {item}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className={`border ${errorCelular ? "border-red-500" : "border-gray-300"} bg-white flex  items-center px-3 py-1.5 gap-2 rounded-r-lg border-l-0`}>
                        <input
                            onChange={handleChangePhone}
                            className={`text-sm w-full focus:outline-none focus:ring-0 focus:border-transparent border-0 ${errorCelular ? "placeholder:text-red-500" : ""}`}
                            placeholder='Número celular'
                        ></input>
                    </div>
                </div>
                <div className='flex justify-center pt-3 '>
                    <button onClick={loading ? () => { } : () => { handleClickPagar() }} className={`${loading ? 'bg-gray-500' : 'bg-[#ff6400]'} px-4 py-1.5 text-sm text-white font-semibold rounded-xl`}>Pagar con PayPhone</button>
                </div>
                {
                    mensaje
                }
            </div>
        </div>
    );
};

export default PayPhoneBP;