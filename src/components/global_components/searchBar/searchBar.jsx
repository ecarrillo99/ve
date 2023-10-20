import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useState } from "react";
import {es} from 'react-date-range/dist/locale/';
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@material-ui/core";

const SearchBar = ({ type }) => {
  const handleClickAway = () => {
    if(openDate){
      setOpenDate(false)
    }
    if(openOptions){
      setOpenOptions(false)
    }
	};
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleSearch = () => {
    navigate("/hotels", { state: { destination, date, options } });
  };

  return (
    <div className="bg-white">
      {type !== "list" && (
        <>

          <div className="bottom-[0px] bg-greenVE-500 relative rounded-md w-full">
            <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-flow-row">
              <div className=" col-span-3 max-sm:col-span-1  bg-white flex items-center justify-center m-0.5 rounded-md pl-4">
                <FontAwesomeIcon icon={faBed} className="pr-2 text-gray-500" />
                <input
                  type="text"
                  placeholder=" ¿A dónde vas?"
                  className="w-full max-w-full overflow-hidden placeholder-gray-600 mr-4"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="col-span-3 max-sm:col-span-1 bg-white flex items-center justify-center m-0.5 rounded-md">
                <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500 pr-2" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="placeholder-gray-600"
                >{`${format(date[0].startDate, "MM/dd/yyyy")} al ${format(
                  date[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                      <DateRange
                      editableDateInputs={true}
                      onChange={(item) => setDate([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={date}
                      locale={es}
                      className="absolute mt-100 shadow-xl z-20"
                      minDate={new Date()}
                    />
                  </ClickAwayListener>
                )}
              </div>
              <div className="col-span-4 max-sm:col-span-1 bg-white flex items-center justify-center m-0.5 rounded-md">
                <FontAwesomeIcon icon={faPerson} className="text-gray-500 pr-2" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="placeholder-gray-600"
                >{`${options.adult} Adulto(s) · ${options.children} Niño(s) · ${options.room} Hab.`}</span>
                {openOptions && (
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adultos</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Niños</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Habitaciones</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
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
              <div className="col-span-2 max-sm:col-span-1 bg-greenVE-500 flex items-center justify-center rounded-md m-0.5">
                <button className="bg-greenVE-500 h-10 text-white" onClick={handleSearch}>
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
