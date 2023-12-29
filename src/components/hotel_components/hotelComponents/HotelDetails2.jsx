import React, { useState, useEffect, useRef } from 'react';
import Icons from '../../../global/icons';

const icons = new Icons()

const HotelDetails = (props) => {
    const { Establecimiento } = props

    const ServiciosOferta = ({ titulo, descripciones }) => {
        console.log("descripciones", descripciones)
        const [mostrarMas, setMostrarMas] = useState(false);

        function Icon() {
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className={`${mostrarMas ? "rotate-180" : ""} h-3 w-3  transition-transform`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
            );
        }

        return (
            <div className={titulo!="Sist. Servicios"?"flex-1 border-r pr-1 ":"flex-1 pr-1"}>
                <label className="text-xs font-semibold text-gray-500">{titulo}</label>
                {
                    descripciones.length>5&&(
                        <button className='ml-2 text-xxs text-blue-600' onClick={() => setMostrarMas(!mostrarMas)}>
                            <div className='flex gap-1.5 items-end'>
                                {mostrarMas ? 'Ver menos' : 'Ver más'}
                                {Icon()}
                            </div>
                        </button>
                    )
                }
                <div className='flex flex-col gap-1'>
                    {descripciones.slice(0, mostrarMas ? descripciones.length : 5).map((itemRestricciones) => (
                        <div className='flex gap-2 items-center'>
                            <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find(clave => itemRestricciones.Titulo.includes(clave))] }} class='' />
                            <p dangerouslySetInnerHTML={{ __html: itemRestricciones.Titulo }} className='my-0.5 text-xs leading-3 font-light text-gray-500'></p>
                        </div>
                    ))}
                </div>
            </div>

        );
    }



    return (
        <div className=" flex flex-col mb-10 ">
            <label className="font-semibold text-xl text-gray-900 mb-1">Acerca de  {Establecimiento.Titulo}</label>
            <p className='text-sm leading-5'>{Establecimiento.Descripcion}</p>
            <label className="font-semibold text-lg text-gray-700 mb-1 text-center mt-2">Servicios y otros detalles del establecimiento </label>
            <div className="flex gap-2">
                {
                    Establecimiento.Incluye &&
                    <ServiciosOferta titulo={"Incluye"} descripciones={Establecimiento.Incluye}></ServiciosOferta>
                }
                {
                    Establecimiento.NoIncluye &&
                    <ServiciosOferta titulo={"No Incluye"} descripciones={Establecimiento.NoIncluye}></ServiciosOferta>
                }
                {
                    Establecimiento.Restricciones &&
                    <ServiciosOferta titulo={"Restricciones"} descripciones={Establecimiento.Restricciones}></ServiciosOferta>
                }
                {
                    Establecimiento.SistemaServicios &&
                    <ServiciosOferta titulo={"Sist. Servicios"} descripciones={Establecimiento.SistemaServicios}></ServiciosOferta>
                }
            </div>
        </div>
    )
}

export default HotelDetails