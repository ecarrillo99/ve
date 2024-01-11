import { useState } from "react";
import Icons from "../../../global/icons";

const PayPhoneForm = () => {
    const icons= new Icons()

    const meses=["01","02","03","04","05","06","07","08","09","10","11","12"];
    const anio =new Date().getFullYear()
    const [cvv, setCvv]=useState("")
    const [cvvError, setCvvError]=useState(false)
    const [tarjeta, setTarjeta]=useState("")
    const [tarjetaError, setTarjetaError]=useState(false)
    const [nombres, setNombres]=useState("")
    const [nombresError, setNombresError]=useState("")
    const [tarjetaIcono, setTarjetaIcono]=useState(icons.Data.CreditCard)
    
    
    const anios=[];
    for (let i = 0; i <= 7; i++) {
        anios.push(anio+i)
    }

    function validarNumeroTarjeta(numero) {
        // Expresiones regulares para Visa, Mastercard y Amex
        const visaRegex = /^4[0-9]{12}(?:[0-9]{3})?$/;
        const mastercardRegex = /^5[1-5][0-9]{14}$/;
        const amexRegex = /^3[47][0-9]{13}$/;
      
        // Eliminar espacios y guiones del número
        const numeroSinEspacios = numero.replace(/[ -]/g, '');
      
        // Verificar el formato según las expresiones regulares
        if (visaRegex.test(numeroSinEspacios)) {
            setTarjetaError(false);
            setTarjetaIcono(icons.Data.Visa)
        } else if (mastercardRegex.test(numeroSinEspacios)) {
            setTarjetaError(false);
            setTarjetaIcono(icons.Data.MasterCard)
        } else if (amexRegex.test(numeroSinEspacios)) {
            setTarjetaError(false);
            setTarjetaIcono(icons.Data.Amex)
        } else {
          setTarjetaError(true);
          setTarjetaIcono(icons.Data.CreditCard)
        }
      }

    const handleChangeNombres = (event) => {
        setNombres(event.target.value);
    };    

    const handleChangeTarjeta = (event) => {
        validarNumeroTarjeta(event.target.value);
        const nuevoNumero = event.target.value.replace(/\D/g, '').substring(0, 16);
        setTarjeta(nuevoNumero);
      };
    
      const formatTarjeta = (numero) => {
        return numero.replace(/(.{4})/g, '$1 ').trim();
      };

    const handleChangeCVV = (event) => {
        setCvv(event.target.value);
    }; 

    const handleClickContinuar = () => {
        nombres === "" ? setNombresError(true) : setNombresError(false)
        tarjeta === "" ? setTarjetaError(true) : setTarjetaError(false)
        cvv === "" ? setCvvError(true) : setCvvError(false)
        if (!nombresError && !tarjetaError && !cvvError) {

        }
    }



    return (
        <div className="w-full">
            <div className="flex flex-wrap gap-y-3 gap-x-3 items-center justify-center sm:flex-col md:flex-row">
                <div className="flex flex-col justify-center">
                    <div className="mb-5">
                        <label for="names" className="block mb-2 text-sm font-medium text-gray-900 ">Nombres del titular</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                </svg>
                            </div>
                            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5" placeholder="Ingrese nombres del titular" onChange={handleChangeNombres} />
                        </div>
                        <div className="h-2">
                            {
                                nombresError && <label className="text-xxs text-red-600">* Campo obligatorio</label>
                            }
                        </div>
                    </div>
                    <div className="mb-5">
                        <label for="names" className="block mb-2 text-sm font-medium text-gray-900 ">Número de tarjeta</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <div dangerouslySetInnerHTML={{ __html: tarjetaIcono }} />
                            </div>
                            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5" placeholder="Ingrese el número de su tarjeta" onChange={handleChangeTarjeta} value={formatTarjeta(tarjeta)}/>
                        </div>
                        <div className="h-2">
                            {
                                tarjetaError && <label className="text-xxs text-red-600">* Tarjeta no válida</label>
                            }
                        </div>
                    </div>
                    <div className="grid gap-x-6 mb-0 md:grid-cols-3">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Mes</label>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-10" >
                                    {meses &&
                                        meses.map((item, index) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Año</label>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                    </svg>
                                </div>
                                <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-10">
                                    {anios &&
                                        anios.map((item, index) => (
                                            <option key={index} value={index} >
                                                {item}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-5">
                        <label for="names" className="block mb-2 text-sm font-medium text-gray-900 ">CVV</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                </svg>
                            </div>
                            <input type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5" placeholder="CVV" onChange={handleChangeCVV} />
                        </div>
                        <div className="h-2">
                            {
                                cvvError && <label className="text-xxs text-red-600">* Campo obligatorio</label>
                            }
                        </div>
                    </div>
                        


                    </div>

                    <div className="flex items-center justify-center">
                        <button className=" text-white bg-greenVE-500 rounded-lg text-sm w-20 sm:w-auto px-5 py-2.5 text-center" onClick={() => handleClickContinuar()}>Procesar</button>
                    </div>

                </div>

            </div>
        </div>
    );
}
export default PayPhoneForm;