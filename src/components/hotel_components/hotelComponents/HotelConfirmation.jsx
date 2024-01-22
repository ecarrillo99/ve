import { useState } from "react";
import { createReservation } from "../../../controllers/establecimiento/establecimientoController";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Icons from "../../../global/icons";
import Config from "../../../global/config";

const HotelConfirmation = ({ Ofertas, isOpen, Establecimiento, Fechas, Valores, OnClose, Opciones }) => {
    const contactosHotel=Establecimiento.Contactos;
    const contactosCentral=Establecimiento.ContactosCentral;
    const user= JSON.parse(localStorage.getItem('datos'));
    const id=user.data.codigo;
    const nombre=user.data.nombre
    const navigate=useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const icons= new Icons();
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

    const mensaje=()=>{
        const msj= Config.MENSAJE
        .replaceAll("{{nombre}}", nombre)
        .replaceAll("{{ID}}", id);
        return msj
    }

    const handleClickWhatsApp=async()=>{
        console.log(mensaje());
    }

    const handleClickAceptar = async () => {
        if (!isLoading) {
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
                        }).catch((error) => { console.log(error) });
                }
                setIsLoading(false)
                if(correcto){
                    navigate("/historial");
                }
            } catch (e) {

            }
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 m-6 z-50">
                <div className="bg-white p-2 rounded-md flex justify-center">
                    <div className="flex-col w-full justify-center">
                        <div className="flex w-full justify-center my-2">
                            <label className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">Reserva</label>
                        </div>
                        <div className="flex">
                            <div className="w-1/2 text-center font-semibold">
                                <label>Directo al hotel</label>
                                {
                                    contactosHotel.Telefono.length>0&&(
                                        <>
                                        {
                                            contactosHotel.Telefono.map((item)=>(
                                                <div className="flex border-2 border-greenVE-300 rounded-md mx-3 py-1 bg-greenVE-50">
                                                    <div className="flex items-center w-2/12">
                                                        <div dangerouslySetInnerHTML={{ __html: icons.Data.Telefono}} />
                                                    </div>
                                                    <div className="flex flex-col w-8/2 justify-start items-start">
                                                        <label className="text-sm">Teléfono</label>
                                                        <div className="font-normal text-xs">{item}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        </>
                                    )
                                }
                                {
                                    contactosHotel.Whatsapp.length>0&&(
                                        <>
                                        {
                                            contactosHotel.Whatsapp.map((item)=>(
                                                <div className="flex border-2 border-greenVE-300 rounded-md mx-3 py-1 bg-greenVE-50 mt-2">
                                                    <div className="flex items-center w-2/12">
                                                        <div dangerouslySetInnerHTML={{ __html: icons.Data.WhatsApp}} />
                                                    </div>
                                                    <div className="flex flex-col w-8/2 justify-start items-start">
                                                        <label className="text-sm">WhatsApp</label>
                                                        <div className="font-normal text-xs cursor-pointer hover:underline hover:text-blue-500" onClick={()=>handleClickWhatsApp()}>{item}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        </>
                                    )
                                }
                                {
                                    contactosHotel.Email.length>0&&(
                                        <>
                                        {
                                            contactosHotel.Email.map((item)=>(
                                                <div className="flex border-2 border-greenVE-300 rounded-md mx-3 py-1 bg-greenVE-50 mt-2">
                                                    <div className="flex items-center w-2/12">
                                                        <div dangerouslySetInnerHTML={{ __html: icons.Data.Email}} />
                                                    </div>
                                                    <div className="flex flex-col w-8/12 justify-start items-start">
                                                        <label className="text-sm">Email</label>
                                                        <div className="font-normal text-ellipsis text-start text-xs" style={{ maxWidth: '100%', overflowWrap: 'break-word' }}>{item}</div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        </>
                                    )
                                }
                            </div>
                            <div className="w-1/2 text-center font-semibold">
                                <label>Central de reserva</label>
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
