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

const createPhotos = (container, photos) => {
  const textNode = photos
    .map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('\n');

  container.innerHTML = '';
  render(container, textNode, RenderPosition.BEFOREEND);
};

const createFeatures = (container, features) => {
  const textNode = features
    .map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('\n');

  container.innerHTML = '';
  render(container, textNode, RenderPosition.BEFOREEND);
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
  const capacityTemplate = `${rooms} ${getWordForm(rooms, ROOM_WORD_FORMS)} для ${guests} ${getWordForm(guests, GUESTS_WORD_FORMS)}`;

  popup.querySelector('.popup__avatar').src = avatar;
  popup.querySelector('.popup__title').textContent = title;
  popup.querySelector('.popup__text--address').textContent = address;
  popup.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  popup.querySelector('.popup__type').textContent = Type[type];
  popup.querySelector('.popup__text--capacity').textContent = capacityTemplate;
  popup.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  popup.querySelector('.popup__description').textContent = description;

  createPhotos(popupPhotos, photos);
  createFeatures(popupFeatures, features);

  return popup;
};

export { createPopup };
