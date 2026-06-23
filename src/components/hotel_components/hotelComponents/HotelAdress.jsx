import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from "@react-google-maps/api";
import React, { useState } from 'react';
import HotelMap from "./HotelMap";
import LeafletMap from "../../global_components/maps/LeafletMap";


const containerStyle = {
  width: '100%', // Ajuste el ancho al 100% para que se adapte al contenedor
  height: '182px', // Ajuste la altura según sus necesidades
  borderRadius: "3%" 
};

const HotelAdress = (props) => {
  const { Establecimiento, openMap } = props;
  const [isModalOpen, setIsModalOpen] = useState(openMap!=null?openMap:false);

  const center = {
    lat: Establecimiento.Latitud,
    lng: Establecimiento.Longitud,
  };

  const mapOptions = {
    fullscreenControl: false,
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  try{
    return (
      <div className=" mt-4 rounded-lg  z-0">
        <HotelMap
          isOpen={isModalOpen}
          onClose={closeModal}
          item={Establecimiento} />
        {Establecimiento.Latitud != null ? (
          <div className="relative aspect-w-3 aspect-h-2 z-10">
            <div
              className="absolute w-full h-full z-10 aspect-w-3 rounded-md bg-gray-400 bg-opacity-20 flex items-center justify-center cursor-pointer"
              onClick={openModal}
            >
              <span className="bg-greenVE-600 text-white px-3 py-1 rounded-lg z-20 pointer-events-none">Ver en el mapa</span>
            </div>
            <LeafletMap
                      height="205px"
                      viewOptions={{
                        center: { latitude: Establecimiento.Latitud, longitude: Establecimiento.Longitud },
                        zoom: 16,
                        mapTypeId: "aerialWithLabels",
                      }}
                      mapOptions={{
                        showZoomButtons: false,
                        showMapTypeSelector: false,
                        showBreadcrumb: false,
                        showLocateMeButton: false,
                      }}
                    />
          </div>
        ) : (
          <></>
        )}
        {Establecimiento.Latitud != null && (
          <div className="flex justify-center mt-3">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${Establecimiento.Latitud},${Establecimiento.Longitud}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors shadow-md"
            >
              <span className="icon-[mdi--google-maps] h-5 w-5"></span>
              Ver en Google Maps
            </a>
          </div>
        )}
      </div>
    );
  }catch{}

  
};

export default HotelAdress;
