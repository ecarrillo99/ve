import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from "@react-google-maps/api";
import React from 'react';

const containerStyle = {
  width: '100%', // Ajuste el ancho al 100% para que se adapte al contenedor
  height: '130px', // Ajuste la altura según sus necesidades
};

const HotelAdress = (props) => {
  const { Establecimiento } = props;
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyA6HUJy-ywbROEmCSK-Nx4-smVRLRVyR84",
  });

  const center = {
    lat: Establecimiento.Latitud,
    lng: Establecimiento.Longitud,
  };

  return (
    <div className="border mt-4 px-3 pt-1 pb-3 rounded-lg border-gray-300">
      <label className="text-xl font-medium text-center">Dirección</label>
      <p className="text-sm">{Establecimiento.Direccion}</p>
      {isLoaded && center.lat != null ? (
        <div className="relative aspect-w-3 aspect-h-2">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
          >
            <MarkerF position={center}>
              <InfoWindowF position={center}>
                <div>
                  <p className="text-xs">{Establecimiento.Titulo}</p>
                </div>
              </InfoWindowF>
            </MarkerF>
          </GoogleMap>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HotelAdress;
