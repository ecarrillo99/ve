/**
 * useGoogleNearbySearch.js
 * Hooks React para Google Maps Nearby Search API
 * 
 * Tipos disponibles: hoteles, restaurantes, atracciones, cafés, museos, etc.
 */

import { useState, useEffect } from 'react';
import GoogleMapsService from '../services/googlemaps/GoogleMapsService';

/**
 * Hook principal para buscar lugares cercanos
 * @param {number} latitude - Latitud del usuario
 * @param {number} longitude - Longitud del usuario
 * @param {string} type - Tipo de lugar (hoteles, restaurantes, etc)
 * @param {boolean} enabled - Si debe hacer búsquedas automáticas
 * @param {Object} options - Opciones adicionales { radius, minRating, maxResults }
 */
export const useGoogleNearbySearch = (
  latitude,
  longitude,
  type = 'hoteles',
  enabled = true,
  options = {}
) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState({
    timestamp: null,
    query: null,
    resultCount: 0,
    totalInRadius: 0
  });

  // Opciones por defecto
  const defaultOptions = {
    radius: 1500,        // metros
    minRating: 0,        // 0 = sin filtro
    maxResults: 20,      // limitar resultados
    language: 'es'
  };

  const mergedOptions = { ...defaultOptions, ...options };

  /**
   * Ejecuta la búsqueda
   */
  const refetch = async () => {
    // Validar que tengamos coordenadas
    if (!latitude || !longitude || !enabled) {
      setError('Coordenadas requeridas');
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const service = new GoogleMapsService();
      
      // Llamar al servicio
      const response = await service.searchNearby(
        latitude,
        longitude,
        type,
        mergedOptions.radius
      );

      if (response.estado) {
        let filtered = response.data || [];

        // Filtrar por rating mínimo
        if (mergedOptions.minRating > 0) {
          filtered = filtered.filter(
            item => (item.rating || 0) >= mergedOptions.minRating
          );
        }

        // Limitar cantidad de resultados
        const limited = filtered.slice(0, mergedOptions.maxResults);

        setResults(limited);
        setMetadata({
          timestamp: new Date().toISOString(),
          query: type,
          resultCount: limited.length,
          totalInRadius: response.data.length,
          filters: mergedOptions
        });
      } else {
        setError(response.error);
        setResults([]);
        setMetadata({
          timestamp: new Date().toISOString(),
          query: type,
          resultCount: 0,
          error: response.error
        });
      }
    } catch (err) {
      console.error('❌ [Hook] Error en useGoogleNearbySearch:', err);
      setError(err.message || 'Error desconocido');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Ejecutar búsqueda cuando cambien los parámetros
  useEffect(() => {
    if (enabled && latitude && longitude) {
      refetch();
    }
  }, [latitude, longitude, type, enabled, mergedOptions.radius, mergedOptions.minRating]);

  return {
    results,
    loading,
    error,
    metadata,
    refetch,
    isEmpty: results.length === 0 && !loading,
    count: results.length,
    hasError: !!error
  };
};

/**
 * Hook específico para búsqueda de hoteles
 */
export const useGoogleNearbyHotels = (
  latitude,
  longitude,
  options = {}
) => {
  return useGoogleNearbySearch(
    latitude,
    longitude,
    'hoteles',
    true,
    {
      radius: 2000, // Buscar más lejos para hoteles
      ...options
    }
  );
};

/**
 * Hook específico para búsqueda de restaurantes
 */
export const useGoogleNearbyRestaurants = (
  latitude,
  longitude,
  options = {}
) => {
  return useGoogleNearbySearch(
    latitude,
    longitude,
    'restaurantes',
    true,
    {
      radius: 1500,
      ...options
    }
  );
};

/**
 * Hook específico para búsqueda de atracciones turísticas
 */
export const useGoogleNearbyAttractions = (
  latitude,
  longitude,
  options = {}
) => {
  return useGoogleNearbySearch(
    latitude,
    longitude,
    'atracciones turísticas',
    true,
    {
      radius: 3000, // Más lejos para atracciones
      ...options
    }
  );
};

/**
 * Hook para dashboard con todos los tipos de lugares
 */
export const useGoogleNearbyAll = (
  latitude,
  longitude,
  options = {}
) => {
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
    hasAnyError: hotels.hasError || restaurants.hasError || attractions.hasError
  };
};

