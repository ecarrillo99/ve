import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClickAwayListener } from "@mui/material";
import MenuTabs from "../../global_components/menu_tabs/MenuTabs";

// Tipos de establecimientos/servicios relevantes para vinos (de tbl_servicio)
const WINE_TYPES = [
  { value: "", label: "Todos los tipos" },
  { value: "Hoteles", label: "🏨 Hoteles" },
  { value: "Hosterías", label: "🏡 Hosterías" },
  { value: "Hostales", label: "🛏️ Hostales" },
  { value: "Restaurantes", label: "🍽️ Restaurantes" },
  { value: "Rest. Italianos", label: "🍝 Rest. Italianos" },
  { value: "Rest. Español", label: "🥘 Rest. Español" },
  { value: "Rest. Argentino", label: "🥩 Rest. Argentino" },
  { value: "Rest. Típicos", label: "🍲 Rest. Típicos" },
  { value: "Comidas Típicas", label: "🍛 Comidas Típicas" },
  { value: "Parrilladas", label: "🔥 Parrilladas" },
  { value: "Cafeterías", label: "☕ Cafeterías" },
  { value: "Bar- Cafetería", label: "🍷 Bar-Cafetería" },
  { value: "Bar- Restaunrant", label: "🍴 Bar-Restaurant" },
  { value: "Bares", label: "🍸 Bares" },
  { value: "Disco Bar", label: "🎵 Disco Bar" },
  { value: "Discotecas", label: "🎶 Discotecas" },
  { value: "Peñas", label: "🎸 Peñas" },
  { value: "Clubes Nocturnos", label: "🌙 Clubes Nocturnos" },
  { value: "Karaoke", label: "🎤 Karaoke" },
  { value: "Casinos", label: "🎰 Casinos" },
  { value: "Centros de Recreación", label: "🎯 Centros de Recreación" },
  { value: "Hacienda", label: "🏛️ Hacienda" },
  { value: "Quintas", label: "🌳 Quintas" },
  { value: "Resort - Spa", label: "💆 Resort - Spa" },
  { value: "Spas", label: "🧖 Spas" },
  { value: "Complejo Turíst.", label: "🏖️ Complejo Turístico" },
  { value: "Turismo Comunitario", label: "👥 Turismo Comunitario" },
  { value: "Agencias de Viajes", label: "✈️ Agencias de Viajes" },
  { value: "Operadores de Turismo", label: "🗺️ Operadores de Turismo" },
  { value: "Licorerías", label: "🍾 Licorerías" },
  { value: "Tiendas Artesanales", label: "🎨 Tiendas Artesanales" },
  { value: "Artesanías", label: "🏺 Artesanías" },
];

// Ratings disponibles
const RATINGS = [
  { value: 0, label: "Todas las calificaciones" },
  { value: 5, label: "⭐⭐⭐⭐⭐ 5 estrellas" },
  { value: 4, label: "⭐⭐⭐⭐ 4+ estrellas" },
  { value: 3, label: "⭐⭐⭐ 3+ estrellas" },
  { value: 2, label: "⭐⭐ 2+ estrellas" },
  { value: 1, label: "⭐ 1+ estrella" },
];

