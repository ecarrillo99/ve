import React, { useEffect, useState } from 'react';
import { Select, SelectItem } from '@tremor/react';
import { getRemoteTarjetas } from '../../controllers/pago/pagoController';

const Informacion = ({setOpcion, persona, setPersona, setPago}) => {
    const [typePayment, setTypePayment] = useState();
    const [nombres, setNombres] = useState(persona!=null?persona.nombres:"");
    const [cedula, setCedula] = useState(persona!=null?persona.cedula:"");
    const [celular, setCelular] = useState(persona!=null?persona.telefono:"");
    const [correo, setCorreo] = useState(persona!=null?persona.correo:"");
    const [listaBancos, setListaBancos] = useState();
    const [banco, setBanco] = useState();
    const [listaTD, setListaTD] = useState();
    const [tarjetaDebito, setTarjetaDebito] = useState();
    const [tarjetaCredito, setTarjetaCredito] = useState();
    const [botonPago, setBotonPago]=useState();
    const [diferido, setDiferido] = useState();
    const [errorCedula, setErrorCedula] = useState(false);
    const [errorNombres, setErrorNombres] = useState(false);
    const [errorCelular, setErrorCelular] = useState(false);
    const [errorCorreo, setErrorCorreo] = useState(false);
    const [errorTipoPago, setErrorTipoPago] = useState(false);
    const [errorBanco, setErrorBanco] = useState(false);
    const [errorTC, setErrorTC] = useState(false);
    const [errorDiferido, setErrorDiferido] = useState(false);
    const [errorTD, setErrorTD] = useState(false);
    const [errorBotonPago, setErrorBotonPago] = useState(false);
    const [errorCheck, setErrorCheck] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    const handleChangeNombres=(event)=>{
        setNombres(event.target.value)
    }

    const handleChangeCedula=(event)=>{
        setCedula(event.target.value)
    }

    const handleChangeCelular=(event)=>{
        setCelular(event.target.value)
    }

    const handleChangeCorreo=(event)=>{
        setCorreo(event.target.value)
    }

    const handleChangeTypePayment = (event) => {
        setTypePayment(event);
        setBanco(0);
        setTarjetaDebito(0);
        setBotonPago(0);
        setTarjetaCredito(0)
        setDiferido(0);
    };

    const handleChangeBanco= (event) => {
        setTarjetaCredito(0);
        setDiferido(0);
        setBanco(event);
        
    };

    const handleChangeTD= (event) => {
        setTarjetaDebito(event);
    };

    const handleChangeBotonPago = (event)=>{
        setBotonPago(event)
    }

    const handleChangeTC = (event)=>{
        setTarjetaCredito(event)
        setDiferido(0)
    }

    const handleChangeDiferido = (event)=>{
        setDiferido(event)
    }

    useEffect(
        ()=>{
            getRemoteTarjetas().then((resp)=>{
                if(resp){
                    setListaBancos(resp[1].ListaBancos)
                    setListaTD(resp[2].ListaBancos[0].ListaTarjetas)
                }
            })
        },[]
    )

    const handleClickContinuar=()=>{
        var error =false;
        if(!nombres){
            setErrorNombres(true);error=true;
        }else{
            setErrorNombres(false);
        }
        if(!cedula){
            setErrorCedula(true);error=true;
        }else{
            setErrorCedula(false);
        }
        if(!celular){
            setErrorCelular(true);error=true;
        }else{
            setErrorCelular(false);
        }
        if(!correo){
            setErrorCorreo(true);error=true;
        }else{
            setErrorCorreo(false);
        }
        
        /*if(!isChecked){
            setErrorCheck(true);error=true;
        }else{
            setErrorCheck(false)
        }*/

        if(!error){
            const datos = {
                nombres: nombres,
                cedula: cedula,
                telefono: celular,
                correo: correo,
                ciudad: 256,
            }
            
            var pago={
                IdTipoBotonPago: "7",
                botonLogo:"/img/web/pp_logo.jpg",
                Meses:"1"
            };
            
            setPersona(datos);
            setPago({
                "IdTipoBotonPago": "7",
                "botonLogo": "https://visitaecuador.com/img/web/pp_logo.jpg",
                "Meses": "1"
              });
            setOpcion(4);
            //selMap.set("tarjeta",)

        }else{
        }
    }
    return (
        <div className='flex flex-col bg-gray-200 p-3 rounded-lg'>
            <label className='font-semibold text-2xl'>Datos personales y de pago</label>
            <label className='text-sm font-light text-gray-500 italic'>Ingresa tus información personal y datos de pago. Todos los datos son obligatorios</label>
            <div className='border-b border-gray-400 my-2'></div>
            <div>
                <div className='flex flex-col md:flex-row md:flex-wrap gap-x-4 gap-y-4 justify-center'>
                    <div className={`md:w-2/5 border ${errorCedula?"border-red-500":"border-gray-300"} bg-white flex  items-center px-3 py-1.5 gap-2`}>
                        <span className={`icon-[material-symbols-light--id-card-outline-rounded] h-6 w-6 ${errorCedula?"text-red-500":"text-gray-600"}`}></span>
                        <input
                            value={cedula}
                            onChange={handleChangeCedula}
                            className={`text-sm w-full focus:outline-none focus:ring-0 focus:border-transparent border-0 ${errorCedula?"placeholder:text-red-500":""}`}
                            placeholder='Documento de identidad'
                        ></input>
                    </div>
                    <div className={`md:w-2/5 border ${errorNombres?"border-red-500":"border-gray-300"} bg-white flex  items-center px-3 py-1.5 gap-2`}>
                        <span className={`icon-[mdi-light--account] h-6 w-6 ${errorNombres?"text-red-500":"text-gray-600"}`}></span>
                        <input
                            value={nombres}
                            onChange={handleChangeNombres}
                            className={`text-sm w-full focus:outline-none focus:ring-0 focus:border-transparent ${errorNombres?"placeholder:text-red-500":""}`}
                            placeholder='Nombres y apellidos'
                        ></input>
                    </div>
                    <div className={`md:w-2/5 border ${errorCelular?"border-red-500":"border-gray-300"} bg-white flex  items-center px-3 py-1.5 gap-2`}>
                        <span className={`icon-[material-symbols-light--phone-android-outline] h-6 w-6 ${errorCelular?"text-red-500":"text-gray-600"}`}></span>
                        <input
                            value={celular}
                            onChange={handleChangeCelular}
                            className={`text-sm w-full focus:outline-none focus:ring-0 focus:border-transparent border-0 ${errorCelular?"placeholder:text-red-500":""}`}
                            placeholder='Celular'
                        ></input>
                    </div>
                    <div className={`md:w-2/5 border ${errorCorreo?"border-red-500":"border-gray-300"} bg-white flex  items-center px-3 py-1.5 gap-2`}>
                        <span className={`icon-[material-symbols-light--mail-outline] h-6 w-6 ${errorCorreo?"text-red-500":"text-gray-600"}`}></span>
                        <input
                            value={correo}
                            onChange={handleChangeCorreo}
                            className={`text-sm w-full focus:outline-none focus:ring-0 focus:border-transparent border-0 ${errorCorreo?"placeholder:text-red-500":""}`}
                            placeholder='Correo electrónico'
                        ></input>
                    </div>
                </div>
            </div>
            <div className='md:px-16 text-[10px] flex justify-center items-center text-center mt-8'>
                {/*<input 
                    type="checkbox" 
                    className="mr-2 cursor-pointer  "
                    checked={isChecked}
                onChange={handleCheckboxChange}/>*/}
                <label className=''>Al registrarte aceptas nuestros <a className='text-blue-500 underline cursor-pointer' href='https://visitaecuador.com/terminos-condiciones' target='_blank'>Términos y condiciones de uso</a> y el uso de tus datos personales de acuerdo a nuestras <a className='text-blue-500 underline cursor-pointer' href='https://visitaecuador.com/politicas-privacidad' target='_blank'>Políticas de Privacidad</a>.  {/*errorCheck?<label className='text-red-500 text-[11px]'>* Obligatorio</label>:""*/}</label>
            </div>
            <div className='flex w-full items-center justify-center mt-8'>
                <button className='bg-greenVE-500 text-white font-semibold px-3 py-1.5 rounded-full flex items-center justify-center cursor-pointer' onClick={()=>handleClickContinuar()}>
                    <label className='cursor-pointer'>Continuar</label>
                    <span className="icon-[ic--round-navigate-next] h-7 w-7"></span>
                </button>
            </div>
        </div>
    );
};

export default Informacion;