# ✅ CHECKLIST COMPLETO: Google Maps Integration

## 📋 Pre-Requisitos

- [ ] Node.js instalado
- [ ] npm o yarn funcionando
- [ ] Cuenta de Google activa
- [ ] Proyecto React abierto en editor

---

## 🔧 FASE 1: Configuración en Google Cloud (5-10 min)

### Paso 1.1: Crear Proyecto Google Cloud

- [ ] Ir a https://console.cloud.google.com/
- [ ] Login con tu cuenta Google
- [ ] Click "Seleccionar un proyecto" → "Nuevo proyecto"
- [ ] Nombre: **"Visita Ecuador"**
- [ ] Presionar "Crear"
- [ ] Esperar a que se cree (1-2 min)

### Paso 1.2: Habilitar APIs

En el dashboard de Google Cloud:

- [ ] Click en "Ir a APIs y servicios"
- [ ] Click "Habilitar API y servicios"
- [ ] **Buscar y habilitar:**
  - [ ] **Places API** → Click "Habilitar"
  - [ ] **Maps SDK for JavaScript** → Click "Habilitar"
  - [ ] **Maps Embed API** → Click "Habilitar"

⏱️ Nota: Esperar 1-2 minutos para que se activen

### Paso 1.3: Crear API Key

- [ ] En Google Cloud Console: Ir a "Credenciales"
- [ ] Click "Crear credencial" → "Clave de API"
- [ ] Se creará automáticamente
- [ ] Click el ícono "Copiar"
- [ ] Guardar la clave en un editor de texto temporalmente
- [ ] ⚠️ NO compartir esta clave

---

## 💻 FASE 2: Configuración Local (5 min)

### Paso 2.1: Crear archivo .env

En la raíz de tu proyecto:

```bash
# Ruta: /Users/aracnocia.ltda./Documents/Proyectos React/ve/.env
```

- [ ] Abrir editor (VS Code, Sublime, etc.)
- [ ] Crear nuevo archivo
- [ ] Nombre: **.env**
- [ ] Contenido:

```
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyD_tu_clave_aqui
```

**⚠️ IMPORTANTE:**

- [ ] Reemplazar con tu clave real
- [ ] SIN comillas
- [ ] SIN espacios
- [ ] Guardar archivo

### Paso 2.2: Verificar .gitignore

- [ ] Abrir archivo: `.gitignore`
- [ ] Verificar que contiene `.env`
  - Si NO está, agregar: `echo ".env" >> .gitignore`

### Paso 2.3: Instalar axios (si falta)

```bash
npm install axios
```

- [ ] Ejecutar comando
- [ ] Esperar a que termine (puede tomar 1-2 min)

---

## 📁 FASE 3: Copiar Archivos (2 min)

### Paso 3.1: Verificar Servicio

- [ ] Archivo existe: `src/services/googlemaps/GoogleMapsService.jsx`
  - [ ] 900+ líneas de código
  - [ ] Contiene métodos: `searchNearby`, `searchNearbyHotels`, etc.
  - [ ] Contiene variable: `this.apiKey`

### Paso 3.2: Verificar Hooks

- [ ] Archivo existe: `src/hooks/useGoogleNearbySearch.js`
  - [ ] 400+ líneas de código
  - [ ] Contiene: `useGoogleNearbySearch`, `useGoogleNearbyHotels`, etc.
  - [ ] 7 hooks disponibles

### Paso 3.3: Verificar Componente

- [ ] Archivo existe: `src/components/nearby_places/NearbyPlaces.jsx`
- [ ] Archivo existe: `src/components/nearby_places/NearbyPlaces.css`

---

## 🔄 FASE 4: Actualizar Imports (3 min)

### Paso 4.1: Actualizar NearbyPlaces.jsx

```javascript
// Buscar esta línea:
import { useNearbySearch } from "../../hooks/useNearbySearch";

// Cambiar a:
import { useGoogleNearbySearch } from "../../hooks/useGoogleNearbySearch";
```

- [ ] Abrir: `src/components/nearby_places/NearbyPlaces.jsx`
- [ ] Buscar (Ctrl+F): `useNearbySearch`
- [ ] Reemplazar por: `useGoogleNearbySearch`
- [ ] Guardar archivo

### Paso 4.2: Verificar que NO haya conflictos

En NearbyPlaces.jsx, la línea debe ser:

```javascript
const { results, loading, error } = useGoogleNearbySearch(
  latitude,
  longitude,
  type,
  !!query,
  { minRating },
);
```

