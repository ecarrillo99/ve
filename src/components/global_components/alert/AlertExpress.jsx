const AlertExpress = ({Titulo, Descripcion, isOpen, Cancelar, Aceptar, Subtotal, Impuestos, Descuento}) =>{
    if (!isOpen) return null;
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/3 2xl:w-1/3 m-6 z-50">
                <div className="bg-white px-3 rounded-md flex justify-center">
                    <div className="flex-col w-full justify-center">
                        <div className="flex flex-col items-center w-full justify-center my-2">
                            <div className="flex justify-end w-full">
                                <button className={` text-gray-400 text-2xl rounded-full h-8 w-8 `} onClick={() => Aceptar()} >x</button>
                            </div>
                            <label className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">{Titulo}</label>
                        </div>
                        <label className="text-xs text-center">Realiza una Reserva Express sin una suscripción, o adquiere una para ahorar mucho más y reservar directamente en los establecimientos.</label>
                        <div className="flex w-full justify-center my-2 gap-2">
                            <div className="flex flex-col w-1/2 items-center">
                                <label className="bg-amber-600 w-full text-center text-white rounded-t-md py-1">Reserva Express</label>
                                <div className="border-2 border-amber-600 w-full text-center text-amber-600  py-1 flex flex-col rounded-b-lg gap-1">
                                    <label className="text-5xl font-semibold">${Subtotal}</label>
                                    <label className="text-xs font-medium">+ ${Impuestos} de impuestos</label>
                                </div>
                            </div>
                            <div className="flex flex-col w-1/2 items-center">
                                <label className="bg-greenVE-500 w-full text-center text-white rounded-t-md py-1">Reserva con Suscripción</label>
                                <div className="border-2 border-greenVE-500 w-full text-center text-greenVE-500  py-1 flex flex-col rounded-b-lg gap-1">
                                    <label className="text-5xl font-semibold">${Subtotal-(Descuento*0.8)}</label>
                                    <label className="text-xs font-medium">+ ${Impuestos-(Descuento*0.2)} de impuestos</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full justify-center mt-6 mb-2 gap-2">
                            <button className={`${Titulo.toLowerCase().includes("reserva")?"bg-amber-600":"bg-red-600"} text-white px-2 py-1 rounded-md w-full md:w-1/2`} onClick={()=>Cancelar()}>{"Reserva Express"}</button>
                            <button className={`bg-greenVE-500 text-white px-2 py-1 rounded-md w-full md:w-1/2 flex justify-center`} onClick={()=>window.open("/suscripcion")}>
                            {"Suscribirse Ahora"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertExpress;