import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { createPopup } from './popup.js';

const MARKER_START_POSITION = {
  lat: 35.697168,
  lng: 139.79476,
};
const MAP_ZOOM = 10;
const ICON_WIDTH = 52;
const ICON_HEIGHT = 52;
const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT],
});

const pinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT],
});

const mainMarker = L.marker(
  MARKER_START_POSITION, {
    draggable: true,
    icon: mainPinIcon,
  });

const initializeMap = (onLoad) => {
  map
    .on('load', onLoad)
    .setView(MARKER_START_POSITION, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainMarker.addTo(map);
};

const addMarkerToMap = (point) => {
  const { lat, lng } = point.location;
  const marker = L.marker(
    {
      lat,
      lng,
    }, {
      icon: pinIcon,
    });

  marker
    .addTo(map)
    .bindPopup(
      createPopup(point),
      {
        keepInView: true,
      },
    );

  return marker;
};

const removeMarker = (marker) => {
  map.removeLayer(marker);
};

const removeAllMarkers = (markers) => {
  markers.forEach(removeMarker);
};

const setMainMarkerMoveHandler = (handler) => {
  mainMarker.on('move', (evt) => {
    handler(evt);
  });
};

const setMainMarkerPosition = (lat, lng) => {
  const newLatLng = new L.LatLng(lat, lng);
  mainMarker.setLatLng(newLatLng);
};

export {
  MARKER_START_POSITION,
  addMarkerToMap,
  initializeMap,
  removeAllMarkers,
  setMainMarkerMoveHandler,
  setMainMarkerPosition
};
