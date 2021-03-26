const NODE_NAMES = ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
const mapFiltersForm = document.querySelector('.map__filters');

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
}

export {
  resetMapFilters,
  toggleDisablingFilterElements
};
