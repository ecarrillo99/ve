import React, { Suspense, lazy, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Filtro from '../../models/Filtro';
import { format } from 'date-fns';
import { getResultadoFiltro } from '../../controllers/establecimiento/establecimientoController';

const NavbarMobile = lazy(()=>import('../../components/global_components/navbar/NavbarMobile'))
const Footer = lazy(()=>import('../../components/global_components/footer/Footer'))
const HotelBanner = lazy(()=>import('../../components/hotel_components/hotelMobile/HotelBanner'))
const HotelSearch = lazy(()=>import('../../components/hotel_components/hotelMobile/HotelSearch'))
const HotelMap = lazy(()=>import('../../components/hotel_components/hotelMobile/HotelMap'))
const HotelServicesMain = lazy(()=>import('../../components/hotel_components/hotelMobile/HotelServicesMain'))
const HotelDescription = lazy(()=>import('../../components/hotel_components/hotelMobile/HotelDescription'))



const HotelMobile = () => {
    const location = useLocation(); // Declarar location primero
    const searchParams = new URLSearchParams(location.search);
    const [options, setOptions] = useState();
    const [date, setDate] = useState();
    const {nombre}=useParams();
    const [destination, setDestination] = useState();
    const [idHotel, setIdHotel] = useState(JSON.parse(decodeURIComponent(searchParams.get('id'))));
    const [Establecimiento, setEstablecimiento] = useState();

    useEffect(() => {
        if (location.state && location.state.Establecimiento) {
            
            setEstablecimiento(location.state.Establecimiento)
            setOptions(location.state.options);
            setDate(location.state.date);
            setDestination(location.state.destination);
        } else {
            try{
                const parsedOptions = JSON.parse(decodeURIComponent(searchParams.get('opciones')));
                const fechas = JSON.parse(decodeURIComponent(searchParams.get('fechas')))
                const dateTmp = [{
                startDate: new Date(fechas[0].startDate),
                endDate: new Date(fechas[0].endDate),
                key: new Date(fechas.key)
                }]
                const parsedDestination = JSON.parse(decodeURIComponent(searchParams.get('destino')));
        
                setOptions(parsedOptions);
                setDate(dateTmp);
                setDestination(parsedDestination);
            }catch(e){

            }
        }
    }, [location.state]);

    useEffect(() => {
        if(date){ 
        var filtro= new Filtro();
          // Calcula las noches directamente usando location.state.date
          const nochesCalculadas = Math.ceil(
            Math.abs(new Date(date[0].endDate)) - new Date(date[0].startDate)
          ) / (1000 * 60 * 60 * 24);
      
          if(new Date(date[0].startDate)< new Date()){
            const fechaActual = new Date();
            const fechaNueva = new Date(fechaActual);
            fechaNueva.setDate(fechaActual.getDate() + nochesCalculadas);
            console.log(fechaActual)
            console.log(fechaNueva)
            const dateTmp = [{
              startDate: fechaActual,
              endDate: fechaNueva,
              key: new Date(date.key)
            }]
            setDate(dateTmp)
          }
          filtro.IdDestino = destination.Id;
          filtro.TipoDestino = destination.Tipo;
          filtro.txtBusqueda = nombre.replaceAll("-", " ");
          filtro.IdEstablecimiento=idHotel;
          filtro.Fechas = {
            inicio: `${format(date[0].startDate, "yyyy-MM-dd")}`,
            fin: `${format(date[0].endDate, "yyyy-MM-dd")}`
          };
          filtro.Pax = {
            adultos: options.adult,
            ninos: options.children,
            edadninos: options.childrenAges
          };
          
          getResultadoFiltro(filtro).then((result) => {
            if (result) {
              if(result==401){
                localStorage.removeItem("datos");
                window.location.reload();
              }else{
                setEstablecimiento(result.Establecimientos[0])
              }
            }
          });
        }
          
      }, [destination]);

    return (
        (Establecimiento)
        ?<div>
            <Suspense><NavbarMobile/></Suspense>
            <Suspense><HotelBanner 
                Titulo={Establecimiento.Titulo}
                Catalogacion={Establecimiento.Catalogacion}
                Galeria={Establecimiento.Galeria} 
                Incluye={Establecimiento.Incluye}
                NoIncluye={Establecimiento.NoIncluye}
                Restricciones={Establecimiento.Restricciones}
                SistemaServicios={Establecimiento.SistemaServicios}
            /></Suspense>
            <div className='h-3 bg-gray-200'/>
            <Suspense><HotelSearch date={date} options={options} Establecimiento={Establecimiento}/></Suspense>
            <div className='h-3 bg-gray-200'/>
            <Suspense>
                <HotelMap className="z-10" Latitud={Establecimiento.Latitud} Longitud={Establecimiento.Longitud} Direccion={Establecimiento.Direccion} Titulo={Establecimiento.Titulo} PrecioSinImpuestos={Establecimiento.PrecioSinImpuestos}/>
            </Suspense>
            <div className='h-3 bg-gray-200'/>
            <Suspense>
                <HotelServicesMain
                    Titulo={Establecimiento.Titulo}
                    Incluye={Establecimiento.Incluye}
                    NoIncluye={Establecimiento.NoIncluye}
                    Restricciones={Establecimiento.Restricciones}
                    SistemaServicios={Establecimiento.SistemaServicios}
                />
            </Suspense>
            <div className='h-3 bg-gray-200'/>
            <Suspense><HotelDescription Descripcion={Establecimiento.Descripcion}/></Suspense>
            <Suspense><Footer/></Suspense>
        </div>
        :
          <div className="h-screen w-screen flex flex-col justify-center items-center">
            <img src="./img/web/logo_verde.png" style={{ width: "200px", height: "auto" }} />
            <div className="animate-spin w-14 h-14 border-t-4 border-greenVE-500 rounded-full"></div>
          </div>
    );
};

export default HotelMobile;