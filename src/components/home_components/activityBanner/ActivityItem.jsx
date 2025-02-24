import { useNavigate } from "react-router-dom";

const ActivityItem = ({ actividad }) => {
    const navigate = useNavigate();

    const handleRedirectToSearch = (type, value) => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);

        const destination = {
            Titulo: value,
            Tipo: type === "establecimiento" ? "hotel" : "destino",
            Id: "",
            Lugar: actividad.LugarSuscriptor || ""
        };

        const dates = [{
            startDate: tomorrow,
            endDate: dayAfterTomorrow,
            key: "selection",
        }];

        const options = {
            adult: 2,
            children: 0,
            childrenAges: [],
            room: 1,
        };

        const path = `/busqueda/?destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(dates))}&opciones=${encodeURIComponent(JSON.stringify(options))}`;

        navigate(path);
    };

    return (
        <div className="flex flex-col gap-1 mb-2.5">
            <label
                className="text-sm font-medium text-greenVE-600 pb-1 cursor-pointer hover:underline"
                onClick={() => handleRedirectToSearch("lugar", actividad.LugarEstablecimiento)}
            >
                {actividad.LugarEstablecimiento}
            </label>
            <label className="text-xs">
                Nuestro Suscriptor de
                <label
                    className="text-greenVE-500 cursor-pointer hover:underline ml-1"
                    onClick={() => handleRedirectToSearch("lugar", actividad.LugarSuscriptor)}
                >
                    {actividad.LugarSuscriptor}
                </label> acaba de reservar una oferta de
                <label
                    className="text-greenVE-500 cursor-pointer hover:underline ml-1"
                    onClick={() => handleRedirectToSearch("establecimiento", actividad.Establecimiento)}
                >
                    {actividad.Establecimiento}
                </label>
            </label>
            <label className="text-xs text-gray-400">Hace 5 minutos</label>
        </div>
    );
};

export default ActivityItem;
