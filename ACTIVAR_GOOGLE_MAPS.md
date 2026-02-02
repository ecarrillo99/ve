# 🚀 GUÍA RÁPIDA: Migrar a Google Maps API Official

## ⚡ 5 Pasos para Activar Google Maps

### Paso 1️⃣: Crear Proyecto en Google Cloud (2 minutos)

```bash
1. Ir a: https://console.cloud.google.com/
2. Iniciar sesión con tu cuenta Google
3. Click en "Crear proyecto"
4. Nombre: "Visita Ecuador"
5. Crear
```

### Paso 2️⃣: Habilitar Places API (1 minuto)

```bash
1. En Google Cloud Console
2. Ir a "APIs y servicios" → "Biblioteca"
3. Buscar "Places API"
4. Click en "Places API"
5. Click en "Habilitar"

REPETIR PARA:
- Maps SDK for JavaScript
- Maps Embed API
```

### Paso 3️⃣: Crear API Key (1 minuto)

```bash
1. Ir a "Credenciales"
2. Click "Crear credencial" → "Clave de API"
3. Se creará una clave automáticamente
4. Click "Crear" (sin necesidad de restricciones para desarrollo)
5. Copiar la clave
```

### Paso 4️⃣: Agregar a .env (1 minuto)

En la raíz de tu proyecto `/Users/aracnocia.ltda./Documents/Proyectos React/ve/`:

```bash
# Crear o editar .env
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**⚠️ IMPORTANTE:**

- NO incluir comillas
- NO compartir esta clave
- Agregar `.env` a `.gitignore` (ya está incluido)

### Paso 5️⃣: Copiar nuevos archivos

```bash
# Ya están creados en:
src/services/googlemaps/GoogleMapsService.jsx
src/hooks/useGoogleNearbySearch.js

# Verificar que NearbyPlaces.jsx importe:
import { useGoogleNearbySearch } from '../../hooks/useGoogleNearbySearch';
```

---

## ✨ Ahora Puedes Usar

### Uso Básico en un Componente

```jsx
import { useGoogleNearbyHotels } from "../hooks/useGoogleNearbySearch";

function MiComponente() {
  const { results, loading, error } = useGoogleNearbyHotels(
    -0.35, // latitud
    -78.5, // longitud
  );

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {results.map((hotel) => (
        <div key={hotel.id}>
          <h3>{hotel.nombre}</h3>
          <p>⭐ {hotel.rating}</p>
          <p>{hotel.direccion}</p>
        </div>
      ))}
    </div>
  );
}
```

### Con Geolocalización del Usuario

```jsx
import { useState, useEffect } from "react";
import { useGoogleNearbyHotels } from "../hooks/useGoogleNearbySearch";

