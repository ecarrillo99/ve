import "./hotel.css";
import Navbar from "../../components/global_components/navbar/Navbar";
import Footer from "../../components/global_components/footer/Footer";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { es } from 'react-date-range/dist/locale/';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HotelSearch from "../../components/hotel_components/hotelSearch/HotelSearch";
import HotelBanner from "../../components/hotel_components/hotelComponents/HotelBanner";
import HotelGallery from "../../components/hotel_components/hotelComponents/HotelGallery";
import HotelAdress from "../../components/hotel_components/hotelComponents/HotelAdress";



const Hotel = () => {
  const handleClickAway = () => {
    if (openDate) {
      setOpenDate(false)
    }
    if (openOptions) {
      setOpenOptions(false)
    }
  };

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };


  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const location = useLocation();

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
  ];


  return (
    <div>
      <Navbar />
      <div className="flex mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        <div className="w-3/12  mr-5">
          <HotelSearch/>
          <HotelAdress/>
        </div>
        <div className="w-9/12">
          <div>
            <HotelBanner/>
            <HotelGallery/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Hotel;
