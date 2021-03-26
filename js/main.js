import {
  MARKER_START_POSITION,
  addMarkerToMap,
  initializeMap,
  setMainMarkerMoveHandler,
  setMainMarkerPosition,
  removeAllMarkers
} from './map.js';
import {
  toggleDisablingFormElements,
  setAddress,
  setFormSubmitHandler,
  setFormResetHandler
} from './form.js';
import { filterAdvertisements, setFilterChangeHandler, toggleDisablingFilterElements } from './filter.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';

const MAX_MARKS_COUNT = 10;
let mapIsInitialized = false;
let pointsList = [];
let markersOnMap = [];

const setMainMarkerDefaultPosition = () => {
  setMainMarkerPosition(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
  setTimeout(() => {
    setAddress(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
  }, 0);
};

toggleDisablingFormElements(true);
toggleDisablingFilterElements(true);

initializeMap(() => {
  mapIsInitialized = true;
  toggleDisablingFormElements(false);
  setAddress(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
});

getData(
  (advertisements) => {
    if (advertisements && advertisements.length) {
      pointsList = advertisements;
      toggleDisablingFilterElements(!mapIsInitialized);

      markersOnMap = pointsList
        .slice(0, MAX_MARKS_COUNT)
        .map((point) => addMarkerToMap(point));
    }
  },
  (message) => {
    showAlert(message);
  },
);

setMainMarkerMoveHandler((evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

setFormSubmitHandler(() => {
  setMainMarkerDefaultPosition();
});

setFormResetHandler(() => {
  setMainMarkerDefaultPosition();
});

setFilterChangeHandler(() => {
  const filteredAdvertisements = filterAdvertisements(pointsList);

  removeAllMarkers(markersOnMap);

  markersOnMap = filteredAdvertisements
    .slice(0, MAX_MARKS_COUNT)
    .map((point) => addMarkerToMap(point));
});
