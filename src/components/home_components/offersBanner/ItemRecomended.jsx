import React from "react";
import { useNavigate } from "react-router-dom";

const ItemRecomended = (props) => {
    const navigate=useNavigate()
    
    const HandleClickItem = () => {
        navigate("/hotel/"+props.oferta.IdOferta,);
    };

    return (
        <div class=" bg-white rounded-xl border border-1 border-gray-200 cursor-pointer"
            onClick={
                HandleClickItem
            }>
            <img src={props.oferta.Foto} class="h-44 w-full object-cover rounded-t-xl" />
            <div class="p-4">
                <h2 class="text-greenTitle font-bold text-center text-sm h-9 flex items-center justify-center leading-4">{props.oferta.Establecimiento}</h2>
                <div class="flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-blueLight">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                    <p class="text-sm text-blueLight" >{props.oferta.Lugar}</p>
                </div>
                <div class="h-10 flex items-center justify-center">
                    <h2 class="text-greenTitle  text-center text-xxs leading-4">{props.oferta.Titulo}</h2>
                </div>
                <div class="grid grid-cols-2  items-center ">
                    <div class="col-span-1 flex justify-end  ">
                        <h2 class="text-right text-greenVE-500 font-bold text-3xl pr-1">${props.oferta.Precio}/</h2>
                    </div>
                    <div class="col-span-1 pl-1">
                        <h2 class="text-xxs text-greenVE-500"> {props.oferta.Dias + " dias, " + props.oferta.Noches + " noches"}</h2>
                        <h2 class="text-xxs text-greenVE-500">
                            {
                            props.oferta.Ninos == null ? (
                                props.oferta.Adultos + " adulto(s)"
                            ) : (
                                props.oferta.Adultos + " adulto(s), " + props.oferta.Ninos + " niño(s)"
                            )
                            }
                        </h2>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ItemRecomended;