- [ ] Verificar que está igual o muy similar
- [ ] Si está diferente, contactar soporte

---

## 🧪 FASE 5: Pruebas (5 min)

### Paso 5.1: Reiniciar servidor

```bash
npm start
```

- [ ] Ejecutar comando
- [ ] Esperar compilación (puede tomar 30-60 segundos)
- [ ] Navegador abre en http://localhost:3000

### Paso 5.2: Probar en Navegador

- [ ] Abrir: http://localhost:3000
- [ ] Abrir Console (F12 o Cmd+Option+J)
- [ ] Permitir geolocalización si es necesario
- [ ] Esperar 5 segundos

**Verifica que veas:**

- ✅ Sin errores rojos en consola
- ✅ Mensajes que empiezan con `[GoogleMaps]`
- ✅ Mensaje: `🔍 [GoogleMaps] Buscando...`

### Paso 5.3: Verificar Datos

- [ ] ¿Se cargaron resultados?
- [ ] ¿Ves hoteles/restaurantes?
- [ ] ¿Tienen fotos?
- [ ] ¿Tienen ratings?

### Paso 5.4: Verificar Errores Comunes

Si ves estos errores, revisa:

| Error                                          | Solución                                              |
| ---------------------------------------------- | ----------------------------------------------------- |
| `REACT_APP_GOOGLE_MAPS_API_KEY no configurada` | Revisar .env existe y contiene clave                  |
| `API Key inválida`                             | Copiar clave correcta de Google Cloud                 |
| `Acceso denegado (403)`                        | Esperar 5 min para que Places API se active           |
| `Sin resultados`                               | Revisar coordenadas, probar con Quito (-0.35, -78.50) |

---

## 🚀 FASE 6: Integración en Páginas (10-15 min)

### Opción A: Home Page

```jsx
// src/pages/home/Home.jsx
import { useGoogleNearbyHotels } from "../../hooks/useGoogleNearbySearch";

function Home() {
  const [location, setLocation] = useState(null);

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

  const { results } = useGoogleNearbyHotels(
    location?.latitude,
    location?.longitude,
  );

  return (
    <div>
      {results.map((hotel) => (
        <div key={hotel.id}>
          <h3>{hotel.nombre}</h3>
          <p>⭐ {hotel.rating}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] Copiar código arriba
- [ ] Pegar en tu Home.jsx
- [ ] Probar: `npm start`

### Opción B: Hotel Page

Agregar sección "Hoteles Cercanos" al final del componente.

- [ ] Ver archivo: `EJEMPLOS_GOOGLE_MAPS.md`
- [ ] Copiar "Ejemplo 4"
- [ ] Pegar en Hotel.jsx

### Opción C: Nueva Página Explorer

Crear página `/explorer` con búsqueda avanzada.

- [ ] Ver archivo: `EJEMPLOS_GOOGLE_MAPS.md`
- [ ] Copiar "Ejemplo 2"
- [ ] Crear: `src/pages/explorer/NearbyExplorer.jsx`

---

## 📊 FASE 7: Monitoreo (Contínuo)

### Paso 7.1: Verificar Uso en Google Cloud

- [ ] Ir a Google Cloud Console
- [ ] → "APIs y servicios" → "Cuota"
- [ ] Ver uso de "Places API"
- [ ] Verificar que estés dentro del límite gratuito

### Paso 7.2: Configurar Alertas (Opcional)

- [ ] Google Cloud Console
- [ ] → "Facturación" → "Presupuestos y alertas"
- [ ] Click "Crear presupuesto"
- [ ] Cantidad: $50 (u otra cifra límite)
- [ ] Crear alerta

---

## 🔒 FASE 8: Seguridad (Producción)

### Para Desarrollo (Actual)

- [x] ✅ API Key en .env (visible en bundle)
- [x] ✅ Restricciones de HTTP referer en Google Cloud

### Para Producción (Futuro)

- [ ] Implementar backend proxy:
  - Frontend → `/api/nearby-search`
  - Backend → Llama Google Maps API
  - API Key se mantiene en servidor (segura)

Ver: `MIGRACION_GOOGLE_MAPS_OFFICIAL.md` sección "Seguridad"

---

## 🎯 FASE 9: Validación Final

### Antes de Considerar "Completo"

- [ ] npm start funciona sin errores
- [ ] Home page carga
- [ ] Geolocalización pide permiso
- [ ] Resultados se muestran
- [ ] Fotos cargan
- [ ] Botones de acción funcionan (teléfono, web, maps)
- [ ] Console no muestra errores rojos
- [ ] Responsive: Funciona en móvil
- [ ] Google Cloud muestra uso dentro de límite
- [ ] .env está en .gitignore

---

## 📚 Documentación de Referencia

| Archivo                             | Para Qué                       |
| ----------------------------------- | ------------------------------ |
| `ACTIVAR_GOOGLE_MAPS.md`            | Guía rápida de 5 pasos         |
| `MIGRACION_GOOGLE_MAPS_OFFICIAL.md` | Documentación técnica completa |
| `EJEMPLOS_GOOGLE_MAPS.md`           | 5 ejemplos listos para usar    |
| `RESUMEN_FINAL_GOOGLE_MAPS.md`      | Resumen y comparativas         |

---

## 🆘 Soporte Rápido

### "Mi API Key no funciona"

```bash
1. Copiar clave nuevamente de Google Cloud
2. Reemplazar en .env
3. Guardar
4. npm start
5. Esperar compilación
6. Recargar navegador (Ctrl+Shift+R)
```

### "Veo errores en la consola"

```bash
1. Abrir F12 → Console
2. Buscar mensajes rojo
3. Verificar que no sea "Cannot read properties"
4. Si es "Cannot read properties", revisar pasos 4.1-4.2
```

### "No veo resultados"

```bash
1. Abrir Google Maps:
   https://maps.google.com/?q=hotel+near+-0.35,-78.50
