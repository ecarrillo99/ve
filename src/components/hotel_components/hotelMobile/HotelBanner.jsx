import React, { useState } from 'react';
import { Galleria } from 'primereact/galleria';
import HotelServices from './HotelServices';
import { ClickAwayListener } from "@material-ui/core";
import { changeFavoritoStatus, shareHotel } from '../../../controllers/establecimiento/establecimientoController';

const HotelBanner = ({ Titulo, Galeria, Incluye, NoIncluye, Restricciones, SistemaServicios, Catalogacion, esFavorito, IdEstablecimiento }) => {

    const [openServices, setOpenServices] = useState()
    const session = JSON.parse(localStorage.getItem("datos"));
    const nivel = session ? session.data.nivel : "visitante";
    const [isLoading, setIsLoading] = useState(false)
    const [favorito, setFavorito] = useState(esFavorito)
    const [viewShare, setViewShare] = useState(false);
    const [shortUrl, setShortUrl] = useState();
    const [isCopied, setIsCopied] = useState(false);
    const [loadingShare, setLoadingShare] = useState(false);
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

    const handleClickAwayShare = () => {
        setIsCopied(false);
        setViewShare(false);
    }

    const handleClickWhatsapp = () => {
        const message = encodeURIComponent("Descubre las ofertas de " + Titulo + " en VisitaEcuador.com ingresando aquí: " + shortUrl);
        const whatsappURL = `https://wa.me/?text=${message}`;
        window.open(whatsappURL);
    }

    const handleClickCopy = () => {
        navigator.clipboard.writeText(shortUrl);
        setIsCopied(true);
    }

    const handleClickShare = () => {
        setLoadingShare(true)
        if (shortUrl == null) {
            shareHotel("insertar", window.location.href).then((result) => {
                if (result) {
                    setViewShare(true);
                    setShortUrl(window.location.origin + "/short/" + result);
                    setLoadingShare(false)
                } else {
                    setLoadingShare(false)
                }
            })
        } else {
            setViewShare(true);
            setLoadingShare(false)
        }
    }


    const itemTemplate = (item) => {
        return <img className='w-[1000px] object-cover h-[188px]' src={item.itemImageSrc} />
    }

    const thumbnailTemplate = (item) => {
        return <img className='w-36 object-cover h-[60px]  pl-1' src={item.thumbnailImageSrc} />
    }

    const handleClickFav = () => {
        if (!isLoading) {
            setIsLoading(true)
            changeFavoritoStatus(IdEstablecimiento, !favorito).then((res) => {
                if (res) {
                    if (res === 401) {
                        localStorage.removeItem("datos")
                        window.location.reload();
                    } else {
                        setFavorito(!favorito);
                        setIsLoading(false);
                    }
                } else {
                    setIsLoading(false)
                }
            })
        }
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

            <div className='border-y py-1 mt-4 px-3 flex  justify-between items-center'>
                <div>
                    <div className='text-lg font-semibold'>{Titulo}</div>
                    {Array(parseInt(Catalogacion)).fill(null).map((item, index) => (
                        <span className="icon-[fluent--star-16-filled] text-amber-500 h-5 w-5"></span>
                    ))}
                </div>
                <div className='pt-1 flex gap-2'>
                    {
                        (nivel !== "visitante") && (
                            <div className="" onClick={(e) => {
                                e.stopPropagation();
                                handleClickFav();
                            }}>
                                {
                                    isLoading
                                        ? <div className="w-5 h-5 border-l-2 border-t-2  border-blue-500 border-solid rounded-full animate-spin"></div>
                                        : (favorito
                                            ? <span className="icon-[ant-design--heart-filled] h-7 w-7 text-red-500"></span>
                                            : <span className="icon-[ant-design--heart-outlined] h-7 w-7"></span>)
                                }
                            </div>
                        )
                    }
                    {
                        loadingShare
                        ?<div className="w-6 h-6 border-l-2 border-t-2 border-blue-500 border-solid rounded-full animate-spin"></div>
                        :<span onClick={()=>handleClickShare()} className="icon-[ph--share-network-duotone] h-7 w-7 text-greenVE-600"></span>
                        }
                    {
                        viewShare
                        && <ClickAwayListener onClickAway={handleClickAwayShare}>
                            <div className="absolute  h-[110px] flex bg-white border mt-[40px] z-50 flex-col shadow-lg  rounded-md right-0" >
                                <label className="font-semibold p-2">Compartir este alojamiento</label>
                                {
                                    !isCopied
                                        ?
                                        <div className="flex items-center pl-2 gap-2" onClick={() => handleClickCopy()}>
                                            <svg className="h-6 w-6 " viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M21 8C21 6.34315 19.6569 5 18 5H10C8.34315 5 7 6.34315 7 8V20C7 21.6569 8.34315 23 10 23H18C19.6569 23 21 21.6569 21 20V8ZM19 8C19 7.44772 18.5523 7 18 7H10C9.44772 7 9 7.44772 9 8V20C9 20.5523 9.44772 21 10 21H18C18.5523 21 19 20.5523 19 20V8Z" fill="#0F0F0F"></path> <path d="M6 3H16C16.5523 3 17 2.55228 17 2C17 1.44772 16.5523 1 16 1H6C4.34315 1 3 2.34315 3 4V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V4C5 3.44772 5.44772 3 6 3Z" fill="#0F0F0F"></path> </g></svg>
                                            <label className="text-sm">Copiar enlace</label>
                                        </div>
                                        :
                                        <div className="flex items-center pl-2 gap-2" onClick={() => handleClickCopy()}>
                                            <svg className="h-6 w-6" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#95c01f"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="12" cy="12" r="10" stroke="#96c021" stroke-width="1.5"></circle> <path d="M8.5 12.5L10.5 14.5L15.5 9.5" stroke="#96c021" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                            <label className="text-sm text-greenVE-500">Enlace copiado</label>
                                        </div>
                                }
                                <div className="h-2"></div>
                                <div className="flex items-center pl-2 gap-2" onClick={() => handleClickWhatsapp()}>
                                    <svg className="h-6 w-6" fill="#000000" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>whatsapp</title> <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z"></path> </g></svg>
                                    <label className="text-sm">Enviar por Whatsapp</label>
                                </div>
                            </div>
                        </ClickAwayListener>

                    }
                </div>
            </div>
        </div>
    );
};

export default HotelBanner;