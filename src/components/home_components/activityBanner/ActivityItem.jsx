const ActivityItem = ({ actividad }) => {
    return (
        <div className="flex flex-col gap-1 mb-2.5">
            <label className="text-sm font-medium text-greenVE-600 pb-1">{actividad.LugarEstablecimiento}</label>
            <label className="text-xs">Nuestro Suscriptor de
                <label className="text-greenVE-500 cursor-pointer"> {actividad.LugarSuscriptor}</label> acaba de reservar una oferta de
                <label className="text-greenVE-500 cursor-pointer"> {actividad.Establecimiento} </label></label>
            <label className="text-xs text-gray-400">Hace 5 minutos</label>
        </div>
    )
}

export default ActivityItem