import { Fragment, useState } from "react";
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
        console.log(center)
    };

    const HandleClickItem = (est) => {
      navigate("/hotel/" + est.IdEstablecimiento, { state: {est, destination, date, options} });
    }

    if (!isOpen) return null;

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
                                        {data.map((item) => (
                                            <MarkerF
                                                key={item.IdEstablecimiento}
                                                position={{lat:item.Latitud, lng:item.Longitud}}
                                                onClick={() => handleActiveMarker(item.IdEstablecimiento, item.Latitud, item.Longitud)}
                                            >
                                                {activeMarker === item.IdEstablecimiento? (
                                                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                                        <div>
                                                            <p className="font-bold" >{item.Titulo}</p>
                                                            <button className="font-bold" onClick={()=>console.log("pulsado")}>Boton</button>
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
                    {/*<button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          onClick={onClose}
        >
          Cerrar
                      </button>*/}
                </div>
            </div>

        </div>
    );



    /*
      return (
        <Fragment>
          <div className="container">
            <h1 className="text-center">Vite + React | Google Map Markers</h1>
            <div style={{ height: "90vh", width: "100%" }}>
              {isLoaded ? (
                <GoogleMap
                  center={{ lat: -3.074127, lng: -79.069786 }}
                  zoom={10}
                  onClick={() => setActiveMarker(null)}
                  mapContainerStyle={{ width: "100%", height: "90vh" }}
                >
                  {markers.map(({ id, name, position }) => (
                    <MarkerF
                      key={id}
                      position={position}
                      onClick={() => handleActiveMarker(id)}
                      // icon={{
                      //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                      //   scaledSize: { width: 50, height: 50 }
                      // }}
                    >
                      {activeMarker === id ? (
                        <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                          <div>
                            <p>{name}</p>
                          </div>
                        </InfoWindowF>
                      ) : null}
                    </MarkerF>
                  ))}
                </GoogleMap>
              ) : null}
            </div>
          </div>
        </Fragment>);*/
}

export default MapScreen;