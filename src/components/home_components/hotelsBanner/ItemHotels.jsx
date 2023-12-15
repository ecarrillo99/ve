import { useState } from "react";

const ItemHotels = ({ hotel }) => {
    const [hover, setHover] = useState(false);

    const handleMouseOver = () => {
        setHover(true);
    };

    const handleMouseOut = () => {
        setHover(false);
    };
    return (
        <div className="relative group rounded-lg border-4 border-white overflow-hidden">
            <div className="border rounded-md px-2">
                <img src={hotel.Icono} className="h-20 w-full object-contain rounded-xl" alt="Hotel Icon" />
            </div>
            <div className="absolute cursor-pointer inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-greenVE-700 bg-opacity-90 cursor-pointer text-white text-center px-4 py-2 rounded-md w-full h-full flex items-center justify-center">
                    <p className="text-sm font-bold">Ofertas desde ${hotel.Valor}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemHotels;