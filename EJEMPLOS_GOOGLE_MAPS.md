# 📚 EJEMPLOS COMPLETOS: Google Maps API Integration

## Ejemplo 1: Home Page con Hoteles Cercanos

```jsx
// src/pages/home/Home.jsx
import { useState, useEffect } from "react";
import { useGoogleNearbyHotels } from "../../hooks/useGoogleNearbySearch";
import NearbyPlaces from "../../components/nearby_places/NearbyPlaces";

function Home() {
  const [location, setLocation] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  // Obtener geolocalización del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log(`📍 Ubicación obtenida: ${latitude}, ${longitude}`);
        },
        (error) => {
          console.warn("⚠️ Geolocalización denegada:", error);
          setPermissionDenied(true);
          // Usar ubicación por defecto (Quito)
          setLocation({ latitude: -0.35, longitude: -78.5 });
        },
      );
    }
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-banner py-12 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Bienvenido a Visita Ecuador
          </h1>
          <p className="text-xl mb-4">
            Descubre los mejores lugares cercanos a ti
          </p>
          {permissionDenied && (
            <p className="text-sm bg-yellow-500 px-4 py-2 rounded inline-block">
              📍 Usando ubicación por defecto (Quito)
            </p>
          )}
        </div>
      </section>

      {/* Lugares Cercanos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {location ? (
            <>
              {/* Hoteles */}
              <NearbyPlaces
                latitude={location.latitude}
                longitude={location.longitude}
                type="hoteles"
                title="🏨 Hoteles Cercanos a Tu Ubicación"
              />

              {/* Restaurantes */}
              <div className="mt-16">
                <NearbyPlaces
                  latitude={location.latitude}
                  longitude={location.longitude}
                  type="restaurantes"
                  title="🍽️ Restaurantes Cercanos"
                />
              </div>

              {/* Atracciones */}
              <div className="mt-16">
                <NearbyPlaces
                  latitude={location.latitude}
                  longitude={location.longitude}
                  type="atracciones turísticas"
                  title="🎢 Atracciones Turísticas Cercanas"
                />
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Obteniendo tu ubicación...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Home;
```

---

## Ejemplo 2: Página de Exploración Avanzada

