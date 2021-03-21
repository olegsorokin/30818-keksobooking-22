const NODE_NAMES = ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT'];
const MIN_PRICE = Object.freeze({
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000,
});
const TITLE_MIN_LENGTH = 30;
const TITLE_MAX_LENGTH = 100;
const PRICE_MAX = 1000000;
let isTitleInputEvent = false; // Нужен для прерывания обработчика события invalid на поле ввода "Заголовок объявления"

const adFormElement = document.querySelector('.ad-form');
const titleInput = document.querySelector('#title');
const addressInput = document.querySelector('#address');
const buildingTypeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');

const toggleDisablingFormElements = (isDisable) => {
  adFormElement.classList.toggle('ad-form--disabled', isDisable);
  [...adFormElement.elements].forEach((element) => {
    if (NODE_NAMES.includes(element.nodeName)) {
      element.disabled = isDisable;
    }
  })
}

const setAddress = (lat, lng) => {
  addressInput.value = `${lat.toFixed(5)} ${lng.toFixed(5)}`;
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

const capacityOptionsDisable = () => {
  for (const option of capacityElement.options) {
    option.disabled = true;
  }
};

buildingTypeElement.addEventListener('change', onBuildingTypeChange);

timeInElement.addEventListener('change', onTimeInChange);

timeOutElement.addEventListener('change', onTimeOutChange);

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < TITLE_MIN_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${TITLE_MIN_LENGTH - valueLength} симв.`);
  } else if (valueLength > TITLE_MAX_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - TITLE_MAX_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  isTitleInputEvent = true;
  titleInput.reportValidity();
  isTitleInputEvent = false;
});

titleInput.addEventListener('invalid', () => {
  if (isTitleInputEvent) {
    return;
  }

  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity(`Заголовок объявления должен состоять минимум из ${TITLE_MIN_LENGTH} символов`);
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity(`Заголовок объявления не должен превышать ${TITLE_MAX_LENGTH} символов`);
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

priceElement.addEventListener('invalid', () => {
  if (priceElement.validity.rangeOverflow) {
    priceElement.setCustomValidity(`Цена должна быть не более ${PRICE_MAX} руб за ночь`);
  } else if (priceElement.validity.rangeUnderflow) {
    priceElement.setCustomValidity(`Цена должна быть не менее ${MIN_PRICE[buildingTypeElement.value]} руб за ночь`);
  } else if (priceElement.validity.badInput) {
    priceElement.setCustomValidity('Значение поля должно быть числом');
  }  else if (priceElement.validity.valueMissing) {
    priceElement.setCustomValidity('Обязательное поле');
  } else {
    priceElement.setCustomValidity('');
  }
});

roomNumberElement.addEventListener('change', (evt) => {
  capacityOptionsDisable();

  switch (evt.target.value) {
    case '100':
      capacityElement.options[3].disabled = false;
      capacityElement.value = '0';
      break;
    case '3':
      capacityElement.options[0].disabled = false;
      capacityElement.options[1].disabled = false;
      capacityElement.options[2].disabled = false;

      capacityElement.value = '3';
      break;
    case '2':
      capacityElement.options[1].disabled = false;
      capacityElement.options[2].disabled = false;

      capacityElement.value = '2';
      break;
    case '1':
      capacityElement.options[2].disabled = false;

      capacityElement.value = '1';
      break;
  }
});

export {
  toggleDisablingFormElements,
  setAddress
};
