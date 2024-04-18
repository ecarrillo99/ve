import React, { Fragment } from 'react';
import BingMapsReact from "bingmaps-react";


const HotelMap = ({Latitud, Longitud, Direccion, Titulo, PrecioSinImpuestos}) => {
    const pinsList=[
        {
            pin:{
                latitude: Latitud,
                longitude: Longitud,
                title: Titulo,
            },
            infobox: {
                title: Titulo,
                description: "Precios desde: $"+PrecioSinImpuestos
              },
            center: {
              latitude: Latitud,
              longitude: Longitud,
            },
            options: {
                icon:"./img/web/pinMap.png",
                 title: Titulo,
            },
        }
    ]
    return (
        <div className='p-3 z-0'>
                   <div >
                       <div className="relative border border-gray-300 z-10">
                           <BingMapsReact
                               bingMapsKey="AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z"
                               height="160px"
                               style={{ zIndex: 1 }}
                               //pushPins={pinsList}
                               pushPinsWithInfoboxes={pinsList}
                               viewOptions={{
                                   center: { latitude: Latitud, longitude: Longitud },
                                   zoom: 12,
                                   mapTypeId: "road",
                               }}
                           />
                       </div>
                   </div>
            <div className='flex gap-2 items-center pt-3'>
                <span className="icon-[ic--outline-place] h-5 w-5"></span>
                <label >{Direccion}</label>
            </div>
        </div>
    );
};

export default HotelMap;