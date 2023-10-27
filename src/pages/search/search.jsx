import "./list.css";
import Navbar from "../../components/global_components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import SearchBar from "../../components/global_components/searchBar/searchBar";
import Slider from "react-slider";
import Footer from "../../components/global_components/footer/Footer";
import { getResultadoFiltro } from "../../controllers/establecimiento/establecimientoController";
import Filtro from "../../models/Filtro";
import SearchItemSkeleton from "../../components/searchItem/SearchItemSkeleton";

const Search = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);
  const minPrice = 20;
  const maxPrice = 1000;
  const [prices, setPrices] = useState([minPrice, maxPrice])
  const [data, setData] = useState(null)

  const filtro = new Filtro()

  filtro.IdDestino = destination.Id
  filtro.TipoDestino = destination.Tipo
  useEffect(() => {
    async function fetchData() {
      try {
        getResultadoFiltro(filtro)
          .then((result) => {
            if (result) {
              setData(result)
            }
          })

      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div >
      <Navbar />
      <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        <SearchBar
          Place={destination}
          Dates={date}
          Options={options} />
      </div>

      <div className="flex mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">

        <div className="w-3/12 mr-5">
          <div className="mb-4 relative h-44 rounded-md">
            <img src="/img/map.svg" alt="Mi Imagen" class="w-full h-full object-cover rounded-md" />
            <div class="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-md"></div>
            <button class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-greenVE-500 text-white px-3 py-1 rounded-full">Ver en Mapa</button>
          </div>

          <div className="border-2 rounded-md">
            <h2 className="font-bold text-lg pt-1 pl-2">Filtrar por</h2>
            <div className="border-y-2 p-2">
              <h2 className="font-bold text-base">Precio</h2>
              <div className="px-3 py-4">
                <div className="flex justify-between pb-2 text-sm">
                  <p>Min. ${prices[0]}</p>
                  <p>Max. ${prices[1]}</p>
                </div>
                <Slider
                  className="slider"
                  trackClassName="track"
                  onChange={setPrices}
                  value={prices}
                  min={minPrice}
                  max={maxPrice} />
              </div>
            </div>

            <div className="border-b-2 p-2">
              <h2 className="font-bold text-base">Servicios</h2>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Restaurant</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Parqueadero</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Bar cafetería</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Wi-Fi</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Servicio a la habitación</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Lavandería / Tintorería</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Servicio de seguridad</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Consigna de equipaje</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Sauna y Turco</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Piscina</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Gimnasio</span>
                </label>
              </div>
            </div>

            <div className="p-2">
              <h2 className="font-bold text-base">Tipo</h2>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Nacionales</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Internacionales</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Ganga</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Escápate</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Remate</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Especiales</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Feriados</span>
                </label>
              </div>
              <div>
                <label>
                  <input type="checkbox" onChange={null} />
                  <span className="pl-2">Business</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="w-9/12">
          {data
            ? (
              data.map((item)=>(
                <SearchItem 
                  Oferta={item}
                  Establecimiento={item.Establecimiento}
                />
              ))
            )
            : (<div>
               <SearchItemSkeleton/>
               <SearchItemSkeleton/>
               <SearchItemSkeleton/>
               <SearchItemSkeleton/>
            </div>)
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