const WineSearchBar = ({ type = 0, onFilterChange, initialFilters }) => {
  const navigate = useNavigate();
  
  // Estados de filtros
  const [filters, setFilters] = useState(initialFilters || {
    country: "",
    city: "",
    type: "",
    rate: 0,
  });

  // Estados para dropdowns
  const [openCountry, setOpenCountry] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openType, setOpenType] = useState(false);
  const [openRate, setOpenRate] = useState(false);

  // Estados para sugerencias
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

  // Datos de países y ciudades de Ecuador y regiones vinícolas
  const [availableCountries] = useState([
    "Ecuador", "Argentina", "Chile", "España", "Francia", "Italia", "Portugal", "Estados Unidos", "México", "Perú", "Colombia"
  ]);

  const [availableCities] = useState({
    "Ecuador": ["Cuenca", "Quito", "Guayaquil", "Loja", "Ambato", "Riobamba", "Manta", "Salinas", "Baños", "Otavalo", "Vilcabamba", "Montañita", "Puerto López", "Tena", "Puyo"],
    "Argentina": ["Mendoza", "Buenos Aires", "Salta", "San Juan", "La Rioja", "Neuquén", "Cafayate"],
    "Chile": ["Santiago", "Valparaíso", "Valle de Maipo", "Valle de Colchagua", "Valle de Casablanca", "Valle del Maule"],
    "España": ["La Rioja", "Barcelona", "Madrid", "Ribera del Duero", "Jerez", "Penedès", "Priorat"],
    "Francia": ["Bordeaux", "Champagne", "Burgundy", "Provence", "Valle del Loira", "Alsacia"],
    "Italia": ["Toscana", "Piamonte", "Veneto", "Sicilia", "Umbría", "Lombardía"],
    "Portugal": ["Porto", "Lisboa", "Alentejo", "Douro", "Madeira"],
    "Estados Unidos": ["Napa Valley", "Sonoma", "Oregon", "Washington"],
    "México": ["Valle de Guadalupe", "Querétaro", "Aguascalientes"],
    "Perú": ["Ica", "Lima", "Arequipa"],
    "Colombia": ["Bogotá", "Medellín", "Villa de Leyva"],
  });

  // Filtrar países según input
  useEffect(() => {
    if (filters.country && filters.country.length > 0) {
      const filtered = availableCountries.filter(c => 
        c.toLowerCase().includes(filters.country.toLowerCase())
      );
      setCountrySuggestions(filtered);
    } else {
      setCountrySuggestions(availableCountries);
    }
  }, [filters.country, availableCountries]);

  // Filtrar ciudades según país seleccionado
  useEffect(() => {
    const countryMatch = availableCountries.find(
      c => c.toLowerCase() === filters.country.toLowerCase()
    );
    
    if (countryMatch && availableCities[countryMatch]) {
      const cities = availableCities[countryMatch];
      if (filters.city && filters.city.length > 0) {
        const filtered = cities.filter(c => 
          c.toLowerCase().includes(filters.city.toLowerCase())
        );
        setCitySuggestions(filtered);
      } else {
        setCitySuggestions(cities);
      }
    } else {
      // Si no hay país seleccionado, mostrar todas las ciudades
      const allCities = Object.values(availableCities).flat();
      if (filters.city && filters.city.length > 0) {
        const filtered = allCities.filter(c => 
          c.toLowerCase().includes(filters.city.toLowerCase())
        );
        setCitySuggestions(filtered);
      } else {
        setCitySuggestions(allCities.slice(0, 15)); // Limitar a 15
      }
    }
  }, [filters.country, filters.city, availableCities, availableCountries]);

  // Manejar cambios en filtros
  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    
    // Si cambia el país, limpiar la ciudad
    if (field === 'country') {
      newFilters.city = '';
    }
    
    setFilters(newFilters);
    
    // Notificar al componente padre si hay callback
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Manejar búsqueda
  const handleSearch = () => {
    // Notificar al componente padre
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    const emptyFilters = { country: "", city: "", type: "", rate: 0 };
    setFilters(emptyFilters);
    if (onFilterChange) {
      onFilterChange(emptyFilters);
    }
  };

  // Cerrar todos los dropdowns excepto el especificado
  const closeOtherDropdowns = (except) => {
    if (except !== 'country') setOpenCountry(false);
    if (except !== 'city') setOpenCity(false);
    if (except !== 'type') setOpenType(false);
    if (except !== 'rate') setOpenRate(false);
  };

  // Obtener el label del tipo seleccionado
  const getTypeLabel = () => {
    const found = WINE_TYPES.find(t => t.value === filters.type);
    return found ? found.label : "Todos los tipos";
  };

  // Renderizado para desktop (type 0 o 1)
  if (type === 0 || type === 1) {
    return (
        <div className="relative -mt-6">
            <MenuTabs />
        <div className="bg-white relative rounded-lg rounded-tl-none w-full mt-1 shadow-lg border-2 border-amber-400">
          <div className="grid lg:grid-cols-12 md:grid-cols-12 grid-flow-row">
            
            {/* Campo País */}
            <div className="col-span-3 border-r border-gray-200 px-4 py-2 relative">
              <ClickAwayListener onClickAway={() => setOpenCountry(false)}>
                <div>
                  <div className="flex flex-row gap-1">
                    <span className="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#929292"><g fill="none" stroke="#929292" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M14.5 9a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m3.722 8c1.395 1.988 2.062 3.047 1.665 3.9q-.06.128-.14.247c-.575.853-2.06.853-5.03.853H9.283c-2.97 0-4.454 0-5.029-.853a2 2 0 0 1-.14-.247c-.397-.852.27-1.912 1.665-3.9"/><path d="M13.257 17.494a1.813 1.813 0 0 1-2.514 0c-3.089-2.993-7.228-6.336-5.21-11.19C6.626 3.679 9.246 2 12 2s5.375 1.68 6.467 4.304c2.016 4.847-2.113 8.207-5.21 11.19"/></g></svg>
                    </span>
                     <label className="text-sm font-normal block ">Paìs</label>
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar país..."
                    className="w-full text-xs focus:outline-none placeholder-gray-400"
                    value={filters.country}
                    onChange={(e) => handleFilterChange('country', e.target.value)}
                    onFocus={() => { closeOtherDropdowns('country'); setOpenCountry(true); }}
                  />
                  {openCountry && countrySuggestions.length > 0 && (
                    <div className="absolute top-16 left-0 right-0 bg-white rounded-md shadow-xl z-50 max-h-60 overflow-y-auto border border-gray-200">
                      {countrySuggestions.map((country, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 hover:bg-amber-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleFilterChange('country', country);
                            setOpenCountry(false);
                          }}
                        >
                          {country}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </div>

            {/* Campo Ciudad */}
            <div className="col-span-3 border-r border-gray-200 px-4 py-2 relative">
              <ClickAwayListener onClickAway={() => setOpenCity(false)}>
                <div>
                  <div className="flex flex-row gap-1">
                    <span className="">
                      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="#929292"><g fill="none" stroke="#929292" stroke-linecap="round" stroke-width="3"><path stroke-linejoin="round" d="M5 24c1.628-3.531 5.242-9.749 8.687-13.701c1.249-1.432 3.377-1.432 4.626 0C21.758 14.25 25.373 20.469 27 24"/><path stroke-linejoin="round" d="M19.053 11.178c2.029-2.777 4.188-5.398 6.26-7.354a3.16 3.16 0 0 1 4.374 0q.404.381.813.797M42 24c1.657 0 3.022 1.35 2.788 2.991C43.338 37.172 34.582 45 24 45S4.663 37.172 3.21 26.991C2.977 25.351 4.343 24 6 24z"/><path stroke-linejoin="round" d="M15.523 24c.995 1.72 1.33 3.58.477 5.5c-.871 1.96-2.502 2.687-4.148 3.42c-1.775.792-3.568 1.591-4.443 3.955M24.428 24c-.148 4.884 3.092 5.743 5.88 6.483c1.661.44 3.161.838 3.692 2.017c.39 1.172-.47 2.192-1.451 3.355c-1.531 1.813-3.357 3.976-1.191 7.612m7.011-40.338c-2.052 2.239-4.381 6.56-5.369 8.9c0 0 .504.218 2.37.357c-.998 1.87-1.862 3.772-2.37 5.097c0 0 1.091.517 6 .517s6-.517 6-.517c-.508-1.325-1.372-3.227-2.37-5.097c1.866-.139 2.37-.356 2.37-.356c-.988-2.341-3.317-6.662-5.369-8.901a.85.85 0 0 0-1.262 0"/><path d="M39 18v6"/></g></svg>
                      </span>
                     <label className="text-sm font-normal block ">Ciudad</label>
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar ciudad..."
                    className="w-full text-xs focus:outline-none placeholder-gray-400"
                    value={filters.city}
                    onChange={(e) => handleFilterChange('city', e.target.value)}
                    onFocus={() => { closeOtherDropdowns('city'); setOpenCity(true); }}
                  />
                  {openCity && citySuggestions.length > 0 && (
                    <div className="absolute top-16 left-0 right-0 bg-white rounded-md shadow-xl z-50 max-h-60 overflow-y-auto border border-gray-200">
                      {citySuggestions.map((city, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 hover:bg-amber-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleFilterChange('city', city);
                            setOpenCity(false);
                          }}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </div>

            {/* Campo Tipo */}
            <div className="col-span-3 border-r border-gray-200 px-4 py-2 relative">
              <ClickAwayListener onClickAway={() => setOpenType(false)}>
                <div>
                  <div className="flex flex-row gap-1 items-center">
                     <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64"><path fill="#929292" d="M58.25 19.813v-4.688a1.874 1.874 0 0 0-1.875-1.875h-2.813V2.938a.937.937 0 1 0-1.875 0V9.07a5.594 5.594 0 0 0-5.474-1.17a6.574 6.574 0 0 0-4.839-2.149A6.515 6.515 0 0 0 35.45 9.51a4.694 4.694 0 0 0-4.389 4.678a4.693 4.693 0 0 0 4.688 4.688H47v.938a3.761 3.761 0 0 0-3.75 3.75v6.563h-7.5c-1.664 0-2.813.829-2.813 2.567v-10.71c0-1.046-.597-2.505-1.326-3.243l-6.723-6.812a1.856 1.856 0 0 0-2.57-.067a7.447 7.447 0 0 0-4.381-1.425a7.518 7.518 0 0 0-5.132 2.039a6.334 6.334 0 0 0-1.431-.164a6.586 6.586 0 0 0-6.016 3.942A4.696 4.696 0 0 0 2 20.75a4.693 4.693 0 0 0 4.688 4.688h7.5v8.438H5.75A3.761 3.761 0 0 0 2 37.626V62h32.813V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H39.5V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H62V23.563a3.76 3.76 0 0 0-3.75-3.75M10.906 56.375a.94.94 0 0 1-.938.938H7.156a.942.942 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875zm0-7.5a.94.94 0 0 1-.938.938H7.156a.942.942 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875zm0-7.5a.94.94 0 0 1-.938.938H7.156a.942.942 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875zM6.688 23.563a2.814 2.814 0 0 1 0-5.626h.096a4.686 4.686 0 0 1 4.592-3.75c.72 0 1.394.176 2.003.465a5.614 5.614 0 0 1 4.56-2.34c1.121 0 2.161.331 3.038.896l-5.462 5.533c-.729.738-1.326 2.197-1.326 3.243v1.578H6.688zm23.437 32.812a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875m0-7.5a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875m0-7.5a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875m0-7.5a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V32a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875m0-7.5a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V24.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875M35.75 17a2.814 2.814 0 0 1 0-5.626c.359 0 .697.073 1.013.196c.356-2.234 2.279-3.946 4.612-3.946a4.677 4.677 0 0 1 4.235 2.706a3.714 3.714 0 0 1 2.328-.83a3.75 3.75 0 0 1 3.75 3.75h-2.813A1.876 1.876 0 0 0 47 15.125V17H35.75m15.469 41.25a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.563a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.563a.94.94 0 0 1-.938.938h-2.813A.942.942 0 0 1 46.53 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938V32m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m7.5 32.812a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.563a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.563a.94.94 0 0 1-.938.938h-2.813A.942.942 0 0 1 54.03 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938V32m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875"/></svg>
                    </span>
                      <div>
                       <label className="text-sm  text-gray-600 font-normal block ">Tipo de establecimiento</label>
                       <div
                          className="text-xs cursor-pointer"
                          onClick={() => { closeOtherDropdowns('type'); setOpenType(!openType); }}
                        >
                          {getTypeLabel()}
                        </div>
                      </div>
                  </div>
                  {openType && (
                    <div className="absolute top-16 left-0 right-0 bg-white rounded-md shadow-xl z-50 max-h-60 overflow-y-auto border border-gray-200">
                      {WINE_TYPES.map((wineType, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 hover:bg-amber-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleFilterChange('type', wineType.value);
                            setOpenType(false);
                          }}
                        >
                          {wineType.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </div>

            {/* Campo Rating */}
            <div className="col-span-2 px-4 py-2 relative">
              <ClickAwayListener onClickAway={() => setOpenRate(false)}>
                <div>
                  <div className="flex flex-row gap-1 items-center">
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path fill="#929292" d="m512 77.488l137.472 285.088L962.08 409.04L735.664 634.88l7.616 45.311l45.28 270.16l-276.607-148.784L235.36 950.415l45.295-270.224l7.584-45.311L61.904 409.008l312.592-46.464L395.04 320zm-.017-61.936c-28.656 0-54.784 16.176-66.977 41.456l-115.904 240.64l-266.704 39.664c-27.391 4.096-50.143 22.8-58.975 48.384c-8.817 25.664-2.145 53.904 17.199 73.152l195.408 195.2l-45.328 270.656c-4.56 27.28 7.232 54.624 30.368 70.576c12.72 8.737 27.664 13.153 42.624 13.153c12.32 0 24.64-2.992 35.793-8.977l232.496-125.184l232.512 125.184a75.853 75.853 0 0 0 35.776 8.977c14.96 0 29.905-4.416 42.657-13.153c23.103-15.952 34.91-43.295 30.319-70.576l-45.344-270.656l195.504-195.2c19.344-19.248 25.968-47.504 17.152-73.152c-8.848-25.616-31.6-44.32-58.976-48.385l-266.656-39.664l-115.968-240.64c-12.112-25.311-38.256-41.455-66.976-41.455z"/></svg>
                    </span>
                      <div>
                       <label className="text-sm font-normal block ">Calificación</label>
                       <div
                          className="text-xs cursor-pointer"
                          onClick={() => { closeOtherDropdowns('rate'); setOpenRate(!openRate); }}
                        >
                          {filters.rate > 0 ? RATINGS.find(r => r.value === filters.rate)?.label : "Todas las calificaciones"}
                        </div>
                      </div>
                  </div>
                  {openRate && (
                    <div className="absolute top-16 left-0 right-0 bg-white rounded-md shadow-xl z-50 border border-gray-200">
                      {RATINGS.map((rating, idx) => (
                        <div
                          key={idx}
                          className="px-4 py-2 hover:bg-amber-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            handleFilterChange('rate', rating.value);
                            setOpenRate(false);
                          }}
                        >
                          {rating.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </ClickAwayListener>
            </div>

            {/* Botón Buscar - Solo visible en desktop */}
            <div className="col-span-1 hidden lg:flex justify-center items-center bg-greenVE-600  hover:bg-greenVE-700 rounded-r-lg">
               <button
            className="w-full  text-white font-semibold py-3 rounded-lg transition-colors"
            onClick={handleSearch}
          >
            Buscar
          </button>
            </div>
          </div>

          {/* Botón Buscar - Móvil dentro del mismo contenedor */}
          <div className="lg:hidden px-4 pb-3">
            <button
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition-colors flex items-center justify-center gap-2"
              onClick={handleSearch}
            >
             
              Buscar
            </button>
          </div>

          {/* Tags de filtros activos */}
          {(filters.country || filters.city || filters.type || filters.rate > 0) && (
            <div className="flex flex-wrap gap-2 px-4 pb-3 pt-1">
              {filters.country && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                  {filters.country}
                  <button onClick={() => handleFilterChange('country', '')} className="hover:text-amber-600 font-bold">×</button>
                </span>
              )}
              {filters.city && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                  {filters.city}
                  <button onClick={() => handleFilterChange('city', '')} className="hover:text-amber-600 font-bold">×</button>
                </span>
              )}
              {filters.type && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                  {filters.type}
                  <button onClick={() => handleFilterChange('type', '')} className="hover:text-amber-600 font-bold">×</button>
                </span>
              )}
              {filters.rate > 0 && (
                <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">
                  {filters.rate}+ ⭐
                  <button onClick={() => handleFilterChange('rate', 0)} className="hover:text-amber-600 font-bold">×</button>
                </span>
              )}
              <button
                className="text-amber-600 hover:text-amber-800 text-xs font-medium"
                onClick={handleClearFilters}
              >
                Limpiar todo
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Renderizado para móvil (type 3 o 4) - MEJORADO
  if (type === 3 || type === 4) {
    return (
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-lg border-2 border-amber-400 overflow-hidden">
          {/* País */}
          <div className="relative border-b border-gray-200">
            <ClickAwayListener onClickAway={() => setOpenCountry(false)}>
              <div className="px-4 py-3">
                <div className="flex flex-row gap-1">
                    <span className="">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#929292"><g fill="none" stroke="#929292" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor"><path d="M14.5 9a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m3.722 8c1.395 1.988 2.062 3.047 1.665 3.9q-.06.128-.14.247c-.575.853-2.06.853-5.03.853H9.283c-2.97 0-4.454 0-5.029-.853a2 2 0 0 1-.14-.247c-.397-.852.27-1.912 1.665-3.9"/><path d="M13.257 17.494a1.813 1.813 0 0 1-2.514 0c-3.089-2.993-7.228-6.336-5.21-11.19C6.626 3.679 9.246 2 12 2s5.375 1.68 6.467 4.304c2.016 4.847-2.113 8.207-5.21 11.19"/></g></svg>
                    </span>
                     <label className="text-sm font-normal block ">Paìs</label>
                  </div>
                <input
                  type="text"
                  placeholder="Buscar país..."
                  className="w-full text-sm focus:outline-none placeholder-gray-400"
                  value={filters.country}
                  onChange={(e) => handleFilterChange('country', e.target.value)}
                  onFocus={() => { closeOtherDropdowns('country'); setOpenCountry(true); }}
                />
                {openCountry && countrySuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-50 max-h-48 overflow-y-auto border-t border-gray-200">
                    {countrySuggestions.map((country, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 hover:bg-amber-50 active:bg-amber-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          handleFilterChange('country', country);
                          setOpenCountry(false);
                        }}
                      >
                        {country}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </div>

          {/* Ciudad */}
          <div className="relative border-b border-gray-200">
            <ClickAwayListener onClickAway={() => setOpenCity(false)}>
              <div className="px-4 py-3">
                <div className="flex flex-row gap-1">
                    <span className="">
                      <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="#929292"><g fill="none" stroke="#929292" stroke-linecap="round" stroke-width="3"><path stroke-linejoin="round" d="M5 24c1.628-3.531 5.242-9.749 8.687-13.701c1.249-1.432 3.377-1.432 4.626 0C21.758 14.25 25.373 20.469 27 24"/><path stroke-linejoin="round" d="M19.053 11.178c2.029-2.777 4.188-5.398 6.26-7.354a3.16 3.16 0 0 1 4.374 0q.404.381.813.797M42 24c1.657 0 3.022 1.35 2.788 2.991C43.338 37.172 34.582 45 24 45S4.663 37.172 3.21 26.991C2.977 25.351 4.343 24 6 24z"/><path stroke-linejoin="round" d="M15.523 24c.995 1.72 1.33 3.58.477 5.5c-.871 1.96-2.502 2.687-4.148 3.42c-1.775.792-3.568 1.591-4.443 3.955M24.428 24c-.148 4.884 3.092 5.743 5.88 6.483c1.661.44 3.161.838 3.692 2.017c.39 1.172-.47 2.192-1.451 3.355c-1.531 1.813-3.357 3.976-1.191 7.612m7.011-40.338c-2.052 2.239-4.381 6.56-5.369 8.9c0 0 .504.218 2.37.357c-.998 1.87-1.862 3.772-2.37 5.097c0 0 1.091.517 6 .517s6-.517 6-.517c-.508-1.325-1.372-3.227-2.37-5.097c1.866-.139 2.37-.356 2.37-.356c-.988-2.341-3.317-6.662-5.369-8.901a.85.85 0 0 0-1.262 0"/><path d="M39 18v6"/></g></svg>
                      </span>
                     <label className="text-sm font-normal block ">Ciudad</label>
                  </div>
                <input
                  type="text"
                  placeholder="Buscar ciudad..."
                  className="w-full text-sm focus:outline-none placeholder-gray-400"
                  value={filters.city}
                  onChange={(e) => handleFilterChange('city', e.target.value)}
                  onFocus={() => { closeOtherDropdowns('city'); setOpenCity(true); }}
                />
                {openCity && citySuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-50 max-h-48 overflow-y-auto border-t border-gray-200">
                    {citySuggestions.map((city, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 hover:bg-amber-50 active:bg-amber-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          handleFilterChange('city', city);
                          setOpenCity(false);
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </div>

          {/* Tipo de establecimiento */}
          <div className="relative border-b border-gray-200">
            <ClickAwayListener onClickAway={() => setOpenType(false)}>
              <div className="px-4 py-3">
                <div className="flex flex-row gap-1 items-center">
                     <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 64 64"><path fill="#929292" d="M58.25 19.813v-4.688a1.874 1.874 0 0 0-1.875-1.875h-2.813V2.938a.937.937 0 1 0-1.875 0V9.07a5.594 5.594 0 0 0-5.474-1.17a6.574 6.574 0 0 0-4.839-2.149A6.515 6.515 0 0 0 35.45 9.51a4.694 4.694 0 0 0-4.389 4.678a4.693 4.693 0 0 0 4.688 4.688H47v.938a3.761 3.761 0 0 0-3.75 3.75v6.563h-7.5c-1.664 0-2.813.829-2.813 2.567v-10.71c0-1.046-.597-2.505-1.326-3.243l-6.723-6.812a1.856 1.856 0 0 0-2.57-.067a7.447 7.447 0 0 0-4.381-1.425a7.518 7.518 0 0 0-5.132 2.039a6.334 6.334 0 0 0-1.431-.164a6.586 6.586 0 0 0-6.016 3.942A4.696 4.696 0 0 0 2 20.75a4.693 4.693 0 0 0 4.688 4.688h7.5v8.438H5.75A3.761 3.761 0 0 0 2 37.626V62h32.813V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H39.5V35.719c0-.498.339-.906.751-.906h.375c.412 0 .749.408.749.906V62H62V23.563a3.76 3.76 0 0 0-3.75-3.75M10.906 56.375a.94.94 0 0 1-.938.938H7.156a.942.942 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875zm0-7.5a.94.94 0 0 1-.938.938H7.156a.942.942 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875zm0-7.5a.94.94 0 0 1-.938.938H7.156a.942.942 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875zM6.688 23.563a2.814 2.814 0 0 1 0-5.626h.096a4.686 4.686 0 0 1 4.592-3.75c.72 0 1.394.176 2.003.465a5.614 5.614 0 0 1 4.56-2.34c1.121 0 2.161.331 3.038.896l-5.462 5.533c-.729.738-1.326 2.197-1.326 3.243v1.578H6.688zm23.437 32.812a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V54.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875m0-7.5a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V47a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875m0-7.5a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V39.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875m0-7.5a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V32a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875m0-7.5a.94.94 0 0 1-.938.938h-11.25a.942.942 0 0 1-.938-.938V24.5a.94.94 0 0 1 .938-.938h11.25a.94.94 0 0 1 .938.938v1.875M35.75 17a2.814 2.814 0 0 1 0-5.626c.359 0 .697.073 1.013.196c.356-2.234 2.279-3.946 4.612-3.946a4.677 4.677 0 0 1 4.235 2.706a3.714 3.714 0 0 1 2.328-.83a3.75 3.75 0 0 1 3.75 3.75h-2.813A1.876 1.876 0 0 0 47 15.125V17H35.75m15.469 41.25a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.563a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.563a.94.94 0 0 1-.938.938h-2.813A.942.942 0 0 1 46.53 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938V32m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m7.5 32.812a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.563a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938V43.25a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875m0-6.563a.94.94 0 0 1-.938.938h-2.813A.942.942 0 0 1 54.03 32v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938V32m0-6.562a.94.94 0 0 1-.938.938h-2.813a.942.942 0 0 1-.938-.938v-1.875a.94.94 0 0 1 .938-.938h2.813a.94.94 0 0 1 .938.938v1.875"/></svg>
                    </span>
                      <div>
                       <label className="text-sm  text-gray-600 font-normal block ">Tipo de establecimiento</label>
                       <div
                          className="text-xs cursor-pointer"
                          onClick={() => { closeOtherDropdowns('type'); setOpenType(!openType); }}
                        >
                          {getTypeLabel()}
                        </div>
                      </div>
                  </div>
              
                {openType && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-50 max-h-64 overflow-y-auto border-t border-gray-200">
                    {WINE_TYPES.map((wineType, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 hover:bg-amber-50 active:bg-amber-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          handleFilterChange('type', wineType.value);
                          setOpenType(false);
                        }}
                      >
                        {wineType.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </div>

          {/* Rating */}
          <div className="relative border-b border-gray-200">
            <ClickAwayListener onClickAway={() => setOpenRate(false)}>
              <div className="px-4 py-3">
                 <div className="flex flex-row gap-1 items-center">
                    <span className="">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024"><path fill="#929292" d="m512 77.488l137.472 285.088L962.08 409.04L735.664 634.88l7.616 45.311l45.28 270.16l-276.607-148.784L235.36 950.415l45.295-270.224l7.584-45.311L61.904 409.008l312.592-46.464L395.04 320zm-.017-61.936c-28.656 0-54.784 16.176-66.977 41.456l-115.904 240.64l-266.704 39.664c-27.391 4.096-50.143 22.8-58.975 48.384c-8.817 25.664-2.145 53.904 17.199 73.152l195.408 195.2l-45.328 270.656c-4.56 27.28 7.232 54.624 30.368 70.576c12.72 8.737 27.664 13.153 42.624 13.153c12.32 0 24.64-2.992 35.793-8.977l232.496-125.184l232.512 125.184a75.853 75.853 0 0 0 35.776 8.977c14.96 0 29.905-4.416 42.657-13.153c23.103-15.952 34.91-43.295 30.319-70.576l-45.344-270.656l195.504-195.2c19.344-19.248 25.968-47.504 17.152-73.152c-8.848-25.616-31.6-44.32-58.976-48.385l-266.656-39.664l-115.968-240.64c-12.112-25.311-38.256-41.455-66.976-41.455z"/></svg>
                    </span>
                      <div>
                       <label className="text-sm font-normal block ">Calificación</label>
                       <div
                          className="text-xs cursor-pointer"
                          onClick={() => { closeOtherDropdowns('rate'); setOpenRate(!openRate); }}
                        >
                          {filters.rate > 0 ? RATINGS.find(r => r.value === filters.rate)?.label : "Todas las calificaciones"}
                        </div>
                      </div>
                  </div>
                
                {openRate && (
                  <div className="absolute top-full left-0 right-0 bg-white shadow-2xl z-50 border-t border-gray-200">
                    {RATINGS.map((rating, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-3 hover:bg-amber-50 active:bg-amber-100 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                        onClick={() => {
                          handleFilterChange('rate', rating.value);
                          setOpenRate(false);
                        }}
                      >
                        {rating.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ClickAwayListener>
          </div>

          {/* Tags de filtros activos */}
          {(filters.country || filters.city || filters.type || filters.rate > 0) && (
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                {filters.country && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                    {filters.country}
                    <button onClick={() => handleFilterChange('country', '')} className="hover:text-amber-600 font-bold text-base">×</button>
                  </span>
                )}
                {filters.city && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                    {filters.city}
                    <button onClick={() => handleFilterChange('city', '')} className="hover:text-amber-600 font-bold text-base">×</button>
                  </span>
                )}
                {filters.type && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                    {filters.type}
                    <button onClick={() => handleFilterChange('type', '')} className="hover:text-amber-600 font-bold text-base">×</button>
                  </span>
                )}
                {filters.rate > 0 && (
                  <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-medium">
                    {filters.rate}+ ⭐
                    <button onClick={() => handleFilterChange('rate', 0)} className="hover:text-amber-600 font-bold text-base">×</button>
                  </span>
                )}
              </div>
              <button
                className="text-amber-600 hover:text-amber-800 text-sm font-medium mt-2"
                onClick={handleClearFilters}
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}

          {/* Botón de búsqueda */}
          <div className="px-4 pb-4 pt-3">
            <button
              className="w-full bg-greenVE-600 hover:bg-gray-600 cursor-pointer text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              onClick={handleSearch}
            >
             
              Buscar Vinos
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default WineSearchBar;