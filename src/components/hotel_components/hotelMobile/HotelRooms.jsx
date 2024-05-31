import React, { useEffect, useState,  } from 'react';
import { useNavigate } from "react-router-dom";

import HotelRoomItem from './HotelRoomItem';
import HotelContacts from './HotelContacts';
import BookAlert from './BookAlert';
import { set } from 'date-fns';


const HotelRooms = ({setOpenRooms, Establecimiento, date, options}) => {
    const [selectedRooms, setSelectedRooms]=useState(Array.from({ length: Establecimiento.Ofertas.length }, () => 0));
    const [openContacts, setOpenContacts]=useState(false);
    const [alertaVisitante, setAlertaVisitante]=useState(false)
    const [alertaGratuito, setAlertaGratuito]=useState(false)
    const [subtotal, setSubtotal]=useState(0);
    const [impuestos, setImpuestos]=useState(0);
    const [mensaje, setMensaje] = useState(0);
    const [openMensaje, setOpenMensaje] = useState(false);
    const navigate = useNavigate()
    const session = JSON.parse(localStorage.getItem("datos"));
    const nivel = session ? session.data.nivel : "visitante";
    var [adultos, setAdultos] = useState(0);
    var [ninos, setNinos] = useState(0);
    var [ninos, setNinos] = useState(0);
    var [adultos, setAdultos] = useState(0);

    useEffect(() => {
        setAdultos(0)
        setNinos(0);
        var subTemp = 0;
        var impTemp = 0;
        Establecimiento.Ofertas.forEach((item, index) => {
            subTemp += item.FinalSinImpuestos * selectedRooms[index];
            impTemp += item.Impuestos * selectedRooms[index];
            setAdultos(prevAdultos => prevAdultos + parseInt(item.Adultos) * selectedRooms[index]);
            setNinos(prevNinos => prevNinos + parseInt((item.Ninos !== "" && item.Ninos != null) ? item.Ninos : 0) * selectedRooms[index]);
        });
        setSubtotal(subTemp);
        setImpuestos(impTemp);
    }, [selectedRooms]);


    const handleClickHome=()=>{
        navigate("/")
    }  
    
    const handleClickReservar=()=>{
        if(nivel=='visitante'){
            setAlertaVisitante(true)
        }
        if(nivel=='gratuito'){
            setAlertaGratuito(true)
        }
        if(nivel=='suscriptor'){
            if(options.children!=0){
                if(ninos<options.children){
                  if(adultos>=(options.children+options.adult)){
                    setOpenContacts(true)
                  }else if (options.children>options.adult){
                    if ((ninos+adultos)>=(options.adult+options.children)){
                        setOpenContacts(true)
                    }if (options.adult<adultos){
                        setOpenMensaje(true);
                        setMensaje(`Todavia necesitas espacio para ${(options.children+options.adult)-adultos} ${((options.children+options.adult)-adultos)==1?"niño":"niños"}, selecciona más habitaciones para continuar.`)
                    }else{
                        setOpenMensaje(true);
                        setMensaje(`Todavia necesitas espacio para ${options.children-ninos} ${(options.children-ninos)==1?"niño":"niños"} ${(options.adult-adultos)>0?`y ${options.adult-adultos} ${(options.adult-adultos)==1?"adulto":"adultos"}`:""}, selecciona más habitaciones para continuar. `)
                    }
                  }else if (options.adult<=adultos){
                    setOpenMensaje(true);
                    setMensaje(`Todavia necesitas espacio para ${(options.children+options.adult)-adultos} ${((options.children+options.adult)-adultos)==1?"niño":"niños"}, selecciona más habitaciones para continuar.`)
                  }else{
                    setOpenMensaje(true);
                    setMensaje(`Todavia necesitas espacio para ${options.children-ninos} ${(options.children-ninos)==1?"niño":"niños"} ${(options.adult-adultos)>0?`y ${options.adult-adultos} ${(options.adult-adultos)==1?"adulto":"adultos"}`:""}, selecciona más habitaciones para continuar. `)
                  }
                }else if(ninos>=options.children||adultos>=options.adult){
                    setOpenContacts(true)
                }
              }else if(adultos>=options.adult){
                setOpenContacts(true)
              }else{
                setOpenMensaje(true);
                setMensaje(`Todavia necesitas espacio para ${options.adult-adultos} ${(options.adult-adultos)==1?"adulto":"adultos"}, selecciona más habitaciones para continuar.`)
              }
            
        }
    }

    return (
        <div className='bg-gray-200 h-screen w-full fixed top-0 left-0 z-50 overflow-y-auto pt-16'>
            <div className='flex py-1 mb-3 items-center  shadow-lg px-4 bg-white fixed z-50 w-full top-0'>
                <div onClick={() => setOpenRooms(false)} className='h-8 w-4 flex items-center justify-center text-3xl'>x</div>
                <div className='w-full'>
                    <div className='w-full text-center text-xl font-semibold text-greenVE-600'>Elige habitación</div>
                    <div className='w-full text-center text-sm font-medium text-greenVE-600'>{Establecimiento.Titulo}</div>
                </div>
                <span onClick={()=>handleClickHome()} className="icon-[tabler--home] h-6 w-6"></span>
            </div>
            {
                /*Establecimiento.Recomendados.length!=1||(Establecimiento.Recomendados.map(item => item.NumOfertas).some(num => num > 1))
                ?<div className='m-3  '>
                    <div className='p-3 bg-white border border-gray-300'>
                        <label className='font-semibold'>Recomendado para {options.adult==1?"1 adulto":options.adult+" adultos"}  {options.children!=0?options.children==1?" y 1 niño":" y "+options.children+" niños":""}</label>
                        <div className='flex flex-col gap-3'>
                            {
                                Establecimiento.Recomendados.map((item)=>(
                                    <div className='flex  justify-between'>
                                        <div className='flex flex-col'>
                                            <label>{item.NumOfertas} x {item.TituloOferta}</label>
                                            <label className='text-xs'>Desayuno incluido en el precio</label>
                                        </div>
                                        <div>
                                            <label className='font-semibold'>{item.NumOfertas} x US ${item.FinalSinImpuestos}</label>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='flex justify-between font-semibold mt-3 border-t pt-2'>
                            <label>Subtotal (sin impuestos)</label>
                            <label>US ${Establecimiento.PrecioSinImpuestos}</label>
                        </div>
                        <button className='w-full text-center bg-greenVE-500 rounded-md py-1 mt-3 text-white'>Reservar Recomendación</button>
                    </div>
                    <div className='mt-4 flex'>
                        <label className='text-center w-full'>O haz tu propia selección</label>
                    </div>
                </div>
                :<></>*/
            }
            <div className='p-3 flex flex-col gap-4  mb-20'>
                {
                    Establecimiento.Ofertas.map((item, index)=>(
                        <HotelRoomItem date={date} oferta={item} index={index} selectedRooms={selectedRooms} setSelectedRooms={setSelectedRooms}/>
                    ))
                }
            </div>
            {
                    alertaVisitante?<div className=' h-screen w-full fixed top-0 left-0 z-50'>
                        <div className='h-screen w-full flex items-center justify-center'>
                        <div className='bg-gray-600 h-screen w-full opacity-50 fixed'></div>
                            <div className='bg-white z-50 w-2/3 flex flex-col items-center gap-2'>
                                <label className='font-semibold text-xl'>No permitido</label>
                                <p className='text-center'>Debes iniciar sesión antes de realizar la reserva.</p>
                                <div className='flex w-full gap-2 m-3'>
                                    <button className='w-1/2 flex justify-center bg-red-500 rounded-md ml-2 py-1 text-white font-semibold' onClick={()=>setAlertaVisitante(false)}>Cancelar</button>
                                    <button className='w-1/2 flex justify-center bg-greenVE-400 py-1 mr-2 text-white font-semibold rounded-md' onClick={()=>navigate("/login")}>Aceptar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :<></>
            }
            {
                    alertaGratuito?<div className=' h-screen w-full fixed top-0 left-0 z-50'>
                        <div className='h-screen w-full flex items-center justify-center'>
                        <div className='bg-gray-600 h-screen w-full opacity-50 fixed'></div>
                            <div className='bg-white z-50 w-2/3 flex flex-col items-center gap-2'>
                                <label className='font-semibold text-xl'>No permitido</label>
                                <p className='text-center'>Las cuentas gratutas solo pueden reservar desde la app móvil.</p>
                                <div className='flex w-full gap-2 m-3'>
                                    <button className='w-1/2 flex justify-center bg-red-500 rounded-md ml-2 py-1 text-white font-semibold' onClick={()=>setAlertaGratuito(false)}>Cancelar</button>
                                    <button className='w-1/2 flex justify-center bg-greenVE-400 py-1 mr-2 text-white font-semibold rounded-md' onClick={()=>window.open("https://visitaecuador.page.link/XktS")}>Descargar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :<></>
            }
            {
                subtotal!=0
                ?<div className='fixed bottom-0 bg-white w-full pb-6 pt-2 border-t px-4 flex justify-between items-center'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-semibold'>US ${subtotal}</label>
                        <label className='text-sm '>US ${impuestos} de impuestos y cargos</label>
                    </div>
                    <button onClick={()=>handleClickReservar()} className='bg-greenVE-500 px-3 py-2 rounded-md text-white'>Reservar</button>
                </div>
                :<></>
            }
            {
                openContacts
                ?<HotelContacts setOpenContacts={setOpenContacts} Establecimiento={Establecimiento} options={options} date={date} seleccion={selectedRooms}/>
                :<></>
            }
            {
                openMensaje
                ?<BookAlert 
                    mensaje={mensaje} 
                    setOpenMensaje={setOpenMensaje} 
                    central = {Establecimiento.ContactosCentral.Whatsapp}
                    hotel = {Establecimiento.Titulo}
                    options={options}
                    date = {date}>
                </BookAlert>
                :<></>
            }
        </div>
    );
};

export default HotelRooms;