function MiPagina() {
  const [location, setLocation] = useState(null);

  // Obtener ubicación del usuario
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
  const { results, loading } = useGoogleNearbyHotels(
    location?.latitude,
    location?.longitude,
    { minRating: 4 }, // Filtro: mínimo 4 estrellas
  );

  return (
    <div>
      {loading ? (
        <p>Buscando hoteles cercanos...</p>
      ) : (
        <div>
          {results.map((hotel) => (
            <div key={hotel.id}>
              <h3>{hotel.nombre}</h3>
              <p>
                ⭐ {hotel.rating} ({hotel.reviews} reseñas)
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 📊 Diferencia: SerpAPI → Google Maps

### ❌ Antes (SerpAPI)

```javascript
// No hay plan gratis
// Mínimo $8/mes
// Datos de web scraping
```

### ✅ Ahora (Google Maps Official)

```javascript
// Plan gratis: 10,000 llamadas/mes
// Costo: $0 (para tráfico pequeño)
// Datos oficiales de Google
// Soporte oficial de Google
```

---

## 🎯 Qué Cambia en Tu Código

### Cambio 1: Import del Hook

```javascript
// ❌ ANTES
import { useNearbySearch } from "../../hooks/useNearbySearch";

// ✅ AHORA
import { useGoogleNearbySearch } from "../../hooks/useGoogleNearbySearch";
```

### Cambio 2: El resto es igual

```javascript
// El uso sigue igual:
const { results, loading, error } = useGoogleNearbySearch(lat, lon, "hoteles");

// Lo que NO cambió:
// - results[]  ← mismo formato
// - loading    ← mismo booleano
// - error      ← mismo formato
// - NearbyPlaces.jsx ← MISMO COMPONENTE
```

---

## 🆓 Plan Gratuito de Google Maps

```
✅ 10,000 cargas de mapa/mes     (Dynamic Maps)
✅ Unlimited Embed               (mapas embebidas)
✅ 100,000 requests/mes          (Map Tiles)
✅ Unlimited SDK                 (Android/iOS)
✅ Nearby Search incluido
✅ Text Search incluido
✅ Place Details incluido
✅ Place Photos incluido

Total: $0/mes para uso normal

Después que excedas:
$3-7 por 1,000 llamadas adicionales
```

---

## ⚠️ Errores Comunes & Soluciones

### Error: "REACT_APP_GOOGLE_MAPS_API_KEY no configurada"

```bash
# SOLUCIÓN:
1. Crear archivo .env en raíz
2. Agregar: REACT_APP_GOOGLE_MAPS_API_KEY=tu_clave
3. Reiniciar servidor: npm start
4. Recargar página en navegador
```

### Error: "API Key inválida"

```bash
# SOLUCIÓN:
1. Ir a Google Cloud Console
2. Copiar la clave correcta (sin espacios)
3. Reemplazar en .env
4. Reiniciar servidor
```

### Error: "Acceso denegado" (403)

```bash
# SOLUCIÓN:
1. Google Cloud Console
2. Ir a "APIs y Servicios"
3. Verificar que "Places API" está HABILITADA
4. Esperar 5 minutos (toma tiempo activarse)
5. Reintentar
```

### Error: "Límite de consultas excedido" (429)

```bash
# SOLUCIÓN:
# Solo ocurre si >10,000 llamadas/mes
# En desarrollo, reduce el # de búsquedas
# O registra tarjeta de crédito en Google Cloud
```

### Resultados Vacíos

```bash
# VERIFICAR:
1. ¿Coordenadas correctas? (-0.35, -78.50 para Quito)
2. ¿Radio suficientemente grande? (1500m mínimo)
3. ¿Google Maps tiene datos en esa zona?
   → https://maps.google.com/?q=hotel+near+-0.35,-78.50
4. ¿API Key tiene permisos para Places API?
```

---

## 🔐 Seguridad

### En Desarrollo

```javascript
// ✅ Está bien exponer la clave en .env (frontend)
// React incluye variables que empiezan con REACT_APP_
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyD...
```

### En Producción

```javascript
// 🔐 MEJOR: Backend proxy

// Frontend hace:
fetch("/api/nearby-search", {
  method: "POST",
  body: JSON.stringify({ lat, lon, type }),
});

// Backend hace:
app.post("/api/nearby-search", (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Secret
  // Llamar a Google Maps API
  // Retornar datos
});
```

---

## 📱 Hooks Disponibles

```javascript
// 1. Principal (cualquier tipo)
const { results } = useGoogleNearbySearch(lat, lon, "hoteles");

// 2. Hoteles
const { results } = useGoogleNearbyHotels(lat, lon);

// 3. Restaurantes
const { results } = useGoogleNearbyRestaurants(lat, lon);

// 4. Atracciones
const { results } = useGoogleNearbyAttractions(lat, lon);

// 5. Todos a la vez
const { hotels, restaurants, attractions } = useGoogleNearbyAll(lat, lon);

// 6. Múltiples tipos
const { results } = useGoogleNearbyMultiple(lat, lon, [
  "hoteles",
  "restaurantes",
]);

// 7. Con filtros avanzados
const { results } = useGoogleNearbyAdvanced(lat, lon, "hoteles", {
  minRating: 4,
  maxPrice: "$$",
  openNow: true,
  sortBy: "distance",
});
```

---

## ✅ Checklist de Activación

- [ ] Crear proyecto en Google Cloud
- [ ] Habilitar Places API
- [ ] Habilitar Maps SDK for JavaScript
- [ ] Crear API Key
- [ ] Copiar API Key
- [ ] Crear archivo .env
- [ ] Agregar REACT_APP_GOOGLE_MAPS_API_KEY
- [ ] Guardar .env
- [ ] Verificar que GoogleMapsService.jsx existe
- [ ] Verificar que useGoogleNearbySearch.js existe
- [ ] npm install (si axios no está)
- [ ] npm start
- [ ] Probar en navegador
- [ ] Geolocalización funciona? ✅
- [ ] Resultados se muestran? ✅

---

## 🧪 Probar Rápidamente

```jsx
// En tu componente Home.jsx
import { useGoogleNearbyHotels } from "../hooks/useGoogleNearbySearch";

function Home() {
  // Coordenadas de Quito
  const { results, loading, error } = useGoogleNearbyHotels(-0.35, -78.5);

  return (
    <div>
      {loading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {results.length > 0 && <p>✅ Encontrados {results.length} hoteles</p>}
    </div>
  );
}
```

---

## 📞 Soporte

**Si algo no funciona:**

1. Verificar consola del navegador (F12)
2. Buscar mensajes que empiezan con `[GoogleMaps]`
3. Revisar .env tiene la clave correcta
4. Verificar Google Cloud tiene Places API habilitada
5. Esperar 5-10 minutos (toma tiempo activarse)
6. Reiniciar servidor: `npm start`
7. Limpiar caché: `Ctrl+Shift+R` (o `Cmd+Shift+R`)

---

## 🎉 ¡Listo!

Ahora tienes Google Maps API Official activada.

**Gratis: 10,000 llamadas/mes**
**Datos oficiales de Google**
**Soporte técnico de Google**

¿Preguntas? Revisa `MIGRACION_GOOGLE_MAPS_OFFICIAL.md` para documentación completa.
