import React, { Fragment, useEffect, useState } from 'react';
import Slider from "react-slider";
import BingMapsReact from "bingmaps-react";


const FilterBar = ({ handleOrderChange, selectedFiltro, minPrice, maxPrice, prices, setPrices, data, handleCheckBoxChange, checkboxStates }) => {
    const [openOrderBy, setOpenOrderBy] = useState(false);
    const [openMap, setOpenMap]=useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const handleChangeRadio = (event) => {
        setOpenOrderBy(false);
        handleOrderChange(event.target.value);
    }
    console.log("data")
    console.log(data&&data)
    const pinsList = data&&data.Establecimientos
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
            icon:"./img/web/pinMap.png",
             title: item.Titulo,
        },
    }));


    return (
        <>
            <div className='flex mt-10 justify-between border-b pb-2'>
                <div onClick={() => setOpenOrderBy(true)} className='flex justify-center w-1/3 gap-1 items-center'>
                    <span className="icon-[fluent--arrow-sort-24-filled] text-xl"></span>
                    <label>Ordenar</label>
                </div>
                <div onClick={() => setOpenFilter(true)} className='w-1/3 flex justify-center gap-1 items-center'>
                    <span className="icon-[fluent--options-20-filled] text-xl"></span>
                    <label>Filtrar</label>
                </div>
                <div onClick={()=>setOpenMap(true)} className='w-1/3 flex justify-center gap-1 items-center'>
                    <span className="icon-[fluent--map-16-regular] text-xl"></span>
                    <label>Mapa</label>
                </div>
            </div>
            {
                openOrderBy
                    ? <div>
                        <div onClick={() => setOpenOrderBy(false)} className='bg-gray-600 w-full h-screen fixed top-0 z-50 opacity-40' />
                        <div className='fixed w-full h-[60%] bottom-0 bg-white z-50 rounded-t-xl p-5 flex flex-col gap-4 '>
                            <div className='flex justify-between items-center'>
                                <label className='text-xl font-semibold'>Ordenar por</label>
                                <label onClick={() => setOpenOrderBy(false)} className='text-2xl '>x</label>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type="radio"
                                    value="0"
                                    checked={selectedFiltro === "0"}
                                    onChange={handleChangeRadio}
                                />
                                <label> Estrellas (Mayor a menor)</label>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type="radio"
                                    value="1"
                                    checked={selectedFiltro === "1"}
                                    onChange={handleChangeRadio}
                                />
                                <label> Estrellas (Menor a mayor)</label>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type="radio"
                                    value="2"
                                    checked={selectedFiltro === "2"}
                                    onChange={handleChangeRadio}
                                />
                                <label> Precio (Mayor a menor)</label>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type="radio"
                                    value="3"
                                    checked={selectedFiltro === "3"}
                                    onChange={handleChangeRadio}
                                />
                                <label> Precio (Menor a mayor)</label>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type="radio"
                                    value="4"
                                    checked={selectedFiltro === "4"}
                                    onChange={handleChangeRadio}
                                />
                                <label> Establecimiento (A - Z)</label>
                            </div>
                            <div className='flex gap-2'>
                                <input
                                    type="radio"
                                    value="5"
                                    checked={selectedFiltro === "5"}
                                    onChange={handleChangeRadio}
                                />
                                <label> Establecimiento (Z - A)</label>
                            </div>
                        </div>
                    </div>
                    : <></>
            }
            {
                openFilter
                    ? <div className={`h-screen w-full bg-white fixed top-0 z-50 `}>
                        <div className='flex justify-between items-center px-5 py-1 shadow-lg'>
                            <label onClick={() => setOpenFilter(false)} className='text-2xl text-greenVE-500'>x</label>
                            <label className='font-bold w-full text-center'>Filtros</label>
                            {/*<label className='text-sm font-semibold text-gray-400'>Borrar</label>*/}
                        </div>
                        <div className='h-screen overflow-y-auto'>
                            <div className="border-b p-2 ">
                                <h2 className="font-bold text-base mx-2">Precio</h2>
                                <div className="px-3 py-4">
                                    <div className="flex justify-between pb-2 text-sm">
                                        <p>Min. ${Math.round(parseFloat(prices[0]))}</p>
                                        <p>Max. ${Math.round(parseFloat(prices[1]))}</p>
                                    </div>
                                    <Slider
                                        className="w-full h-1.5 rounded-full bg-gray-300 z-20 "
                                        trackClassName="h-2 rounded-full overflow-hiden relative "
                                        trackOneClassName="h-2 rounded-full overflow-hiden relative bg-greenVE-500 "
                                        thumbClassName="w-6 h-6 cursor-pointer bg-greenVE-500 border-2 border-white rounded-full -mt-2"
                                        onChange={
                                            setPrices
                                        }
                                        value={prices}
                                        min={minPrice}
                                        max={maxPrice} />
                                </div>
                            </div>
                            <div className='mx-2'>
                                {
                                    data ? (
                                        <div className="flex flex-col">
                                            <div className="border-b p-2">
                                                {
                                                    data.Servicios && (
                                                        <div className="flex flex-col">
                                                            <h2 className="font-bold text-base">Servicios del hotel</h2>
                                                            {
                                                                data.Servicios.map((item) => (
                                                                    <div class="flex items-center mb-4">
                                                                        <input onChange={() => handleCheckBoxChange(item.Valor)} checked={checkboxStates[item.Valor]} id="default-checkbox" type="checkbox" value="" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">{item.Titulo}</label>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="border-b p-2">
                                                {
                                                    data.ServiciosHab && (
                                                        <div className="flex flex-col">
                                                            <h2 className="font-bold text-base">Servicios de habitación</h2>
                                                            {
                                                                data.ServiciosHab.map((item) => (
                                                                    <div class="flex items-center mb-4">
                                                                        <input onChange={() => handleCheckBoxChange(item.Valor)} checked={checkboxStates[item.Valor]} id="default-checkbox" type="checkbox" value="" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">{item.Titulo}</label>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            <div className="border-b p-2 pb-24 ">
                                                {
                                                    data.Incluye && (
                                                        <div className="flex flex-col">
                                                            <h2 className="font-bold text-base">Incluye</h2>
                                                            {
                                                                data.Incluye.map((item) => (
                                                                    <div class="flex items-center mb-4">
                                                                        <input onChange={() => handleCheckBoxChange(item.Valor)} checked={checkboxStates[item.Valor]} id="default-checkbox" type="checkbox" value="" class="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 ">{item.Titulo}</label>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    ) : <></>
                                }
                            </div>
                        </div>
                        <div className='flex border-t justify-between items-center px-5 py-1 shadow-2xl z-50 fixed bottom-0 bg-white w-full '>
                            <button onClick={()=>setOpenFilter(false)} className='bg-greenVE-400 text-white font-semibold w-full py-2 my-2'>Mostrar Resultados</button>
                        </div>
                    </div>
                    : <></>
            }
            {
               (openMap&&data)&&<div className='w-full h-screen fixed top-0 bg-white z-50'>
                <div onClick={()=>setOpenMap(false)} className='fixed z-50 top-3 left-3 text-2xl pb-1  bg-white border-2 w-9 h-9 flex justify-center items-center border-red-600 rounded-full'>
                    x
                </div>
               <Fragment>
                   <div>
                       <div>
                           <BingMapsReact
                               bingMapsKey="AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z"
                               height="100vh"
                               //pushPins={pinsList}
                               pushPinsWithInfoboxes={pinsList}
                               viewOptions={{
                                   center: { latitude: data.Establecimientos[0].Latitud, longitude: data.Establecimientos[0].Longitud },
                                   zoom: 12,
                                   mapTypeId: "road",
                               }}
                           />
                       </div>
                   </div>
               </Fragment>
           </div>
            }
        </>
    );
};

export default FilterBar;