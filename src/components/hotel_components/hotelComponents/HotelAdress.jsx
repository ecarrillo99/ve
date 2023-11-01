import { GoogleMap, MarkerF, InfoWindowF, useLoadScript } from "@react-google-maps/api"
import React from 'react'

const containerStyle = {
    width: '241px',
    height: '140px'
};


const HotelAdress = (props) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA6HUJy-ywbROEmCSK-Nx4-smVRLRVyR84"
      });

    const center = {
        lat: props.oferta.Establecimiento.Latitud,
        lng: props.oferta.Establecimiento.Longitud
    };




    return (
        <div className="border mt-4 px-3 pt-1 pb-3 rounded-lg border-gray-300">
            <label className="text-xl font-medium text-center">Dirección</label>
            <p className="text-sm">{props.oferta.Establecimiento.Direccion}</p>
            {isLoaded && center.lat != null ? (<GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={16}
                //onLoad={onLoad}
                //onUnmount={onUnmount}
                >
                <MarkerF position={center} >
                    <InfoWindowF position={center}>
                        <div>
                            <p className="text-xs">{props.oferta.Establecimiento.Titulo}</p>
                        </div>
                    </InfoWindowF>
                </MarkerF>
            </GoogleMap>) : (<></>)}
        </div>
    )
}

export default HotelAdress