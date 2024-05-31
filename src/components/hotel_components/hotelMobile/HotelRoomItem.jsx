import React, { useState } from 'react';
import { calcularNoches, formatearFecha } from '../../../global/formatearFecha';


const HotelRoomItem = ({date, oferta, index, selectedRooms, setSelectedRooms}) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        const lista=[...selectedRooms];
        lista[index]=selectedValue==""?0:parseInt(selectedValue);
        setSelectedRooms(lista)
    };
    return (
        <div>
            <div className='w-full bg-white border border-gray-300 p-3 flex flex-col gap-2'>
                <label className='font-semibold'>{oferta.TituloOferta}</label>
                {
                    oferta.AplicaEn!=null&&oferta.AplicaEn!=null
                    ?<div className='flex gap-2 items-center'>
                        <span className="icon-[material-symbols--calendar-month-outline] h-5 w-5"></span>
                        <label className='text-sm'>Aplica {oferta.AplicaEn.toLowerCase()}</label>
                    </div>
                    :<></>
                }
                <div className='flex gap-2 items-center'>
                    <span className="icon-[material-symbols--bed-outline] h-5 w-5"></span>
                    <label className='text-sm'>Acomodación {oferta.Acomodacion.toLowerCase()}</label>
                </div>
                <div className='flex gap-2 items-center'>
                    <span className="icon-[akar-icons--people-group] h-4 w-5"></span>
                    <label className='text-sm'>Aplica para {oferta.Adultos=="1"?"1 adulto":oferta.Adultos+" adultos"} {(oferta.Ninos!="0"&&oferta.Ninos!=null)?(oferta.Ninos=="1"?"y 1 niño":"y "+oferta.Ninos+" niños"):""}</label>
                </div>
                {
                    oferta.Incluye.map((item)=>(
                        <div className='flex gap-2 items-center'>
                            <span className="icon-[material-symbols--check-small] text-greenVE-500 w-[6%]"></span>
                            <label className='text-sm w-[96%]'>{item.Titulo}</label>
                        </div>
                    ))
                }
                <div >
                    <label className='text-sm'>Precio para {calcularNoches(date[0].startDate, date[0].endDate)} ({formatearFecha({ fecha: date[0].startDate, dia: true, mes: true })} - {formatearFecha({ fecha: date[0].endDate, dia: true, mes: true })})</label>
                    <div className=' flex gap-4 items-center'>
                        <label className='text-greenVE-500 line-through'>US ${oferta.Rack}</label>
                        <label className='text-orange-600 font-semibold text-lg'>US ${oferta.FinalSinImpuestos}</label>
                    </div>
                    <label className='text-sm'>+ US ${oferta.Impuestos} de impuestos y cargos</label>
                </div>
                <div>
                    <select className='w-full p-3 text-center bg-white border border-greenVE-500 rounded-md' value={selectedOption} onChange={handleChange}>
                        <option className='w-10' value="">Seleccione una opción</option>
                        <option value="0">0 Unidades</option>
                        <option value="1">1 Unidad</option>
                        <option value="2">2 Unidades</option>
                        <option value="3">3 Unidades</option>
                        <option value="4">4 Unidades</option>
                        <option value="5">5 Unidades</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default HotelRoomItem;