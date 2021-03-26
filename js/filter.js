const NODE_NAMES = ['INPUT', 'SELECT'];
const Price = {
  'low': { MIN: 0, MAX: 9999 },
  'middle': { MIN: 10000, MAX: 50000 },
  'high': { MIN: 50000, MAX: Infinity },
};

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');
const housingFeaturesElement = document.querySelector('#housing-features');

const isAny = (value) => {
  return value === 'any';
};

const isInPriceInterval = (price, intervalType) => {
  return price >= Price[intervalType].MIN && price <= Price[intervalType].MAX;
}

const housingTypeFilter = (point) => {
  return isAny(housingTypeElement.value) || housingTypeElement.value === point.offer.type;
};

const housingPriceFilter = (point) => {
  return isAny(housingPriceElement.value) || isInPriceInterval(point.offer.price, housingPriceElement.value);
};

const housingRoomsFilter = (point) => {
  return isAny(housingRoomsElement.value) || Number.parseInt(housingRoomsElement.value) === point.offer.rooms;
};

const housingGuestsFilter = (point) => {
  return isAny(housingGuestsElement.value) || Number.parseInt(housingGuestsElement.value) === point.offer.guests;
};

const housingFeaturesFilter = (point, features) => {
  return Array.from(features).every((feature) => point.offer.features.includes(feature.value));
};

const toggleDisablingFilterElements = (isDisable) => {
  mapFiltersForm.classList.toggle('map__filters--disabled', isDisable);

  [...mapFiltersForm.elements].forEach((element) => {
    if (NODE_NAMES.includes(element.nodeName)) {
      element.disabled = isDisable;
    }
  })
};

const resetMapFilters = () => {
  mapFiltersForm.reset();
};

const setFilterChangeHandler = (handler) => {
  mapFiltersForm.addEventListener('change', () => {
    handler();
  });
};

const filterAdvertisements = (advertisements) => {
  const features = housingFeaturesElement.querySelectorAll('.map__checkbox:checked');

  return advertisements
    .filter(housingTypeFilter)
    .filter(housingPriceFilter)
    .filter(housingRoomsFilter)
    .filter(housingGuestsFilter)
    .filter((point) => housingFeaturesFilter(point, features));
};

export {
  filterAdvertisements,
  resetMapFilters,
  setFilterChangeHandler,
  toggleDisablingFilterElements
};
