import { useState } from "react";
import Icons from "../../../global/icons";
import { generarEsquemaSusPP } from "../../../global/esquemaSuscripcionPP";
import { useNavigate } from "react-router-dom";

const BancoAustroForm = ({persona, producto, pago, codigo}) => {
    const icons= new Icons()

    const meses=["01","02","03","04","05","06","07","08","09","10","11","12"];
    const anio =new Date().getFullYear()
    const [selMes, setSelMes]  = useState(meses[0]);
    const [selAnio, setSelAnio] = useState(anio);
    const [cvv, setCvv]=useState("")
    const [cvvError, setCvvError]=useState(false)
    const [tarjeta, setTarjeta]=useState("")
    const [tarjetaError, setTarjetaError]=useState(false)
    const [nombres, setNombres]=useState("")
    const [nombresError, setNombresError]=useState("")
    const [tarjetaIcono, setTarjetaIcono]=useState(icons.Data.CreditCard);
    const navigate = useNavigate();
    
    
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

    const handleChangeMonth=(event)=>{
        setSelMes(event.target.value)
    }

    const handleChangeYear=(event)=>{
        setSelAnio(event.target.value)
    }

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
        setNombresError(false);
        setTarjetaError(false);
        setCvvError(false);

        var error= false;
        if(nombres===""){
            setNombresError(true);
            error=true;
        }
        if(tarjeta===""){
            setTarjetaError(true);
            error=true;
        }
        if(cvv===""){
            setCvvError(true);
            error=true;
        }
        
        if (!error) {
            const cardData ={
                cardHolder: nombres,
                cardNumber: tarjeta,
                monthExpire: selMes,
                yearExpire: selAnio,
                cvc:cvv,
            }
            pago.cardData=cardData;
            pago.transaccion={"status": "Registro de tarjeta. Pago manual", "statusCode": 3}
            navigate('/bienvenida', { state: { persona, producto, codigo, pago } });
        }
    }



    return (
        <div className="w-full flex items-center justify-center">
            <div className="flex flex-wrap  md:w-10/12 shadow-2xl rounded-xl gap-y-3 gap-x-3 items-center justify-center sm:flex-col md:flex-row">
                <div className="bg-[#1c2b4d] w-full px-10 py-5 rounded-t-xl flex items-center justify-center">
                    <img className="h-16 object-contain" src="https://www.baustroonline.com/AppInt/BaustroOnline/bancavirtual/personas/Portals/0/LogoBancoAustro.png?"></img>
                </div>
                <div className="flex flex-col justify-center p-6">
                    <div className="mb-5">
                        <label for="names" className="block mb-2 text-sm font-medium text-gray-900 ">Nombres del titular</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                <span className="icon-[ph--user-circle-thin] w-5 h-5"></span>
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
                                <span className="icon-[lets-icons--credit-card-light] w-5 h-5"></span>
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
                                    <span className="icon-[material-symbols-light--calendar-today-outline-rounded] w-5 h-5"></span>
                                </div>
                                <select 
                                    id="countries" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-10" 
                                    onChange={handleChangeMonth}>
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
                                    <span className="icon-[material-symbols-light--calendar-today-outline-rounded] w-5 h-5"></span>
                                </div>
                                <select
                                    id="countries" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-10"
                                    onChange={handleChangeYear}>
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
                                <span className="icon-[material-symbols-light--password-rounded] w-5 h-5"></span>
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
                        <button className=" text-white bg-[#1c2b4d] rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center" onClick={() => handleClickContinuar()}>Procesar</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
export default BancoAustroForm;