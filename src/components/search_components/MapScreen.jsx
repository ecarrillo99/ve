import { Fragment, useState } from "react";
import {
    GoogleMap,
    InfoWindowF,
    MarkerF,
    useLoadScript,
} from "@react-google-maps/api";

const markers = [
    {
        id: 1,
        name: "Qobustan",
        position: { lat: -3.074127, lng: -79.069786 },
    },
    {
        id: 2,
        name: "Sumqayit",
        position: { lat: -2.920186, lng: -79.01461 },
    },
    {
        id: 3,
        name: "Baku",
        position: { lat: -2.889973, lng: -79.031883 },
    }
];

const MapScreen = ({ isOpen, onClose, data }) => {
    console.log(data[0].Establecimiento)
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA6HUJy-ywbROEmCSK-Nx4-smVRLRVyR84",
    });

    const [activeMarker, setActiveMarker] = useState(null);

    const handleActiveMarker = (marker) => {
        if (marker === activeMarker) {
            return;
        }
        setActiveMarker(marker);
    };

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
                                        center={{ lat: data[0].Establecimiento.Latitud, lng: data[0].Establecimiento.Longitud }}
                                        zoom={10}
                                        onClick={() => setActiveMarker(null)}
                                        mapContainerStyle={{ width: "100%", height: "75vh", borderRadius: "1%" }}
                                    >
                                        {data.map((item) => (
                                            <MarkerF
                                                key={item.Establecimiento.Titulo}
                                                position={{lat:item.Establecimiento.Latitud, lng:item.Establecimiento.Longitud}}
                                                onClick={() => handleActiveMarker(item.Establecimiento.Titulo)}
                                            // icon={{
                                            //   url:"https://t4.ftcdn.net/jpg/02/85/33/21/360_F_285332150_qyJdRevcRDaqVluZrUp8ee4H2KezU9CA.jpg",
                                            //   scaledSize: { width: 50, height: 50 }
                                            // }}
                                            >
                                                {activeMarker === item.Establecimiento.Titulo? (
                                                    <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                                        <div>
                                                            <p>{item.Establecimiento.Titulo}</p>
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