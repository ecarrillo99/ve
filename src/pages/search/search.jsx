import { useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { format } from "date-fns";
import { getResultadoFiltro } from "../../controllers/establecimiento/establecimientoController";
import Filtro from "../../models/Filtro";
import Icons from "../../global/icons";
import BingMapsReact from "bingmaps-react";
import Slider from "react-slider";

const Navbar = lazy(() => import("../../components/global_components/navbar/Navbar"));
const SearchItem = lazy(() => import("../../components/searchItem/SearchItem"));
const SearchBar = lazy(() => import("../../components/global_components/searchBar/searchBar"));
const Footer = lazy(() => import("../../components/global_components/footer/Footer"));
const SearchItemSkeleton = lazy(() => import("../../components/searchItem/SearchItemSkeleton"));
const MapScreen = lazy(() => import("../../components/search_components/MapScreen"));

// Mobile-only components (previously in SearchMobile)
const FilterBar = lazy(() => import("../../components/search_components/mobile_search/FilterBar"));
const SearchResult = lazy(() => import("../../components/search_components/mobile_search/SearchResult"));
const SearchResultSkeleton = lazy(() => import("../../components/search_components/mobile_search/SearchResultSkeleton"));

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const destination = JSON.parse(decodeURIComponent(searchParams.get("destino")));
  const options = JSON.parse(decodeURIComponent(searchParams.get("opciones")));
  const fechas = JSON.parse(decodeURIComponent(searchParams.get("fechas")));
  const dateTmp = [{
    startDate: new Date(fechas[0].startDate),
    endDate: new Date(fechas[0].endDate),
    key: new Date(fechas.key),
  }];

  const [coinEncontrada, setCoinEncontrada] = useState(false);
  const date = dateTmp;
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [prices, setPrices] = useState([minPrice, maxPrice]);
  const [data, setData] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [sinResultados, setSinResultados] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("Estrellas (Mayor a menor)");
  const [openFilters, setOpenFilters] = useState(false);
  const [checkboxStates, setCheckboxStates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  // Mobile-only sort state
  const [selectedFiltro, setSelectedFiltro] = useState("0");

  const filtro = new Filtro();
  const icons = new Icons();

  filtro.IdDestino = destination.Id;
  filtro.TipoDestino = destination.Tipo;
  filtro.txtBusqueda = destination.Titulo;
  filtro.Fechas = {
    inicio: `${format(date[0].startDate, "yyyy-MM-dd")}`,
    fin: `${format(date[0].endDate, "yyyy-MM-dd")}`,
  };
  filtro.Pax = {
    adultos: options.adult,
    ninos: options.children,
    edadninos: options.childrenAges,
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function fetchData(filtro) {
    try {
      getResultadoFiltro(filtro).then((result) => {
        if (result) {
          if (result === 401) {
            localStorage.removeItem("datos");
            window.location.reload();
          } else {
            if (result.Establecimientos.length > 0) {
              result.Establecimientos.sort((a, b) => {
                const aCoincide = a.Titulo.toLowerCase().includes(filtro.txtBusqueda.toLowerCase());
                const bCoincide = b.Titulo.toLowerCase().includes(filtro.txtBusqueda.toLowerCase());
                if (aCoincide && !bCoincide) { setCoinEncontrada(true); return -1; }
                else if (!aCoincide && bCoincide) return 1;
                return b.Catalogacion - a.Catalogacion;
              });
              setDataFinal(result);
              setData(result);
              setMinPrice(parseFloat(result.PrecioMinimo));
              setMaxPrice(parseFloat(result.PrecioMaximo));
              setPrices([parseFloat(result.PrecioMinimo), parseFloat(result.PrecioMaximo)]);
              filtro.Habitaciones = options.room;
            } else {
              setSinResultados(true);
            }
          }
        } else {
          setSinResultados(true);
        }
      });
    } catch (error) {
      setSinResultados(true);
      console.error("Error:", error);
    }
  }

  useEffect(() => { fetchData(filtro); }, []);

  useEffect(() => {
    if (dataFinal) {
      const ofertasFiltradas = dataFinal.Establecimientos.filter(
        (e) => e.PrecioSinImpuestos >= prices[0] && e.PrecioSinImpuestos <= prices[1]
      );
      setData({ ...data, Establecimientos: ofertasFiltradas });
    }
  }, [prices]);

  // ── Desktop sort ────────────────────────────────────────────
  const handleFilterChange = (id) => {
    setOpenFilters(!openFilters);
    const sorts = {
      0: (a, b) => b.Catalogacion - a.Catalogacion,
      1: (a, b) => a.Catalogacion - b.Catalogacion,
      2: (a, b) => a.PrecioSinImpuestos - b.PrecioSinImpuestos,
      3: (a, b) => b.PrecioSinImpuestos - a.PrecioSinImpuestos,
      4: (a, b) => a.PorcentajeAhorro - b.PorcentajeAhorro,
      5: (a, b) => b.PorcentajeAhorro - a.PorcentajeAhorro,
      6: (a, b) => a.Titulo.localeCompare(b.Titulo),
      7: (a, b) => b.Titulo.localeCompare(a.Titulo),
      8: (a, b) => a.Ciudad.localeCompare(b.Ciudad),
      9: (a, b) => b.Ciudad.localeCompare(a.Ciudad),
      10: (a, b) => a.Pais.localeCompare(b.Pais),
      11: (a, b) => b.Pais.localeCompare(a.Pais),
    };
    const labels = {
      0: "Estrellas (Mayor a menor)", 1: "Estrellas (Menor a mayor)",
      2: "Precio (Menor a mayor)", 3: "Precio (Mayor a menor)",
      4: "Ahorro (Menor a mayor)", 5: "Ahorro (Mayor a menor)",
      6: "Establecimiento (A - Z)", 7: "Establecimiento (Z - A)",
      8: "Ciudad (A - Z)", 9: "Ciudad (Z - A)",
      10: "País (A - Z)", 11: "País (Z - A)",
    };
    setFiltroNombre(labels[id]);
    if (data) data.Establecimientos.sort(sorts[id]);
  };

  // ── Mobile sort ─────────────────────────────────────────────
  const handleOrderChange = (id) => {
    setSelectedFiltro(id);
    const sorts = {
      "0": (a, b) => b.Catalogacion - a.Catalogacion,
      "1": (a, b) => a.Catalogacion - b.Catalogacion,
      "2": (a, b) => b.PrecioSinImpuestos - a.PrecioSinImpuestos,
      "3": (a, b) => a.PrecioSinImpuestos - b.PrecioSinImpuestos,
      "4": (a, b) => a.Titulo.localeCompare(b.Titulo),
      "5": (a, b) => b.Titulo.localeCompare(a.Titulo),
    };
    if (data) data.Establecimientos.sort(sorts[id]);
  };

  // ── Checkbox filter ─────────────────────────────────────────
  const handleCheckBoxChange = (id) => {
    setCheckboxStates((prevState) => {
      const updatedStates = { ...prevState, [id]: !prevState[id] };
      const servicios = Object.keys(updatedStates).filter((k) => updatedStates[k]);
      if (dataFinal) {
        const ofertasTmp = dataFinal.Establecimientos;
        if (servicios.length === 0) {
          setData({ ...data, Establecimientos: ofertasTmp });
          return updatedStates;
        }
        const filtered = ofertasTmp.filter((e) =>
          [e.Servicios, e.Incluye, e.ServiciosHab].some(
            (arr) => Array.isArray(arr) && arr.some((s) => servicios.includes(s.Valor))
          )
        );
        setData({ ...data, Establecimientos: filtered });
      }
      return updatedStates;
    });
  };

  const EmptyState = () => (
    <div className={`flex flex-col ${isMobile ? "" : "items-center"} justify-center mt-10`}>
      <span className="icon-[fluent--search-info-20-regular] h-28 w-28 text-greenVE-600" />
      <label className="text-center text-sm">
        La búsqueda no ha generado resultados.<br />
        Intenta con otras fechas, ciudad o establecimiento.
      </label>
    </div>
  );

  if (isMobile) {
    return (
      <div>
        <Suspense><Navbar /></Suspense>
        <Suspense>
          <SearchBar filtro={filtro} type={4} Place={destination} Dates={date} Options={options} NewPage={true} />
        </Suspense>
        <Suspense>
          <FilterBar
            handleOrderChange={handleOrderChange}
            handleCheckBoxChange={handleCheckBoxChange}
            checkboxStates={checkboxStates}
            selectedFiltro={selectedFiltro}
            data={data}
            prices={prices}
            setPrices={setPrices}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        </Suspense>
        {data ? (
          <Suspense>
            <SearchResult
              Establecimientos={data.Establecimientos}
              filtro={filtro}
              options={options}
              date={date}
              destination={destination}
              Destacado={coinEncontrada}
            />
          </Suspense>
        ) : sinResultados ? (
          <EmptyState />
        ) : (
          <Suspense><SearchResultSkeleton /></Suspense>
        )}
        <Suspense><Footer /></Suspense>
      </div>
    );
  }

  return (
    <div>
      <Suspense><Navbar /></Suspense>
      <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        <Suspense>
          <SearchBar type={1} Place={destination} Dates={date} Options={options} NewPage={true} />
        </Suspense>
      </div>

      {data && (
        <Suspense>
          <MapScreen
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            data={data.Establecimientos}
            destination={destination}
            date={date}
            options={options}
          />
        </Suspense>
      )}

      <div className="flex mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        {/* ── Sidebar ── */}
        <div className="w-3/12 mr-5">
          {/* Mapa */}
          <div className="relative aspect-w-3 aspect-h-2 h-44 mb-4 z-0">
            <div className="absolute w-full h-full z-10 rounded-md bg-gray-400 bg-opacity-20 flex items-center justify-center">
              <button
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-greenVE-500 text-white px-3 py-1 rounded-full"
                onClick={() => setIsModalOpen(true)}
              >
                Ver en Mapa
              </button>
            </div>
            {data ? (
              <Suspense>
                <BingMapsReact
                  bingMapsKey="AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z"
                  viewOptions={{
                    center: { latitude: data.Establecimientos[0].Latitud, longitude: data.Establecimientos[0].Longitud },
                    zoom: 15,
                    mapTypeId: "aerialWithLabels",
                  }}
                  mapOptions={{ showZoomButtons: false, showMapTypeSelector: false, showBreadcrumb: false, showLocateMeButton: false }}
                />
              </Suspense>
            ) : (
              <div className="mb-4 relative h-44 rounded-md">
                <img src="https://visitaecuador.com/img/web/map.svg" className="w-full h-full object-cover rounded-md" />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-md" />
                <button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-greenVE-500 text-white px-3 py-1 rounded-full"
                  onClick={() => setIsModalOpen(true)}
                >
                  Ver en Mapa
                </button>
              </div>
            )}
          </div>

          {/* Filtros */}
          <div className="border-2 rounded-md">
            <h2 className="font-bold text-lg pt-1 pl-2">Filtrar por</h2>
            <div className="border-y-2 p-2">
              <h2 className="font-bold text-base">Precio</h2>
              <div className="px-3 py-4">
                <div className="flex justify-between pb-2 text-sm">
                  <p>Min. ${Math.round(parseFloat(prices[0]))}</p>
                  <p>Max. ${Math.round(parseFloat(prices[1]))}</p>
                </div>
                <Slider
                  className="w-full h-1.5 rounded-full bg-gray-300 z-20"
                  trackClassName="h-2 rounded-full overflow-hidden relative"
                  trackOneClassName="h-2 rounded-full overflow-hidden relative bg-greenVE-500"
                  thumbClassName="w-6 h-6 cursor-pointer bg-greenVE-500 border-2 border-white rounded-full -mt-2"
                  onChange={setPrices}
                  value={prices}
                  min={minPrice}
                  max={maxPrice}
                />
              </div>
            </div>
            {data ? (
              <div className="flex flex-col">
                {data.Servicios && (
                  <div className="flex flex-col border-b-2 p-2">
                    <h2 className="font-bold text-base">Servicios del hotel</h2>
                    {data.Servicios.map((item) => (
                      <label key={item.Valor}>
                        <input type="checkbox" onChange={() => handleCheckBoxChange(item.Valor)} checked={!!checkboxStates[item.Valor]} />
                        <span className="pl-2">{item.Titulo}</span>
                      </label>
                    ))}
                  </div>
                )}
                {data.ServiciosHab && (
                  <div className="flex flex-col border-b-2 p-2">
                    <h2 className="font-bold text-base">Servicios de habitación</h2>
                    {data.ServiciosHab.map((item) => (
                      <label key={item.Valor}>
                        <input type="checkbox" onChange={() => handleCheckBoxChange(item.Valor)} checked={!!checkboxStates[item.Valor]} />
                        <span className="pl-2">{item.Titulo}</span>
                      </label>
                    ))}
                  </div>
                )}
                {data.Incluye && (
                  <div className="flex flex-col border-b-2 p-2">
                    <h2 className="font-bold text-base">Incluye</h2>
                    {data.Incluye.map((item) => (
                      <label key={item.Valor}>
                        <input type="checkbox" onChange={() => handleCheckBoxChange(item.Valor)} checked={!!checkboxStates[item.Valor]} />
                        <span className="pl-2">{item.Titulo}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ) : sinResultados ? null : (
              Array(20).fill(null).map((_, i) => (
                <div key={i} className="animate-pulse flex gap-2 m-3">
                  <div className="h-4 w-4 bg-gray-300 rounded-sm" />
                  <div className="h-4 w-56 bg-gray-300 rounded-sm" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* ── Results ── */}
        <div className="w-9/12">
          <div className="flex relative">
            <div
              className="flex items-center gap-2 border-2 h-fit rounded-xl px-2 py-0.5 mb-3 text-sm cursor-pointer"
              onClick={() => data && setOpenFilters(!openFilters)}
            >
              <div dangerouslySetInnerHTML={{ __html: icons.Data.Filtro }} />
              Ordenar por: {filtroNombre}
              <div dangerouslySetInnerHTML={{ __html: icons.Data.SelectArrows }} />
            </div>
            {openFilters && (
              <div className="absolute mt-8 flex flex-col bg-white border rounded-md shadow-xl z-50">
                {[
                  "Estrellas (Mayor a menor)", "Estrellas (Menor a mayor)",
                  "Precio (Menor a mayor)", "Precio (Mayor a menor)",
                  "Establecimiento (A - Z)", "Establecimiento (Z - A)",
                  "Ciudad (A - Z)", "Ciudad (Z - A)",
                  "País (A - Z)", "País (Z - A)",
                ].map((label, i) => {
                  const ids = [0, 1, 2, 3, 6, 7, 8, 9, 10, 11];
                  return (
                    <button key={i} className="hover:bg-gray-200 px-2 py-1 text-sm" onClick={() => handleFilterChange(ids[i])}>
                      {label}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {data ? (
            data.Establecimientos.map((item, index) => (
              <Suspense key={index}>
                <SearchItem
                  firstElement={index === 0 && coinEncontrada}
                  options={options}
                  date={date}
                  destination={destination}
                  Establecimiento={item}
                />
              </Suspense>
            ))
          ) : sinResultados ? (
            <EmptyState />
          ) : (
            <div>
              {[1, 2, 3, 4].map((i) => <Suspense key={i}><SearchItemSkeleton /></Suspense>)}
            </div>
          )}
        </div>
      </div>
      <Suspense><Footer /></Suspense>
    </div>
  );
};

export default Search;