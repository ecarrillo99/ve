import React from "react";
import { useNavigate } from "react-router-dom";

const ItemRecomended = (props) => {
    const navigate = useNavigate()

    const HandleClickItem = () => {
        navigate("/hotel/" + props.oferta.IdOferta,);
    };

    return (
        <div class=" bg-white rounded-xl border-gray-200 cursor-pointer"
            onClick={
                HandleClickItem
            }>
            <div className="relative w-full h-0" style={{ paddingBottom: '100%' }}>
            <div className="animate-pulse absolute inset-0 w-full h-full bg-gray-200 rounded-md"></div>
                <img
                    src={props.oferta.Foto}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                />
            </div>
            <div className="flex flex-col mt-3 gap-0.5">
                <label className="text-xs text-gray-500 font-medium">{props.oferta.Lugar}</label>
                <label className="text-xs font-semibold">{props.oferta.Establecimiento}</label>
                <div className="flex items-center space-x-1">
                    {Array(+(props.oferta.Catalogacion)).fill(null).map((item, index) => (
                        <svg key={index} height="16px" width="16px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current text-yellow-500">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                    ))}
                </div>
                <label className="text-xs text-gray-500 font-medium">{"9.7 - 10 Comentarios"}</label>
                <label className="text-sm font-medium text-gray-600">Desde: ${props.oferta.Precio}</label>
            </div>
        </div>
    );
}

export default ItemRecomended;