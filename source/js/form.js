import { sendData } from './api.js';
import { showErrorAlert, showSuccessAlert } from './alert.js';
import { resetMapFilters } from './filter.js';
import { generateImage } from './util.js';

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
const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');
const titleInput = document.querySelector('#title');
const addressInput = document.querySelector('#address');
const buildingTypeElement = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const timeInElement = document.querySelector('#timein');
const timeOutElement = document.querySelector('#timeout');
const roomNumberElement = document.querySelector('#room_number');
const capacityElement = document.querySelector('#capacity');

const createPhotoPreview = () => {
  const photoElement = document.createElement('img');
  photoElement.width = 70;
  photoElement.height = 70;
  photoElement.style.objectFit = 'contain';
  photoElement.style.borderRadius = '5px';
  return photoElement;
};

const photoImage = createPhotoPreview();

const toggleDisablingFormElements = (isDisable) => {
  adFormElement.classList.toggle('ad-form--disabled', isDisable);
  [...adFormElement.elements].forEach((element) => {
    if (NODE_NAMES.includes(element.nodeName)) {
      element.disabled = isDisable;
    }
  })
};

const setAddress = (lat, lng) => {
  addressInput.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const setMinPrice = (price) => {
  priceInput.placeholder = price;
  priceInput.min = price;
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

const resetPreviews = () => {
  avatarPreview.src = 'img/muffin-grey.svg';
  photoPreview.innerHTML = '';
  photoImage.src = '';
};

avatarInput.addEventListener('change', (evt) => {
  generateImage(avatarPreview, evt.target.files[0]);
});

photoInput.addEventListener('change', (evt) => {
  generateImage(photoImage, evt.target.files[0]);

  if (!photoPreview.contains(photoImage)) {
    photoPreview.append(photoImage);
  }
});

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

priceInput.addEventListener('invalid', () => {
  if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity(`Цена должна быть не более ${PRICE_MAX} руб за ночь`);
  } else if (priceInput.validity.rangeUnderflow) {
    priceInput.setCustomValidity(`Цена должна быть не менее ${MIN_PRICE[buildingTypeElement.value]} руб за ночь`);
  } else if (priceInput.validity.badInput) {
    priceInput.setCustomValidity('Значение поля должно быть числом');
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
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

const setFormSubmitHandler = (handler) => {
  adFormElement.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        adFormElement.reset();
        handler();
        showSuccessAlert();
      },
      () => {
        showErrorAlert();
      },
      new FormData(evt.target),
    );
  });
};

const setFormResetHandler = (handler) => {
  adFormElement.addEventListener('reset', () => {
    resetMapFilters();
    resetPreviews();
    handler();
  })
};

export {
  setAddress,
  setFormSubmitHandler,
  setFormResetHandler,
  toggleDisablingFormElements
};
