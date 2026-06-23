import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const iconCache = {};
const getIcon = (url) => {
  if (!url) return undefined;
  if (!iconCache[url]) {
    iconCache[url] = L.icon({
      iconUrl: url,
      iconSize: [32, 40],
      iconAnchor: [16, 40],
      popupAnchor: [0, -36],
    });
  }
  return iconCache[url];
};

const OSM_URL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTR =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ESRI_IMAGERY_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const ESRI_LABELS_URL =
  "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}";
const ESRI_ATTR = "Tiles &copy; Esri";

const toLatLng = (point) => {
  if (!point) return null;
  const lat = Number(point.latitude);
  const lng = Number(point.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return [lat, lng];
};

const normalizePins = (pushPins, pushPinsWithInfoboxes) => {
  const pins = [];
  [...pushPins, ...pushPinsWithInfoboxes].forEach((p) => {
    const position = toLatLng(p.pin) || toLatLng(p.center);
    if (!position) return;
    pins.push({
      position,
      icon: getIcon(p.options?.icon),
      title: p.options?.title || p.pin?.title,
      infobox: p.infobox,
    });
  });
  return pins;
};

/**
 * Reemplazo de BingMapsReact basado en react-leaflet (tiles gratuitos OSM/Esri).
 * Mantiene la misma interfaz de props que se usaba con bingmaps-react.
 */
const LeafletMap = ({
  height = "100%",
  style,
  viewOptions = {},
  mapOptions = {},
  pushPins = [],
  pushPinsWithInfoboxes = [],
}) => {
  const center = toLatLng(viewOptions.center) || [0, 0];
  const zoom = viewOptions.zoom ?? 12;
  const mapType = (viewOptions.mapTypeId || "road").toLowerCase();
  const isAerial = mapType.includes("aerial");
  const showLabels = isAerial && mapType.includes("label");
  const zoomControl = mapOptions.showZoomButtons !== false;

  const pins = normalizePins(pushPins, pushPinsWithInfoboxes);

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      zoomControl={zoomControl}
      scrollWheelZoom
      style={{ height, width: "100%", ...style }}
    >
      <TileLayer
        url={isAerial ? ESRI_IMAGERY_URL : OSM_URL}
        attribution={isAerial ? ESRI_ATTR : OSM_ATTR}
      />
      {showLabels && <TileLayer url={ESRI_LABELS_URL} />}
      {pins.map((pin, i) => (
        <Marker key={i} position={pin.position} icon={pin.icon} title={pin.title}>
          {pin.infobox && (pin.infobox.title || pin.infobox.description) && (
            <Popup>
              {pin.infobox.title && (
                <strong className="block">{pin.infobox.title}</strong>
              )}
              {pin.infobox.description && <span>{pin.infobox.description}</span>}
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LeafletMap;
