# 🔄 MIGRACIÓN: SerpAPI → Google Maps API Oficial

## 📊 Comparación: SerpAPI vs Google Maps Official API

| Característica              | SerpAPI               | Google Maps Official                | Ganador |
| --------------------------- | --------------------- | ----------------------------------- | ------- |
| **Free Tier**               | ❌ No hay plan gratis | ✅ 10,000 llamadas/mes (Essentials) | Google  |
| **Near Me / Nearby Search** | ✅ `nearby: true`     | ✅ Nearby Search API                | Empate  |
| **Calidad de datos**        | ⭐⭐⭐⭐              | ⭐⭐⭐⭐⭐ Google Data              | Google  |
| **Documentación**           | ⭐⭐⭐                | ⭐⭐⭐⭐⭐                          | Google  |
| **Community**               | ⭐⭐                  | ⭐⭐⭐⭐⭐ Stack Overflow           | Google  |
| **Precios después de free** | $8 por 1000 llamadas  | $3-7 por 1000 llamadas (Essentials) | Google  |
| **Fotosde lugares**         | ✅ Incluidas          | ✅ Incluidas                        | Empate  |
| **Reseñas/Ratings**         | ✅ Sí                 | ✅ Sí                               | Empate  |
| **Horarios de apertura**    | ✅ Sí                 | ✅ Sí                               | Empate  |
| **Información de contacto** | ✅ Sí                 | ✅ Sí                               | Empate  |
| **SKUs separadas**          | ❌ No                 | ✅ Sí (mejor control)               | Google  |
| **Soporte oficial**         | ⭐⭐                  | ⭐⭐⭐⭐⭐                          | Google  |

---

## 💰 Pricing Comparativo (Plan Gratuito)

### Google Maps Platform - Essentials (GRATIS)

```
🎁 Cada mes, GRATIS:
├── Dynamic Maps: 10,000 cargas de mapa
├── Map Tiles 2D: 100,000 requests
├── Street View Tiles: 100,000 requests
├── Static Maps: 10,000 cargas
├── Embed: Ilimitado
└── Nearby Search: Incluida en Dynamic Maps

Total Estimado: $0/mes para uso casual
```

### SerpAPI (No hay gratis)

```
❌ Mínimo: $8/mes (primer 1000 llamadas)
❌ No hay opción gratuita
❌ Debe registrar tarjeta de crédito
```

---

## 🎯 Google Maps API Essentials (Plan Gratuito)

### APIs Disponibles en Essentials:

```
✅ Dynamic Maps
   └─ Interactive, JavaScript SDK
   └─ 10,000 map loads/month FREE

✅ Embed
   └─ Embeds de mapas interactivas
   └─ UNLIMITED (sin coste)

✅ Map Tiles (2D)
   └─ Para tilemaps personalizados
   └─ 100,000 requests/month FREE

✅ Static Maps
   └─ Imágenes de mapas estáticas
   └─ 10,000 loads/month FREE

✅ Streets View Tiles
   └─ Tiles de Street View
   └─ 100,000 requests/month FREE

✅ Maps SDK (Android/iOS)
   └─ SDKs nativas
   └─ UNLIMITED

🚨 Places API
   ├─ RESTRICCIÓN: Cerca de 5K/mes en Essentials
   ├─ Nearby Search: Incluida
   ├─ Text Search: Incluida
   ├─ Place Details: Incluida
   └─ Place Photos: Incluida
```

---

## 🔍 Implementación: Nearby Search API

### Endpoint Oficial de Google

```
GET https://places.googleapis.com/v1/places:searchNearby
```

### Parámetros Requeridos

```javascript
{
  "location": {
    "latitude": -0.35,      // Tu latitud
    "longitude": -78.50      // Tu longitud
  },
  "radius": 1500,           // Radio en metros (0-50,000m)
  "languageCode": "es",     // Idioma español
  "rankPreference": "DISTANCE" // Por distancia
}
```

