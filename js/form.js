const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const startTimeElement = document.querySelector('#timein');
const endTimeElement = document.querySelector('#timeout');

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
  endTimeElement.value = evt.target.value;
};

const onTimeOutChange = (evt) => {
  startTimeElement.value = evt.target.value;
};

typeElement.addEventListener('change', onBuildingTypeChange);

startTimeElement.addEventListener('change', onTimeInChange);

endTimeElement.addEventListener('change', onTimeOutChange);
