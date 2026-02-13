import React, { useState, useEffect } from 'react';
import { getWineOfferById } from '../../../core/vinoApiService';

const HotelWineOffer = ({ ofertaSeleccionada, establecimiento, includeInReservation, setIncludeInReservation, showCheckbox = true }) => {
  const [offerDetails, setOfferDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      if (ofertaSeleccionada?.IdOferta) {
        setLoading(true);
        try {
          const details = await getWineOfferById(ofertaSeleccionada.IdOferta);
          if (details) {
            setOfferDetails(details);
          }
        } catch (error) {
          console.error('Error fetching offer details:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOfferDetails();
  }, [ofertaSeleccionada?.IdOferta]);

  const handleCheckChange = (e) => {
    const checked = e.target.checked;
    if (setIncludeInReservation) {
      setIncludeInReservation(checked);
    }
  };

  if (!ofertaSeleccionada) return null;

  const offer = offerDetails || ofertaSeleccionada;
  const inventories = offer?.inventories || [];
  const hasGift = inventories.length > 0;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      timeZone: 'UTC'
    });
  };

  const getPrice = () => {
    const price = parseFloat(offer?.price || offer?.Precio || 0);
    return isNaN(price) ? 0 : price;
  };

  if (loading) {
    return (
      <div className="mb-4 border border-amber-200 overflow-hidden w-full">
        <div className="bg-amber-500 px-4 py-3 flex items-center gap-3">
          <div className="bg-amber-400 rounded-full p-2 w-10 h-10 animate-pulse"></div>
          <div className="h-5 bg-amber-400 rounded w-48 animate-pulse"></div>
        </div>
        <div className="p-4 bg-amber-50">
          <div className="h-20 bg-amber-100 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-0 border border-[#7C9539] overflow-hidden shadow-sm w-full">
      {/* Header */}
      <div className="bg-[#7C9539] px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-full p-1.5">
            <span className="text-xl">🍷</span>
          </div>
          <h3 className="text-white font-semibold text-sm md:text-base">
            Oferta Ruta del Vino: {offer.TituloOferta || offer.title}
          </h3>
        </div>
        
        {showCheckbox && setIncludeInReservation && (
          <label className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors">
            <input
              type="checkbox"
              checked={includeInReservation}
              onChange={handleCheckChange}
              className="w-4 h-4 text-amber-600 border-white rounded focus:ring-amber-500 focus:ring-offset-0"
            />
            <span className="text-white text-sm font-medium">Incluir en reserva</span>
          </label>
        )}
      </div>

      {/* Tabla alineada con HotelOfertas */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead className="bg-[#7C9539]">
            <tr>
              {/* Ofertas - ancho similar */}
              <th className="border px-2 py-2 text-center text-gray-100 font-medium " >Ofertas</th>
              {/* Personas */}    <th className="border px-2 py-2 text-center text-gray-100 font-medium " >Vigencia</th>
       
              {/* Precio por noches / Vigencia */}
                 <th className="border px-2 py-2 text-center text-gray-600 font-medium text-sm">Detalle</th>
              {/* Incluye / Regalos */}
              <th className="border px-2 py-2 text-center text-gray-600 font-medium text-sm">{hasGift ? 'Regalos' : ''}</th>
              {/* Total / Precio */}
              <th className="border px-2 py-2 text-center text-gray-100 font-medium " >Precio</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr>
              {/* Columna: Detalle */}
              <td className="border px-2 py-3">
                <div className="flex items-start gap-3">
                  <div className=" w-full h-32 flex-shrink-0 rounded-lg overflow-hidden border border-amber-200">
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-[#EEF2E3] animate-pulse"></div>
                    )}
                    <img
                      src={offer.FotoPrincipal || offer.image || 'https://via.placeholder.com/80x64?text=🍷'}
                      alt={offer.TituloOferta || offer.title}
                      className={`w-full h-full object-cover bg-black opacity-70 `}
                      onLoad={() => setImageLoaded(true)}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x64?text=🍷';
                        setImageLoaded(true);
                      }}
                    />
                     <div className="relative left-0 bottom-10 z-50 min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">
                        {offer.TituloOferta || offer.title}
                      </h4>
                  </div>
                  </div>
                
                </div>
              </td>
   {/* Columna: Vigencia */}
              <td className="border px-2 py-3 text-center">
                {(offer.date_st || offer.date_ed) ? (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-gray-600 text-xs mb-1">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="gray">
                        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                      </svg>
                      <span>Válido:</span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {formatDate(offer.date_st)} - {formatDate(offer.date_ed)}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">Sin límite</span>
                )}
              </td>
              {/* Columna vacía (Personas) */}
              <td className="border px-2 py-3">
                 {(offer.Detalle || offer.description) && (
                      <p className="text-gray-600 text-xs line-clamp-2">
                        {offer.Detalle || offer.description}
                      </p>
                    )}
              </td>

           

              {/* Columna: Regalos */}
              <td className="border px-2 py-3">
                {hasGift ? (
                  <div className="flex flex-col gap-1">
                    {inventories.slice(0, 2).map((inv, index) => (
                      <div key={inv.id || index} className="flex items-center gap-1">
                        <span className="text-green-500 text-xs">✓</span>
                        <span className="text-xs text-gray-700 truncate">{inv.name}</span>
                      </div>
                    ))}
                    {inventories.length > 2 && (
                      <span className="text-xs text-amber-600 font-medium">
                        +{inventories.length - 2} más
                      </span>
                    )}
                  </div>
                ) : null}
              </td>

              {/* Columna: Precio */}
              <td className="border  py-3 text-center">
                <div className="flex flex-col items-center">
                  {getPrice() > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-[#97C121]">
                        ${getPrice()}
                      </span>
                      <span className="text-xs text-gray-500">/precio descorche</span>
                    </>
                  ) : (
                    <>
                      <span className="text-lg font-bold text-green-600">Incluido</span>
                      <span className="text-xs text-gray-500">con tu reserva</span>
                    </>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer con regalos expandibles */}
      {hasGift && inventories.length > 2 && (
        <div className="bg-amber-50 px-4 py-3 border-t border-amber-200">
          <details className="group">
            <summary className="flex items-center gap-2 cursor-pointer text-sm text-amber-700 font-medium hover:text-amber-800">
              <span>🎁 Ver todos los regalos incluidos ({inventories.length})</span>
              <svg className="w-4 h-4 transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </summary>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {inventories.map((inv, index) => (
                <div
                  key={inv.id || index}
                  className="flex items-center gap-2 bg-white p-2 rounded-lg border border-amber-100"
                >
                  {inv.image ? (
                    <img
                      src={inv.image}
                      alt={inv.name}
                      className="w-8 h-8 object-cover rounded flex-shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-amber-100 rounded flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🍷</span>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-xs truncate">{inv.name}</p>
                    {inv.price && parseFloat(inv.price) > 0 && (
                      <p className="text-xs text-[#97C121]">Valor: ${parseFloat(inv.price).toFixed(2)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default HotelWineOffer;