const NODE_NAMES = ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
const MIN_PRICE = Object.freeze({
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
});

const adFormElement = document.querySelector('.ad-form');
const addressElement = document.querySelector('#address');
const buildingTypeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

const toggleDisablingFormElements = (isDisable) => {
  adFormElement.classList.toggle('ad-form--disabled', isDisable);
  [...adFormElement.elements].forEach((element) => {
    if (NODE_NAMES.includes(element.nodeName)) {
      element.disabled = isDisable;
    }
  })
}

const setAddress = (lat, lng) => {
  addressElement.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
};

const setMinPrice = (price) => {
  priceElement.placeholder = price;
  priceElement.min = price;
};

const onBuildingTypeChange = (evt) => {
  setMinPrice(MIN_PRICE[evt.target.value]);
};

const onTimeInChange = (evt) => {
  timeOutElement.value = evt.target.value;
};

const onTimeOutChange = (evt) => {
  timeInElement.value = evt.target.value;
};

buildingTypeElement.addEventListener('change', onBuildingTypeChange);

timeInElement.addEventListener('change', onTimeInChange);

timeOutElement.addEventListener('change', onTimeOutChange);

export {
  toggleDisablingFormElements,
  setAddress
};
