import {
  MARKER_START_POSITION,
  addMarkerToMap,
  addMainMarkerToMap,
  initializeMap,
  setMapLoadHandler,
  setMainMarkerMoveHandler
} from './map.js';
import { createAdvertisements } from './data.js';
import { toggleDisablingFormElements, setAddress } from './form.js';
import { toggleDisablingFilterElements } from './filter.js';

const ADVERTISEMENTS_COUNT = 10;
const advertisements = createAdvertisements(ADVERTISEMENTS_COUNT);

const setDisablingForm = (isActive) => {
  toggleDisablingFormElements(isActive);
  toggleDisablingFilterElements(isActive);
};

setMapLoadHandler(() => {
  setDisablingForm(false);
});

setDisablingForm(true);
initializeMap();

addMainMarkerToMap();
setAddress(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
setMainMarkerMoveHandler((evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
})

advertisements.forEach((point) => {
  addMarkerToMap(point);
})
