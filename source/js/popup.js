import { getWordForm, render, RenderPosition } from './util.js';

const ROOM_WORD_FORMS = ['комната', 'комнаты', 'комнат'];
const GUESTS_WORD_FORMS = ['гость', 'гостя', 'гостей'];

const Type = Object.freeze({
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
});

const cardTemplateContent = document.querySelector('#card').content;
const popupElement = cardTemplateContent.querySelector('.popup');

const getCapacityTemplate = (rooms, guests) => {
  return `${rooms} ${getWordForm(rooms, ROOM_WORD_FORMS)} для ${guests} ${getWordForm(guests, GUESTS_WORD_FORMS)}`;
};

const createPhotos = (container, photos) => {
  if (!photos.length) {
    return container.remove();
  }

  const textNode = photos
    .map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('\n');

  container.innerHTML = '';
  render(container, textNode, RenderPosition.BEFOREEND);
};

const createFeatures = (container, features) => {
  if (!features.length) {
    return container.remove();
  }

  const textNode = features
    .map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('\n');

  container.innerHTML = '';
  render(container, textNode, RenderPosition.BEFOREEND);
};

const addTextToElement = (element, text) => {
  if (text === undefined || text === '') {
    return element.remove();
  }

  element.textContent = text;
};

const createPopup = (advertisement) => {
  const {
    title,
    address,
    price,
    type,
    checkin,
    checkout,
    features,
    description,
    photos,
    rooms,
    guests,
  } = advertisement.offer;
  const { avatar } = advertisement.author;

  const popup = popupElement.cloneNode(true);
  const popupFeatures = popup.querySelector('.popup__features');
  const popupPhotos = popup.querySelector('.popup__photos');

  popup.querySelector('.popup__avatar').src = avatar;
  addTextToElement(popup.querySelector('.popup__title'), title);
  addTextToElement(popup.querySelector('.popup__text--address'), address);
  addTextToElement(popup.querySelector('.popup__text--price'), `${price} ₽/ночь`);
  addTextToElement(popup.querySelector('.popup__type'), Type[type]);
  addTextToElement(popup.querySelector('.popup__text--capacity'), getCapacityTemplate(rooms, guests));
  addTextToElement(popup.querySelector('.popup__text--time'), `Заезд после ${checkin}, выезд до ${checkout}`);
  addTextToElement(popup.querySelector('.popup__description'), description);

  createPhotos(popupPhotos, photos);
  createFeatures(popupFeatures, features);

  return popup;
};

export { createPopup };