### Formato de Búsqueda con Filtro

```javascript
// Buscar hoteles cercanos
{
  "location": {
    "latitude": -0.35,
    "longitude": -78.50
  },
  "radius": 2000,
  "includedTypes": ["lodging"],  // 🔑 Solo hoteles
  "languageCode": "es"
}

// Buscar restaurantes
{
  "location": {
    "latitude": -0.35,
    "longitude": -78.50
  },
  "radius": 1500,
  "includedTypes": ["restaurant"],  // 🔑 Solo restaurantes
  "languageCode": "es"
}

// Buscar atracciones turísticas
{
  "location": {
    "latitude": -0.35,
    "longitude": -78.50
  },
  "radius": 3000,
  "includedTypes": ["tourist_attraction"],
  "languageCode": "es"
}
```

### Respuesta JSON

```json
{
  "places": [
    {
      "name": "Hotel Casa Grande",
      "formattedAddress": "Av. Patria 123, Quito, Ecuador",
      "rating": 4.5,
      "userRatingCount": 234,
      "types": ["lodging"],
      "googleMapsUri": "https://maps.google.com/?cid=12345",
      "businessStatus": "OPERATIONAL",
      "displayName": {
        "text": "Hotel Casa Grande",
        "languageCode": "es"
      },
      "priceLevel": "HIGH",
      "photos": [
        {
          "name": "places/ChIJa1234567890/photos/abc123",
          "widthPx": 400,
          "heightPx": 300,
          "authorAttributions": [
            {
              "displayName": "Usuario",
              "uri": "//www.google.com/maps/contrib/1234567890"
            }
          ]
        }
      ],
      "internationalPhoneNumber": "+593 1 2345678",
      "websiteUri": "https://hotelcasagrande.com",
      "openingHours": {
        "weekdayDescriptions": [
          "Monday: Open 24 hours",
          "Tuesday: Open 24 hours",
          "Wednesday: Open 24 hours",
          "Thursday: Open 24 hours",
          "Friday: Open 24 hours",
          "Saturday: Open 24 hours",
          "Sunday: Open 24 hours"
        ],
        "periods": [
          {
            "open": {
              "day": 0,
              "hour": 0,
              "minute": 0
            }
          }
        ]
      },
      "location": {
        "latitude": -0.3518,
        "longitude": -78.5018
      },
      "distance": 450.5
    }
  ]
}
```

---

## 📝 Nuevo Servicio: GoogleMapsService.jsx

