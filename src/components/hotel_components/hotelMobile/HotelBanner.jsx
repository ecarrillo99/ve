import React, { useState } from 'react';
import { Galleria } from 'primereact/galleria';
import HotelServices from './HotelServices';

const HotelBanner = ({ Titulo, Galeria, Incluye, NoIncluye, Restricciones, SistemaServicios, Catalogacion }) => {
    const [openServices, setOpenServices] = useState()
    var images = []
    Galeria.forEach((item) => {
        images.push(
            {
                itemImageSrc: item["Valor"],
                thumbnailImageSrc: item["Valor"],
                alt: 'Description for Image 1',
                title: 'Title 1'
            },
        );
    });

    const itemTemplate = (item) => {
        return <img className='w-[1000px] object-cover h-[188px]' src={item.itemImageSrc} />
    }

    const thumbnailTemplate = (item) => {
        return <img className='w-36 object-cover h-[60px]  pl-1' src={item.thumbnailImageSrc} />
    }
    return (
        <div >
            <style>{`
                .p-galleria-thumbnail-container {
                    height: 12rem; /* Aquí puedes especificar la altura deseada */
                }`
            }
            </style>
            <Galleria className='mx-3 mt-3' value={images} numVisible={3} item={itemTemplate} thumbnailsPosition={"right"} thumbnail={thumbnailTemplate}
                circular autoPlay transitionInterval={3000} showThumbnailNavigators={false} />
            <div className='mt-4 gap-3 flex overflow-x-auto whitespace-no-wrap mx-3'>
                <div className='flex flex-col items-center gap-2'>
                    <div className='h-12 w-12 bg-greenVE-500 rounded-full flex items-center justify-center'>
                        <span className="icon-[mdi--coffee-outline] h-6 w-6 text-white"></span>
                    </div>
                    <div className='text-center text-xxs w-20 leading-tight'>Desayuno Incluido</div>
                </div>
                {
                    Incluye.filter(item => !item.Titulo.toLowerCase().includes("desayuno")).map((item) => (
                        <div className='flex flex-col items-center gap-2'>
                            <div className='h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center'>
                                {
                                    item.Titulo.toLowerCase().includes("bebida")
                                        ? <span className="icon-[tdesign--drink] h-7 w-7"></span>
                                        : item.Titulo.toLowerCase().includes("calefac")
                                            ? <span className="icon-[material-symbols--air-rounded] h-7 w-7"></span>
                                            : item.Titulo.toLowerCase().includes("gimnasio")
                                                ? <span className="icon-[ph--barbell] h-7 w-7"></span>
                                                : item.Titulo.toLowerCase().includes("jacuzzi")
                                                    ? <span className="icon-[material-symbols--bathtub-outline-rounded] h-7 w-7"></span>
                                                    : item.Titulo.toLowerCase().includes("parqueo")
                                                        ? <span className="icon-[mdi--parking] h-7 w-7"></span>
                                                        : item.Titulo.toLowerCase().includes("piscina")
                                                            ? <span className="icon-[material-symbols--pool] h-7 w-7"></span>
                                                            : item.Titulo.toLowerCase().includes("sauna")
                                                                ? <span className="icon-[material-symbols--sauna-rounded] h-7 w-7"></span>
                                                                : item.Titulo.toLowerCase().includes("mascota")
                                                                    ? <span className="icon-[ph--paw-print-bold] h-7 w-7"></span>
                                                                    : item.Titulo.toLowerCase().includes("snack")
                                                                        ? <span className="icon-[ph--popcorn] h-7 w-7"></span>
                                                                        : item.Titulo.toLowerCase().includes("tour")
                                                                            ? <span className="icon-[icon-park-outline--tour-bus] h-7 w-7"></span>
                                                                            : item.Titulo.toLowerCase().includes("transfer")
                                                                                ? <span className="icon-[ic--outline-airplanemode-active] h-7 w-7"></span>
                                                                                : item.Titulo.toLowerCase().includes("turco")
                                                                                    ? <span className="icon-[material-symbols--sauna-rounded] h-7 w-7"></span>
                                                                                    : item.Titulo.toLowerCase().includes("instalacion")
                                                                                        ? <span className="icon-[material-symbols--park-outline] h-7 w-7"></span>
                                                                                        : item.Titulo.toLowerCase().includes("wireless")
                                                                                            ? <span className="icon-[material-symbols--wifi] h-7 w-7"></span>
                                                                                            : <span className="icon-[fluent--service-bell-16-regular] h-7 w-7"></span>
                                }
                            </div>
                            <div className='text-center text-xxs w-20 leading-tight'>{item.Titulo}</div>
                        </div>
                    ))
                }
                <div onClick={() => setOpenServices(true)} className='flex flex-col items-center gap-2'>
                    <div className='h-12 w-12 bg-greenVE-200 rounded-full flex items-center justify-center'>
                        <span className="icon-[material-symbols--more-horiz] text-greenVE-500 w-full h-14"></span>
                    </div>
                    <div className='text-center text-xxs w-20 leading-tight '>Más</div>
                </div>
            </div>
            {
                openServices ? <HotelServices
                    Titulo={Titulo}
                    Incluye={Incluye}
                    NoIncluye={NoIncluye}
                    Restricciones={Restricciones}
                    SistemaServicios={SistemaServicios}
                    setOpenServices={setOpenServices}
                /> : <></>}
            <div className='border-y py-1 mt-4 px-3'>
                <div className='text-lg font-semibold'>{Titulo}</div>
                {Array(parseInt(Catalogacion)).fill(null).map((item, index) => (
                    <span className="icon-[fluent--star-16-filled] text-amber-500 h-5 w-5"></span>
                ))}
            </div>
        </div>
    );
};

export default HotelBanner;