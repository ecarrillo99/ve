//import Navbar from "../../components/global_components/navbar/Navbar";
//import Footer from "../../components/global_components/footer/Footer";
//import HotelBanner from "../../components/hotel_components/hotelComponents/HotelBanner";
//import HotelGallery from "../../components/hotel_components/hotelComponents/HotelGallery";
//import HotelAdress from "../../components/hotel_components/hotelComponents/HotelAdress";
//import HotelDetails from "../../components/hotel_components/hotelComponents/HotelDetails2";
//import HotelContacts from "../../components/hotel_components/hotelComponents/HotelContacts";
import { useLocation, useParams } from 'react-router-dom';
import { getResultadoFiltro } from "../../controllers/establecimiento/establecimientoController";
import React, { Suspense, lazy, useEffect, useState } from "react";
//import HotelRecommended from "../../components/hotel_components/hotelComponents/HotelRecommended";
//import HotelOfertas from "../../components/hotel_components/hotelComponents/HotelOfertas";
import Filtro from "../../models/Filtro";
import { format } from "date-fns";
import NavbarMobile from '../../components/global_components/navbar/NavbarMobile';
//import SearchBar from "../../components/global_components/searchBar/searchBar";

const Navbar = lazy(() => import("../../components/global_components/navbar/Navbar"));
const Footer = lazy(() => import("../../components/global_components/footer/Footer"));
const HotelBanner = lazy(() => import("../../components/hotel_components/hotelComponents/HotelBanner"));
const HotelGallery = lazy(() => import("../../components/hotel_components/hotelComponents/HotelGallery"));
const HotelAdress = lazy(() => import("../../components/hotel_components/hotelComponents/HotelAdress"));
const HotelDetails = lazy(() => import("../../components/hotel_components/hotelComponents/HotelDetails2"));
const HotelContacts = lazy(() => import("../../components/hotel_components/hotelComponents/HotelContacts"));
const HotelRecommended = lazy(() => import("../../components/hotel_components/hotelComponents/HotelRecommended"));
const HotelOfertas = lazy(() => import("../../components/hotel_components/hotelComponents/HotelOfertas"));
const SearchBar = lazy(() => import("../../components/global_components/searchBar/searchBar"));



const Hotel = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [idHotel, setIdHotel] = useState(JSON.parse(decodeURIComponent(searchParams.get('id'))));
  const [establecimiento, setEstablecimiento] = useState();
  const [options, setOptions] = useState();
  const [date, setDate] = useState();
  const [destination, setDestination] = useState();
  const [openMap, setOpenMap]=useState();
  const [noches, setNoches] = useState();
  const [data, setData] = useState(null);
  const session = JSON.parse(localStorage.getItem("datos"));
  const nivel = session ? session.data.nivel : "visitante";
  const filtro = new Filtro();
  const {nombre}=useParams();
  const [clickRecomendados, setClickRecomendados]=useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil
  console.log(options)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  

  useEffect(() => {
    if (location.state && location.state.Establecimiento) {
      setEstablecimiento(location.state.Establecimiento);
      setOptions(location.state.options);
      setOpenMap(location.state.openMap!=null?location.state.openMap:false);
      setDate(location.state.date);
      setDestination(location.state.destination);
  
      // Calcula las noches directamente usando location.state.date
      const nochesCalculadas = Math.ceil(
        Math.abs(new Date(location.state.date[0].endDate)) - new Date(location.state.date[0].startDate)
      ) / (1000 * 60 * 60 * 24);
  
      setNoches(nochesCalculadas);
    } else {
      try {
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
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [location.state]);
  
  // Mueve el código de useEffect fuera del bloque else
  useEffect(() => {
    if(date){ 
      // Calcula las noches directamente usando location.state.date
      const nochesCalculadas = Math.ceil(
        Math.abs(new Date(date[0].endDate)) - new Date(date[0].startDate)
      ) / (1000 * 60 * 60 * 24);
  
      setNoches(nochesCalculadas);
      if(new Date(date[0].startDate)< new Date()){
        const fechaActual = new Date();
        const fechaNueva = new Date(fechaActual);
        fechaNueva.setDate(fechaActual.getDate() + nochesCalculadas);
        console.log(fechaActual)
        console.log(noches);
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
    establecimiento ? (
      <div>
        {
          isMobile
          ?<Suspense><NavbarMobile /></Suspense>
          :<Suspense><Navbar /></Suspense>
        }
        <div className="flex flex-col md:flex-row mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
          <div className="md:w-3/12 mr-5 mb-5">
            <Suspense><SearchBar
              type={2}
              Place={destination}
              Dates={date}
              Options={options} /></Suspense>
            <Suspense><HotelAdress Establecimiento={establecimiento} openMap={openMap} /></Suspense>
          </div>
          <div className="md:w-9/12">
            <div>
              <Suspense><HotelBanner Establecimiento={establecimiento} /></Suspense>
              <Suspense><HotelGallery Galeria={establecimiento.Galeria} /></Suspense>
            </div>
          </div>
        </div>
        <div className="flex mx-auto max-w-6xl py-0 sm:px-6 lg:px-8">
          <Suspense><HotelRecommended Establecimiento={establecimiento} Noches={noches} Adultos={options.adult} Ninos ={(options.children!=null?options.children:0)} SetRecomendados={setClickRecomendados} ></HotelRecommended></Suspense>
        </div>
        <div className="flex flex-col md:flex-row mx-auto max-w-6xl py-0 sm:px-6 lg:px-8">
          <div className="md:w-9/12 mt-5 mb-5">
            <Suspense><HotelDetails Establecimiento={establecimiento} /></Suspense>
          </div>
          <div className="flex flex-col md:w-3/12">
            {
              nivel=="suscriptor"
              ?<Suspense>
                <HotelContacts
                  Contactos={establecimiento.Contactos}
                  ContactosCentral={establecimiento.ContactosCentral}>
                </HotelContacts>
              </Suspense>
              :<></>
            }
          </div>
        </div>
        <div className="flex mx-auto max-w-6xl py-0 sm:px-6 lg:px-8 mb-20">
          <Suspense><HotelOfertas Establecimiento={establecimiento} Noches={noches} Fechas={date} Opciones={options} clickRecomendados={clickRecomendados} SetRecomendados={setClickRecomendados}></HotelOfertas></Suspense>
        </div>
        <Suspense><Footer /></Suspense>
      </div>) : (
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <img src="./img/web/logo_verde.png" style={{ width: "300px", height: "auto" }} />
        <div className="animate-spin w-16 h-16 border-t-4 border-greenVE-500 rounded-full"></div>
      </div>
    )
  );
};

export default Hotel;

