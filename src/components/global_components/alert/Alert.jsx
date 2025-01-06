const Alert = ({Titulo, Descripcion, isOpen, Cancelar, Aceptar}) =>{
    if (!isOpen) return null;
    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/3 2xl:w-1/3 m-6 z-50">
                <div className="bg-white p-2 rounded-md flex justify-center">
                    <div className="flex-col w-full justify-center">
                        <div className="flex w-full justify-center my-2">
                            <label className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl">{Titulo}</label>
                        </div>
                        <div className="flex w-full justify-center my-2">
                            <label className="font-medium text-xs md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-center">{Descripcion}</label>
                        </div>
                        <div className="flex w-full justify-center mt-6 mb-2 gap-2">
                            <button className={`${Titulo.toLowerCase().includes("reserva")?"bg-amber-600":"bg-red-600"} text-white px-2 py-1 rounded-md w-full md:w-1/2`} onClick={()=>Cancelar()}>{Titulo.toLowerCase().includes("reserva")?"Reserva Express":"Cancelar"}</button>
                            <button className={`bg-greenVE-500 text-white px-2 py-1 rounded-md w-full md:w-1/2 flex justify-center`} onClick={()=>Aceptar()}>
                            {Titulo.toLowerCase().includes("reserva")?"Iniciar sesión":"Aceptar"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alert;