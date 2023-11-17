import React, { useState, useEffect, useRef } from 'react';
import Icons from '../../../global/icons';

const icons = new Icons()

const HotelDetails = (props) => {
    const { Establecimiento } = props

    const DetalleServicio = ({ titulo, detalles }) => {
        const [mostrarMas, setMostrarMas] = useState(false);
        const [elementosPorFila, setElementosPorFila] = useState(1);
        const contenedorRef = useRef(null);

        function Icon() {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`${mostrarMas ? "rotate-180" : ""} h-5 w-5 transition-transform`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            );
        }

        useEffect(() => {
            const contenedorAncho = contenedorRef.current.offsetWidth;
            const elementoAncho = 170; // Ajusta según tu diseño
            const nuevosElementosPorFila = Math.floor(contenedorAncho / elementoAncho);

            setElementosPorFila(nuevosElementosPorFila);
        }, [mostrarMas]);

        const detallesMostrados = mostrarMas ? detalles.length : elementosPorFila;

        return (
            <div ref={contenedorRef}>
                <label className="font-medium text-lg text-gray-700 mt-4 ">{titulo}</label>
                <button className=' ml-3 text-xs text-blue-600 ' onClick={() => setMostrarMas(!mostrarMas)}>
                    {detalles.length > elementosPorFila && (
                        <div className='flex gap-1.5 items-center'>
                            {mostrarMas ? 'Ver menos' : 'Ver más'}
                            {Icon()}
                        </div>
                    )}
                </button>
                <div className='flex flex-wrap gap-x-10 gap-y-3 mt-1'>
                    {detalles.slice(0, detallesMostrados).map((item) => (
                        <div key={item.Titulo} className='flex gap-1 items-center'>
                            <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => item.Titulo.includes(clave))] }} className='' />
                            <label className='text-xs'>{item.Titulo}</label>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    return (
        <div className=" flex flex-col mb-10 gap-y-3">
            <label className="font-semibold text-xl text-gray-900 mb-1">Acerca de  {Establecimiento.Titulo}</label>
            <p className='text-sm leading-5'>{Establecimiento.Descripcion}</p>
            <div className='flex flex-col gap-6'>
                {
                    Establecimiento.Servicios &&
                    <DetalleServicio titulo="Servicios del Hotel" detalles={Establecimiento.Servicios}></DetalleServicio>
                }
                {
                    Establecimiento.Incluye &&
                    <DetalleServicio titulo="Incluye" detalles={Establecimiento.Incluye}></DetalleServicio>
                }
                {
                    Establecimiento.NoIncluye &&
                    <DetalleServicio titulo="No Incluye" detalles={Establecimiento.NoIncluye}></DetalleServicio>
                }
                {
                    Establecimiento.Restricciones &&
                    <DetalleServicio titulo="Restricciones" detalles={Establecimiento.Restricciones}></DetalleServicio>
                }
                {
                    Establecimiento.SistemaServicios &&
                    <DetalleServicio titulo="Sistema de servicios" detalles={Establecimiento.SistemaServicios}></DetalleServicio>
                }
            </div>
        </div>
    )
}

export default HotelDetails