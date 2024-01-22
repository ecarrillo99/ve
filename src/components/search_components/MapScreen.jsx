import { Fragment, useEffect, useState } from "react";
import {
    GoogleMap,
    InfoWindowF,
    MarkerF,
    useLoadScript,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";


const MapScreen = ({ isOpen, onClose, data, destination, date, options }) => {
    const navigate = useNavigate();
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA6HUJy-ywbROEmCSK-Nx4-smVRLRVyR84",
    });

    const [activeMarker, setActiveMarker] = useState(null);
    const [center, setCenter]=useState({ lat: data[0].Latitud, lng: data[0].Longitud })

    const handleActiveMarker = (marker, latitud, longitud) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
        setCenter({ lat: latitud, lng: longitud })
    };

    const HandleClickItem = (est) => {
      navigate(`/hotel/${est.Titulo.toLowerCase().replaceAll(" - ","-").replaceAll(" ","-")}/?id=${est.IdEstablecimiento}&destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`, { state: {est, destination, date, options} });
    }

    

    if (!isOpen) {
        return null;
    }

    
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 transition-opacity" onClick={()=>{
                onClose()
                setActiveMarker(null)
            }}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="w-screen m-56 z-50 ">
                <div className=" flex justify-center mb-4">
                <button
                    className="h-10 w-10 bg-red-500  hover:bg-red-700 border-2  text-white rounded-full"
                    onClick={()=>{
                        onClose()
                        setActiveMarker(null)
                    }}>
                    X
                </button>
                </div>
                
                <div className="bg-white p-2 rounded-md">
                    <Fragment>
                        <div>
                            <div>
                                {isLoaded ? (
                                    <GoogleMap
                                        center={center}
                                        zoom={12}
                                        onClick={() => setActiveMarker(null)}
                                        mapContainerStyle={{ width: "100%", height: "75vh", borderRadius: "1%" }}
                                    >
                                        {data.map((item, index) => (
                                            <MarkerF
                                                key={item.IdEstablecimiento}
                                                position={{lat:item.Latitud, lng:item.Longitud}}
                                                onClick={() => handleActiveMarker(item.IdEstablecimiento, item.Latitud, item.Longitud)}>
                                                {activeMarker === item.IdEstablecimiento? (
                                                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                                        <div className="cursor-pointer" onClick={()=>HandleClickItem(item)}>
                                                            <p className="font-bold" >{item.Titulo}</p>
                                                            <div className="flex gap-1 justify-center items-center">
                                                              <label className="font-semibold">Desde:</label>
                                                              <p>${item.PrecioSinImpuestos}</p>
                                                            </div>
                                                        </div>
                                                    </InfoWindowF>
                                                ) : null}
                                            </MarkerF>
                                        ))}
                                    </GoogleMap>
                                ) : null}
                            </div>
                        </div>
                    </Fragment>
                </div>
            </div>

        </div>
    );
}

export default MapScreen;