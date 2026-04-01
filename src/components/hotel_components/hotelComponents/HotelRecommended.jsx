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
      <div className="rounded-xl w-full animate-pulse bg-white shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 bg-gray-50">
          <div className="h-6 bg-gray-200 rounded-md w-3/4"></div>
        </div>
        <div className="p-4 flex flex-col lg:flex-row gap-4">
          <div className="lg:w-9/12 w-full space-y-3">
            <div className="h-5 bg-gray-200 rounded-md w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/4"></div>
          </div>
          <div className="lg:w-3/12 flex flex-col items-center justify-center gap-2 p-4">
            <div className="h-8 bg-gray-200 rounded-md w-20"></div>
            <div className="h-4 bg-gray-200 rounded-md w-24"></div>
            <div className="h-10 bg-gray-200 rounded-full w-28"></div>
          </div>
        </div>
      </div>
    );
  }

  const partitals = (item) => {
    const count = [item.Incluye, item.NoIncluye, item.Restricciones, item.SistemaServicios]
      .filter(Boolean).length;

    const cols = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
    };

    return cols[count] || "grid-cols-1";
};


  return (
    <div className="rounded-xl w-full bg-white shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-greenVE-50 px-4 py-3 border-b border-greenVE-100">
        <h3 className="font-semibold text-lg text-greenVE-800 flex items-center gap-2">
          Recomendado para {Adultos} {Adultos == 1 ? "adulto" : "adultos"}
          {Ninos == 0 ? "" : Ninos == 1 ? `, ${Ninos} niño` : `, ${Ninos} niños`}
          {Establecimiento.IdEstablecimiento != "443" ? ` y ${Noches} ${Noches == 1 ? "noche" : "noches"}` : " y 1 día"}
        </h3>
      </div>

      {/* Content */}
      <div className="flex flex-col-reverse lg:flex-row">
        {/* Ofertas */}
        <div className="lg:w-12/12 w-full divide-y divide-gray-100">
          {Establecimiento.Recomendados.map((item, index) => (
            <div key={index} className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-10/12 p-4 flex flex-col gap-2">
                {/* Título de oferta */}
                <label className="font-semibold text-sm text-greenVE-600 bg-greenVE-50 px-2 py-1 rounded-md w-fit">
                  {item.NumOfertas} x {item.TituloOferta}
                </label>

                {/* Info de personas y acomodación en fila */}
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
                  {/* Personas */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-500">Personas:</span>
                    <span className="icon-[solar--user-rounded-outline] h-4 w-4 text-blue-500"></span>
                    <span className="text-xs text-gray-600">x {item.Adultos * item.NumOfertas}</span>
                    <span className='text-xs'>adultos</span>
                    {(item.Ninos) != null && (
                      <>
                        <span className="text-gray-300 mx-0.5">|</span>
                        <span className="icon-[solar--user-rounded-outline] h-3.5 w-3.5 text-blue-400"></span>
                        <span className="text-xs text-gray-600">x {item.Ninos * item.NumOfertas}</span>
                        <span className='text-xs'>niños</span>
                      </>
                    )}
                  </div>

                  {/* Acomodación */}
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-medium text-gray-500">Acomodación:</span>
                    {Establecimiento.IdEstablecimiento == "443"
                      ? <>
                        <span className="icon-[ri--prohibited-2-line] text-gray-400 h-4 w-4"></span>
                        <span className="text-xs text-gray-500">Sin hospedaje</span>
                      </>
                      : <>
                        <span className="icon-[material-symbols--bed-outline-rounded] text-blue-500 h-4 w-4"></span>
                        <span className="text-xs text-gray-600">{item.Acomodacion} x {item.NumOfertas}</span>
                      </>
                    }
                  </div>
                </div>

                {/* Accordion de servicios */}
                <Accordion open={open === index + 1} icon={<Icon id={index + 1} open={open} />}>
                  <AccordionHeader
                    className="p-0 text-xs border-0 w-auto font-medium text-blue-500 mt-2 hover:text-blue-600"
                    onClick={() => handleOpen(index + 1)}
                  >
                    Ver servicios y otros detalles
                  </AccordionHeader>
                  <AccordionBody className="p-0 pt-3 w-full ">
                    <div className={`grid grid-cols-1 ${partitals(item)} gap-4`}>
                      {item.Incluye && (
                        <div className="space-y-1.5 border-r border-gray-100 pr-4">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Incluye</label>
                          <div className="space-y-1">
                            {item.Incluye.map((itemIncluye, incluyeIndex) => (
                              <div key={incluyeIndex} className="flex gap-1.5 items-start">
                                {getIcon({ text: itemIncluye.Titulo, h: "h-5", w: "w-5", c: "text-greenVE-500 shrink-0 mt-0.5" })}
                                <p
                                  dangerouslySetInnerHTML={{ __html: itemIncluye.Titulo }}
                                  className="text-xs text-gray-600 leading-4"
                                ></p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.NoIncluye && (
                        <div className="space-y-1.5 border-r border-gray-100 pr-4">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">No Incluye</label>
                          <div className="space-y-1">
                            {item.NoIncluye.map((itemNoIncluye, noIncluyeIndex) => (
                              <div key={noIncluyeIndex} className="flex gap-1.5 items-start">
                                {getIcon({ text: itemNoIncluye.Titulo, h: "h-5", w: "w-5", c: "text-orange-400 shrink-0 mt-0.5" })}
                                <p
                                  dangerouslySetInnerHTML={{ __html: itemNoIncluye.Titulo }}
                                  className="text-xs text-gray-600 leading-4"
                                ></p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.Restricciones && (
                        <div className="space-y-1.5 border-r border-gray-100 pr-4">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Restricciones</label>
                          <div className="space-y-1">
                            {item.Restricciones.map((itemRestricciones, restriccionesIndex) => (
                              <div key={restriccionesIndex} className="flex gap-1.5 items-start">
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find((clave) => itemRestricciones.Titulo.includes(clave))] }} className="shrink-0 mt-0.5" />
                                <p
                                  dangerouslySetInnerHTML={{ __html: itemRestricciones.Titulo }}
                                  className="text-xs text-gray-600 leading-4"
                                ></p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {item.SistemaServicios && (
                        <div className="space-y-1.5 border-r border-gray-100 ">
                          <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Sistema de Servicios</label>
                          <div className="space-y-1">
                            {item.SistemaServicios.map((itemSistemaServicios, sistemaServiciosIndex) => (
                              <div key={sistemaServiciosIndex} className="flex gap-1.5 items-start">
                                <div dangerouslySetInnerHTML={{ __html: icons.Data[Object.keys(icons.Data).find((clave) => itemSistemaServicios.Titulo.includes(clave))] }} className="shrink-0 mt-0.5" />
                                <p
                                  dangerouslySetInnerHTML={{ __html: itemSistemaServicios.Titulo }}
                                  className="text-xs text-gray-600 leading-4"
                                ></p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </AccordionBody>
                </Accordion>
              </div>

              {/* Precio individual por oferta */}
              <div className="flex flex-row  lg:flex-col border-t lg:border-t-0 lg:border-l border-gray-100 p-3 items-center justify-center gap-1 ">
                <span className="font-bold text-xl text-gray-800">${item.FinalSinImpuestos * item.NumOfertas}</span>
                <span className="text-[11px] text-gray-400">+ ${item.Impuestos * item.NumOfertas} impuestos</span>
              </div>
            </div>
          ))}
        </div>

        {/* Panel de precio total y reserva */}
        <div className="border-b lg:border-b-0 lg:border-l border-gray-100 w-full lg:w-3/12 flex flex-row lg:flex-col p-5 items-center justify-center gap-2 bg-gradient-to-b from-gray-50 to-white">
          <div className="text-center flex-row">
            <span className="font-bold text-3xl text-gray-900">${Establecimiento.PrecioSinImpuestos}</span>
            <p className="text-xs text-gray-400 mt-0.5">+ ${Establecimiento.Impuestos} de impuestos</p>
          </div>
          <button
            className="bg-greenVE-500 hover:bg-greenVE-600 transition-colors text-white font-medium py-2 px-6 rounded-full shadow-sm hover:shadow-md"
            onClick={() => handleClickPreReserva()}
          >
            Reservar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelRecommended;