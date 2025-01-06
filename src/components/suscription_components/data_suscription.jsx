import React, { useState } from 'react';
import { loginRemote } from '../../controllers/suscripcion/suscripcionController';
import { useNavigate } from 'react-router-dom';
import Config from '../../global/config';

const DataSuscription = ({accountData, nombre}) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleClickLogin = () => {
        if (!isLoading) {
            setIsLoading(true)
            const params = {
                "id_metodo": Config.IDMETODO,
                "id_servicio": Config.IDSERVICIO,
                "id": accountData.codigo,
                "pass": accountData.clave,
                "servicio": Config.SERVICIO,
                "metodo": Config.METODO,
            }
            try {
                loginRemote(params)
                    .then((result) => {
                        setIsLoading(false)
                        if (result==true) {
                            navigate("/")
                        } 
                    })
                    .catch((error) => { })

            } catch (error) {
                console.error("Error:", error);
            }
        }
    }
    return (
        accountData?
        <div className="flex flex-col md:flex-row mt-10 mx-auto mb-28 max-w-6xl py-6 px-6  sm:px-6 lg:px-8 ">
            <div className='w-full px-16 pb-6 md:px-0 md:w-1/2'>
                <img src='https://visitaecuador.com/img/diseno/compra/codigopromocional.png'/>
            </div>
            <div className='w-full md:w-1/2 flex flex-col justify-between'>
                <div className='flex flex-col gap-2 items-center md:items-start'>
                    <label className='text-2xl md:text-3xl font-semibold text-center md:text-left'>Hola {nombre}</label>
                    <label className='text-lg md:text-xl text-greenVE-600 font-medium text-center md:text-left'>VisitaEcuador.com te da la Bienvenida !!!.</label>
                    <label className='text-sm md:text-base text-center md:text-left'>Desde hoy formas parte de nuestra prestigiosa plataforma.</label>
                    <label className='text-sm md:text-base text-center md:text-left'>Te recordamos que estos son tus datos para el ingreso, y para tu tranquilidad los enviamos a tu cuenta de correo electrónico.</label>
                    <div className='flex bg-slate-100 w-64 p-2 items-center gap-3 '>
                        <label>Usuario:</label>
                        <label className='text-greenVE-600 text-xl md:text-2xl'>{accountData.identificacion}</label>
                    </div>
                    <div className='flex bg-slate-100 w-64 p-2 items-center gap-3'>
                        <label>Clave:</label>
                        <label className='text-greenVE-600 text-xl md:text-2xl'>{accountData.clave}</label>
                    </div>
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='text-xs md:text-sm md:text-left text-center mt-4'>No olvides que tu suscripcion caduca el <label className='font-semibold'>{accountData.fecha_caducidad_texto}</label></label>
                    <button className={`${isLoading?"bg-gray-500":"bg-greenVE-500"} text-white flex flex-col rounded-md py-1 md:text-lg`} onClick={()=>handleClickLogin()}>
                        <label className='cursor-pointer'>Disfruta de tu suscripcion ahora !!!</label>
                        <label className='cursor-pointer'>Clic Aquí</label>
                    </button>
                </div>
            </div>
        </div>
        :
        <div className="flex flex-col  mt-10 mx-auto mb-28 max-w-6xl py-6  sm:px-6 lg:px-8 items-center justify-center h-60">
            <span className="icon-[eos-icons--bubble-loading] text-greenVE-500 h-14 w-14 mb-10"></span>
            <label className='text-greenVE-600 font-medium text-lg cursor-pointer'>Estamos creando su cuenta.</label>
            <label className='text-greenVE-600 font-medium text-lg cursor-pointer'>No cierre esta ventana por favor.</label>
        </div>
    );
};

export default DataSuscription;