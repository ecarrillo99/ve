import { useState } from "react";
import { createReservation } from "../../../controllers/establecimiento/establecimientoController";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const HotelConfirmation = ({ Ofertas, isOpen, Establecimiento, Fechas, Valores, OnClose, Opciones }) => {
    const navigate=useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    if (!isOpen) return null;

    const formatDate = (date) => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        return formattedDate;
    };

    function formatDateToAAAAMMDD(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}/${month}/${day}`;
    }

    const handleClickAceptar = async () => {
        /*if (!isLoading) {
            setIsLoading(true)
            var correcto = true;
            try {
                for (const oferta of Ofertas) {
                    await createReservation(oferta.Id, Opciones.adult, Opciones.children, oferta.TotalOfertas, formatDateToAAAAMMDD(Fechas[0].startDate), formatDateToAAAAMMDD(Fechas[0].endDate), Opciones.childrenAges)
                        .then((res) => {
                            if (res) {
                                if(res==401){
                                    localStorage.removeItem("datos");
                                    window.location.reload();
                                }
                            } else {
                                correcto = false;
                            }
                        }).catch((error) => { });
                }
                setIsLoading(false)
                if(correcto){
                    navigate("/historial");
                }
            } catch (e) {
                
            }
        }*/
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 m-6 z-50">
                <div className="bg-white p-2 rounded-md flex justify-center">
                    <div className="flex-col w-full justify-center">
                        <div className="flex w-full justify-center my-2">
                            <label className="font-semibold text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl">Confirmación de Pre-Reserva</label>
                        </div>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="border rounded-md w-full md:w-4/12 flex-col items-center mb-4 md:mb-0">
                                <div className="bg-greenVE-500 rounded-t-md flex justify-center">
                                    <label className="text-white p-t-0.5 font-medium">Detalles del hotel</label>
                                </div>
                                <div className="flex-col w-full p-2">
                                    <div className="flex w-full justify-center">

                                        <div className="flex-col">
                                            <div className="flex justify-center w-full">
                                                <label className="text-sm font-semibold text-center">{Establecimiento.Titulo}</label>
                                            </div>
                                            <div className="flex justify-center w-full">
                                                <div className="flex items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-blueLight">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                                    </svg>
                                                    <p className="text-base text-blueLight " >{Establecimiento.Ciudad}</p>
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-full">
                                                <div className="flex">
                                                    {Array(+(Establecimiento.Catalogacion)).fill(null).map((item, index) => (
                                                        <svg key={index} height="18px" width="18px" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-current text-yellow-500">
                                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                                        </svg>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex justify-center w-full">
                                                <p className="text-xs text-center">{Establecimiento.Direccion}</p>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border rounded-md w-full md:w-4/12 flex-col items-center mb-4 md:mb-0">
                                <div className="bg-greenVE-500 rounded-t-md flex justify-center">
                                    <label className="text-white p-t-0.5 font-medium">Detalles de la reserva</label>
                                </div>
                                <div className="p-2">
                                    <div className="flex">
                                        <div className="w-1/2">
                                            <label className="font-medium">Entrada</label>
                                            <p className="text-xs">{formatDate(Fechas[0].startDate)}</p>
                                        </div>
                                        <div className="w-1/2">
                                            <label className="font-medium">Salida</label>
                                            <p className="text-xs">{formatDate(Fechas[0].endDate)}</p>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <label className="text-sm font-semibold">Habitaciones seleccionadas:</label>
                                    </div>
                                    <div className="flex justify-start w-full ">
                                        <div className="flex-col">
                                            {
                                                Ofertas.map((item, index) => (
                                                    <div key={index}>
                                                        <p className="text-xxs mb-1 text-gray-500 font-medium">{item.NumOfertas} x {item.TituloOferta}</p>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border rounded-md w-full md:w-4/12 flex-col items-center">
                                <div className="bg-greenVE-500 rounded-t-md flex justify-center">
                                    <label className="text-white p-t-0.5 font-medium">Desgloce de precios</label>
                                </div>
                                <div className="flex-col w-full p-2 items-center">
                                    <div className="flex justify-between">
                                        <label className="text-sm font-semibold">Subtotal:</label>
                                        <label className="text-sm">${Valores.SinImpuestos}</label>
                                    </div>
                                    <div className="flex justify-between">
                                        <label className="text-sm font-semibold">Impuestos / servicios:</label>
                                        <label className="text-sm">${Valores.Impuestos}</label>
                                    </div>
                                    <div className="flex justify-between">
                                        <label className="text-sm font-semibold">Total:</label>
                                        <label className="text-sm">${Valores.SinImpuestos + Valores.Impuestos}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-center mt-6 mb-2 gap-2">
                            <button className={`bg-${isLoading ? 'gray-500' : 'red-600'} text-white px-2 py-1 rounded-md w-full md:w-1/2`} onClick={() => OnClose()} disabled={isLoading}>Cancelar</button>
                            <button className={`bg-greenVE-500 text-white px-2 py-1 rounded-md w-full md:w-1/2 flex justify-center`} onClick={() => handleClickAceptar()}>
                                {isLoading
                                    ? <Spinner color="white"></Spinner>
                                    : "Confirmar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelConfirmation;
