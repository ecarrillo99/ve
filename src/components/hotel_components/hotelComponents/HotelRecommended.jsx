import React, { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import Icons from '../../../global/icons';

const HotelRecommended = (props) => {
  const { Establecimiento, Noches, Personas } = props;
  const icons = new Icons();

  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? 'rotate-180' : ''} h-5 w-5 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

  const handleClickPreReserva = () => {
    const targetElement = document.getElementById('tabla-ofertas');

    if (targetElement) {
      const scrollOptions = {
        behavior: 'smooth',
        block: 'start',
      };
      targetElement.scrollIntoView(scrollOptions);
    }
  };

  const [open, setOpen] = useState(0);
  const [count, setCount] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  return (
    <div className="border-l border-r border-t rounded-lg w-full">
      <label className="font-semibold p-2 text-xl">Recomendado para {Personas} personas y {Noches} noches </label>
      <div className="border-y w-full flex flex-col-reverse lg:flex-row rounded-b-lg">
        <div className="lg:w-10/12 w-full">
          {Establecimiento.Recomendados.map((item, index) => (
            <div key={index} className={`flex ${index !== Establecimiento.Recomendados.length - 1 ? 'border-b' : ''}`}>
              <div className="w-full lg:w-10/12 p-2 flex flex-col">
                <label className="font-semibold text-sm text-greenVE-600">{item.NumOfertas} x {item.TituloOferta}</label>
                <label className="ml-2 text-xs font-semibold text-gray-500">Personas:</label>
                <div className="flex ml-6 text-sm items-center">
                  <div dangerouslySetInnerHTML={{ __html: icons.Data['Adulto'] }} className="" />
                  <label className="text-gray-500 text-xs"> x {item.Adultos * item.NumOfertas} </label>
                </div>
                <label className="ml-2 text-xs font-semibold text-gray-500">Acomodación:</label>
                <div className="flex ml-6 text-sm items-center">
                  <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find((clave) => item.Acomodacion.includes(clave))] }} className="" />
                  <label className="text-gray-500 text-xs ">{item.Acomodacion} x {item.NumOfertas} </label>
                </div>
                <Accordion open={open === index + 1} icon={<Icon id={index + 1} open={open} />}>
                  <AccordionHeader className="p-0 text-xs pl-2 border-0 w-auto font-semibold text-blue-500 mt-4" onClick={() => handleOpen(index + 1)}>
                    Ver servicios y otros detalles
                  </AccordionHeader>
                  <AccordionBody className="p-0 pl-5">
                    <div className="flex gap-2">
                      {item.Incluye && (
                        <div className="flex-1 border-r pr-1">
                          <label className="text-xs font-semibold text-gray-500">Incluye</label>
                          {item.Incluye.map((itemIncluye, incluyeIndex) => (
                            <div key={incluyeIndex} className="flex gap-2 items-center">
                              <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find((clave) => itemIncluye.Titulo.includes(clave))] }} className="" />
                              <p
                                dangerouslySetInnerHTML={{ __html: itemIncluye.Titulo }}
                                className="my-0.5 text-xs leading-3 font-light text-gray-500"
                              ></p>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.NoIncluye && (
                        <div className="flex-1 border-r pr-1">
                          <label className="text-xs font-semibold text-gray-500">No Incluye</label>
                          {item.NoIncluye.map((itemNoIncluye, noIncluyeIndex) => (
                            <div key={noIncluyeIndex} className="flex gap-2 items-center">
                              <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find((clave) => itemNoIncluye.Titulo.includes(clave))] }} className="" />
                              <p
                                dangerouslySetInnerHTML={{ __html: itemNoIncluye.Titulo }}
                                className="my-0.5 text-xs font-light text-gray-500 leading-3"
                              ></p>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.Restricciones && (
                        <div className="flex-1 border-r pr-1">
                          <label className="text-xs font-semibold text-gray-500">Restricciones</label>
                          {item.Restricciones.map((itemRestricciones, restriccionesIndex) => (
                            <div key={restriccionesIndex} className="flex gap-2 items-center">
                              <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find((clave) => itemRestricciones.Titulo.includes(clave))] }} className="" />
                              <p
                                dangerouslySetInnerHTML={{ __html: itemRestricciones.Titulo }}
                                className="my-0.5 text-xs leading-3 font-light text-gray-500"
                              ></p>
                            </div>
                          ))}
                        </div>
                      )}
                      {item.SistemaServicios && (
                        <div className="flex-1 pr-1">
                          <label className="text-xs font-semibold text-gray-500">Sistema de Servicios</label>
                          {item.SistemaServicios.map((itemSistemaServicios, sistemaServiciosIndex) => (
                            <div key={sistemaServiciosIndex} className="flex gap-2 items-center">
                              <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find((clave) => itemSistemaServicios.Titulo.includes(clave))] }} className="" />
                              <p
                                dangerouslySetInnerHTML={{ __html: itemSistemaServicios.Titulo }}
                                className=" my-0.5 text-xs leading-3 font-light text-gray-500"
                              ></p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </AccordionBody>
                </Accordion>
              </div>
              <div className="flex flex-col border-l p-2 items-center justify-center">
                <label className="font-semibold text-2xl">${item.FinalSinImpuestos * item.NumOfertas}</label>
                <label className="text-xs text-gray-500"> + ${item.Impuestos * item.NumOfertas} de impuestos</label>
              </div>
            </div>
          ))}
        </div>
        <div className="border-l w-full lg:w-2/12 flex flex-col p-2 items-center justify-center gap-1">
          <label className="font-semibold text-3xl">${Establecimiento.PrecioSinImpuestos}</label>
          <label className="text-xs text-gray-500">+ ${Establecimiento.Impuestos} de impuestos</label>
          <button className="bg-greenVE-500 text-white py-1 px-2 rounded-lg border-greenVE-600 border-2" onClick={() => handleClickPreReserva()}>
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelRecommended;
