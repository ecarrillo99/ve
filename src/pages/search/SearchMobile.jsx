import React from 'react';
import { useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
import { format } from "date-fns";
import { getResultadoFiltro } from "../../controllers/establecimiento/establecimientoController";
import Filtro from "../../models/Filtro";
import Icons from "../../global/icons";

const NavbarMobile = lazy(() => import("../../components/global_components/navbar/NavbarMobile"));
const Footer = lazy(() => import("../../components/global_components/footer/Footer"));
const SearchBar =lazy(()=> import('../../components/search_components/mobile_search/SearchBar'))
const FilterBar = lazy(()=>import('../../components/search_components/mobile_search/FilterBar'))
const SearchResult = lazy(()=>import('../../components/search_components/mobile_search/SearchResult'))
const SearchResultSkeleton = lazy(()=> import('../../components/search_components/mobile_search/SearchResultSkeleton'))

const SearchMobile = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    //const [destination, setDestination] = useState(JSON.parse(decodeURIComponent(searchParams.get('destino'))));
    const destination = JSON.parse(decodeURIComponent(searchParams.get('destino')));
    //const [options, setOptions] = useState(JSON.parse(decodeURIComponent(searchParams.get('opciones'))));
    const options = JSON.parse(decodeURIComponent(searchParams.get('opciones')));
    const fechas = JSON.parse(decodeURIComponent(searchParams.get('fechas')))
    const dateTmp = [{
        startDate: new Date(fechas[0].startDate),
        endDate: new Date(fechas[0].endDate),
        key: new Date(fechas.key)
    }]
    const [coinEncontrada, setCoinEncontrada] = useState(false);
    //const [date, setDate] = useState(dateTmp);
    const date = dateTmp;
    const [minPrice, setMinPrice] = useState(10)
    const [maxPrice, setMaxPrice] = useState(1000)
    const [prices, setPrices] = useState([minPrice, maxPrice])
    const [data, setData] = useState(null)
    const [dataFinal, setDataFinal] = useState(null)
    const [sinResultados, setSinResultados]=useState(false)
    const [selectedFiltro, setSelectedFiltro] = useState("0")
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
                        if (result === 401) {
                            localStorage.removeItem("datos");
                            window.location.reload();
                        } else {
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
                            filtro.Habitaciones=options.room

                        }
                    } else {
                        setSinResultados(true);
                    }
                })
        } catch (error) {
            setSinResultados(true);
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

    const handleOrderChange = (id) => {
        setSelectedFiltro(id)

        switch(id){
            case "0":
                // Estrellas (Mayor a menor)
                data.Establecimientos.sort((a, b) => b.Catalogacion - a.Catalogacion)
            break;
            case "1":
                // Estrellas (Menor a mayor)
                data.Establecimientos.sort((a, b) => a.Catalogacion - b.Catalogacion)
            break;
            case "2":
                // Precio (Mayor a menor)
                data.Establecimientos.sort((a, b) => b.PrecioSinImpuestos - a.PrecioSinImpuestos)
            break;
            case "3":
                // Precio (Menor a mayor)
                data.Establecimientos.sort((a, b) => a.PrecioSinImpuestos - b.PrecioSinImpuestos)
            break;
            case "4":
                // Establecimiento (A - Z)
                data.Establecimientos.sort((a, b) => a.Titulo.localeCompare(b.Titulo))
            break;
            case "5":
                // Establecimiento (Z - A)
                data.Establecimientos.sort((a, b) => b.Titulo.localeCompare(a.Titulo))
            break;
        }
        /*
        if (id === 0) {
            data.Establecimientos.sort((a, b) => b.Catalogacion - a.Catalogacion)
        }
        if (id === 1) {
            //setFiltroNombre("Estrellas (Menor a mayor)")
            data.Establecimientos.sort((a, b) => a.Catalogacion - b.Catalogacion)
        }
        if (id === 2) {
            //setFiltroNombre("Precio (Menor a mayor)")
            data.Establecimientos.sort((a, b) => a.PrecioSinImpuestos - b.PrecioSinImpuestos)
        }
        if (id === 3) {
            //setFiltroNombre("Precio (Mayor a menor)")
            data.Establecimientos.sort((a, b) => b.PrecioSinImpuestos - a.PrecioSinImpuestos)
        }
        if (id === 4) {
            //setFiltroNombre("Ahorro (Menor a mayor)")
            data.Establecimientos.sort((a, b) => a.PorcentajeAhorro - b.PorcentajeAhorro)
        }
        if (id === 5) {
            //setFiltroNombre("Ahorro (Mayor a menor)")
            data.Establecimientos.sort((a, b) => b.PorcentajeAhorro - a.PorcentajeAhorro)
        }
        if (id === 6) {
            //setFiltroNombre("Establecimiento (A - Z)")
            data.Establecimientos.sort((a, b) => a.Titulo.localeCompare(b.Titulo))
        }
        if (id === 7) {
            //setFiltroNombre("Establecimiento (Z - A)")
            data.Establecimientos.sort((a, b) => b.Titulo.localeCompare(a.Titulo))
        }
        if (id === 8) {
            //setFiltroNombre("Ciudad (A - Z)")
            data.Establecimientos.sort((a, b) => a.Ciudad.localeCompare(b.Ciudad))
        }
        if (id === 9) {
            //setFiltroNombre("Ciudad (Z - A)")
            data.Establecimientos.sort((a, b) => b.Ciudad.localeCompare(a.Ciudad))
        }
        if (id === 10) {
            //setFiltroNombre("País (A - Z)")
            data.Establecimientos.sort((a, b) => a.Pais.localeCompare(b.Pais))
        }
        if (id === 11) {
            //setFiltroNombre("País (Z - A)")
            data.Establecimientos.sort((a, b) => b.Pais.localeCompare(a.Pais))
        }*/
    }

    const [checkboxStates, setCheckboxStates] = useState([]);

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
        <div>
            <Suspense><NavbarMobile/></Suspense>
            <Suspense><SearchBar filtro={filtro}/></Suspense>
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
            {
                data?
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
                :sinResultados?
                <div className='flex flex-col justify-center items-center mt-10'>
                    <span className="icon-[fluent--search-info-20-regular] h-28 w-28 text-greenVE-600"></span>
                    <label className="text-center text-sm">La búsqueda no ha generado resultados.<br></br>Intenta con otras fechas, ciudad o establecimiento.</label>
                </div>
                :<Suspense><SearchResultSkeleton/></Suspense>
            }
            <Suspense><Footer/></Suspense>
        </div>
    );
};

export default SearchMobile;