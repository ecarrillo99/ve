import React, { useState } from 'react';
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import Icons from '../../../global/icons';
import { getIcon } from '../../../global/icons2';

const HotelRecommended = (props) => {
  const { Establecimiento, Noches, Adultos, Ninos, SetRecomendados } = props;
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
    SetRecomendados(true);
    if (targetElement) {
      const scrollOptions = {
        behavior: 'smooth',
        block: 'start',
      };
      targetElement.scrollIntoView(scrollOptions);
    }
  };

  const [open, setOpen] = useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // Verificar que Recomendados existe y tiene datos válidos
  const hasValidRecomendados = Establecimiento?.Recomendados && 
    Array.isArray(Establecimiento.Recomendados) && 
    Establecimiento.Recomendados.length > 0;

  // Si no hay recomendados válidos, no renderizar nada
  if (!hasValidRecomendados) {
    return null;
  }

  // Verificar que los precios están cargados (evitar mostrar $0)
  const preciosCargados = Establecimiento.PrecioSinImpuestos !== undefined && 
    Establecimiento.PrecioSinImpuestos !== null &&
    (Establecimiento.PrecioSinImpuestos > 0 || Establecimiento.Recomendados.some(r => r.FinalSinImpuestos > 0));

  // Si los precios no están cargados, mostrar skeleton
  if (!preciosCargados) {
    return (
      <div className="border-l border-r border-t rounded-lg w-full animate-pulse">
        <div className="h-8 bg-gray-200 rounded m-2 w-3/4"></div>
        <div className="border-y w-full flex flex-col-reverse lg:flex-row rounded-b-lg">
          <div className="lg:w-10/12 w-full p-4">
            <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2 w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
          <div className="border-l w-full lg:w-2/12 flex flex-col p-4 items-center justify-center gap-2">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
            <div className="h-10 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-l border-r border-t rounded-lg w-full">
      <label className="font-semibold p-2 text-xl">
        Recomendado para {Adultos} {Adultos == 1 ? "adulto" : "adultos"}
        {Ninos == 0 ? "" : Ninos == 1 ? `, ${Ninos} niño` : `, ${Ninos} niños`} 
        {Establecimiento.IdEstablecimiento != "443" ? ` y ${Noches} ${Noches == 1 ? "noche" : "noches"}` : " y 1 día"}
      </label>
      <div className="border-y w-full flex flex-col-reverse lg:flex-row rounded-b-lg">
        <div className="lg:w-10/12 w-full">
          {Establecimiento.Recomendados.map((item, index) => (
            <div key={index} className={`flex ${index !== Establecimiento.Recomendados.length - 1 ? 'border-b' : ''}`}>
              <div className="w-full lg:w-10/12 p-2 flex flex-col">
                <label className="font-semibold text-sm text-greenVE-600">{item.NumOfertas} x {item.TituloOferta}</label>
                <label className="ml-2 text-xs font-semibold text-gray-500">Personas:</label>
                <div className="flex ml-6 text-sm items-end">
                  <span className="icon-[solar--user-rounded-outline] h-5 w-5 text-[#3d82f5]"></span>
                  <label className="text-gray-500 text-xs"> x {item.Adultos * item.NumOfertas} </label>
                  {
                    (item.Ninos) != null
                      ? <div className='flex items-end'>,
                        <span className="icon-[solar--user-rounded-outline] h-3.5 w-3.5 text-[#3d82f5] ml-1"></span>
                        <label className="text-gray-500 text-xs"> x {item.Ninos * item.NumOfertas} </label>
                      </div>
                      : <></>
                  }
                </div>
                <label className="ml-2 text-xs font-semibold text-gray-500">Acomodación:</label>
                {
                  Establecimiento.IdEstablecimiento == "443"
                    ? <div className="flex gap-1 ml-6 text-sm items-center">
                      <span className="icon-[ri--prohibited-2-line] text-[#3d82f5] h-5 w-5"></span>
                      <label className="text-gray-500 text-xs ">El establecimiento no ofrece hospedaje</label>
                    </div>
                    : <div className="flex gap-1 ml-6 text-sm items-center">
                      <span className="icon-[material-symbols--bed-outline-rounded] text-[#3d82f5] h-5 w-5"></span>
                      <label className="text-gray-500 text-xs ">{item.Acomodacion} x {item.NumOfertas} </label>
                    </div>
                }
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
                              {
                                getIcon({ text: itemIncluye.Titulo, h: "h-5", w: "w-5", c: "text-[#3d82f5]" })
                              }
                              <p
                                dangerouslySetInnerHTML={{ __html: itemIncluye.Titulo }}
                                className="my-0.5 text-xs leading-3 font-light text-gray-500 w-11/12"
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
                              {
                                getIcon({ text: itemNoIncluye.Titulo, h: "h-5", w: "w-5", c: "text-[#3d82f5]" })
                              }
                              <p
                                dangerouslySetInnerHTML={{ __html: itemNoIncluye.Titulo }}
                                className="my-0.5 text-xs font-light text-gray-500 leading-3 w-11/12"
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