import "./hotel.css";
import Navbar from "../../components/global_components/navbar/Navbar";
import Footer from "../../components/global_components/footer/Footer";
import HotelSearch from "../../components/hotel_components/hotelSearch/HotelSearch";
import HotelBanner from "../../components/hotel_components/hotelComponents/HotelBanner";
import HotelGallery from "../../components/hotel_components/hotelComponents/HotelGallery";
import HotelAdress from "../../components/hotel_components/hotelComponents/HotelAdress";
import HotelDetails from "../../components/hotel_components/hotelComponents/HotelDetails";
import HotelContacts from "../../components/hotel_components/hotelComponents/HotelContacts";
import HotelReservation from "../../components/hotel_components/hotelComponents/HotelReservation";
import { useParams } from 'react-router-dom';
import { getDetalleOferta } from "../../controllers/establecimiento/establecimientoController";
import React, { useEffect, useState } from "react";



const Hotel = () => {
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
    data?
    (<div>
      <Navbar />
      <div className="flex mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        <div className="w-3/12  mr-5">
          <HotelSearch/>
          <HotelAdress oferta={data}/>
        </div>
        <div className="w-9/12">
          <div>
            <HotelBanner oferta={data}/>
            <HotelGallery oferta={data}/>
          </div>
        </div>
      </div>
      <div className="flex mx-auto max-w-6xl py-0 sm:px-6 lg:px-8">
        <div className="w-9/12">
        <HotelDetails oferta={data}/>
        </div>
        <div className="flex flex-col gap-4 w-3/12">
        <HotelReservation/>
        <HotelContacts/>
        </div>
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
