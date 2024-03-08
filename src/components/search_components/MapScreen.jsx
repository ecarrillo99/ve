import { Fragment, useEffect, useState } from "react";
import {
    GoogleMap,
    InfoWindowF,
    MarkerF,
    useLoadScript,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import BingMapsReact from "bingmaps-react";


const MapScreen = ({ isOpen, onClose, data, destination, date, options }) => {
    const navigate = useNavigate();
    const pinsList = data
      .filter(item => item.Latitud != null && item.Latitud !== "")
      .map(item => ({
        pin:{
            latitude: item.Latitud,
            longitude: item.Longitud,
            title: item.Titulo,
        },
        infobox: {
            title: item.Titulo,
            description: "Precios desde: $"+item.PrecioSinImpuestos
          },
        center: {
          latitude: item.Latitud,
          longitude: item.Longitud,
        },
        options: {
            icon:"./img/pinMap.png",
             title: item.Titulo,
        },
    }));

    const handleClickpin = (item) => {
        console.log("Pin clickeado:", item);
        // Aquí puedes hacer lo que necesites con el pin clickeado
    }

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 transition-opacity" onClick={() => onClose()}>
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div className="w-screen m-56 z-50 ">
                <div className=" flex justify-center mb-4">
                    <button
                        className="h-10 w-10 bg-red-500 hover:bg-red-700 border-2 text-white rounded-full"
                        onClick={() => onClose()}>
                        X
                    </button>
                </div>
                <div className="bg-white p-2 rounded-md">
                    <Fragment>
                        <div>
                            <div>
                                <BingMapsReact
                                    bingMapsKey="AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z"
                                    height="500px"
                                    //pushPins={pinsList}
                                    pushPinsWithInfoboxes={pinsList}
                                    viewOptions={{
                                        center: { latitude: data[0].Latitud, longitude: data[0].Longitud },
                                        zoom: 12,
                                        mapTypeId: "road",
                                    }}
                                />
                            </div>
                        </div>
                    </Fragment>
                </div>
            </div>
        </div>
    );
}

export default MapScreen;
