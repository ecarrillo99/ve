
import { DateRange } from "react-date-range";
//import { DatePicker } from "react-datepicker";
import { useEffect, useState } from "react";
import { es } from 'react-date-range/dist/locale/';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";
import { getEstablacimientoDestino } from "../../../controllers/establecimiento/establecimientoController";
import Icons from "../../../global/icons";

const SearchBar = (props) => {
  const { Place, Dates, Options, type } = props
  const [inputValue, setInputValue] = useState('');
  const icons= new Icons();
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
        Lugar: ""
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

  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short' };
    const formattedDate = date.toLocaleDateString('es-ES', options);
    return formattedDate;
  };

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


  const [openSearch, setOpenSearch] = useState(false);
  const [suggestion, setSuggestion] = useState(null);

  const [selectedAges, setSelectedAges] = useState([])

  const handleAgeChange = (event, index) => {
    const newSelectedAges = [...options['childrenAges']];
    newSelectedAges[index] = parseInt(event.target.value, 10);
    setOptions((prev) => {
      return {
        ...prev,
        "childrenAges": newSelectedAges,
      };
    })
  };

  const handleOption = (name, operation) => {
    if (name == "children" & operation == "i") {
      const tmpSelectedAges = [...options['childrenAges']];
      tmpSelectedAges.push(0)
      setOptions((prev) => {
        return {
          ...prev,
          "childrenAges": tmpSelectedAges,
        }
      })

    }
    if (name == "children" & operation == "d") {
      const tmpSelectedAges = [...options['childrenAges']];
      tmpSelectedAges.pop()

      setOptions((prev) => {
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

  const navigate=useNavigate();

  const handleSearch = () => {
    const path = `/busqueda/?destino=${encodeURIComponent(JSON.stringify(destination))}&fechas=${encodeURIComponent(JSON.stringify(date))}&opciones=${encodeURIComponent(JSON.stringify(options))}`
    if(type===0){
      navigate(path)
    }
    if(type===1){
      navigate(path)
      window.location.reload();
    }
    if(type==2){
      window.open("/#"+path)
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== '') {
        getEstablacimientoDestino(inputValue).then((res) => {
          if (res) {
            if(res==401){
              localStorage.removeItem("datos");
              window.location.reload();
            }else{
              setSuggestion(res);
            }
          }
        });
      } else {
        setSuggestion(null);
      }
    }, 500);

    return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta o el valor cambia
  }, [inputValue]);

  const handleChange = (value) => {
    setInputValue(value);
    setDestination({ Titulo: value });
  };

  const handleChangeDate = (value) => {
    setDate(value)
  }

  return (
    type===0||type===1?
    <div>
      <>
        <div className="bottom-[0px] bg-greenVE-600 relative rounded-sm w-full">
          <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-flow-row">
            <div className="gap-3 col-span-4 max-sm:col-span-1  bg-white flex items-center justify-center m-0.5 rounded-sm pl-4">
              <div dangerouslySetInnerHTML={{ __html: icons.Data.Bed }} />
              <input
                type="text"
                placeholder=" ¿A dónde vas?"
                className="w-full max-w-full overflow-hidden placeholder-gray-600 mr-4 focus:outline-none"
                onChange={(e) => handleChange(e.target.value)}
                onClick={() => setOpenSearch(true)}
                value={destination.Titulo.charAt(0).toUpperCase() + destination.Titulo.slice(1)}
              />
              {suggestion && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div className=" absolute top-12 max-h-[17rem] w-[24rem] bg-white z-50 shadow-2xl p-2 overflow-y-auto  rounded-lg">
                    {
                      suggestion ? (
                        suggestion.map((item, key) => (
                          <div key={key} className={`flex items-center p-1 ${key !== suggestion.length - 1 ? 'border-b' : ''} cursor-pointer gap-2`} onClick={() => (setDestination(item), setSuggestion(null))}>
                            {item.Tipo === "destino" ? (<div dangerouslySetInnerHTML={{ __html: icons.Data.MapPin }} />)
                              : (<div dangerouslySetInnerHTML={{ __html: icons.Data.Bed }} />)}
                            <div className="flex flex-col p-1 cursor-pointer" >
                              <label key={key} className="text-sm font-semibold cursor-pointer" >
                                {item.Titulo.charAt(0).toUpperCase() + item.Titulo.slice(1)}
                              </label>
                              <label className="text-xs cursor-pointer" >
                                {item.Lugar.charAt(0).toUpperCase() + item.Lugar.slice(1)}
                              </label>
                            </div>
                          </div>
                        ))
                      ) : (<p></p>)
                    }
                  </div>
                </ClickAwayListener>
              )}
            </div>
            <div className="gap-3 col-span-3 max-sm:col-span-1 bg-white flex items-center justify-center m-0.5 rounded-sm">
              <div dangerouslySetInnerHTML={{ __html: icons.Data.Calendar }} />
              <span 
                onClick={() => setOpenDate(!openDate)}
                className="placeholder-gray-600"
              >{`${formatDate(new Date(date[0].startDate))} - ${formatDate(new Date(date[0].endDate))}`}</span>
              {openDate && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => handleChangeDate([item.selection ? item.selection : item['Invalid Date']])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    locale={es}
                    months={2}
                    direction="horizontal"
                    className="absolute mt-100 shadow-xl z-20"
                    rangeColors={["#96c121"]}
                    minDate={new Date()}
                  />
                </ClickAwayListener>
              )}
            </div>
            <div className="gap-3 col-span-4 max-sm:col-span-1 bg-white flex items-center justify-center m-0.5 rounded-sm">
            <div dangerouslySetInnerHTML={{ __html: icons.Data.People }} />
              <span
                onClick={() => setOpenOptions(!openOptions)}
                className="placeholder-gray-600"
              >{`${options.adult} ${options.adult>1?"adultos":"adulto"} · 
              ${options.children} ${options.children!=1?"niños":"niño"} · 
              ${options.room} ${options.room>1?"habitaciones":"habitación"}`}</span>
              {openOptions && (
                <ClickAwayListener onClickAway={handleClickAway}>
                  <div className="absolute top-12 bg-white shadow-2xl px-1 py-2 z-50 rounded-lg">
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
            <div className="col-span-1 max-sm:col-span-1 bg-greenVE-500 flex items-center justify-center rounded-sm m-0.5 cursor-pointer" onClick={handleSearch}>
              <button className="bg-greenVE-500 h-10 text-white" >
                Buscar
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
    :
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
                  <div className=" absolute top-56 max-h-[17rem] w-80 bg-white z-50 shadow-2xl p-2 overflow-y-auto  rounded-lg">
                    {
                      suggestion ? (
                        suggestion.map((item, key) => (
                          <div key={key} className={`flex items-center p-1 ${key !== suggestion.length - 1 ? 'border-b' : ''} cursor-pointer gap-2`} onClick={() => (setDestination(item), setSuggestion(null))}>
                            {item.Tipo == "destino" ? (<div dangerouslySetInnerHTML={{ __html: icons.Data.MapPin }} />)
                              : (<div dangerouslySetInnerHTML={{ __html: icons.Data.Bed }} />)}
                            <div className="flex flex-col p-1 cursor-pointer" >
                              <label key={key} className="text-sm font-semibold cursor-pointer" >
                                {item.Titulo.charAt(0).toUpperCase() + item.Titulo.slice(1)}
                              </label>
                              <label className="text-xs cursor-pointer" >
                                {item.Lugar.charAt(0).toUpperCase() + item.Lugar.slice(1)}
                              </label>
                            </div>
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
                    >{`${formatDate(new Date(date[0].startDate))} - ${formatDate(new Date(date[0].endDate))}`}</span>
                    {openDate && (
                        <ClickAwayListener onClickAway={handleClickAway}>
                          <DateRange
                            editableDateInputs={true}
                            onChange={(item) => handleChangeDate([item.selection ? item.selection : item['Invalid Date']])}
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
                    >{`${options.adult} ${options.adult>1?"adultos":"adulto"} · 
                    ${options.children} ${options.children!=1?"niños":"niño"} · 
                    ${options.room} ${options.room>1?"habitaciones":"habitación"}`}</span>
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

export default SearchBar;