```jsx
// src/pages/explorer/NearbyExplorer.jsx
import { useState, useEffect } from "react";
import { useGoogleNearbySearch } from "../../hooks/useGoogleNearbySearch";

function NearbyExplorer() {
  const [location, setLocation] = useState(null);
  const [searchType, setSearchType] = useState("hoteles");
  const [radius, setRadius] = useState(1500);
  const [minRating, setMinRating] = useState(0);

  // Obtener ubicación
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    }
  }, []);

  // Buscar lugares
  const { results, loading, error } = useGoogleNearbySearch(
    location?.latitude,
    location?.longitude,
    searchType,
    !!location,
    { radius, minRating },
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        🗺️ Explorador de Lugares Cercanos
      </h1>

      {/* Controles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-gray-100 p-6 rounded-lg">
        {/* Tipo de lugar */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Tipo de Lugar
          </label>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="hoteles">🏨 Hoteles</option>
            <option value="restaurantes">🍽️ Restaurantes</option>
            <option value="atracciones turísticas">🎢 Atracciones</option>
            <option value="cafés">☕ Cafés</option>
            <option value="museos">🏛️ Museos</option>
            <option value="parques">🌳 Parques</option>
            <option value="bares">🍺 Bares</option>
          </select>
        </div>

        {/* Radio de búsqueda */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Radio (metros)
          </label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            min="500"
            max="10000"
            step="500"
            className="w-full p-2 border border-gray-300 rounded"
          />
          <small className="text-gray-600">
            {radius}m = {(radius / 1000).toFixed(1)}km
          </small>
        </div>

        {/* Rating mínimo */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Rating Mínimo
          </label>
          <select
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value={0}>Todas las calificaciones</option>
            <option value={3}>⭐⭐⭐ 3+</option>
            <option value={3.5}>⭐⭐⭐ 3.5+</option>
            <option value={4}>⭐⭐⭐⭐ 4+</option>
            <option value={4.5}>⭐⭐⭐⭐ 4.5+</option>
          </select>
        </div>

        {/* Botón actualizar */}
        <div className="flex items-end">
          <button
            onClick={() => window.location.reload()}
            className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            🔄 Actualizar
          </button>
        </div>
      </div>

      {/* Estados */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Buscando {searchType}...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          ❌ {error}
        </div>
      )}

      {/* Resultados */}
      {!loading && results.length > 0 && (
        <>
          <p className="text-lg font-semibold mb-6 text-gray-700">
            Encontrados {results.length} {searchType}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((lugar) => (
              <div
                key={lugar.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {/* Foto */}
                {lugar.foto && (
                  <img
                    src={lugar.foto}
                    alt={lugar.nombre}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Sin+Foto";
                    }}
                  />
                )}

                {/* Contenido */}
                <div className="p-4">
                  {/* Nombre */}
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">
                    {lugar.nombre}
                  </h3>

                  {/* Rating */}
                  {lugar.rating > 0 && (
                    <p className="text-yellow-500 text-sm mb-2">
                      ⭐ {lugar.rating.toFixed(1)} ({lugar.reviews} reseñas)
                    </p>
                  )}

                  {/* Dirección */}
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                    📍 {lugar.direccion}
                  </p>

                  {/* Precio */}
                  {lugar.precio && lugar.precio !== "No disponible" && (
                    <p className="text-green-600 font-semibold text-sm mb-2">
                      {lugar.precio}
                    </p>
                  )}

                  {/* Distancia */}
                  {lugar.distancia > 0 && (
                    <p className="text-sm text-gray-500 mb-3">
                      📏 {lugar.distancia.toFixed(2)}m
                    </p>
                  )}

                  {/* Estado */}
                  {lugar.estado && (
                    <p
                      className={`text-sm font-semibold mb-4 ${
                        lugar.estado.includes("Abierto")
                          ? "text-green-600"
                          : lugar.estado.includes("temporalmente")
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {lugar.abierto ? "🟢" : "🔴"} {lugar.estado}
                    </p>
                  )}

                  {/* Botones de acción */}
                  <div className="flex gap-2 flex-wrap">
                    {lugar.telefono && (
                      <a
                        href={`tel:${lugar.telefono}`}
                        className="flex-1 min-w-[80px] bg-green-600 text-white py-2 rounded text-center text-sm hover:bg-green-700"
                      >
                        📞
                      </a>
                    )}
                    {lugar.website && (
                      <a
                        href={lugar.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[80px] bg-blue-600 text-white py-2 rounded text-center text-sm hover:bg-blue-700"
                      >
                        🌐
                      </a>
                    )}
                    {lugar.mapsUrl && (
                      <a
                        href={lugar.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[80px] bg-purple-600 text-white py-2 rounded text-center text-sm hover:bg-purple-700"
                      >
                        🗺️
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Sin resultados */}
      {!loading && results.length === 0 && !error && (
        <div className="text-center py-12 text-gray-600">
          <p className="text-xl mb-2">😕 No se encontraron resultados</p>
          <p>Intenta cambiar los filtros o el tipo de lugar</p>
        </div>
      )}
    </div>
  );
}

export default NearbyExplorer;
```

---

## Ejemplo 3: Componente de Dashboard

```jsx
// src/components/dashboard/NearbyDashboard.jsx
import { useGoogleNearbyAll } from "../../hooks/useGoogleNearbySearch";

function NearbyDashboard({ latitude, longitude }) {
  const { hotels, restaurants, attractions, allLoading, totalResults } =
    useGoogleNearbyAll(latitude, longitude);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* HOTELES */}
      <div className="bg-blue-50 rounded-lg p-6 border-2 border-blue-200">
        <h2 className="text-2xl font-bold mb-4">🏨 Hoteles</h2>

        {hotels.loading ? (
          <p className="text-gray-600">Cargando...</p>
        ) : hotels.error ? (
          <p className="text-red-600">Error: {hotels.error}</p>
        ) : (
          <>
            <div className="bg-blue-600 text-white py-3 px-4 rounded mb-4 text-center">
              <p className="text-2xl font-bold">{hotels.count}</p>
              <p className="text-sm">Encontrados</p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {hotels.results.slice(0, 5).map((hotel) => (
                <div
                  key={hotel.id}
                  className="bg-white p-3 rounded border-l-4 border-blue-600"
                >
                  <p className="font-semibold text-sm">{hotel.nombre}</p>
                  <p className="text-xs text-gray-600">
                    ⭐ {hotel.rating} ({hotel.reviews})
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* RESTAURANTES */}
      <div className="bg-red-50 rounded-lg p-6 border-2 border-red-200">
        <h2 className="text-2xl font-bold mb-4">🍽️ Restaurantes</h2>

        {restaurants.loading ? (
          <p className="text-gray-600">Cargando...</p>
        ) : restaurants.error ? (
          <p className="text-red-600">Error: {restaurants.error}</p>
        ) : (
          <>
            <div className="bg-red-600 text-white py-3 px-4 rounded mb-4 text-center">
              <p className="text-2xl font-bold">{restaurants.count}</p>
              <p className="text-sm">Encontrados</p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {restaurants.results.slice(0, 5).map((rest) => (
                <div
                  key={rest.id}
                  className="bg-white p-3 rounded border-l-4 border-red-600"
                >
                  <p className="font-semibold text-sm">{rest.nombre}</p>
                  <p className="text-xs text-gray-600">
                    ⭐ {rest.rating} ({rest.reviews})
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ATRACCIONES */}
      <div className="bg-green-50 rounded-lg p-6 border-2 border-green-200">
        <h2 className="text-2xl font-bold mb-4">🎢 Atracciones</h2>

        {attractions.loading ? (
          <p className="text-gray-600">Cargando...</p>
        ) : attractions.error ? (
          <p className="text-red-600">Error: {attractions.error}</p>
        ) : (
          <>
            <div className="bg-green-600 text-white py-3 px-4 rounded mb-4 text-center">
              <p className="text-2xl font-bold">{attractions.count}</p>
              <p className="text-sm">Encontrados</p>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {attractions.results.slice(0, 5).map((attr) => (
                <div
                  key={attr.id}
                  className="bg-white p-3 rounded border-l-4 border-green-600"
                >
                  <p className="font-semibold text-sm">{attr.nombre}</p>
                  <p className="text-xs text-gray-600">
                    ⭐ {attr.rating} ({attr.reviews})
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* RESUMEN */}
      <div className="md:col-span-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-6">
        <h3 className="text-xl font-bold mb-2">📊 Resumen Total</h3>
        <p className="text-3xl font-bold">{totalResults} lugares encontrados</p>
        {allLoading && <p className="text-sm mt-2">Actualizando datos...</p>}
      </div>
    </div>
  );
}

export default NearbyDashboard;
```

---

## Ejemplo 4: Integración en Hotel.jsx Existente

```jsx
// src/pages/hotel/Hotel.jsx (MEJORADO)
import { useState, useEffect } from "react";
import { useGoogleNearbyHotels } from "../../hooks/useGoogleNearbySearch";

function Hotel() {
  const [location, setLocation] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
      });
    }
  }, []);

  // Buscar hoteles cercanos
  const { results: nearbyHotels, loading } = useGoogleNearbyHotels(
    location?.latitude,
    location?.longitude,
    { minRating: 3.5, maxResults: 8 },
  );

  return (
    <div className="hotel-page">
      {/* Tu contenido existente */}

      {/* NUEVA SECCIÓN: Hoteles Recomendados Cercanos */}
      {location && !loading && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">
              🔥 Hoteles Recomendados Cercanos a Tu Ubicación
            </h2>

            {nearbyHotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {nearbyHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition cursor-pointer"
                    onClick={() => setSelectedHotel(hotel)}
                  >
                    {/* Foto */}
                    {hotel.foto && (
                      <img
                        src={hotel.foto}
                        alt={hotel.nombre}
                        className="w-full h-40 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=Hotel";
                        }}
                      />
                    )}

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {hotel.nombre}
                      </h3>

                      <div className="mb-2">
                        <p className="text-yellow-500 font-semibold">
                          ⭐ {hotel.rating.toFixed(1)}
                        </p>
                        <p className="text-xs text-gray-600">
                          ({hotel.reviews} reseñas)
                        </p>
                      </div>

                      {hotel.precio && hotel.precio !== "No disponible" && (
                        <p className="text-green-600 font-bold mb-3">
                          {hotel.precio}
                        </p>
                      )}

                      <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Ver Disponibilidad
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">
                No hay hoteles cercanos disponibles
              </p>
            )}
          </div>
        </section>
      )}

      {/* Modal detalle */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{selectedHotel.nombre}</h2>
                <button
                  onClick={() => setSelectedHotel(null)}
                  className="text-gray-600 text-2xl"
                >
                  ✕
                </button>
              </div>

              <p className="text-yellow-500 text-lg mb-2">
                ⭐ {selectedHotel.rating} ({selectedHotel.reviews} reseñas)
              </p>

              <p className="text-gray-600 mb-4">{selectedHotel.direccion}</p>

              {selectedHotel.precio && (
                <p className="text-green-600 text-lg font-bold mb-4">
                  {selectedHotel.precio}
                </p>
              )}

              <div className="flex gap-2">
                {selectedHotel.telefono && (
                  <a
                    href={`tel:${selectedHotel.telefono}`}
                    className="flex-1 bg-green-600 text-white py-2 rounded text-center"
                  >
                    📞 Llamar
                  </a>
                )}
                {selectedHotel.website && (
                  <a
                    href={selectedHotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-600 text-white py-2 rounded text-center"
                  >
                    🌐 Sitio Web
                  </a>
                )}
                <button className="flex-1 bg-purple-600 text-white py-2 rounded">
                  🛏️ Reservar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Hotel;
```

---

## Ejemplo 5: Custom Hook para Caso Específico

```javascript
// src/hooks/useHotelSearch.js
import { useGoogleNearbyHotels } from "./useGoogleNearbySearch";

/**
 * Hook personalizado para búsqueda de hoteles con lógica específica
 */
export const useHotelSearch = (latitude, longitude, filters = {}) => {
  const defaultFilters = {
    minRating: 3.5,
    maxResults: 10,
    sortBy: "rating",
  };

  const mergedFilters = { ...defaultFilters, ...filters };

  const { results, loading, error } = useGoogleNearbyHotels(
    latitude,
    longitude,
    {
      minRating: mergedFilters.minRating,
      maxResults: mergedFilters.maxResults,
    },
  );

  // Ordenar
  const sorted =
    mergedFilters.sortBy === "distance"
      ? [...results].sort((a, b) => a.distancia - b.distancia)
      : [...results].sort((a, b) => (b.rating || 0) - (a.rating || 0));

  return {
    hotels: sorted,
    loading,
    error,
    count: sorted.length,
    hasError: !!error,
  };
};
```

---

✅ **Todos estos ejemplos funcionan con Google Maps API Official (GRATIS)**

Copia y pega en tu proyecto. Recuerda:

1. Tener API Key en .env
2. Tener GoogleMapsService.jsx y hooks instalados
3. npm start
4. ¡Listo!
