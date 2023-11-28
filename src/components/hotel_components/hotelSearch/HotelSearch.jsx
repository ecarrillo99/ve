import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import { es } from 'react-date-range/dist/locale/';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { getEstablacimientoDestino } from "../../../controllers/establecimiento/establecimientoController";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";



const HotelSearch = (props) => {
    const { Place, Dates, Options } = props
    const handleClickAway = () => {
        if (openDate) {
          setOpenDate(false)
        }
        if (openOptions) {
          setOpenOptions(false)
        }
        if (suggestion) {
          setSuggestion(null)
        }
      };
      const [destination, setDestination] = useState(
        Place != null
          ? (Place)
          : ({
            Titulo: "",
            Tipo: "",
            Id: "",
          })
      );
      const [openDate, setOpenDate] = useState(false);
      const [date, setDate] = useState(
        Dates != null
          ? (Dates)
          : (
            [{
              startDate: new Date(),
              endDate: new Date().setDate(new Date().getDate() + 1),
              key: "selection",
            }]
          )
        ,
      );
      const [openOptions, setOpenOptions] = useState(false);
      const [options, setOptions] = useState(
        Options != null
          ? (Options)
          : ({
            adult: 1,
            children: 0,
            childrenAges: [],
            room: 1,
          })
      );
    
      const navigate = useNavigate();
    
      const [openSearch, setOpenSearch] = useState(false);
      const [suggestion, setSuggestion] = useState(null);
    
      const [selectedAges, setSelectedAges] = useState([])
    
      const handleAgeChange = (event, index) => {
        const newSelectedAges = [...options['childrenAges']];
        newSelectedAges[index] = parseInt(event.target.value, 10);
        setOptions( (prev)=>{
          return {
            ...prev,
            "childrenAges": newSelectedAges,
          };
        })
      };
    
      const handleOption = (name, operation) => {
        if(name=="children"&operation=="i"){
          const tmpSelectedAges = [...options['childrenAges']];
          tmpSelectedAges.push(0)
          setOptions( (prev)=>{
            return {
              ...prev,
              "childrenAges": tmpSelectedAges,
            }
          })
          
        }
        if(name=="children"&operation=="d"){
          const tmpSelectedAges = [...options['childrenAges']];
          tmpSelectedAges.pop()
    
          setOptions( (prev)=>{
            return {
              ...prev,
              "childrenAges": tmpSelectedAges,
            }
          })
        }
        setOptions((prev) => {
          return {
            ...prev,
            [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
          };
        });
      };
    
      const handleSearch = () => {
        const path=`../busqueda/?destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`
        window.open(path)
      };
    
    
      const fetchData = (value) => {
        getEstablacimientoDestino(value).then((res) => {
          if (res) {
            setSuggestion(res)
          }
        })
      }
    
      let timeout = null
      const handleChange = (value) => {
        setDestination({ Titulo: value })
        clearTimeout(null)
        timeout = setTimeout(() => {
          if (value != "") {
            fetchData(value);
          } else {
            setSuggestion(null)
          }
        }, 1000)
      };

    return (
        <div>
            <div className="bg-greenVE-300 p-4 rounded-lg">
                <h1 className="text-xl mb-2 font-medium">Buscar</h1>
                <div className=" text-sm flex flex-col">
                    <label className="mb-1 ">Destino</label>
                    <input
                type="text"
                placeholder=" ¿A dónde vas?"
                className="w-full h-7 max-w-full overflow-hidden placeholder-gray-600 mr-4 p-2"
                onChange={(e) => handleChange(e.target.value)}
                onClick={() => setOpenSearch(true)}
                value={destination.Titulo.charAt(0).toUpperCase() + destination.Titulo.slice(1)}
              />
              {suggestion && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div className="absolute mt-14 max-h-40 w-64 bg-white z-50 shadow-md p-2 overflow-y-auto border">
                    {
                      suggestion ? (
                        suggestion.map((item, key) => (
                          <div className="flex items-center p-1 border-b cursor-pointer" onClick={() => (setDestination(item), setSuggestion(null))}>
                            {item.Tipo == "destino" ? (<FontAwesomeIcon icon={faMapMarkerAlt} className="pr-2 w-4 text-gray-500" />)
                              : (<FontAwesomeIcon icon={faBed} className="pr-2 w-4 text-gray-500" />)}
                            <p key={key} className="text-sm" >
                              {item.Titulo.charAt(0).toUpperCase() + item.Titulo.slice(1)}
                            </p>

                          </div>

                        ))
                      ) : (<p></p>)
                    }
                  </div>
                </ClickAwayListener>
              )}
                </div>
                <div className="pt-2 ">
                    <label className="text-sm ">Fecha de entrada y salida</label>
                    <span
                        onClick={() => setOpenDate(!openDate)}
                        className="flex items-center justify-center bg-white text-sm mt-1 h-7"
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
                            months={1}
                            direction="horizontal"
                            className="absolute mt-1 shadow-xl z-20"
                            rangeColors={["#96c121"]}
                            minDate={new Date()}
                          />
                        </ClickAwayListener>
                    )}
                    <div className="mt-2">
                        <label className="text-sm">Personas y habitaciones</label>
                    </div>
                    <span className="flex items-center justify-center bg-white  text-sm h-7 z-50 mb-1"
                        onClick={() => setOpenOptions(!openOptions)}
                    >{`${options.adult} Adulto(s) · ${options.children} Niño(s) · ${options.room} Hab.`}</span>
                    {openOptions && (
                        <ClickAwayListener onClickAway={handleClickAway}>
                        <div className="absolute bg-white shadow-xl px-1 py-2 z-50">
                          <div className="flex justify-between px-3 ">
                            <span>Adultos</span>
                            <div className="flex items-center justify-between border border-greenVE-600 rounded-md ">
                              <button
                                disabled={options.adult <= 1}
                                className="w-7 h-7 disabled:cursor-not-allowed hover:bg-greenVE-100 hover:rounded-l-md text-greenVE-700 disabled:text-gray-400"
                                onClick={() => handleOption("adult", "d")}
                              >
                                -
                              </button>
                              <span className="w-7 text-center">
                                {options.adult}
                              </span>
                              <button
                                className="w-7 h-7  cursor-pointer hover:bg-greenVE-100 hover:rounded-r-md text-greenVE-700 disabled:text-gray-400"
                                onClick={() => handleOption("adult", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="flex justify-between px-3 pt-2">
                            <span>Niños</span>
                            <div className="flex items-center justify-between border border-greenVE-600 rounded-md">
                              <button
                                disabled={options.children <= 0}
                                className="w-7 h-7  cursor-pointer disabled:cursor-not-allowed hover:bg-greenVE-100 hover:rounded-l-md text-greenVE-700 disabled:text-gray-400"
                                onClick={() => handleOption("children", "d")}
                              >
                                -
                              </button>
                              <span className="w-7 text-center">
                                {options.children}
                              </span>
                              <button
                                className="w-7 h-7 cursor-pointer rounded-sm hover:bg-greenVE-100 hover:rounded-r-md text-greenVE-700 disabled:text-gray-400"
                                disabled={options.children >= 10}
                                onClick={() => handleOption("children", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-x-2 px-3">
      
                            {Array.from({ length: options.children }, (_, index) => (
                              <select
                               key={index} 
                               name="age" 
                               value={options['childrenAges'][index]}
                               className="px-2 bg-white border border-greenVE-400 rounded-sm mt-2"
                               onChange={(event) => handleAgeChange(event, index)}>
                                <option value="0" data-key="0">0 años</option>
                                <option value="1" data-key="1">1 año</option>
                                <option value="2" data-key="2">2 años</option>
                                <option value="3" data-key="3">3 años</option>
                                <option value="4" data-key="4">4 años</option>
                                <option value="5" data-key="5">5 años</option>
                                <option value="6" data-key="6">6 años</option>
                                <option value="7" data-key="7">7 años</option>
                                <option value="8" data-key="8">8 años</option>
                                <option value="9" data-key="9">9 años</option>
                                <option value="10" data-key="10">10 años</option>
                                <option value="11" data-key="11">11 años</option>
                                <option value="12" data-key="12">12 años</option></select>
                            ))}
                          </div>
                          <div className="flex justify-between px-3 pt-2">
                            <span className="mr-6 ">Habitaciones</span> 
                            <div className="flex items-center justify-between border border-greenVE-600 rounded-md">
                              <button
                                disabled={options.room <= 1}
                                className="w-7 h-7  cursor-pointer disabled:cursor-not-allowed hover:bg-greenVE-100 hover:rounded-l-md text-greenVE-700 disabled:text-gray-400"
                                onClick={() => handleOption("room", "d")}
                              >
                                -
                              </button>
                              <span className="w-7 text-center">
                                {options.room}
                              </span>
                              <button
                                className="w-7 h-7 cursor-pointer hover:bg-greenVE-100 hover:rounded-r-md text-greenVE-700 disabled:text-gray-400"
                                onClick={() => handleOption("room", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </ClickAwayListener>
                    )}
                </div>
                <button className="bg-greenVE-600 w-full py-1 text-white mt-3" onClick={handleSearch}>Buscar</button>
            </div>
        </div>
    );
};

export default HotelSearch;
