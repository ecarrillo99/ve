import React, { useState } from 'react';
import { calcularNoches, formatearFecha, generarPersonas } from '../../../global/formatearFecha';
import HotelRooms from './HotelRooms';

const HotelSearch = ({date, options, Establecimiento}) => {
    const [openRooms,setOpenRooms]=useState()
    return (
        <div className='py-3 border-y'>
            <div className=' mx-3 flex gap-3'>
                <div className='flex flex-col w-1/2 border-r'>
                    <label className='font-semibold'>Entrada</label>
                    <label className='text-greenVE-500'>{formatearFecha({fecha:date[0].startDate, nombreDia:true, dia:true, mes:true})}</label>
                </div>
                <div className='flex flex-col w-1/2'>
                    <label className='font-semibold'>Salida</label>
                    <label className='text-greenVE-500'>{formatearFecha({fecha:date[0].endDate, nombreDia:true, dia:true, mes:true})}</label>
                </div>
            </div>
            <div className='mx-3 mt-3 flex flex-col'>
                <label className='font-semibold'>N.° de habitaciones y personas</label>
                <label className='text-greenVE-500'>{generarPersonas({ adultos: options.adult, ninos: options.children, edadninos: options.childrenAges}, 1, options.room)}</label>
            </div>
            <div onClick={()=>setOpenRooms(true)} className='border-y mt-3 py-3 px-3 flex items-center justify-between'>
                <div className=''>
                    <label>Precio para {calcularNoches(date[0].startDate, date[0].endDate)} ({formatearFecha({fecha:date[0].startDate, dia:true, mes:true})} - {formatearFecha({fecha:date[0].endDate, dia:true, mes:true})})</label>
                    <div className=' flex gap-4 items-center'>
                        <label className='text-greenVE-500 line-through'>US ${Establecimiento.Rack}</label>
                        <label className='text-orange-600 font-semibold text-lg'>US ${Establecimiento.PrecioSinImpuestos}</label>
                    </div>
                    <label>+ US ${Establecimiento.Impuestos} de impuestos y cargos</label>
                </div>
                <span className="icon-[material-symbols--arrow-forward-ios] h-6 w-6"></span>
            </div>
            <div onClick={()=>setOpenRooms(true)} className='px-3'>
                <button className='bg-greenVE-500 w-full h-10 mt-3 text-white font-semibold rounded-md'>Elige habitación</button>
            </div>
            {
                openRooms
                ?<HotelRooms setOpenRooms={setOpenRooms} Establecimiento={Establecimiento} date={date} options={options}/>
                :<></>
            }
        </div>
    );
};

export default HotelSearch;