import { getCertificadoReserva } from "../../controllers/reserva/reservaController";
import Icons from "../../global/icons";

const HistoryItem = ({ reserva }) => {
    const icons = new Icons();
    const session = JSON.parse(localStorage.getItem("datos"));
    const nivel = session ? session.data.nivel : "visitante";
    const formatDate = (date) => {
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('es-ES', options);
        return formattedDate;
    };

    const onClickItem = () => {
        try {
            getCertificadoReserva(reserva.IDs).then((res) => {
                if (res) {
                    const searchParams = new URLSearchParams();
                    for (const key in res) {
                        if (Object.hasOwnProperty.call(res, key)) {
                            const value = typeof res[key] === 'object' ? JSON.stringify(res[key]) : res[key];
                            searchParams.append(key, value);
                        }
                    }
                    window.open(`/certificado?${searchParams.toString()}`, '_blank');
                }
            })
        } catch (e) {

        }
    }


    return (
        <div className="flex flex-col" onClick={nivel=="suscriptor"?() => onClickItem():() => {}}>
            <label className="text-xl font-semibold">{reserva.Ciudad}</label>
            <label>{formatDate(new Date(reserva.FechaInicio+"T00:00:00"))} - {formatDate(new Date(reserva.FechaFin+"T00:00:00"))}</label>
            <div className="flex border mt-3 shadow-lg rounded-lg p-4 gap-4 cursor-pointer">
                <div className="w-2/6 md:w-1/12 aspect-square relative">
                    <div className="absolute inset-0 overflow-hidden rounded-xl">
                        <img
                            
                            className="w-32  md:w-full h-full object-cover rounded-xl"
                            src={reserva.FotoHotel}
                        />
                    </div>
                </div>
                <div className="w-3/6 md:w-10/12 flex flex-col justify-between">
                    <label className="font-semibold cursor-pointer">{reserva.NombreHotel}</label>
                    <label className="text-xs cursor-pointer">{formatDate(new Date(reserva.FechaInicio+"T00:00:00"))} - {formatDate(new Date(reserva.FechaFin+"T00:00:00"))} · {reserva.Ciudad}</label>
                    <label className={reserva.Estado === "Confirmada" ? "text-xs text-greenVE-500" : reserva.Estado === "Cancelada" ? "text-xs text-red-500" : "text-xs text-yellow-500"}>{reserva.Estado}</label>
                </div>
                <div className="w-2/6 md:w-1/12 flex flex-col justify-center items-end">
                    <label className="font-bold cursor-pointer">US${reserva.Total.toFixed(2)}</label>
                    {
                        nivel=="suscriptor"&&
                        <button className="bg-greenVE-500 px-1 py-0.5 rounded-lg mt-8 text-white text-sm font-medium">Imprimir</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default HistoryItem;