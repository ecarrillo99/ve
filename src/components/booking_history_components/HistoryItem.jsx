const HistoryItem =({reserva})=>{
    const formatDate = (date) => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        return formattedDate;
    };
    return (
        <div className="flex flex-col">
        <label className="text-xl font-semibold">{reserva.Ciudad}</label>
        <label>{formatDate(new Date(reserva.FechaInicio))} - {formatDate(new Date(reserva.FechaFin))}</label>
        <div className="flex border mt-3 shadow-lg rounded-lg p-4 gap-4 cursor-pointer">
            <div className="w-1/12 aspect-square relative">
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                    <img
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                    src={reserva.FotoHotel}
                    />
                </div>
            </div>
            <div className="w-10/12 flex flex-col justify-between">
                <label className="font-semibold cursor-pointer">{reserva.NombreHotel}</label>
                <label className="text-xs cursor-pointer">{formatDate(new Date(reserva.FechaInicio))} - {formatDate(new Date(reserva.FechaFin))} · {reserva.Ciudad}</label>
                <label className={reserva.Estado==="Confirmada"?"text-xs text-greenVE-500":reserva.Estado==="Cancelada"?"text-xs text-red-500":"text-xs text-yellow-500"}>{reserva.Estado}</label>
            </div>
            <div className="w-1/12 flex justify-end">
                <label className="font-bold cursor-pointer">US${reserva.Total}.00</label>
            </div>
        </div>
        </div>
    )
}

export default HistoryItem;