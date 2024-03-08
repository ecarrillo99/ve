import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from "@react-google-maps/api";
import React, { useState } from 'react';
import HotelMap from "./HotelMap";
import BingMapsReact from "bingmaps-react";


const containerStyle = {
  width: '100%', // Ajuste el ancho al 100% para que se adapte al contenedor
  height: '182px', // Ajuste la altura según sus necesidades
  borderRadius: "3%" 
};

const HotelAdress = (props) => {
  const { Establecimiento, openMap } = props;
  const [isModalOpen, setIsModalOpen] = useState(openMap!=null?openMap:false);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAwURL3bmODrFj1G0RUpgVT6DlGvlkhQzo',//"AIzaSyA6HUJy-ywbROEmCSK-Nx4-smVRLRVyR84",
  }); 

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

  return (
    <div className="border mt-4 h-[23.3vh] rounded-lg border-gray-300 ">
      
      <HotelMap
        isOpen={isModalOpen}
        onClose={closeModal}
        item={Establecimiento} />
      {isLoaded && center.lat != null ? (
        <div className="relative aspect-w-3 aspect-h-2">
          <div className="absolute w-full h-full z-10 aspect-w-3 rounded-md bg-gray-400 bg-opacity-20 flex items-center justify-center">
            <button className="bg-greenVE-600 text-white px-3 py-1 rounded-lg z-20" onClick={openModal}>Ver en el mapa</button>
          </div>
          <BingMapsReact
                    bingMapsKey="AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z"
                    height="183px"
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
    </div>
  );
};

export default HotelAdress;
