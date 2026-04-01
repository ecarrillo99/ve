import { useState } from "react";

const RestaurantsConfirmationDetail = ({ Ofertas, isOpen, Establecimiento, Fechas, Valores, OnClose, Opciones, scheduleDateTime }) => {

    const formatDate = (date) => {
        if (!date) return '-';
        const options = { weekday: 'short', day: '2-digit', month: 'short' };
        try {
            return new Date(date).toLocaleDateString('es-ES', options);
        } catch (e) {
            return '-';
        }
    };

    // Formatea el scheduleDateTime en texto legible: "lun 23/06/2025 a las 19:30"
    // Si no se pasa scheduleDateTime, usar la fecha y hora actual como valor por defecto
    const formatScheduleDateTime = () => {
        const d = scheduleDateTime ? new Date(scheduleDateTime) : new Date();
        const pad = (n) => String(n).padStart(2, '0');
        const dias = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
        const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
        return {
            date: `${dias[d.getDay()]} ${pad(d.getDate())} ${meses[d.getMonth()]} ${d.getFullYear()}`,
            time: `${pad(d.getHours())}:${pad(d.getMinutes())}`,
        };
    };
    const scheduleParts = formatScheduleDateTime();

    // Soporte para días 0-6 (Dom=0) y 1-7 (Lun=1, Dom=7)
    const DAY_NAMES_0 = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const DAY_NAMES_1 = ["", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    const formatDayRange = (start, end) => {
        const useBase1 = start > 6 || end > 6;
        const names = useBase1 ? DAY_NAMES_1 : DAY_NAMES_0;
        const s = names[start] ?? start;
        const e = names[end] ?? end;
        return s === e ? s : `${s} – ${e}`;
    };

    const formatTime = (timeValue) => {
        if (!timeValue) return '';
        const str = typeof timeValue === 'string' ? timeValue : new Date(timeValue).toISOString();
        const timePart = str.includes('T') ? str.split('T')[1] : str;
        const [hh, mm] = timePart.split(':');
        const h = parseInt(hh, 10);
        const period = h >= 12 ? 'pm' : 'am';
        const h12 = h % 12 || 12;
        return `${h12}:${mm}${period}`;
    };

    return (
        <div className="flex flex-col mb-4">
            {/* Detalles del establecimiento */}
           

            {/* Detalles de la reserva */}
            <div className="border-x border-t border-greenVE-400 overflow-hidden">
                <div className="bg-greenVE-600  p-2">
                    <h3 className="text-white font-semibold text-sm text-center flex items-center justify-center gap-2">
                        <span className="icon-[mdi--calendar-check] h-4 w-4"></span>
                        Detalles de la reserva
                    </h3>
                </div>
                <div className="p-3 space-y-2">
                    {/* Fechas si aplican 
                    {Fechas && Fechas[0] && (
                        <div className="flex justify-start gap-10">
                            <div className="flex flex-wrap gap-3">
                                <p className="text-xs font-medium text-gray-600">Fecha:</p>
                                <p className="text-xs font-semibold">{formatDate(Fechas[0].startDate)}</p>
                            </div>
                            {Fechas[0].endDate && Fechas[0].endDate !== Fechas[0].startDate && (
                                <div className="flex flex-wrap gap-3">
                                    <p className="text-xs font-medium text-gray-600">Hasta:</p>
                                    <p className="text-xs font-semibold">{formatDate(Fechas[0].endDate)}</p>
                                </div>
                            )}
                        </div>
                    )}*/}

                    {/* Fecha y hora de visita (del DateTimePicker) */}
                    {scheduleParts && (
                        <div className="flex items-center gap-2 bg-greenVE-50  border border-greenVE-200 rounded-lg px-3 py-2">
                            <span className="icon-[mdi--calendar-clock] h-5 w-5 text-greenVE-600 shrink-0"></span>
                            <div>
                                <p className="text-xs font-medium text-gray-500 leading-none">Fecha y hora de visita</p>
                                <p className="text-sm font-semibold text-greenVE-800 capitalize">
                                    {scheduleParts.date}
                                    <span className="mx-1 text-greenVE-400">·</span>
                                    {scheduleParts.time}
                                </p>
                            </div>
                        </div>
                    )}

                

                    {/* Ofertas seleccionadas */}
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-medium mb-1">Ofertas seleccionadas:</p>
                        {Ofertas.map((item, index) => (
                            <div key={index} className="text-xs text-gray-600 mb-1">
                                <div className="flex items-start gap-2">
                                    <div className="flex flex-wrap">
                                        <p>Total Personas:</p>
                                        <span className=" text-greenVE-700 font-semibold px-1.5  rounded mr-1">
                                            {item.NumPersonas || item.NumOfertas || item.cantidad || 1} persona{(item.NumPersonas || item.NumOfertas || item.cantidad || 1) !== 1 ? "s" : ""}
                                        </span>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{item.TituloOferta || item.title}</p>
                                        {/* Horarios */}
                                        {item.schedules && item.schedules.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-1">
                                                {item.schedules.map((schedule, idx) => (
                                                    <span key={idx} className="text-[10px] bg-greenVE-50 text-greenVE-600 px-1.5 py-0.5 rounded">
                                                        {formatDayRange(schedule.day_start, schedule.day_end)} · {formatTime(schedule.time_st)} – {formatTime(schedule.time_ed)}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {/* Inventarios/Regalos */}
                                        {item.inventories && item.inventories.length > 0 && (
                                            <div className="mt-1">
                                                <span className="text-[10px] text-amber-700">🎁 Regalos: </span>
                                                <span className="text-[10px] text-gray-500">
                                                    {item.inventories.map(i => i.name).join(', ')}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

           
        </div>
    );
};

export default RestaurantsConfirmationDetail;