import { Fragment } from "react";
import BingMapsReact from "bingmaps-react";

const HotelMap = (props) => {
  // Props de versión mobile
  const { Latitud, Longitud, Direccion, Titulo, PrecioSinImpuestos } = props;
  
  // Props de versión desktop (modal)
  const { isOpen, item, onClose } = props;

  // Determinar si es versión modal (desktop) o inline (mobile)
  const isModal = isOpen !== undefined;

  // Si es modal y no está abierto, no renderizar
  if (isModal && !isOpen) return null;

  // Para versión modal, usar datos de item
  const lat = isModal ? item?.Latitud : Latitud;
  const lng = isModal ? item?.Longitud : Longitud;
  const titulo = isModal ? item?.Titulo : Titulo;
  const direccion = isModal ? item?.Direccion : Direccion;
  const precio = isModal ? item?.PrecioSinImpuestos : PrecioSinImpuestos;

  const pinsList = [
    {
      pin: {
        latitude: lat,
        longitude: lng,
        title: titulo,
      },
      infobox: {
        title: titulo,
        description: precio ? "Precios desde: $" + precio : ""
      },
      center: {
        latitude: lat,
        longitude: lng,
      },
      options: {
        icon: "https://visitaecuador.com/img/web/pinMap.png",
        title: titulo,
      },
    }
  ];

  // Versión Modal (Desktop)
  if (isModal) {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div 
          className="fixed inset-0 transition-opacity" 
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="w-screen m-4 md:m-56 z-50">
          <div className="flex justify-center mb-4">
            <button
              className="h-10 w-10 bg-red-500 hover:bg-red-700 border-2 text-white rounded-full"
              onClick={onClose}
            >
              X
            </button>
          </div>
          <div className="bg-white p-2 rounded-md cursor-move">
            <Fragment>
              <div>
                <BingMapsReact
                  bingMapsKey="AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z"
                  height="500px"
                  pushPins={[{
                    center: {
                      latitude: lat,
                      longitude: lng,
                    },
                    options: {
                      icon: "https://visitaecuador.com/img/web/pinMap.png",
                      title: titulo,
                    },
                  }]}
                  viewOptions={{
                    center: { latitude: lat, longitude: lng },
                    zoom: 12,
                    mapTypeId: "road",
                  }}
                />
              </div>
            </Fragment>
          </div>
        </div>
      </div>
    );
  }

  // Versión Inline (Mobile y Desktop)
  return (
    <div className="p-3 z-0">
      <div>
        <div className="relative border border-gray-300 z-10">
          <BingMapsReact
            bingMapsKey="AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z"
            height="160px"
            style={{ zIndex: 1 }}
            pushPinsWithInfoboxes={pinsList}
            viewOptions={{
              center: { latitude: lat, longitude: lng },
              zoom: 12,
              mapTypeId: "road",
            }}
          />
        </div>
      </div>
      <div className="flex gap-2 items-center pt-3">
        <span className="icon-[ic--outline-place] h-5 w-5"></span>
        <label>{direccion}</label>
      </div>
    </div>
  );
};

export default HotelMap;