```jsx
// src/services/googlemaps/GoogleMapsService.jsx
import axios from "axios";

class GoogleMapsService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    this.baseURL = "https://places.googleapis.com/v1";
  }

  /**
   * Busca lugares cercanos a una ubicación
   * @param {number} latitude - Latitud
   * @param {number} longitude - Longitud
   * @param {string} type - Tipo de lugar (lodging, restaurant, tourist_attraction, etc)
   * @param {number} radius - Radio en metros (default 1500)
   * @returns {Promise<Object>} Lugares encontrados con formato normalizado
   */
  async searchNearby(latitude, longitude, type = "lodging", radius = 1500) {
    try {
      if (!latitude || !longitude) {
        return {
          estado: false,
          error: "Coordenadas inválidas",
          data: [],
        };
      }

      if (!this.apiKey) {
        console.error(
          "❌ REACT_APP_GOOGLE_MAPS_API_KEY no configurada en .env",
        );
        return {
          estado: false,
          error: "API Key no configurada",
          data: [],
        };
      }

      const typeMap = {
        hoteles: "lodging",
        restaurantes: "restaurant",
        atracciones: "tourist_attraction",
        "atracciones turísticas": "tourist_attraction",
        cafés: "cafe",
        museos: "museum",
        parques: "park",
        bares: "bar",
      };

      const includedType = typeMap[type.toLowerCase()] || type;

      const payload = {
        location: {
          latitude,
          longitude,
        },
        radius,
        includedTypes: [includedType],
        languageCode: "es",
        rankPreference: "DISTANCE",
        maxResultCount: 20,
      };

      console.log("🔍 Buscando:", {
        type: includedType,
        latitude,
        longitude,
        radius,
      });

      const response = await axios.post(
        `${this.baseURL}/places:searchNearby?key=${this.apiKey}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Client": "gl-node/16.0.0 gapic/1.0.0 gax/1.6.0 gl-web",
          },
        },
      );

      if (!response.data.places) {
        return {
          estado: true,
          error: null,
          data: [],
          message: "Sin resultados",
        };
      }

      const formatted = this.formatResults(response.data.places);

      console.log("✅ Encontrados:", formatted.length, "lugares");

      return {
        estado: true,
        error: null,
        data: formatted,
        total: formatted.length,
      };
    } catch (error) {
      console.error("❌ Error en searchNearby:", error);
      return {
        estado: false,
        error: error.response?.data?.error?.message || error.message,
        data: [],
      };
    }
  }

  /**
   * Busca solo hoteles cercanos
   */
  async searchNearbyHotels(latitude, longitude, radius = 2000) {
    return this.searchNearby(latitude, longitude, "hoteles", radius);
  }

  /**
   * Busca solo restaurantes cercanos
   */
  async searchNearbyRestaurants(latitude, longitude, radius = 1500) {
    return this.searchNearby(latitude, longitude, "restaurantes", radius);
  }

  /**
   * Busca solo atracciones turísticas cercanas
   */
  async searchNearbyAttractions(latitude, longitude, radius = 3000) {
    return this.searchNearby(
      latitude,
      longitude,
      "atracciones turísticas",
      radius,
    );
  }

  /**
   * Obtiene detalles de un lugar específico
   */
  async getPlaceDetails(placeName, latitude, longitude) {
    try {
      const payload = {
        textQuery: placeName,
        locationBias: {
          circle: {
            center: {
              latitude,
              longitude,
            },
            radius: 5000,
          },
        },
        languageCode: "es",
      };

      const response = await axios.post(
        `${this.baseURL}/places:searchText?key=${this.apiKey}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.data.places || response.data.places.length === 0) {
        return {
          estado: false,
          error: "Lugar no encontrado",
          data: null,
        };
      }

      return {
        estado: true,
        error: null,
        data: this.formatResult(response.data.places[0]),
      };
    } catch (error) {
      console.error("❌ Error en getPlaceDetails:", error);
      return {
        estado: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Obtiene foto de un lugar
   */
  async getPlacePhoto(photoName, maxWidth = 400) {
    try {
      if (!photoName) {
        return {
          estado: false,
          error: "Photo name requerido",
        };
      }

      // Formato: places/ChIJa1234567890/photos/abc123
      const photoUrl = `${this.baseURL}/${photoName}/media?max_height_px=${maxWidth}&max_width_px=${maxWidth}&key=${this.apiKey}`;

      return {
        estado: true,
        url: photoUrl,
      };
    } catch (error) {
      console.error("❌ Error en getPlacePhoto:", error);
      return {
        estado: false,
        error: error.message,
      };
    }
  }

  /**
   * Formatea resultado individual de Google Places
   */
  formatResult(place) {
    return {
      id: place.name, // "places/ChIJa1234567890"
      nombre: place.displayName?.text || place.name || "Sin nombre",
      tipo: place.types?.[0] || "local",
      direccion: place.formattedAddress || "",
      rating: place.rating || 0,
      reviews: place.userRatingCount || 0,
      telefono: place.internationalPhoneNumber || "",
      website: place.websiteUri || "",
      estado: this.mapBusinessStatus(place.businessStatus),
      precio: this.mapPriceLevel(place.priceLevel),
      foto: place.photos?.[0]?.name
        ? this.getPhotoUrl(place.photos[0].name)
        : "",
      horario: place.openingHours?.weekdayDescriptions || [],
      coordenadas: place.location
        ? {
            latitud: place.location.latitude,
            longitud: place.location.longitude,
          }
        : { latitud: 0, longitud: 0 },
      distancia: place.distance || 0,
      mapsUrl: place.googleMapsUri || "",
      abierto: place.currentOpeningHours?.openNow || false,
    };
  }

  /**
   * Formatea múltiples resultados
   */
  formatResults(places) {
    return places.map((place) => this.formatResult(place));
  }

  /**
   * Mapea estado del negocio
   */
  mapBusinessStatus(status) {
    const statusMap = {
      OPERATIONAL: "Abierto",
      CLOSED_TEMPORARILY: "Cerrado temporalmente",
      CLOSED_PERMANENTLY: "Cerrado permanentemente",
      BUSINESS_STATUS_UNSPECIFIED: "Estado desconocido",
    };
    return statusMap[status] || "Estado desconocido";
  }

  /**
   * Mapea nivel de precio
   */
  mapPriceLevel(level) {
    const priceMap = {
      PRICE_LEVEL_UNSPECIFIED: "No disponible",
      PRICE_LEVEL_FREE: "Gratis",
      PRICE_LEVEL_INEXPENSIVE: "$",
      PRICE_LEVEL_MODERATE: "$$",
      PRICE_LEVEL_EXPENSIVE: "$$$",
      PRICE_LEVEL_VERY_EXPENSIVE: "$$$$",
    };
    return priceMap[level] || "No disponible";
  }

  /**
   * Construye URL de foto
   */
  getPhotoUrl(photoName, maxWidth = 400) {
    return `${this.baseURL}/${photoName}/media?max_height_px=${maxWidth}&max_width_px=${maxWidth}&key=${this.apiKey}`;
  }
}

export default GoogleMapsService;
```

---

## ⚛️ Hook Actualizado: useGoogleNearbySearch.js

```javascript
// src/hooks/useGoogleNearbySearch.js
import { useState, useEffect } from "react";
import GoogleMapsService from "../services/googlemaps/GoogleMapsService";

/**
 * Hook principal para buscar lugares cercanos
 */
export const useGoogleNearbySearch = (
  latitude,
  longitude,
  type = "hoteles",
  enabled = true,
  options = {},
) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState({
    timestamp: null,
    query: null,
    resultCount: 0,
  });

  const defaultOptions = {
    radius: 1500,
    minRating: 0,
    maxResults: 20,
    language: "es",
  };

  const mergedOptions = { ...defaultOptions, ...options };

  const refetch = async () => {
    if (!latitude || !longitude || !enabled) {
      setError("Coordenadas requeridas");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const service = new GoogleMapsService();
      const response = await service.searchNearby(
        latitude,
        longitude,
        type,
        mergedOptions.radius,
      );

      if (response.estado) {
        let filtered = response.data;

        // Filtrar por rating si se especifica
        if (mergedOptions.minRating > 0) {
          filtered = filtered.filter(
            (item) => (item.rating || 0) >= mergedOptions.minRating,
          );
        }

        // Limitar resultados
        filtered = filtered.slice(0, mergedOptions.maxResults);

        setResults(filtered);
        setMetadata({
          timestamp: new Date().toISOString(),
          query: type,
          resultCount: filtered.length,
        });
      } else {
        setError(response.error);
        setResults([]);
      }
    } catch (err) {
      console.error("Error en hook:", err);
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled && latitude && longitude) {
      refetch();
    }
  }, [latitude, longitude, type, enabled]);

  return {
    results,
    loading,
    error,
    metadata,
    refetch,
    isEmpty: results.length === 0,
    count: results.length,
  };
};

/**
 * Hook específico para hoteles
 */
export const useGoogleNearbyHotels = (latitude, longitude, options = {}) => {
  return useGoogleNearbySearch(latitude, longitude, "hoteles", true, {
    radius: 2000,
    ...options,
  });
};

/**
 * Hook específico para restaurantes
 */
export const useGoogleNearbyRestaurants = (
  latitude,
  longitude,
  options = {},
) => {
  return useGoogleNearbySearch(latitude, longitude, "restaurantes", true, {
    radius: 1500,
    ...options,
  });
};

/**
 * Hook específico para atracciones
 */
export const useGoogleNearbyAttractions = (
  latitude,
  longitude,
  options = {},
) => {
  return useGoogleNearbySearch(
    latitude,
    longitude,
    "atracciones turísticas",
    true,
    {
      radius: 3000,
      ...options,
    },
  );
};

/**
 * Hook para dashboard con todos los tipos
 */
export const useGoogleNearbyAll = (latitude, longitude, options = {}) => {
  const hotels = useGoogleNearbyHotels(latitude, longitude, options);
  const restaurants = useGoogleNearbyRestaurants(latitude, longitude, options);
  const attractions = useGoogleNearbyAttractions(latitude, longitude, options);

  return {
    hotels,
    restaurants,
    attractions,
    allLoading: hotels.loading || restaurants.loading || attractions.loading,
    allError: hotels.error || restaurants.error || attractions.error,
    totalResults: hotels.count + restaurants.count + attractions.count,
  };
};
```

---

## 🚀 Instalación Paso a Paso

### 1. Crear Proyecto en Google Cloud Console

```bash
# 1. Ir a: https://console.cloud.google.com/
# 2. Crear un nuevo proyecto: "Visita Ecuador"
# 3. Habilitar APIs:
#    - Maps SDK for JavaScript
#    - Places API
#    - Maps Embed API
# 4. Crear una clave API (Restricción: aplicaciones web)
# 5. Copiar la clave
```

### 2. Agregar a .env

```bash
# .env (en raíz del proyecto)
REACT_APP_GOOGLE_MAPS_API_KEY=TU_CLAVE_AQUI_SIN_COMILLAS
```

### 3. Instalar axios (si no está)

```bash
npm install axios
```

### 4. Copiar los nuevos archivos

```bash
# Servicio
src/services/googlemaps/GoogleMapsService.jsx

# Hooks
src/hooks/useGoogleNearbySearch.js

# El componente NearbyPlaces.jsx sigue igual, solo actualizar el import
```

### 5. Actualizar NearbyPlaces.jsx

```jsx
// Cambiar de:
// import { useNearbySearch } from '../../hooks/useNearbySearch';

// A:
import { useGoogleNearbySearch } from "../../hooks/useGoogleNearbySearch";

// El resto del componente se mantiene igual
```

---

## 📊 Comparación de Límites Gratuitos

### Escenario: Website de Turismo con 100 visitantes/día

```
Google Maps (FREE):
├─ 10,000 Dynamic Maps cargas/mes
├─ Costo por visitante: $0
├─ Costo total/mes: $0
└─ ¿Suficiente? ✅ SÍ (100 * 30 = 3,000 cargas)

SerpAPI:
├─ Mínimo: 1,000 llamadas = $8
├─ Costo por visitante: $0.08
├─ Costo total/mes: $24-80 (dependiendo de búsquedas)
└─ ¿Suficiente? ✅ Sí, pero pagando
```

---

## ✅ Ventajas Google Maps Official

```
✅ GRATIS: 10,000 llamadas/mes Essentials
✅ MEJOR: Datos de Google (más precisos)
✅ ACTUALIZADO: Se actualiza en tiempo real
✅ SOPORTE: Documentación oficial de Google
✅ INTEGRACION: Funciona con Maps SDK
✅ PRECIO: $3-7 por 1000 después (vs $8 en SerpAPI)
✅ CONFIABILIDAD: Infraestructura Google
✅ FEATURES: Nearby Search nativa
✅ SDK: JavaScript, Android, iOS
✅ ESCALABLE: Crece con tu proyecto
```

---

## 🔒 Consideraciones de Seguridad

### ⚠️ NUNCA hagas esto

```javascript
// ❌ MALO - Expone tu clave
const response = await fetch(
  "https://places.googleapis.com/v1/places:searchNearby?key=YOUR_KEY",
);
```

### ✅ BUENO - Usa variables de entorno

```javascript
// ✅ CORRECTO
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
// Se incluye en el bundle de React (sigue siendo expuesta pero controlada)
```

### 🔐 MEJOR - Backend Proxy (Para producción)

```javascript
// Frontend: Solo llama a tu backend
const response = await fetch("/api/nearby-search", {
  method: "POST",
  body: JSON.stringify({ latitude, longitude, type }),
});

// Backend (Node.js): Llama a Google Maps
app.post("/api/nearby-search", async (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Secret
  const response = await axios.post(
    `https://places.googleapis.com/v1/places:searchNearby?key=${apiKey}`,
    req.body,
  );
  res.json(response.data);
});
```

---

## 📱 Ejemplo de Uso Completo

```jsx
// src/pages/home/Home.jsx
import { useState, useEffect } from "react";
import NearbyPlaces from "../../components/nearby_places/NearbyPlaces";
import { useGoogleNearbyAll } from "../../hooks/useGoogleNearbySearch";

