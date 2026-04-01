import React, { useState, useEffect, useRef } from 'react';
import Icons from '../../../global/icons';
import { getIcon } from '../../../global/icons2';
import { it } from 'react-date-range/dist/locale';

const icons = new Icons();

const HotelDetails = (props) => {
  const { Establecimiento } = props;

  const ServiciosOferta = ({ titulo, descripciones }) => {
    const [mostrarMas, setMostrarMas] = useState(false);

    function Icon() {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className={`${mostrarMas ? "rotate-180" : ""} h-4 w-4 transition-transform`}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      );
    }

    return (
      <div className={titulo != "Sist. Servicios" ? "flex-1 border-r border-gray-200 pr-3" : "flex-1 pr-1 border-r border-gray-200"}>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">{titulo}</label>
          {descripciones.length > 5 && (
            <button
              className="text-[11px] text-blue-500 hover:text-blue-600 transition-colors font-medium"
              onClick={() => setMostrarMas(!mostrarMas)}
            >
              <div className="flex gap-1 items-start">
                {mostrarMas ? 'Ver menos' : 'Ver más'}
                {Icon}
              </div>
            </button>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          {descripciones.slice(0, mostrarMas ? descripciones.length : 5).map((itemRestricciones, index) => (
            <div key={index} className="flex gap-x-2 items-start">
              <div className="h-5 shrink-0 ">
                {getIcon({ text: itemRestricciones.Titulo, h: "h-5", w: "w-5", c: "text-[#3d82f5]" })}
              </div>
              <p
                dangerouslySetInnerHTML={{ __html: itemRestricciones.Titulo }}
                className="text-sm leading-4 text-gray-500"
              ></p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const partiatals = (item) => {
    const count = [item.Incluye?.length, item.NoIncluye?.length, item.Restricciones?.length, item.SistemaServicios?.length, item.Adicionales?.length]
    .filter(Boolean).length;

      const cols = {
      1: "grid grid-cols-1",
      2: "grid grid-cols-2",
      3: "flex flex-wrap flex-cols-2",
      4: "grid grid-cols-2",
      5: "grid grid-cols-2",
    };

    return cols[count] || "grid-cols-1";
};

  return (
    <div className="flex flex-col mb-10">
      {/* Título y descripción
      <h2 className="font-semibold text-xl text-gray-900 mb-1">
        Acerca de {Establecimiento.Titulo}
      </h2>
      <p className="text-sm leading-5 text-gray-600 px-4 py-2">{Establecimiento.Descripcion}</p>
 */}
     {/*  Sección de servicios */}
      <div className="mt-4 rounded-xl p-4 border border-gray-100">
        <h3 className="font-semibold text-base text-gray-800 mb-3 text-center">
          Servicios y otros detalles del establecimiento
        </h3>
        <div className={` ${partiatals(Establecimiento)}  gap-3`}>
          {Establecimiento.Incluye && (
            <ServiciosOferta titulo={"Incluye"} descripciones={Establecimiento.Incluye} />
          )}
          
          {Establecimiento.Restricciones && (
            <ServiciosOferta titulo={"Restricciones"} descripciones={Establecimiento.Restricciones} />
          )}
          {Establecimiento.NoIncluye && (
            <ServiciosOferta titulo={"No Incluye"} descripciones={Establecimiento.NoIncluye} />
          )}
          {Establecimiento.Adicionales && (
            <ServiciosOferta titulo={"Adicionales"} descripciones={Establecimiento.Adicionales} />
            
          )}
          {Establecimiento.SistemaServicios && (
            <ServiciosOferta titulo={"Sist. Servicios"} descripciones={Establecimiento.SistemaServicios} />
          )}
        
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;