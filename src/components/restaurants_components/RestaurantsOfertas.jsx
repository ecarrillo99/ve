import React, { useState, useEffect } from 'react';
import RestaurantsConfirmation from './RestaurantsConfirmation';
import { useNavigate } from 'react-router-dom';

const RestaurantsOfertas = (props) => {
  const { Establecimiento, Ofertas, Fechas, Opciones, scheduleDateTime, ofertaActiva } = props;

  const [selectedOptions, setSelectedOptions] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [ofertasSeleccionadas, setOfertasSeleccionadas] = useState([]);
  const [alerta, setAlerta] = useState("");
  const [correcto, setCorrecto] = useState(false);

  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const navigate = useNavigate();

  const DAY_NAMES_0 = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const DAY_NAMES_1 = ["", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  const formatDayRange = (start, end) => {
    const useBase1 = start > 6 || end > 6;
    const names = useBase1 ? DAY_NAMES_1 : DAY_NAMES_0;
    const s = names[start] ?? start;
    const e = names[end] ?? end;
    return s === e ? s : `${s} – ${e}`;
  };

  const formatTime = (timeValue) => {
    if (!timeValue) return '';
    const str = typeof timeValue === 'string' ? timeValue : new Date(timeValue).toISOString();
    const timePart = str.includes('T') ? str.split('T')[1] : str;
    const [hh, mm] = timePart.split(':');
    const h = parseInt(hh, 10);
    const period = h >= 12 ? 'pm' : 'am';
    const h12 = h % 12 || 12;
    return `${h12}:${mm}${period}`;
  };

  // Inicializar todas las ofertas en 0
  useEffect(() => {
    if (Ofertas && Ofertas.length > 0) {
      const initial = {};
      Ofertas.forEach((oferta) => {
        initial[oferta.id || oferta.IdOferta] = 0;
      });
      setSelectedOptions(initial);
    }
  }, [Ofertas]);

  // Pre-seleccionar la oferta activa (recomendada) con 1 persona
  useEffect(() => {
    if (ofertaActiva && Ofertas && Ofertas.length > 0) {
      const activaId = ofertaActiva.id || ofertaActiva.IdOferta;
      if (activaId) {
        setSelectedOptions(prev => ({
          ...prev,
          [activaId]: 1,
        }));
      }
    }
  }, [ofertaActiva, Ofertas]);

  const options = [0, 1, 2, 3, 4, 5];

  const handleSelectChange = (event, key) => {
    setAlerta("");
    const newSelectedOptions = { ...selectedOptions };
    newSelectedOptions[key] = event.target.value;
    setSelectedOptions(newSelectedOptions);
  };

  // Retorna el precio de la primera oferta con personas > 0, o 0 si ninguna
  const getPrecioActivo = () => {
    for (const id in selectedOptions) {
      if (parseInt(selectedOptions[id]) > 0) {
        const oferta = Ofertas.find(o => (o.id || o.IdOferta).toString() === id.toString());
        if (oferta) return parseFloat(oferta.price || 0);
      }
    }
    return 0;
  };

  const calcularTotal = () => {
    let total = { SinImpuestos: 0, Impuestos: 0 };
    for (const id in selectedOptions) {
      const objeto = Ofertas.find((oferta) => (oferta.id || oferta.IdOferta).toString() === id.toString());
      if (objeto) {
        const precio = parseFloat(objeto.price || 0);
        total.SinImpuestos += precio;
      }
    }
    return total;
  };

  const handleClickReservar = () => {
    setAlerta("");
    const ofertasList = [];

    for (const id in selectedOptions) {
      if (parseInt(selectedOptions[id]) > 0) {
        const objeto = Ofertas.find((oferta) => (oferta.id || oferta.IdOferta).toString() === id.toString());
        if (objeto) {
          ofertasList.push({
            ...objeto,
            NumOfertas: parseInt(selectedOptions[id]),
            NumPersonas: parseInt(selectedOptions[id]),
            cantidad: parseInt(selectedOptions[id]),
            TituloOferta: objeto.title || objeto.TituloOferta,
            IdOferta: objeto.id || objeto.IdOferta,
          });
        }
      }
    }

    if (ofertasList.length === 0) {
      setAlerta("Selecciona al menos una oferta");
      return;
    }

    setOfertasSeleccionadas(ofertasList);

    if (nivel === "suscriptor") {
      setIsModalOpen(true);
    } else {
      setShowSubscriptionModal(true);
    }
  };

  const handleClickCancelar = () => {
    setIsModalOpen(false);
  };

  // Construir objeto Establecimiento compatible con los subcomponentes
  const establecimientoData = {
    ...Establecimiento,
    Titulo: Establecimiento.name || Establecimiento.Titulo,
    Ciudad: Establecimiento.city || Establecimiento.Ciudad,
    Direccion: Establecimiento.address || Establecimiento.Direccion,
    Catalogacion: Establecimiento.rate || Establecimiento.Catalogacion || 0,
    Foto: Establecimiento.Foto || Establecimiento.image || Establecimiento.FotoPrincipal || '',
    FotoPrincipal: Establecimiento.Foto || Establecimiento.image || Establecimiento.FotoPrincipal || '',
    image: Establecimiento.image || Establecimiento.Foto || Establecimiento.FotoPrincipal || '',
    Contactos: Establecimiento.Contactos || { Whatsapp: [], Telefono: [], Email: [] },
    ContactosCentral: Establecimiento.ContactosCentral || {
      Whatsapp: [
        { formateado: "+593 9862 63432", valor: "+593 9862 63432" },
        { formateado: "+593 9806 44467", valor: "+593 9806 44467" },
        { formateado: "+593 9818 50436", valor: "+593 9818 50436" },
      ],
      Email: [{ valor: "reservas@visitaecuador.com" }],
    },
  };

  if (!Ofertas || Ofertas.length === 0) {
    return (
      <div className="w-full py-8 text-center text-gray-500">
        <span className="text-amber-500 text-4xl">🍷</span>
        <p className="mt-2">No hay ofertas disponibles en este momento.</p>
      </div>
    );
  }

  return (
    <>
      <RestaurantsConfirmation
        Ofertas={ofertasSeleccionadas}
        isOpen={isModalOpen}
        Establecimiento={establecimientoData}
        Fechas={Fechas}
        Valores={calcularTotal()}
        OnClose={() => handleClickCancelar()}
        Opciones={Opciones}
        scheduleDateTime={scheduleDateTime}
      />

      {/* ── Modal: se requiere suscripción ── */}
      {showSubscriptionModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setShowSubscriptionModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl mx-6 w-full max-w-sm z-10 overflow-hidden">

            {/* Franja superior */}
            <div className="bg-gradient-to-r from-greenVE-500 to-greenVE-600 px-6 pt-8 pb-6 flex flex-col items-center gap-2">
              <div className="bg-white/20 rounded-full p-3">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-white font-bold text-lg text-center">
                Acceso exclusivo para suscriptores
              </h2>
            </div>

            {/* Cuerpo */}
            <div className="px-6 py-5 flex flex-col items-center gap-4">
              <p className="text-gray-600 text-sm text-center leading-relaxed">
                Para reservar en la <span className="font-semibold text-amber-600">Ruta del Vino</span> necesitas una suscripción activa en Visita Ecuador.
              </p>

              <div className="w-full flex flex-col gap-2">
                <button
                  onClick={() => { setShowSubscriptionModal(false); navigate("/suscripcion"); }}
                  className="w-full bg-greenVE-500 hover:bg-greenVE-600 text-white font-semibold py-2.5 rounded-xl transition-colors"
                >
                  Ver planes de suscripción
                </button>
                <button
                  onClick={() => setShowSubscriptionModal(false)}
                  className="w-full border border-gray-200 hover:bg-gray-50 text-gray-500 font-medium py-2.5 rounded-xl transition-colors text-sm"
                >
                  Cerrar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <div className='relative w-full z-0'>
        <div className='sticky top-0 z-10'>
          <div className='table-fixed w-full'>
            <table id={'tabla-ofertas-vinos'} className="table-auto w-full">
              <thead className="bg-greenVE-600 sticky top-0 z-50">
                <tr>
                  <th className="border border-amber-600 px-2 text-gray-100 font-medium">Ofertas</th>
                  <th className="border border-amber-600 px-2 text-gray-100 font-medium">Personas</th>
                  <th className="border border-amber-600 px-2 text-gray-100 font-medium leading-4 py-1.5">
                    Precio descorche
                  </th>
                  {ofertasSeleccionadas.some(oferta => oferta.inventories && oferta.inventories.length > 0) && (
                    <th className="border border-amber-600 px-2 text-gray-100 font-medium">Incluye</th>
                  )}
                  <th className="border border-amber-600 px-2 text-gray-100 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {Ofertas.map((item, index) => {
                  const itemId = item.id || item.IdOferta;
                  const title = item.title || item.TituloOferta;
                  const description = item.description || item.Detalle || '';
                  const price = parseFloat(item.price || item.FinalSinImpuestos || 0);
                  const inventories = item.inventories || [];
                  const schedules = item.schedules || [];
                  const image = item.image || item.FotoPrincipal || '';

                  return (
                    <tr key={itemId}>
                      <td className="border">
                        <div className="flex flex-col p-2">
                          <label className="font-semibold text-sm text-greenVE-600">{title}</label>

                          {description && (
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>
                          )}

                          {schedules.length > 0 && (
                            <div className="mt-1 ml-2">
                              <label className="text-xs font-semibold text-gray-500">Horarios:</label>
                              <div className="flex flex-wrap gap-1 mt-0.5">
                                {schedules.map((schedule, idx) => (
                                  <span key={idx} className="text-[10px] text-greenVE-600 bg-greenVE-50 px-1.5 py-0.5 rounded border border-amber-100">
                                    {formatDayRange(schedule.day_start, schedule.day_end)} · {formatTime(schedule.time_st)} – {formatTime(schedule.time_ed)}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {image && (
                            <div className="mt-2 ml-2">
                              <img src={image} alt={title} className="w-20 h-14 object-cover rounded-md" />
                            </div>
                          )}
                        </div>
                      </td>

                      <td className="border">
                        <div className="flex justify-center align-top items-start space-x-2 mb-3 -mt-4">
                          <select
                            id={`combobox-${itemId}`}
                            name={`combobox-${itemId}`}
                            value={selectedOptions[itemId] || 0}
                            onChange={(event) => handleSelectChange(event, itemId)}
                            className="border rounded-md px-2 py-1 text-sm"
                          >
                            {options.map((option) => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-0.5 p-2 max-w-[72px] mx-auto min-h-[40px]">
                          {(() => {
                            const n = parseInt(selectedOptions[itemId] || 0);
                            if (n === 0) return <span className="icon-[solar--user-rounded-outline] h-5 w-5 text-gray-300" />;
                            return Array.from({ length: n }).map((_, i) => (
                              <span key={i} className="icon-[solar--user-rounded-bold] h-5 w-5 text-blue-500" />
                            ));
                          })()}
                        </div>
                      </td>

                      <td className="border text-center">
                        <div className="flex flex-col p-2 items-center justify-center">
                          <label className="font-semibold text-2xl">${price}</label>
                        </div>
                      </td>

                      {inventories.length > 0 && (
                        <td className="border p-2">
                          <div className="flex-1 pr-1">
                            {inventories.map((inv, invIndex) => (
                              <div key={invIndex} className="flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <p className="my-0.5 text-xs leading-3 font-light text-amber-700">
                                  🎁 {inv.name || inv.title}
                                </p>
                              </div>
                            ))}
                          </div>
                        </td>
                      )}

                      {index === 0 && (
                        <td className="border text-center align-top mt-2" rowSpan={Ofertas.length}>
                          <div className="flex flex-col p-2 items-center gap-1 sticky top-20 bg-white">
                            <label className="font-semibold text-3xl text-center">
                              ${getPrecioActivo()}
                            </label>
                            <button
                              className="bg-greenVE-500 text-white py-1 px-2 rounded-lg border-greenVE-600 border-2 hover:bg-greenVE-600 transition-colors"
                              onClick={() => handleClickReservar()}
                            >
                              Confirmar
                            </button>
                            <label className='text-xxs text-red-500 font-medium max-w-[110px]'>{alerta}</label>
                            {alerta !== "" && (
                              <label className='text-xxs text-amber-700 mt-5 font-medium max-w-[110px]'>
                                Si necesitas ayuda, contáctate con nuestra central de reservas
                              </label>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default RestaurantsOfertas;