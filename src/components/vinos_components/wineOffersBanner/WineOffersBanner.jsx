import "react-multi-carousel/lib/styles.css";
import WineOfferItem from "./WineOfferItem";
import React, { useEffect, useState, useMemo } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getWineOffers } from "../../../core/vinoApiService";
import WineOfferItemSkeleton from "./WineOfferItemSkeleton";
import CreateOfferModal from "../admin/CreateoffertsModal";

const WineOffersBanner = ({ filters }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const isAdmin = () => {
    try {
      const idUsuario = localStorage.getItem('id_usuario');
      if (idUsuario) return idUsuario.toString() === '412';
      const datos = JSON.parse(localStorage.getItem('datos') || '{}');
      const idFromDatos = datos?.data?.id_usuario || datos?.id_usuario;
      return idFromDatos?.toString() === '412';
    } catch (e) {
      return false;
    }
  };

  const fetchData = async () => {
    try {
      const result = await getWineOffers();
      if (result) {
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching wine offers:", error);
      setError("No se pudieron cargar las ofertas");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtrar ofertas basado en los filtros recibidos
  const filteredData = useMemo(() => {
    if (!data) return null;
    if (!filters) return data;

    // Si no hay filtros activos, retornar todos los datos
    const hasActiveFilters = filters.country || filters.city || filters.type || filters.rate > 0;
    if (!hasActiveFilters) return data;

    return data.filter((offer) => {
      // Obtener datos del establecimiento de la oferta
      const establishment = offer.establishment || {};
      
      // Filtro por país
      if (filters.country && filters.country.trim() !== '') {
        const offerCountry = (establishment.country || '').toLowerCase();
        const filterCountry = filters.country.toLowerCase();
        if (!offerCountry.includes(filterCountry)) {
          return false;
        }
      }

      // Filtro por ciudad
      if (filters.city && filters.city.trim() !== '') {
        const offerCity = (establishment.city || '').toLowerCase();
        const filterCity = filters.city.toLowerCase();
        if (!offerCity.includes(filterCity)) {
          return false;
        }
      }

      // Filtro por tipo
      if (filters.type && filters.type.trim() !== '') {
        const offerType = (establishment.type || '').toLowerCase();
        const filterType = filters.type.toLowerCase();
        if (offerType !== filterType) {
          return false;
        }
      }

      // Filtro por rating (mínimo)
      if (filters.rate && filters.rate > 0) {
        const offerRate = establishment.rate || 0;
        if (offerRate < filters.rate) {
          return false;
        }
      }

      return true;
    });
  }, [data, filters]);

  const handleOfferCreated = (newOffer) => {
    // Recargar los datos después de crear
    fetchData();
  };

  const CustomNextArrow = (props) => {
    return (
      <div
        className="-mr-3  absolute top-1/2 transform -translate-y-1/2 right-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg h-8 w-8 flex items-center justify-center pl-1"
        onClick={props.onClick}
        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
        <span className="icon-[material-symbols--arrow-forward-ios]"></span>
      </div>
    );
  };

  const CustomPrevArrow = (props) => {
    return (
      <div
        className="-ml-3 z-40  absolute top-1/2 transform -translate-y-1/2 left-0 cursor-pointer rounded-full bg-gray-100 text-greenVE-600 text-lg pr-1 h-8 w-8 flex items-center justify-center"
        onClick={props.onClick}
        style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.5))' }}>
        <span className="icon-[material-symbols--arrow-back-ios-new]"></span>
      </div>
    );
  };

  // Ajustar configuración del slider según cantidad de items filtrados
  const getSliderSettings = (itemCount) => {
    const baseSettings = {
      dots: false,
      infinite: itemCount > 4,
      autoplay: itemCount > 4,
      autoplaySpeed: 5000,
      speed: 1000,
      rows: 1,
      slidesToShow: Math.min(4, itemCount),
      slidesToScroll: 1,
      nextArrow: itemCount > 4 ? <CustomNextArrow /> : null,
      prevArrow: itemCount > 4 ? <CustomPrevArrow /> : null,
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: Math.min(1, itemCount),
            infinite: itemCount > 1,
            autoplay: itemCount > 1,
          },
        },
        {
          breakpoint: 1150,
          settings: {
            slidesToShow: Math.min(2, itemCount),
            infinite: itemCount > 2,
            autoplay: itemCount > 2,
          },
        },
        {
          breakpoint: 1300,
          settings: {
            slidesToShow: Math.min(3, itemCount),
            infinite: itemCount > 3,
            autoplay: itemCount > 3,
          },
        },
      ],
    };
    return baseSettings;
  };

  // Verificar si hay filtros activos
  const hasActiveFilters = filters && (filters.country || filters.city || filters.type || filters.rate > 0);

  // Obtener configuración del slider basada en datos filtrados
  const settings = getSliderSettings(filteredData?.length || 0);

  return (
    <div className="pt-5 mx-5 md:mx-0">
      {/* Header con icono de vino */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-amber-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 3l-.01 6.62c0 1.59.51 3.13 1.46 4.42l.05.07c.9 1.22 1.47 2.69 1.5 4.26V21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.63c.03-1.57.6-3.04 1.5-4.26l.05-.07c.95-1.29 1.46-2.83 1.46-4.42L17 3H6zm3.11 9.71l-.11.15c-.7.95-1.21 2.04-1.5 3.18-1.18-1.88-1.51-4.16-1.29-6.04h7.58c.22 1.88-.11 4.16-1.29 6.04-.29-1.14-.8-2.23-1.5-3.18l-.11-.15c-.52-.71-.89-1.54-.89-2.39V5h-2v5.33c0 .85-.37 1.68-.89 2.38z" />
          </svg>
          <h1 className="font-bold text-xl text-gray-800">
            Ruta de el Vino
          </h1>
          
          {/* Contador de resultados cuando hay filtros */}
          {hasActiveFilters && filteredData && (
            <span className="ml-2 bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-sm font-medium">
              {filteredData.length} {filteredData.length === 1 ? 'resultado' : 'resultados'}
            </span>
          )}
        </div>

        {/* Botón crear oferta - Solo visible para admin */}
        {isAdmin() && (
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-[#97C121] hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Nueva Oferta
          </button>
        )}
      </div>

      <div className="flex justify-between mb-4">
        <h6 className="text-md text-gray-600">
          Descubre promociones especiales con regalos incluidos de nuestros
          establecimientos asociados
        </h6>
      </div>

      {/* Error state */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading state */}
      {!data && !error && (
        <div>
          <Slider {...getSliderSettings(5)}>
            {Array(5)
              .fill(null)
              .map((item, index) => (
                <div key={index} className="border-4 border-white">
                  <WineOfferItemSkeleton />
                </div>
              ))}
          </Slider>
        </div>
      )}

      {/* Slider con datos filtrados */}
      {filteredData && filteredData.length > 0 && (
        <div>
          <Slider {...settings}>
            {filteredData.map((offer, index) => (
              <div key={offer.id || index} className="border-4 border-white">
                <WineOfferItem offer={offer} />
              </div>
            ))}
          </Slider>
        </div>
      )}

      {/* Empty state - Sin resultados de filtro */}
      {filteredData && filteredData.length === 0 && hasActiveFilters && (
        <div className="text-center py-10 bg-amber-50 rounded-xl border border-amber-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-amber-300 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-600 font-medium">
            No se encontraron ofertas con los filtros seleccionados
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Intenta ajustar los filtros para ver más resultados
          </p>
        </div>
      )}

      {/* Empty state - Sin ofertas en general */}
      {data && data.length === 0 && !hasActiveFilters && (
        <div className="text-center py-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-300 mx-auto mb-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M6 3l-.01 6.62c0 1.59.51 3.13 1.46 4.42l.05.07c.9 1.22 1.47 2.69 1.5 4.26V21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2.63c.03-1.57.6-3.04 1.5-4.26l.05-.07c.95-1.29 1.46-2.83 1.46-4.42L17 3H6z" />
          </svg>
          <p className="text-gray-500">
            No hay ofertas disponibles en este momento
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Vuelve pronto para ver nuevas promociones
          </p>
          
          {/* Botón crear en empty state - Solo para admin */}
          {isAdmin() && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-4 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Crear primera oferta
            </button>
          )}
        </div>
      )}

      {/* Modal de crear oferta */}
      {showCreateModal && (
        <CreateOfferModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreated={handleOfferCreated}
        />
      )}
    </div>
  );
};

export default WineOffersBanner;