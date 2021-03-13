const buildingTypeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');

const MIN_PRICE = Object.freeze({
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
});

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