function Home() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => console.log("Geolocalización denegada:", error),
      );
    }
  }, []);

  // Obtener todos los tipos de lugares
  const { hotels, restaurants, attractions, allLoading } = useGoogleNearbyAll(
    location?.latitude,
    location?.longitude,
  );

  return (
    <div className="home">
      {location ? (
        <>
          <h1>Explora tu área cercana</h1>

          {allLoading && <p>Cargando lugares...</p>}

          <NearbyPlaces
            latitude={location.latitude}
            longitude={location.longitude}
            type="hoteles"
            title="🏨 Hoteles Cercanos"
          />

          <NearbyPlaces
            latitude={location.latitude}
            longitude={location.longitude}
            type="restaurantes"
            title="🍽️ Restaurantes"
          />

          <NearbyPlaces
            latitude={location.latitude}
            longitude={location.longitude}
            type="atracciones"
            title="🎢 Atracciones Turísticas"
          />
        </>
      ) : (
        <p>Activa tu geolocalización para ver lugares cercanos</p>
      )}
    </div>
  );
}

export default Home;
```

---

## ❓ Preguntas Frecuentes

**P: ¿Necesito tarjeta de crédito para el plan gratuito?**
R: SÍ, Google requiere registrar una tarjeta, pero no te cobrará hasta que excedas el límite gratuito.

**P: ¿Qué pasa si excedo 10,000 llamadas/mes?**
R: Se te cobrará $3-7 por cada 1,000 llamadas adicionales (automáticamente).

**P: ¿Puedo limitar el gasto?**
R: SÍ, en Google Cloud Console → Presupuestos y alertas.

**P: ¿Qué tipos de lugares puedo buscar?**
R: 100+ tipos: `lodging`, `restaurant`, `cafe`, `museum`, `park`, `bar`, `grocery_or_supermarket`, etc.

**P: ¿Funciona sin internet?**
R: NO, necesita conexión a internet para hacer las llamadas.

**P: ¿Puedo caché los resultados?**
R: SÍ, localStorage o sessionStorage (recomendado: 1-24 horas).

---

## 🎯 Siguiente Paso

1. ✅ Crear cuenta en Google Cloud: https://console.cloud.google.com/
2. ✅ Crear proyecto "Visita Ecuador"
3. ✅ Habilitar "Places API"
4. ✅ Crear API Key
5. ✅ Copiar el nuevo GoogleMapsService.jsx
6. ✅ Actualizar .env
7. ✅ Actualizar imports en NearbyPlaces.jsx
8. ✅ Probar

¡Listo! 🚀
