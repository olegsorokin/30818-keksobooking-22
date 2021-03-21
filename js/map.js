/* global L:readonly */
import { createPopup } from './popup.js';

const MARKER_START_POSITION = {
  lat: 35.697168,
  lng: 139.79476,
};
const MAP_ZOOM = 10;
const ICON_WIDTH = 52;
const ICON_HEIGHT = 52;
let onLoad = null;
let map = null;

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT],
});

const pinIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [ICON_WIDTH, ICON_HEIGHT],
  iconAnchor: [ICON_WIDTH / 2, ICON_HEIGHT],
});

const mainMarker = L.marker(
  MARKER_START_POSITION, {
    draggable: true,
    icon: mainPinIcon,
  });

const setMapLoadHandler = (handler) => {
  onLoad = handler;
};

const initializeMap = () => {
  map = L.map('map-canvas')
    .on('load', () => {
      onLoad();
    })
    .setView(MARKER_START_POSITION, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const addMainMarkerToMap = () => {
  mainMarker.addTo(map);
};

const addMarkerToMap = (point) => {
  const marker = L.marker(
    {
      lat: point.offer.location.x,
      lng: point.offer.location.y,
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
};

const setMainMarkerMoveHandler = (handler) => {
  mainMarker.on('move', (evt) => {
    handler(evt);
  });
};

export {
  MARKER_START_POSITION,
  addMarkerToMap,
  addMainMarkerToMap,
  setMainMarkerMoveHandler,
  setMapLoadHandler,
  initializeMap
};