2. ¿Hay resultados? Si NO → Zona sin datos
3. Si SÍ → Revisar console para errores
4. Verificar API Key está en .env
5. Esperar 5 min (Places API necesita tiempo para activarse)
```

### "¿Cuánto me cuesta?"

```bash
- Primeros 10,000 solicitudes/mes: GRATIS
- Solicitudes adicionales: $0.005 cada una
- Ejemplo: 15,000 solicitudes = $25/mes
- Monitoreo: Google Cloud Console → Facturación
```

---

## 🎉 Cuando Termines Todo

- [ ] Ejecutar: `npm start`
- [ ] Visitar: http://localhost:3000
- [ ] Verificar que todo funciona
- [ ] Subir cambios a GitHub:
  ```bash
  git add .
  git commit -m "feat: Integrar Google Maps API para busqueda de lugares cercanos"
  git push
  ```

---

## 📞 Próximos Pasos Opcionales

1. **Agregar más tipos de lugares:**
   - Cafés, museos, parques, bares, etc.
   - Ver lista en: `MIGRACION_GOOGLE_MAPS_OFFICIAL.md`

2. **Implementar backend proxy:**
   - Para mejor seguridad en producción
   - Ver: `MIGRACION_GOOGLE_MAPS_OFFICIAL.md` sección "Seguridad"

3. **Agregar caché:**
   - localStorage para mejorar performance
   - Ver: `EJEMPLOS_GOOGLE_MAPS.md`

4. **Analytics:**
   - Rastrear búsquedas populares
   - Optimizar resultados basado en uso

5. **Testing:**
   - Unit tests para servicios
   - E2E tests para componentes
   - Ver: `MIGRACION_GOOGLE_MAPS_OFFICIAL.md` sección "Testing"

---

## ✨ Final Checklist

```
CONFIGURACIÓN:
- [ ] Google Cloud proyecto creado
- [ ] Places API habilitada
- [ ] Maps SDK for JavaScript habilitada
- [ ] API Key generada
- [ ] .env archivo creado con clave
- [ ] .gitignore contiene .env

CÓDIGO:
- [ ] GoogleMapsService.jsx presente
- [ ] useGoogleNearbySearch.js presente
- [ ] NearbyPlaces.jsx import actualizado
- [ ] npm install axios (si necesario)

TESTING:
- [ ] npm start funciona
- [ ] No hay errores en consola
- [ ] Geolocalización pide permiso
- [ ] Resultados se cargan
- [ ] Componente es responsive

PRODUCCIÓN:
- [ ] Google Cloud facturación configurada
- [ ] Alertas de presupuesto configuradas
- [ ] Backend proxy planificado (opcional)
- [ ] Cambios subidos a GitHub
- [ ] Documentación actualizada

¡LISTO! ✅
```

---

**Versión:** 1.0
**Última actualización:** 22 Enero 2026
**Estado:** ✅ Completo y listo para implementación
