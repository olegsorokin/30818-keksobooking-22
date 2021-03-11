import { getWordForm, render, RenderPosition } from './util.js';

const roomWordForms = ['комната', 'комнаты', 'комнат'];
const guestsWordForms = ['гость', 'гостя', 'гостей'];

const Type = Object.freeze({
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
});

const mapElement = document.querySelector('#map-canvas');
const cardTemplateContent = document.querySelector('#card').content;
const popupElement = cardTemplateContent.querySelector('.popup');

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

  const element = popupElement.cloneNode(true);
  const popupFeatures = element.querySelector('.popup__features');
  const popupPhotos = element.querySelector('.popup__photos');

  const featuresTextNode = features
    .map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
    .join('\n');
  const photosTextNode = photos
    .map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
    .join('\n');

  const capacityTemplate = `${rooms} ${getWordForm(rooms, roomWordForms)} для ${guests} ${getWordForm(guests, guestsWordForms)}`;

  element.querySelector('.popup__avatar').src = avatar;
  element.querySelector('.popup__title').textContent = title;
  element.querySelector('.popup__text--address').textContent = address;
  element.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  element.querySelector('.popup__type').textContent = Type[type];
  element.querySelector('.popup__text--capacity').textContent = capacityTemplate;
  element.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  element.querySelector('.popup__description').textContent = description;

  popupFeatures.innerHTML = '';
  popupPhotos.innerHTML = '';
  render(popupFeatures, featuresTextNode, RenderPosition.BEFOREEND);
  render(popupPhotos, photosTextNode, RenderPosition.BEFOREEND);

  mapElement.append(element);
};

export { createPopup };
