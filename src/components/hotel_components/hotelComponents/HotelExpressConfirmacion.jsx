import React from 'react';

const HotelExpressConfirmacion = ({isOpen, OnClose}) => {
    const user = JSON.parse(localStorage.getItem('datos'));
    const id = user != null ? user.data.codigo : "";
    const cedula = user != null ? user.data.ci : "";
    const nombre = user != null ? user.data.nombre : "";

    const handleClickWhatsApp = async (contacto) => {
        window.open("https://wa.me/" + contacto + "?text=" + (`Hola, mi nombre es ${nombre} con cédula ${cedula} y deseo saber el estado de mi reserva express.`).replaceAll(" ", "%20").replaceAll("\n", "%0A"))
    }

    if(!isOpen){
        return;
    }
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center z-40">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 m-6 z-50">
                    <div className="bg-white p-2 rounded-md flex justify-center">
                        <div className="flex-col w-full justify-center">
                            <div className="w-full flex flex-col justify-center my-2 items-center -mt-16 z-10 relative">
                                <div className='h-28 w-28 bg-white rounded-full'>
                                    <span className="icon-[octicon--check-circle-fill-12] h-28 w-28 text-greenVE-500"></span>
                                </div>
                                <label className="font-semibold text-base md:text-lg lg:text-xl xl:text-xl 2xl:text-3xl text-greenVE-500">
                                    Reserva Express Exitosa
                                </label>
                                <div className='pr-3 text-2xl text-gray-400 cursor-pointer z-50 absolute right-0' onClick={()=>OnClose()}>
                                    x
                                </div>
                            </div>
                                                        
                            <div className='flex flex-col items-center '>
                                <label className='text-gray-500 text-sm pt-4'>Inicia sesión para ver tu reserva.</label>
                                <div className='flex  gap-3 pt-3'>
                                    <div className='flex rounded-full bg-gray-200'>
                                        <div className='bg-[#e9840e] text-white px-2 py-1 rounded-full'>
                                            <label className='font-semibold'>Usuario:</label>
                                        </div>
                                        <label className='px-3 py-1 font-semibold'>{cedula}</label>
                                    </div>
                                    <div className='flex rounded-full bg-gray-200'>
                                        <div className='bg-[#e9840e] text-white px-2 py-1 rounded-full'>
                                            <label className='font-semibold'>Contraseña:</label>
                                        </div>
                                        <label className='px-3 py-1 font-semibold'>{cedula.substring(0,5)}</label>
                                    </div>
                                </div>
                                <div className="h-[1px] w-full my-4" style={{ background: 'linear-gradient(to right, white, #bdbdbd, white)' }}></div>
                                <label className='text-center mt-3 text-sm text-gray-500'>Recuerda que puedes ahorrar $10 por cada habitación y noche</label>
                                <label className='text-center  text-sm text-gray-500'>si adquieres una suscripción <label className='bg-greenVE-500 px-2 text-white rounded-full cursor-pointer' onClick={()=>{window.open("/suscripcion")}}>VisitaEcuador.com</label></label>
                                <div className="h-0.5 w-full my-4" style={{ background: 'linear-gradient(to right, white, #bdbdbd, white)' }}></div>
                                <label className='text-center mt-3 text-sm text-gray-500'>Si tienes alguna pregunta o necesitas ayuda, estamos aquí para ti.</label>
                                <div className='flex mt-2 gap-4 mb-3'>
                                    <label className='bg-greenVE-500  px-2 text-white rounded-lg flex items-center gap-1 cursor-pointer text-xs py-1' onClick={()=>handleClickWhatsApp("593986263432")}><span class="icon-[mdi--whatsapp] h-4 w-4"></span> +593 9862 63432</label>
                                    <label className='bg-greenVE-500  px-2 text-white rounded-lg  flex items-center gap-1 cursor-pointer text-xs py-1' onClick={()=>handleClickWhatsApp("593980644467")}><span class="icon-[mdi--whatsapp] h-4 w-4"></span> +593 9806 44467</label>
                                    <label className='bg-greenVE-500  px-2 text-white rounded-lg  flex items-center gap-1 cursor-pointer text-xs py-1' onClick={()=>handleClickWhatsApp("593981850436")}><span class="icon-[mdi--whatsapp] h-4 w-4"></span> +593 9818 50436</label>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>``
            </div>
        </>
    );
};

export default HotelExpressConfirmacion;