/**
 * Hook para búsqueda de múltiples tipos específicos
 * Útil para dashboards personalizados
 */
export const useGoogleNearbyMultiple = (
  latitude,
  longitude,
  types = ['hoteles', 'restaurantes'],
  options = {}
) => {
  const [allResults, setAllResults] = useState({});
  const [allLoading, setAllLoading] = useState(false);
  const [allError, setAllError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      setAllLoading(true);
      setAllError(null);

      try {
        const service = new GoogleMapsService();
        const results = {};

        for (const type of types) {
          const response = await service.searchNearby(
            latitude,
            longitude,
            type,
            options.radius || 1500
          );

          if (response.estado) {
            results[type] = response.data.slice(0, options.maxResults || 10);
          } else {
            results[type] = [];
          }
        }

        setAllResults(results);
      } catch (err) {
        console.error('❌ Error en useGoogleNearbyMultiple:', err);
        setAllError(err.message);
      } finally {
        setAllLoading(false);
      }
    };

    if (latitude && longitude && types.length > 0) {
      fetchAll();
    }
  }, [latitude, longitude, types.join(',')]);

  return {
    results: allResults,
    loading: allLoading,
    error: allError,
    isEmpty: Object.values(allResults).every(arr => arr.length === 0),
    totalResults: Object.values(allResults).reduce((sum, arr) => sum + arr.length, 0)
  };
};

/**
 * Hook para búsqueda avanzada con filtros personalizados
 */
export const useGoogleNearbyAdvanced = (
  latitude,
  longitude,
  type = 'hoteles',
  filters = {},
  enabled = true
) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filtros avanzados
  const defaultFilters = {
    radius: 1500,
    minRating: 0,
    maxPrice: null, // '$', '$$', '$$$', '$$$$'
    openNow: false,
    maxResults: 20,
    sortBy: 'distance' // 'distance', 'rating'
  };

  const mergedFilters = { ...defaultFilters, ...filters };

  useEffect(() => {
    if (!enabled || !latitude || !longitude) return;

    const search = async () => {
      setLoading(true);
      try {
        const service = new GoogleMapsService();
        const response = await service.searchNearby(
          latitude,
          longitude,
          type,
          mergedFilters.radius
        );

        if (response.estado) {
          let filtered = response.data || [];

          // Aplicar filtros
          if (mergedFilters.minRating > 0) {
            filtered = filtered.filter(r => (r.rating || 0) >= mergedFilters.minRating);
          }

          if (mergedFilters.maxPrice) {
            filtered = filtered.filter(r => {
              const priceIndex = { '$': 1, '$$': 2, '$$$': 3, '$$$$': 4 };
              const itemPrice = priceIndex[r.precio] || 0;
              const maxPriceIndex = priceIndex[mergedFilters.maxPrice] || 4;
              return itemPrice <= maxPriceIndex;
            });
          }

          if (mergedFilters.openNow) {
            filtered = filtered.filter(r => r.abierto === true);
          }

          // Ordenar
          if (mergedFilters.sortBy === 'rating') {
            filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          } else if (mergedFilters.sortBy === 'distance') {
            filtered.sort((a, b) => (a.distancia || 0) - (b.distancia || 0));
          }

          setResults(filtered.slice(0, mergedFilters.maxResults));
          setError(null);
        } else {
          setError(response.error);
          setResults([]);
        }
      } catch (err) {
        setError(err.message);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    search();
  }, [latitude, longitude, type, enabled]);

  return {
    results,
    loading,
    error,
    count: results.length,
    isEmpty: results.length === 0 && !loading
  };
};

export default useGoogleNearbySearch;
