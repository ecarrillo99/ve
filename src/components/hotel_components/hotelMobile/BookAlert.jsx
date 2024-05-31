import React from 'react';
import { formatearFecha } from '../../../global/formatearFecha';

const BookAlert = ({mensaje, setOpenMensaje, central, hotel, options, date}) => {
    const user = JSON.parse(localStorage.getItem('datos'));
    const id = user != null ? user.data.codigo : "";
    const nombre = user != null ? user.data.nombre : "";
    const personas = options.adult + (options.adult > 1 ? " adultos" : " adulto") +
    (options.children == 0 ? "" : " y " + options.children + (options.children > 1 ? " niños" : " niño"));

    const handleClickCentral=()=>{
        window.open("https://wa.me/" + central[Math.floor(Math.random() * central.length)]['formateado'].replace(/\s/g, '') + "?text=" + (`Hola, soy *${nombre}* con id de suscriptor *${id}* y necesito ayuda con una reserva en *${hotel}* para *${personas}*, con fecha de entrada *${formatearFecha({ fecha: date[0].startDate, nombreDia: true, dia: true, mes: true, anio:true})}* y fecha de salida *${formatearFecha({ fecha: date[0].endDate, nombreDia: true, dia: true, mes: true, anio:true})}*`).replaceAll(" ", "%20").replaceAll("\n", "%0A"))
    }
    return (
        <div>
            <div className='w-full h-full bg-gray-500 fixed top-0 z-50 opacity-50'>
            
            </div>
            <div className='fixed top-0 w-full h-full z-50 flex items-center justify-center'>
                <div className='w-2/3  bg-white rounded-lg flex justify-center items-center flex-col p-2'>
                    <label className='font-semibold text-md '>Alerta</label>
                    <label className='text-center text-sm p-2 text-red-500'>{mensaje}</label>
                    <label className='text-center text-xxs  text-blue-600'>Si necesitas ayuda con tu reserva, contacta con nuestra central de reservas.</label>
                    <div className='flex justify-between w-full gap-2 h-7 mt-3'>
                        <button className='w-1/2 bg-blue-600 rounded-md text-white text-xs' onClick={()=>handleClickCentral()}>Central reservas</button>
                        <button className='w-1/2 bg-greenVE-500 rounded-md text-white text-xs' onClick={()=>setOpenMensaje(false)}>Aceptar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookAlert;