import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { es } from 'react-date-range/dist/locale/';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import HotelContacts from "./HotelContacts";


const HotelReservation = (props) => {

    const {pFinal, pAhorro, nHabitaciones, nAdultos, nNinos, nNoches, establecimiento, whatsapp, email, telefonos}=props
    const handleClickAway = () => {
        if (openDate) {
            setOpenDate(false)
        }
        if (openOptions) {
            setOpenOptions(false)
        }
    };
    const [openDate, setOpenDate] = useState(false);
    const [openOptions, setOpenOptions] = useState(false);
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date().setDate(new Date().getDate()+parseInt(nNoches?(nNoches):(0))),
            key: "selection",
        },
    ]);
    const [options, setOptions] = useState({
        adult: parseInt(nAdultos),
        children: parseInt(nNinos==null?0:nNinos),
        room: parseInt(nHabitaciones),
    });
    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
            };
        });
    };
    
    return (
        <div className="border mt-3 p-2 flex flex-col rounded-md bg-greenVE-300 ">
            <label className="font-bold text-xl">Precio Final: ${pFinal}</label>
            <label className="font-bold text-greenVE-700">Ahorro ${pAhorro}</label>
            <label className="font-medium mt-2 text-sm">Fecha de entrada y salida</label>
            <span
                onClick={() => setOpenDate(!openDate)}
                className="flex items-center justify-center bg-white text-sm mt-1 h-7 border "
            >{`${format(date[0].startDate, "yyyy/MM/dd")} al ${format(
                date[0].endDate,
                "yyyy/MM/dd"
            )}`}</span>
            {openDate && (
                <ClickAwayListener onClickAway={handleClickAway}>
                    <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDate([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={date}
                        locale={es}
                        className="absolute mt-1 shadow-xl z-50"
                        minDate={new Date()}
                    />
                </ClickAwayListener>
            )}
            <label className="font-medium mt-2 text-sm ">Personas y habitaciones</label>
            <span className="flex items-center justify-center bg-white  text-sm h-7 z-30 mb-1 border"
                        onClick={() => setOpenOptions(!openOptions)}
                    >{`${options.adult} Adulto(s) · ${options.children} Niño(s) · ${options.room} Hab.`}</span>
                    {openOptions && (
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <div className="absolute bg-white shadow-xl px-1 py-2">
                                <div className="flex justify-between px-3 ">
                                    <span>Adultos</span>
                                    <div className="flex items-center justify-between">
                                        <button
                                            disabled={options.adult <= 1}
                                            className="w-7 h-7 border border-greenVE-600 disabled:cursor-not-allowed"
                                            onClick={() => handleOption("adult", "d")}
                                        >
                                            -
                                        </button>
                                        <span className="w-7 text-center">
                                            {options.adult}
                                        </span>
                                        <button
                                            className="w-7 h-7 border border-greenVE-600 cursor-pointer"
                                            onClick={() => handleOption("adult", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between px-3 pt-2">
                                    <span>Niños</span>
                                    <div className="flex items-center justify-between">
                                        <button
                                            disabled={options.children <= 0}
                                            className="w-7 h-7 border border-greenVE-600 cursor-pointer disabled:cursor-not-allowed"
                                            onClick={() => handleOption("children", "d")}
                                        >
                                            -
                                        </button>
                                        <span className="w-7 text-center">
                                            {options.children}
                                        </span>
                                        <button
                                            className="w-7 h-7 border border-greenVE-600 cursor-pointer"
                                            onClick={() => handleOption("children", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex justify-between px-3 pt-2">
                                    <span className="mr-6 ">Habitaciones</span>
                                    <div className="flex items-center justify-between">
                                        <button
                                            disabled={options.room <= 1}
                                            className="w-7 h-7 border border-greenVE-600 cursor-pointer disabled:cursor-not-allowed"
                                            onClick={() => handleOption("room", "d")}
                                        >
                                            -
                                        </button>
                                        <span className="w-7 text-center">
                                            {options.room}
                                        </span>
                                        <button
                                            className="w-7 h-7 border border-greenVE-600 cursor-pointer"
                                            onClick={() => handleOption("room", "i")}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </ClickAwayListener>
                    )}
                     <button className="bg-greenVE-600 w-full py-1 text-white mt-2">Pre-Reservar</button>
                     <HotelContacts 
                        Contactos={establecimiento.Contactos}
                     ></HotelContacts>
        </div>
    )
}

export default HotelReservation