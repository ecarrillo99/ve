import { GoogleMap, useJsApiLoader } from "@react-google-maps/api"
import React from 'react'

const containerStyle = {
    width: '241px',
    height: '140px'
};




const HotelAdress = (props) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA6HUJy-ywbROEmCSK-Nx4-smVRLRVyR84"
    })

    const center = {
        lat: props.oferta.Establecimiento.Latitud,
        lng: props.oferta.Establecimiento.Longitud
    };

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <div className="border mt-4 px-3 pt-1 pb-3 rounded-lg border-gray-300">
            <label className="text-xl font-medium text-center">Dirección</label>
            <p className="text-sm">{props.oferta.Establecimiento.Direccion}</p>
            {isLoaded&&center.lat!=null?(<GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
            onLoad={onLoad}
            onUnmount={onUnmount}
            ></GoogleMap>):(<></>)}
        </div>
    )
}

export default HotelAdress