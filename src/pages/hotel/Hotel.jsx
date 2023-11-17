import "./hotel.css";
import Navbar from "../../components/global_components/navbar/Navbar";
import Footer from "../../components/global_components/footer/Footer";
import HotelSearch from "../../components/hotel_components/hotelSearch/HotelSearch";
import HotelBanner from "../../components/hotel_components/hotelComponents/HotelBanner";
import HotelGallery from "../../components/hotel_components/hotelComponents/HotelGallery";
import HotelAdress from "../../components/hotel_components/hotelComponents/HotelAdress";
import HotelDetails from "../../components/hotel_components/hotelComponents/HotelDetails2";
import HotelContacts from "../../components/hotel_components/hotelComponents/HotelContacts";
import HotelReservation from "../../components/hotel_components/hotelComponents/HotelReservation";
import { useLocation, useParams } from 'react-router-dom';
import { getDetalleOferta } from "../../controllers/establecimiento/establecimientoController";
import React, { useEffect, useState } from "react";
import HotelRecommended from "../../components/hotel_components/hotelComponents/HotelRecommended";
import HotelOfertas from "../../components/hotel_components/hotelComponents/HotelOfertas";



const Hotel = () => {
  const location = useLocation();
  const [establecimiento, setEstablecimiento] = useState(location.state.Establecimiento);
  const [options, setOptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);
  const [destination, setDestination] = useState(location.state.destination);
  const [noches, setNoches]=useState(Math.ceil(Math.abs(new Date(date[0].endDate)) - new Date(date[0].startDate))/ (1000 * 60 * 60 * 24));
  console.log("Hola", date[0].endDate)
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        getDetalleOferta(id)
          .then((result)=>{
            if(result){
              console.log(result)
              setData(result);
            }
          })
        
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    establecimiento?
    (<div>
      <Navbar />
      <div className="flex mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        <div className="w-3/12  mr-5">
          <HotelSearch
            Place={destination}
            Dates={date}
            Options={options}/>
          <HotelAdress Establecimiento={establecimiento}/>
        </div>
        <div className="w-9/12">
          <div>
            <HotelBanner Establecimiento={establecimiento}/>
            <HotelGallery Galeria={establecimiento.Galeria}/>
          </div>
        </div>
      </div>
      <div className="flex mx-auto max-w-6xl py-0 sm:px-6 lg:px-8">
        <HotelRecommended Establecimiento={establecimiento} Noches={noches}  Personas={options.adult}></HotelRecommended>
      </div>
      <div className="flex mx-auto max-w-6xl py-0 sm:px-6 lg:px-8">
      
        <div className="w-9/12 mt-5">
        <HotelDetails Establecimiento={establecimiento}/>
        </div>
        <div className="flex flex-col gap-4 w-3/12">
          <HotelContacts
            Contactos={establecimiento.Contactos}
            ContactosCentral={establecimiento.ContactosCentral}>
          </HotelContacts>
        </div>
      </div>
      <div className="flex mx-auto max-w-6xl py-0 sm:px-6 lg:px-8 mb-20">
        <HotelOfertas Establecimiento={establecimiento} Noches={noches}></HotelOfertas>
      </div>
     
      <Footer />
    </div>):
    (<div className="h-screen w-screen flex flex-col justify-center items-center">
      <img src="/img/logo_verde.png" style={{width: "300px", height: "auto"}} />
      <div class="animate-spin w-16 h-16 border-t-4 border-greenVE-500 rounded-full"></div>
    </div>)
    
  );
};

export default Hotel;
