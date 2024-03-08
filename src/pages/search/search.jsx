import Navbar from "../../components/global_components/navbar/Navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import SearchItem from "../../components/searchItem/SearchItem";
import SearchBar from "../../components/global_components/searchBar/searchBar";
import Slider from "react-slider";
import Footer from "../../components/global_components/footer/Footer";
import { getResultadoFiltro } from "../../controllers/establecimiento/establecimientoController";
import Filtro from "../../models/Filtro";
import SearchItemSkeleton from "../../components/searchItem/SearchItemSkeleton";
import MapScreen from "../../components/search_components/MapScreen";
import Icons from "../../global/icons";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import BingMapsReact from "bingmaps-react";

const Search = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //const [destination, setDestination] = useState(JSON.parse(decodeURIComponent(searchParams.get('destino'))));
  const destination=JSON.parse(decodeURIComponent(searchParams.get('destino')));
  //const [options, setOptions] = useState(JSON.parse(decodeURIComponent(searchParams.get('opciones'))));
  const options=JSON.parse(decodeURIComponent(searchParams.get('opciones')));
  const fechas = JSON.parse(decodeURIComponent(searchParams.get('fechas')))
  const dateTmp = [{
    startDate: new Date(fechas[0].startDate),
    endDate: new Date(fechas[0].endDate),
    key: new Date(fechas.key)
  }]
  const [coinEncontrada, setCoinEncontrada]=useState(false);
  //const [date, setDate] = useState(dateTmp);
  const date = dateTmp;
  const [minPrice, setMinPrice] = useState(10)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [prices, setPrices] = useState([minPrice, maxPrice])
  const [data, setData] = useState(null)
  const [dataFinal, setDataFinal] = useState(null)
  const [filtroNombre, setFiltroNombre] = useState("Estrellas (Mayor a menor)")
  const [openFilters, setOpenFilters] = useState(false);
  const filtro = new Filtro()
  const icons = new Icons()


  filtro.IdDestino = destination.Id
  filtro.TipoDestino = destination.Tipo
  filtro.txtBusqueda = destination.Titulo
  filtro.Fechas = {
    "inicio": `${format(date[0].startDate, "yyyy-MM-dd")}`,
    "fin": `${format(date[0].endDate, "yyyy-MM-dd")}`
  }
  filtro.Pax = {
    "adultos": options.adult,
    "ninos": options.children,
    "edadninos": options.childrenAges
  }
  async function fetchData(filtro) {
    try {
      getResultadoFiltro(filtro)
        .then((result) => {
          
          if (result) {
            console.log(result)
            if(result===401){
              localStorage.removeItem("datos");
              window.location.reload();
            }else{
              result.Establecimientos.sort((a, b) => {
                // Comprueba si el nombre del hotel coincide con la palabra clave
                const aCoincide = a.Titulo.toLowerCase().includes(filtro.txtBusqueda.toLowerCase());
                const bCoincide = b.Titulo.toLowerCase().includes(filtro.txtBusqueda.toLowerCase());
              
                // Si uno de los hoteles coincide, ese se coloca primero
                if (aCoincide && !bCoincide) {
                  setCoinEncontrada(true);
                  return -1;
                } else if (!aCoincide && bCoincide) {
                  return 1;
                }
              
                // Si ninguno coincide o ambos coinciden, ordena por catalogación
                return b.Catalogacion - a.Catalogacion;
              });
              setDataFinal(result)
              setData(result)
              setMinPrice(parseFloat(result.PrecioMinimo))
              setMaxPrice(parseFloat(result.PrecioMaximo))
              setPrices([parseFloat(result.PrecioMinimo), parseFloat(result.PrecioMaximo)])
            }
          }else{
            console.log("falló");
          }
        })
    } catch (error) {
      console.error("Error:", error);
    }
  }
  useEffect(() => {
    fetchData(filtro);

  }, []);

  useEffect(() => {
    if (dataFinal) {
      const ofertasTmp = dataFinal.Establecimientos;
      const ofertasFiltradas = ofertasTmp.filter(establecimiento => {
        return establecimiento.PrecioSinImpuestos >= prices[0] && establecimiento.PrecioSinImpuestos <= prices[1];
      });

      // Clona el objeto data para evitar modificar dataFinal
      const dataClone = { ...data };
      dataClone.Establecimientos = ofertasFiltradas;
      setData(dataClone)
    }
  }, [prices]);

  const handleFilterChange = (id) => {
    setOpenFilters(!openFilters)
    if (id === 0) {
      setFiltroNombre("Estrellas (Mayor a menor)")
      data.Establecimientos.sort((a, b) => b.Catalogacion - a.Catalogacion)
    }
    if (id === 1) {
      setFiltroNombre("Estrellas (Menor a mayor)")
      data.Establecimientos.sort((a, b) => a.Catalogacion - b.Catalogacion)
    }
    if (id === 2) {
      setFiltroNombre("Precio (Menor a mayor)")
      data.Establecimientos.sort((a, b) => a.PrecioSinImpuestos - b.PrecioSinImpuestos)
    }
    if (id === 3) {
      setFiltroNombre("Precio (Mayor a menor)")
      data.Establecimientos.sort((a, b) => b.PrecioSinImpuestos - a.PrecioSinImpuestos)
    }
    if (id === 4) {
      setFiltroNombre("Ahorro (Menor a mayor)")
      data.Establecimientos.sort((a, b) => a.PorcentajeAhorro - b.PorcentajeAhorro)
    }
    if (id === 5) {
      setFiltroNombre("Ahorro (Mayor a menor)")
      data.Establecimientos.sort((a, b) => b.PorcentajeAhorro - a.PorcentajeAhorro)
    }
    if (id === 6) {
      setFiltroNombre("Establecimiento (A - Z)")
      data.Establecimientos.sort((a, b) => a.Titulo.localeCompare(b.Titulo))
    }
    if (id === 7) {
      setFiltroNombre("Establecimiento (Z - A)")
      data.Establecimientos.sort((a, b) => b.Titulo.localeCompare(a.Titulo))
    }
    if (id === 8) {
      setFiltroNombre("Ciudad (A - Z)")
      data.Establecimientos.sort((a, b) => a.Ciudad.localeCompare(b.Ciudad))
    }
    if (id === 9) {
      setFiltroNombre("Ciudad (Z - A)")
      data.Establecimientos.sort((a, b) => b.Ciudad.localeCompare(a.Ciudad))
    }
    if (id === 10) {
      setFiltroNombre("País (A - Z)")
      data.Establecimientos.sort((a, b) => a.Pais.localeCompare(b.Pais))
    }
    if (id === 11) {
      setFiltroNombre("País (Z - A)")
      data.Establecimientos.sort((a, b) => b.Pais.localeCompare(a.Pais))
    }
  }

  const [checkboxStates, setCheckboxStates] = useState([]);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAwURL3bmODrFj1G0RUpgVT6DlGvlkhQzo',//"AIzaSyA6HUJy-ywbROEmCSK-Nx4-smVRLRVyR84",
  }); 

  const handleCheckBoxChange = (id) => {
    setCheckboxStates(prevState => {
      const updatedStates = {
        ...prevState,
        [id]: !prevState[id],
      };
      var servicios = []
      for (const servicio in updatedStates) {
        if (updatedStates[servicio]) {
          servicios.push(servicio)
        }
      }
  
      if (dataFinal) {
        const ofertasTmp = dataFinal.Establecimientos;
  
        // Verifica si la lista de servicios está vacía y muestra la data completa
        if (servicios.length === 0) {
          const dataClone = { ...data };
          dataClone.Establecimientos = ofertasTmp;
          setData(dataClone);
          return updatedStates;
        }
  
        const ofertasFiltradas = ofertasTmp.filter(establecimiento => {
          // Verifica si establecimiento.Servicios es un array y no es undefined
          const serviciosValidos = Array.isArray(establecimiento.Servicios) &&
            establecimiento.Servicios.some(servicio => servicios.includes(servicio.Valor));
  
          // Verifica si establecimiento.Incluye es un valor válido y está en la lista de servicios
          const incluyeValidos = Array.isArray(establecimiento.Incluye) &&
            establecimiento.Incluye.some(servicio => servicios.includes(servicio.Valor));
  
          // Verifica si establecimiento.ServiciosHab es un valor válido y está en la lista de servicios
          const serviciosHabValidos = Array.isArray(establecimiento.ServiciosHab) &&
            establecimiento.ServiciosHab.some(servicio => servicios.includes(servicio.Valor));
  
          // Retorna true si al menos una de las condiciones se cumple
          return serviciosValidos || incluyeValidos || serviciosHabValidos;
        });
  
        // Clona el objeto data para evitar modificar dataFinal
        const dataClone = { ...data };
        dataClone.Establecimientos = ofertasFiltradas;
        setData(dataClone);
      }
  
      return updatedStates;
    });
  };


  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div >
      <Navbar />
      <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        <SearchBar
        type={1}
          Place={destination}
          Dates={date}
          Options={options}
          NewPage={true}
        />
      </div>
      <div >
        {
          data && (
            <MapScreen
              isOpen={isModalOpen}
              onClose={closeModal}
              data={data.Establecimientos}
              destination={destination}
              date={date}
              options={options} />
          )
          }
      </div>
      <div className="flex mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">

        <div className="w-3/12 mr-5">
          
          <div className="relative aspect-w-3 aspect-h-2 h-44 mb-4 z-0">
                <div className="absolute w-full h-full z-10 aspect-w-3 rounded-md bg-gray-400 bg-opacity-20 flex items-center justify-center">
                <button
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-greenVE-500 text-white px-3 py-1 rounded-full"
              onClick={openModal}>
              Ver en Mapa
            </button>
                </div>{
                  
                  data?
                    <BingMapsReact
                    bingMapsKey="AuSqEteaBOw8m-3YvPjgvgjh9XysayCKT5xj4GmKONe5aNQZHbtTgAccVtsjf45Z"
                    viewOptions={{
                      center: { latitude: data.Establecimientos[0].Latitud, longitude: data.Establecimientos[0].Longitud },
                      zoom: 15,
                      mapTypeId: "aerialWithLabels",
                    }}
                    mapOptions={{
                      showZoomButtons: false,
                      showMapTypeSelector: false,
                      showBreadcrumb: false,
                      showLocateMeButton: false,
                    }}
                  />
                  
                  /*<GoogleMap
                  mapContainerStyle={{
                    width: '100%', // Ajuste el ancho al 100% para que se adapte al contenedor
                    height: '180px', // Ajuste la altura según sus necesidades
                    borderRadius: "3%", 
                  }}
                  center={{
                    lat: data.Establecimientos[0].Latitud,
                    lng: data.Establecimientos[0].Longitud,
                  }}
                  zoom={16}
                  options={{fullscreenControl: false}}
                >
                </GoogleMap>*/:
                <div className="mb-4 relative h-44 rounded-md">
                <img src="./img/map.svg" alt="Mi Imagen" className="w-full h-full object-cover rounded-md" />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-md"></div>
                <button
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-greenVE-500 text-white px-3 py-1 rounded-full"
                  onClick={openModal}>
                  Ver en Mapa
                </button>
              </div>
                }
                
              </div>

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
                  className="w-full h-1.5 rounded-full bg-gray-300 z-20 "
                  trackClassName="h-2 rounded-full overflow-hiden relative "
                  trackOneClassName="h-2 rounded-full overflow-hiden relative bg-greenVE-500 "
                  thumbClassName="w-6 h-6 cursor-pointer bg-greenVE-500 border-2 border-white rounded-full -mt-2"
                  onChange={
                    setPrices
                  }
                  value={prices}
                  min={minPrice}
                  max={maxPrice} />
              </div>
            </div>
            {
              data ? (
                <div className="flex flex-col">
                  <div className="border-b-2 p-2">
                    {
                      data.Servicios && (
                        <div className="flex flex-col">
                          <h2 className="font-bold text-base">Servicios del hotel</h2>
                          {
                            data.Servicios.map((item) => (
                              <label key={item.Valor}>
                                <input type="checkbox" onChange={() => handleCheckBoxChange(item.Valor)} checked={checkboxStates[item.Valor]} />
                                <span className="pl-2">{item.Titulo}</span>
                              </label>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                  <div className="border-b-2 p-2">
                    {
                      data.ServiciosHab && (
                        <div className="flex flex-col">
                          <h2 className="font-bold text-base">Servicios de habitación</h2>
                          {
                            data.ServiciosHab.map((item) => (
                              <label key={item.Valor}>
                                <input type="checkbox" onChange={() => handleCheckBoxChange(item.Valor)} checked={checkboxStates[item.Valor]} />
                                <span className="pl-2">{item.Titulo}</span>
                              </label>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                  <div className="border-b-2 p-2">
                    {
                      data.Incluye && (
                        <div className="flex flex-col">
                          <h2 className="font-bold text-base">Incluye</h2>
                          {
                            data.Incluye.map((item) => (
                              <label key={item.Valor}>
                                <input type="checkbox" onChange={() => handleCheckBoxChange(item.Valor)} checked={checkboxStates[item.Valor]} />
                                <span className="pl-2">{item.Titulo}</span>
                              </label>
                            ))
                          }
                        </div>
                      )
                    }
                  </div>
                </div>
              ) : (
                Array(20).fill().map((_, index) => (
                  <div key={index} className="animate-pulse flex gap-2 m-3">
                    <div className="h-4 w-4 bg-gray-300 rounded-sm" />
                    <div className="h-4 w-56 bg-gray-300 rounded-sm" />
                  </div>
                ))

              )
            }
          </div>
        </div>
        <div className="w-9/12">
          <div className="flex">
            <div
              className="flex items-center gap-2 border-2 h-fit rounded-xl px-2 py-0.5 mb-3 text-sm cursor-pointer"
              onClick={() => data && setOpenFilters(!openFilters)}>
                <div dangerouslySetInnerHTML={{ __html: icons.Data.Filtro }} />
                 Ordenar por: {filtroNombre}
                 <div dangerouslySetInnerHTML={{ __html: icons.Data.SelectArrows }} />
                 </div>
                
            {openFilters && (<div className="absolute mt-8 flex flex-col bg-white border rounded-md shadow-xl z-50" >
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(0)}>
                Estrellas (Mayor a menor)
              </button>
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(1)}>
                Estrellas (Menor a mayor)
              </button>
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(2)}>
                Precio (Menor a mayor)
              </button>
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(3)}>
                Precio (Mayor a menor)
              </button>
              {/*<button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(4)}>
                  Ahorro (Menor a mayor)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(5)}>
                  Ahorro (Mayor a menor)
          </button>*/}
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(6)}>
                Establecimiento (A - Z)
              </button>
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(7)}>
                Establecimiento (Z - A)
              </button>
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(8)}>
                Ciudad (A - Z)
              </button>
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(9)}>
                Ciudad (Z - A)
              </button>
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(10)}>
                País (A - Z)
              </button>
              <button
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={() => handleFilterChange(11)}>
                País (Z - A)
              </button>
            </div>)}
          </div>
          {data
            ? (
              data.Establecimientos.map((item, index) => (
                <SearchItem
                  key={index}
                  firstElement={index===0?coinEncontrada?true:false:false}
                  options={options}
                  date={date}
                  destination={destination}
                  Establecimiento={item}
                />
              ))
            )
            : (<div>
              <SearchItemSkeleton />
              <SearchItemSkeleton />
              <SearchItemSkeleton />
              <SearchItemSkeleton />
            </div>)
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
