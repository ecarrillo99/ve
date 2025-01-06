import React from 'react';
import { calcularNoches, formatearFecha, generarPersonas } from '../../../global/formatearFecha';

const SearchBar = ({filtro}) => {
    return (
        <div>
            <div className='bg-greenVE-500 h-7'></div>
            <div className='absolute w-full -mt-7'>
                <div className=' h-14 border-4 rounded-lg mx-8 border-orange-400 bg-white flex gap-2 items-center shadow-lg'>
                    <span className="icon-[fluent--search-48-filled] text-2xl ml-2"></span>
                    <div className='flex flex-col gap-0'>
                        <label className='font-semibold'>{filtro.txtBusqueda}</label>
                        <label className='text-xs'>{
                            formatearFecha({fecha:filtro.Fechas.inicio, dia:true, mes:true})+
                            " - "+
                             formatearFecha({fecha:filtro.Fechas.fin, dia:true, mes:true})+
                            " ("+calcularNoches(filtro.Fechas.inicio, filtro.Fechas.fin)+") "+" • "+
                            generarPersonas(filtro.Pax)
                        }</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;