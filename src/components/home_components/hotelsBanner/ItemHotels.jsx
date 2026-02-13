import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ItemHotels = ({ hotel }) => {
    const navigate = useNavigate();
    const date=[{
            startDate: new Date(),
            endDate: new Date().setDate(new Date().getDate() + 1),
            key: "selection",
        }];

    const options={
            adult: 1,
            children: 0,
            childrenAges: [],
            room: 1,
        };

    const destination={
            Titulo: hotel.Titulo,
            Tipo: "establecimiento",
            Id: hotel.Id,
            Lugar: ""
        };

    const handleClickHotel=()=>{
        navigate(`/hotel/${hotel.Titulo.toLowerCase().replaceAll(" - ","-").replaceAll(" ","-")}/?id=${hotel.Id}&destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`);
    }

    return (
        <div className="h-- relative group rounded-lg border-4 border-white overflow-hidden cursor-pointer" onClick={()=>handleClickHotel()}>
            <div className="border rounded-md px-2">
                <img src={hotel.Foto} className="h-20 w-full object-contain rounded-xl"/>
            </div>
            <div className="absolute cursor-pointer inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-greenVE-700 bg-opacity-90 cursor-pointer text-white text-center px-4 py-2 rounded-md w-full h-full flex items-center justify-center">
                    <p className="text-sm font-bold">Ofertas desde ${hotel.Minimo}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemHotels;