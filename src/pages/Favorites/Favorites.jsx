import { useEffect, useState } from "react";
import Footer from "../../components/global_components/footer/Footer";
import Navbar from "../../components/global_components/navbar/Navbar";
import { getFavoritos } from "../../controllers/establecimiento/establecimientoController";
import FavoriteItem from "../../components/favorites_components/FavoriteItem";
import FavoriteItemSkeleton from "../../components/favorites_components/FavoriteItemSkeleton";
import Icons from "../../global/icons";
import { es } from "react-date-range/dist/locale/";
import { ClickAwayListener } from "@mui/material";
import { DateRange } from "react-date-range";
import { sessionStatus } from "../../global/util";
import { Navigate } from "react-router-dom";

const Favorites = ({ isAuth }) => {
  const [data, setData] = useState();
  const [openDate, setOpenDate] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Definir 768 como el punto de corte para móvil

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date().setDate(new Date().getDate() + 1),
      key: "selection",
    },
  ]);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    childrenAges: [],
    room: 1,
  });

  const icons = new Icons();

  const formatDate = (date) => {
    const options = { day: "2-digit", month: "short" };
    const formattedDate = date.toLocaleDateString("es-ES", options);
    return formattedDate;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        getFavoritos().then((res) => {
          if (res) {
            if (res === 401) {
              localStorage.removeItem("datos");
              window.location.reload();
            } else {
              setData(res);
            }
          }
        });
      } catch (e) {}
    }
    fetchData();
  }, []);

  const handleChangeDate = (value) => {
    setDate(value);
  };

  const handleOption = (name, operation) => {
    if ((name === "children") & (operation === "i")) {
      const tmpSelectedAges = [...options["childrenAges"]];
      tmpSelectedAges.push(0);
      setOptions((prev) => {
        return {
          ...prev,
          childrenAges: tmpSelectedAges,
        };
      });
    }
    if ((name === "children") & (operation === "d")) {
      const tmpSelectedAges = [...options["childrenAges"]];
      tmpSelectedAges.pop();

      setOptions((prev) => {
        return {
          ...prev,
          childrenAges: tmpSelectedAges,
        };
      });
    }
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleAgeChange = (event, index) => {
    const newSelectedAges = [...options["childrenAges"]];
    newSelectedAges[index] = parseInt(event.target.value, 10);
    setOptions((prev) => {
      return {
        ...prev,
        childrenAges: newSelectedAges,
      };
    });
  };

  const constHandleClickDelete = (id) => {
    const list = data.filter((favorito) => favorito.Id !== id);
    setData(list);
  };

  return sessionStatus() ? (
    <div>
      <Navbar />
      <div className="flex flex-col mx-5 md:mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 gap-7">
        <h1 className="font-semibold text-3xl">Mis favoritos</h1>
        <div className="flex gap-2">
          <div>
            <div
              className="border border-greenVE-500 rounded-md px-2 py-1 flex items-center gap-2 cursor-pointer"
              onClick={() => setOpenDate(!openDate)}
            >
              <div dangerouslySetInnerHTML={{ __html: icons.Data.Calendar }} />
              <label className="text-greenVE-600 text-xs md:text-sm cursor-pointer">
                {formatDate(date[0].startDate)} -{" "}
                {formatDate(new Date(date[0].endDate))}
              </label>
              <div
                dangerouslySetInnerHTML={{ __html: icons.Data.SelectArrows }}
              />
            </div>
            {openDate && (
              <ClickAwayListener onClickAway={() => setOpenDate(!openDate)}>
                <DateRange
                  editableDateInputs={true}
                  onChange={(item) =>
                    handleChangeDate([
                      item.selection ? item.selection : item["Invalid Date"],
                    ])
                  }
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  locale={es}
                  months={1}
                  direction="horizontal"
                  className="absolute mt-2 shadow-xl z-50"
                  rangeColors={["#96c121"]}
                  minDate={new Date()}
                />
              </ClickAwayListener>
            )}
          </div>
          <div>
            <div
              className="border border-greenVE-500 rounded-md px-2 py-1 flex items-center gap-2"
              onClick={() => setOpenOptions(!openOptions)}
            >
              <div dangerouslySetInnerHTML={{ __html: icons.Data.People }} />
              <label className="text-greenVE-600 text-xs md:text-sm ">
                {options.adult +
                  (options.adult > 1 ? " adultos · " : " adulto · ") +
                  (options.children > 0
                    ? options.children +
                      (options.children > 1 ? " niños · " : " niño · ")
                    : "") +
                  options.room +
                  (options.room > 1 ? " habitaciones" : " habitación")}
              </label>
              <div
                dangerouslySetInnerHTML={{ __html: icons.Data.SelectArrows }}
              />
            </div>
            {openOptions && (
              <ClickAwayListener
                onClickAway={() => setOpenOptions(!openOptions)}
              >
                <div className="absolute right-5 md:right-0 md:mt-1 bg-white shadow-2xl px-1 py-2 z-50 rounded-lg">
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
                      <span className="w-7 text-center">{options.adult}</span>
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
                        value={options["childrenAges"][index]}
                        className="px-2 bg-white border border-greenVE-400 rounded-sm mt-2"
                        onChange={(event) => handleAgeChange(event, index)}
                      >
                        <option value="0" data-key="0">
                          0 años
                        </option>
                        <option value="1" data-key="1">
                          1 año
                        </option>
                        <option value="2" data-key="2">
                          2 años
                        </option>
                        <option value="3" data-key="3">
                          3 años
                        </option>
                        <option value="4" data-key="4">
                          4 años
                        </option>
                        <option value="5" data-key="5">
                          5 años
                        </option>
                        <option value="6" data-key="6">
                          6 años
                        </option>
                        <option value="7" data-key="7">
                          7 años
                        </option>
                        <option value="8" data-key="8">
                          8 años
                        </option>
                        <option value="9" data-key="9">
                          9 años
                        </option>
                        <option value="10" data-key="10">
                          10 años
                        </option>
                        <option value="11" data-key="11">
                          11 años
                        </option>
                        <option value="12" data-key="12">
                          12 años
                        </option>
                      </select>
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
                      <span className="w-7 text-center">{options.room}</span>
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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {data
            ? data.map((item, index) => (
                <div key={index}>
                  <FavoriteItem
                    favorito={item}
                    date={date}
                    options={options}
                    eliminarFavorito={constHandleClickDelete}
                  ></FavoriteItem>
                </div>
              ))
            : Array.from({ length: 6 }, (item, index) => (
                <div key={index}>
                  <FavoriteItemSkeleton />
                </div>
              ))}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <Navigate to="/" />
  );
};
export default Favorites;
