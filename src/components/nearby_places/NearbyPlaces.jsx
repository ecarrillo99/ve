import React, { useEffect, useState } from "react";
import { useNearbySearch } from "../../../hooks/useNearbySearch";
import "./NearbyPlaces.css";

/**
 * Componente para mostrar lugares cercanos usando SerpAPI
 * Ejemplo de implementación del "Near Me" para VisitaEcuador
 *
 * @example
 * <NearbyPlaces latitude={-0.35} longitude={-78.50} />
 */
const NearbyPlaces = ({
  latitude,
  longitude,
  type = "hoteles", // "hoteles", "restaurantes", "atracciones"
  title = "Lugares Cercanos",
}) => {
  const [query, setQuery] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);

  // Generar query predeterminado
  useEffect(() => {
    switch (type) {
      case "hoteles":
        setQuery("hoteles 4 estrellas");
        break;
      case "restaurantes":
        setQuery("restaurantes");
        break;
      case "atracciones":
        setQuery("atracciones turísticas");
        break;
      default:
        setQuery(type);
    }
  }, [type]);

  // Hook de búsqueda
  const { results, loading, error, isEmpty } = useNearbySearch(
    latitude,
    longitude,
    query,
    !!query, // Solo buscar si hay query
    { minRating },
  );

  if (!latitude || !longitude) {
    return (
      <div className="nearby-places nearby-places--no-location">
        <div className="nearby-places__message">
          <span className="icon-[fluent--location-off-20-regular]"></span>
          <p>Activa tu ubicación para ver lugares cercanos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="nearby-places">
      {/* Header */}
      <div className="nearby-places__header">
        <h3 className="nearby-places__title">{title}</h3>
        <button
          className="nearby-places__filter-toggle"
          onClick={() => setShowFilters(!showFilters)}
          title="Mostrar filtros"
        >
          <span className="icon-[fluent--filter-20-regular]"></span>
        </button>
      </div>

      {/* Filtros */}
      {showFilters && (
        <div className="nearby-places__filters">
          <div className="nearby-places__filter-group">
            <label htmlFor="query">Buscar:</label>
            <input
              id="query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ej: hoteles, restaurantes..."
              className="nearby-places__input"
            />
          </div>

          <div className="nearby-places__filter-group">
            <label htmlFor="rating">Calificación mínima:</label>
            <div className="nearby-places__rating-filter">
              <select
                id="rating"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="nearby-places__select"
              >
                <option value={0}>Todas</option>
                <option value={3}>⭐ 3+</option>
                <option value={4}>⭐⭐⭐⭐ 4+</option>
                <option value={4.5}>⭐⭐⭐⭐ 4.5+</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Estado de carga */}
      {loading && (
        <div className="nearby-places__loading">
          <div className="nearby-places__spinner"></div>
          <p>Buscando lugares cercanos...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="nearby-places__error">
          <span className="icon-[fluent--warning-20-regular]"></span>
          <p>{error}</p>
        </div>
      )}

      {/* Sin resultados */}
      {isEmpty && !loading && (
        <div className="nearby-places__empty">
          <span className="icon-[fluent--search-info-20-regular]"></span>
          <p>No se encontraron resultados cercanos</p>
          <small>Intenta cambiar los filtros</small>
        </div>
      )}

      {/* Resultados */}
      {!loading && !error && results.length > 0 && (
        <div className="nearby-places__list">
          {results.slice(0, 10).map((lugar) => (
            <div
              key={lugar.id}
              className="nearby-places__item"
              data-rating={lugar.rating}
            >
              {/* Imagen */}
              {lugar.foto && (
                <div className="nearby-places__image-container">
                  <img
                    src={lugar.foto}
                    alt={lugar.nombre}
                    className="nearby-places__image"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/200x150?text=Sin+foto";
                    }}
                  />
                  {lugar.distancia !== "No disponible" && (
                    <span className="nearby-places__distance">
                      📍 {lugar.distancia}
                    </span>
                  )}
                </div>
              )}

              {/* Contenido */}
              <div className="nearby-places__content">
                {/* Nombre y Rating */}
                <div className="nearby-places__header-info">
                  <h4 className="nearby-places__name">{lugar.nombre}</h4>
                  {lugar.rating && (
                    <div className="nearby-places__rating">
                      <span className="nearby-places__stars">
                        {"⭐".repeat(Math.floor(lugar.rating))}
                      </span>
                      <span className="nearby-places__rating-value">
                        {lugar.rating.toFixed(1)}
                      </span>
                      {lugar.reviews && (
                        <span className="nearby-places__reviews-count">
                          ({lugar.reviews})
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Tipo */}
                {lugar.tipo && (
                  <p className="nearby-places__type">{lugar.tipo}</p>
                )}

                {/* Dirección */}
                {lugar.direccion && (
                  <p className="nearby-places__address">{lugar.direccion}</p>
                )}

                {/* Precio */}
                {lugar.precio && (
                  <p className="nearby-places__price">{lugar.precio}</p>
                )}

                {/* Horario */}
                {lugar.estado && (
                  <p
                    className={`nearby-places__hours ${lugar.estado.includes("Abierto") ? "nearby-places__hours--open" : "nearby-places__hours--closed"}`}
                  >
                    {lugar.estado}
                  </p>
                )}

                {/* Contacto y Links */}
                <div className="nearby-places__actions">
                  {lugar.telefono && (
                    <a
                      href={`tel:${lugar.telefono}`}
                      className="nearby-places__action nearby-places__action--phone"
                      title="Llamar"
                    >
                      <span className="icon-[fluent--phone-20-regular]"></span>
                    </a>
                  )}

                  {lugar.website && (
                    <a
                      href={lugar.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nearby-places__action nearby-places__action--website"
                      title="Ir al sitio web"
                    >
                      <span className="icon-[fluent--globe-20-regular]"></span>
                    </a>
                  )}

                  {lugar.links?.google && (
                    <a
                      href={lugar.links.google}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nearby-places__action nearby-places__action--maps"
                      title="Ver en Google Maps"
                    >
                      <span className="icon-[fluent--location-20-regular]"></span>
                    </a>
                  )}

                  {lugar.links?.reservar && (
                    <a
                      href={lugar.links.reservar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="nearby-places__action nearby-places__action--book"
                      title="Reservar"
                    >
                      <span className="icon-[fluent--calendar-20-regular]"></span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      {results.length > 10 && (
        <div className="nearby-places__info">
          Mostrando 10 de {results.length} resultados
        </div>
      )}
    </div>
  );
};

export default NearbyPlaces;
