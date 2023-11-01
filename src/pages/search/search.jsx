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
import MapScreen from "../../components/search_components/MapScreen";

const Search = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [options, setOptions] = useState(location.state.options);
  const [date, setDate] = useState(location.state.date);
  const [minPrice, setMinPrice] = useState(10)
  const [maxPrice, setMaxPrice] = useState(1000)
  const [prices, setPrices] = useState([minPrice, maxPrice])
  const [data, setData] = useState(null)
  const [dataFinal, setDataFinal] = useState(null)
  const [filtroNombre, setFiltroNombre] = useState("Defecto")
  const [services, setServices] = useState([])
  const [openFilters, setOpenFilters] = useState(false);
  const filtro = new Filtro()

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
            setDataFinal(result)
            setData(result)
            setMinPrice(parseInt(result.PrecioMinimo))
            setMaxPrice(parseInt(result.PrecioMaximo))
            setPrices([parseInt(result.PrecioMinimo), parseInt(result.PrecioMaximo)])
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
    const ofertasTmp = dataFinal.Ofertas;
    const ofertasFiltradas = ofertasTmp.filter(oferta => {
      return oferta.Final >= prices[0] && oferta.Final <= prices[1];
    });

    // Clona el objeto data para evitar modificar dataFinal
    const dataClone = { ...data };
    dataClone.Ofertas = ofertasFiltradas;
    setData(dataClone)

    console.log(dataClone);
    console.log(dataFinal);
  }
}, [prices]);

  const handleFilterChange=(id)=>{
    setOpenFilters(!openFilters)
    if(id==1){
      setFiltroNombre("Precio Final (Menor a mayor)")
      data.Ofertas.sort((a,b)=>a.Final-b.Final)
    }
    if(id==2){
      setFiltroNombre("Precio Final (Mayor a menor)")
      data.Ofertas.sort((a,b)=>b.Final-a.Final)
    }
    if(id==3){
      setFiltroNombre("Ahorro (Menor a mayor)")
      console.log(data.Ofertas.sort((a,b)=>a.PorcentajeAhorro-b.PorcentajeAhorro))
    }
    if(id==4){
      setFiltroNombre("Ahorro (Mayor a menor)")
      console.log(data.Ofertas.sort((a,b)=>b.PorcentajeAhorro-a.PorcentajeAhorro))
    }
    if(id==5){
      setFiltroNombre("Establecimiento (A - Z)")
      console.log(data.Ofertas.sort((a,b)=>a.Establecimiento.Titulo.localeCompare(b.Establecimiento.Titulo)))
    }
    if(id==6){
      setFiltroNombre("Establecimiento (Z - A)")
      console.log(data.Ofertas.sort((a,b)=>b.Establecimiento.Titulo.localeCompare(a.Establecimiento.Titulo)))
    }
    if(id==7){
      setFiltroNombre("Ciudad (A - Z)")
      console.log(data.Ofertas.sort((a,b)=>a.Establecimiento.Ciudad.localeCompare(b.Establecimiento.Ciudad)))
    }
    if(id==8){
      setFiltroNombre("Ciudad (Z - A)")
      console.log(data.Ofertas.sort((a,b)=>b.Establecimiento.Ciudad.localeCompare(a.Establecimiento.Ciudad)))
    }
    if(id==9){
      setFiltroNombre("País (A - Z)")
      console.log(data.Ofertas.sort((a,b)=>a.Establecimiento.Pais.localeCompare(b.Establecimiento.Pais)))
    }
    if(id==10){
      setFiltroNombre("País (Z - A)")
      console.log(data.Ofertas.sort((a,b)=>b.Establecimiento.Pais.localeCompare(a.Establecimiento.Pais)))
    }
  }

  const [checkboxStates, setCheckboxStates] = useState([]);

  const handleCheckBoxChange = (id) => {
    setCheckboxStates({
      ...checkboxStates,
      [id]: !checkboxStates[id],
    });
    var servicios = []
    for (const servicio in checkboxStates) {
      servicios.push(servicio)
    }
    filtro.IdServicios = servicios
    console.log(filtro)
    fetchData(filtro);
  };

  const handleChangePriceRange=()=>{
    setPrices()
  }

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
          Place={destination}
          Dates={date}
          Options={options} />
      </div>
      <div >
        {
          data&&(
            <MapScreen isOpen={isModalOpen} onClose={closeModal} data={data.Ofertas} />
          )
        }
      </div>
      <div className="flex mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">

        <div className="w-3/12 mr-5">
          <div className="mb-4 relative h-44 rounded-md">
            <img src="/img/map.svg" alt="Mi Imagen" class="w-full h-full object-cover rounded-md" />
            <div class="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-md"></div>
            <button 
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-greenVE-500 text-white px-3 py-1 rounded-full"
              onClick={openModal}>
                Ver en Mapa
            </button>
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
                      data.Servicios.length > 0 && (
                        <div className="flex flex-col">
                          <h2 className="font-bold text-base">Servicios</h2>
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
                  <div className="p-2">
                    {
                      data.Beneficios.length > 0 && (
                        <div className="flex flex-col">
                          <h2 className="font-bold text-base">Beneficios</h2>
                          {
                            data.Beneficios.map((item) => (
                              <label>
                                <input type="checkbox" onChange={null} />
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
                Array(20).fill().map((_) => (
                  <div className="animate-pulse flex gap-2 m-3">
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
              className="border-2 h-fit rounded-xl px-2 py-0.5 mb-3 text-sm cursor-pointer"
              onClick={()=>setOpenFilters(!openFilters)}> Ordenar por: {filtroNombre}</div>
            {openFilters&&(<div className="absolute top-56 flex flex-col bg-white border rounded-md shadow-xl z-50" >
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm" 
                onClick={()=>handleFilterChange(0)}>
                  Defecto
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(1)}>
                  Precio Final (Menor a mayor)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(2)}>
                  Precio Final (Mayor a menor)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(3)}>
                  Ahorro (Menor a mayor)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(4)}>
                  Ahorro (Mayor a menor)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(5)}>
                  Establecimiento (A - Z)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(6)}>
                  Establecimiento (Z - A)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(7)}>
                  Ciudad (A - Z)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(8)}>
                  Ciudad (Z - A)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(9)}>
                  País (A - Z)
              </button>
              <button 
                className="hover:bg-gray-200 px-2 py-1 text-sm"
                onClick={()=>handleFilterChange(10)}>
                  País (Z - A)
              </button>
            </div>)}
          </div>
          {data
            ? (
              data.Ofertas.map((item) => (
                item.EstadoBusqueda == "A" &&
                <SearchItem
                  Oferta={item}
                  Establecimiento={item.Establecimiento}
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
          {data
            ? (
              <div>
                {
                  data.Ofertas.length>0
                  ?(<h2 className="text-center font-semibold text-2xl pb-2 text-remateColor pt-4">OTRAS OFERTAS DISPONIBLES</h2>)
                  :(<h2 className="text-center font-semibold text-2xl pb-2 text-remateColor pt-4">NO SE ENCONTRARON COINCIDENCIAS</h2>)
                }                {
                  data.Ofertas.map((item) => (
                    item.EstadoBusqueda == "B" &&
                    <SearchItem
                      Oferta={item}
                      Establecimiento={item.Establecimiento}
                    />
                  ))
                }
              </div>

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
