/**
 * GoogleMapsService.jsx
 * Servicio para integración con Google Maps Platform Official API
 * Usa Nearby Search API (Essentials Plan - GRATIS)
 *
 * Plan: Essentials (FREE)
 * - 10,000 cargas de mapa/mes
 * - Ilimitado en SDK
 * - Unlimited en Embed
 */

import axios from "axios";

class GoogleMapsService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    this.baseURL = "https://places.googleapis.com/v1";

    if (!this.apiKey) {
      console.warn(
        "⚠️ REACT_APP_GOOGLE_MAPS_API_KEY no está configurada en .env",
      );
      console.warn("📖 Guía: https://console.cloud.google.com/");
    }
  }

  /**
   * Busca lugares cercanos a una ubicación
   * @param {number} latitude - Latitud
   * @param {number} longitude - Longitud
   * @param {string} type - Tipo de lugar (lodging, restaurant, tourist_attraction, etc)
   * @param {number} radius - Radio en metros (default 1500)
   * @returns {Promise<Object>} { estado, error, data, total }
   */
  async searchNearby(latitude, longitude, type = "lodging", radius = 1500) {
    try {
      // Validaciones
      if (!latitude || !longitude) {
        return {
          estado: false,
          error: "Coordenadas inválidas",
          data: [],
        };
      }

      if (!this.apiKey) {
        return {
          estado: false,
          error: "REACT_APP_GOOGLE_MAPS_API_KEY no configurada",
          data: [],
        };
      }

      // Mapeo de tipos en español a tipos de Google
      const typeMap = {
        hoteles: "lodging",
        restaurantes: "restaurant",
        atracciones: "tourist_attraction",
        "atracciones turísticas": "tourist_attraction",
        cafés: "cafe",
        museos: "museum",
        parques: "park",
        bares: "bar",
        cines: "movie_theater",
        "centros comerciales": "shopping_mall",
        hospitales: "hospital",
        farmacia: "pharmacy",
        banco: "bank",
        estación: "transit_station",
      };

      const includedType = typeMap[type.toLowerCase()] || type;

      // Payload según Google Places API v1
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

      console.log(
        `🔍 [GoogleMaps] Buscando ${includedType}s cerca de (${latitude}, ${longitude}), radio: ${radius}m`,
      );

      // Hacer petición POST a Google Places API
      const response = await axios.post(
        `${this.baseURL}/places:searchNearby?key=${this.apiKey}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 segundos
        },
      );

      // Verificar si hay resultados
      if (!response.data.places || response.data.places.length === 0) {
        console.log(`⚠️ [GoogleMaps] Sin resultados para ${includedType}`);
        return {
          estado: true,
          error: null,
          data: [],
          total: 0,
          message: "Sin resultados",
        };
      }

      // Formatear resultados
      const formatted = this.formatResults(response.data.places);

      console.log(
        `✅ [GoogleMaps] Encontrados ${formatted.length} ${includedType}s`,
      );

      return {
        estado: true,
        error: null,
        data: formatted,
        total: formatted.length,
      };
    } catch (error) {
      const errorMessage = this.parseError(error);
      console.error(`❌ [GoogleMaps] Error en searchNearby: ${errorMessage}`);

      return {
        estado: false,
        error: errorMessage,
        data: [],
      };
    }
  }

  /**
   * Busca hoteles cercanos (especializado)
   */
  async searchNearbyHotels(latitude, longitude, radius = 2000) {
    return this.searchNearby(latitude, longitude, "hoteles", radius);
  }

  /**
   * Busca restaurantes cercanos (especializado)
   */
  async searchNearbyRestaurants(latitude, longitude, radius = 1500) {
    return this.searchNearby(latitude, longitude, "restaurantes", radius);
  }

  /**
   * Busca atracciones turísticas cercanas (especializado)
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
   * Búsqueda por nombre/texto específico
   */
  async searchByText(query, latitude, longitude) {
    try {
      if (!query) {
        return {
          estado: false,
          error: "Búsqueda requerida",
          data: null,
        };
      }

      const payload = {
        textQuery: query,
        locationBias: {
          circle: {
            center: {
              latitude,
              longitude,
            },
            radius: 5000, // 5km de área de sesgo
          },
        },
        languageCode: "es",
      };

      console.log(`🔍 [GoogleMaps] Búsqueda de texto: "${query}"`);

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

      const formatted = this.formatResults(response.data.places);
      return {
        estado: true,
        error: null,
        data: formatted,
      };
    } catch (error) {
      console.error("❌ [GoogleMaps] Error en searchByText:", error.message);
      return {
        estado: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Obtiene detalles adicionales de un lugar
   */
  async getPlaceDetails(placeId) {
    try {
      if (!placeId) {
        return {
          estado: false,
          error: "Place ID requerido",
          data: null,
        };
      }

      const fields = [
        "displayName",
        "formattedAddress",
        "rating",
        "userRatingCount",
        "types",
        "priceLevel",
        "businessStatus",
        "internationalPhoneNumber",
        "websiteUri",
        "openingHours",
        "location",
        "photos",
      ].join(",");

      const response = await axios.get(
        `${this.baseURL}/${placeId}?fields=${fields}&key=${this.apiKey}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return {
        estado: true,
        data: this.formatResult(response.data),
      };
    } catch (error) {
      console.error("❌ [GoogleMaps] Error en getPlaceDetails:", error.message);
      return {
        estado: false,
        error: error.message,
        data: null,
      };
    }
  }

  /**
   * Formatea un resultado individual
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
      mapsUrl: this.buildGoogleMapsUrl(place.location),
      abierto: place.currentOpeningHours?.openNow || false,
      placeId: place.name, // Guardar el ID para consultas posteriores
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
   * Construye URL de foto de Google Places
   */
  getPhotoUrl(photoName, maxWidth = 400) {
    if (!photoName) return "";
    return `${this.baseURL}/${photoName}/media?max_height_px=${maxWidth}&max_width_px=${maxWidth}&key=${this.apiKey}`;
  }

  /**
   * Construye URL de Google Maps
   */
  buildGoogleMapsUrl(location) {
    if (!location) return "";
    return `https://www.google.com/maps/search/?api=1&query=${location.latitude},${location.longitude}`;
  }

  /**
   * Parsea errores de diferentes fuentes
   */
  parseError(error) {
    if (error.response?.data?.error?.message) {
      return error.response.data.error.message;
    } else if (error.response?.data?.error) {
      return JSON.stringify(error.response.data.error);
    } else if (error.response?.status === 401) {
      return "API Key inválida o expirada";
    } else if (error.response?.status === 403) {
      return "Acceso denegado. Verifica permisos de API Key";
    } else if (error.response?.status === 429) {
      return "Límite de consultas excedido. Intenta más tarde";
    } else if (error.code === "ECONNABORTED") {
      return "Timeout - Intenta de nuevo";
    } else {
      return error.message || "Error desconocido";
    }
  }

  /**
   * Calcula distancia entre dos puntos (Haversine)
   */
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  }
}

export default GoogleMapsService;
