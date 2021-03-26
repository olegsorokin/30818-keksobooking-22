import {
  MARKER_START_POSITION,
  addMarkerToMap,
  addMainMarkerToMap,
  initializeMap,
  setMainMarkerMoveHandler,
  setMainMarkerPosition
} from './map.js';
import {
  toggleDisablingFormElements,
  setAddress,
  setUserFormSubmit,
  userFormResetHandler
} from './form.js';
import { toggleDisablingFilterElements } from './filter.js';
import { getData } from './api.js';
import { showAlert } from './alert.js';

const setDisablingForm = (isActive) => {
  toggleDisablingFormElements(isActive);
  toggleDisablingFilterElements(isActive);
};

const setMainMarkerDefaultPosition = () => {
  setMainMarkerPosition(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
  setTimeout(() => {
    setAddress(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
  }, 0);
}

setDisablingForm(true);
initializeMap(() => {
  setDisablingForm(false);
});

getData(
  (advertisements) => {
    advertisements.forEach((point) => {
      addMarkerToMap(point);
    })
  },
  (message) => {
    showAlert(message);
  },
);

addMainMarkerToMap();
setAddress(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
setMainMarkerMoveHandler((evt) => {
  setAddress(evt.target.getLatLng().lat, evt.target.getLatLng().lng);
});

setUserFormSubmit(() => {
  setMainMarkerDefaultPosition(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
});

userFormResetHandler(() => {
  setMainMarkerDefaultPosition(MARKER_START_POSITION.lat, MARKER_START_POSITION.lng);
})
