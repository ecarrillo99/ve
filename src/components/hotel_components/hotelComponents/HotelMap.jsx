import { Fragment, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";


const HotelMap = ({isOpen,item, onClose }) => {
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAwURL3bmODrFj1G0RUpgVT6DlGvlkhQzo',//"AIzaSyA6HUJy-ywbROEmCSK-Nx4-smVRLRVyR84",
  });

  const [center, setCenter] = useState({ lat: item.Latitud, lng: item.Longitud })

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 transition-opacity" onClick={() => {
        onClose()
      }}>
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
      </div>
      <div className="w-screen m-56 z-50 ">
        <div className=" flex justify-center mb-4">
          <button
            className="h-10 w-10 bg-red-500  hover:bg-red-700 border-2  text-white rounded-full"
            onClick={() => {
              onClose()
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
                    zoom={18}
                    mapContainerStyle={{ width: "100%", height: "75vh", borderRadius: "1%" }}
                  >
                    <MarkerF
                      key={item.IdEstablecimiento}
                      position={{ lat: item.Latitud, lng: item.Longitud }}
                    >
                      <InfoWindowF position={{ lat: item.Latitud, lng: item.Longitud }}>
                        <div>
                          <p className="font-bold">{item.Titulo}</p>
                          <div className="flex gap-1 justify-center items-center">
                            <label className="font-semibold">Desde:</label>
                            <p>${item.PrecioSinImpuestos}</p>
                          </div>
                        </div>
                      </InfoWindowF>
                    </MarkerF>
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

export default HotelMap;