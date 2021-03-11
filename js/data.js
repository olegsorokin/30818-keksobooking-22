import {
  getArrayWithRandomUniqueElements,
  getRandomArrayElement,
  getRandomFloatInRange,
  getRandomIntInclusive
} from './util.js';

const TITLES = [
  'Lorem ipsum dolor.',
  'Lorem ipsum dolor sit.',
  'Lorem ipsum.',
  'Lorem ipsum dolor sit amet.',
  'Lorem ipsum dolor sit amet, consectetur.',
];
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  'Accusamus alias cum dignissimos eaque excepturi illo inventore labore magni nemo nobis nostrum quam?',
  'Dolor impedit labore quis recusandae!',
  'Accusamus et eveniet illo ipsa iste labore maxime minus nam nesciunt nihil nostrum obcaecati odit omnis.',
  'Atque, corporis deleniti dolor doloremque dolores id nam odit officia quis quod recusandae rem repellat sit.',
  'Aliquid amet asperiores aspernatur commodi ducimus error et eum explicabo.',
  'Accusamus adipisci asperiores at beatae culpa cupiditate dolores facilis iste nam quaerat quisquam.',
  'A alias eaque numquam quam.',
];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIMES = ['12:00', '13:00', '14:00'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];
const MAX_PRICE = 999;
const MAX_ROOMS = 9;
const MAX_GUESTS = 19;
const MAX_AVATARS_VALUE = 8;
const ADVERTISEMENT_COUNT = 10;
const MIN_LOCATION_X = 35.65000;
const MAX_LOCATION_X = 35.70000;
const MIN_LOCATION_Y = 139.70000;
const MAX_LOCATION_Y = 139.80000;
const LOCATION_VALUE_FRACTION = 5;

const createRandomAdvertisement = () => {
  const locationX = getRandomFloatInRange(MIN_LOCATION_X, MAX_LOCATION_X, LOCATION_VALUE_FRACTION);
  const locationY = getRandomFloatInRange(MIN_LOCATION_Y, MAX_LOCATION_Y, LOCATION_VALUE_FRACTION);

  return {
    author: {
      avatar: `img/avatars/user0${getRandomIntInclusive(1, MAX_AVATARS_VALUE)}.png`,
    },
    offer: {
      title: getRandomArrayElement(TITLES),
      address: `${locationX}, ${locationY}`,
      price: getRandomIntInclusive(1, MAX_PRICE),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomIntInclusive(1, MAX_ROOMS),
      guests: getRandomIntInclusive(1, MAX_GUESTS),
      checkin: getRandomArrayElement(TIMES),
      checkout: getRandomArrayElement(TIMES),
      features: getArrayWithRandomUniqueElements(FEATURES, getRandomIntInclusive(1, FEATURES.length - 1)),
      description: getRandomArrayElement(DESCRIPTIONS),
      photos: getArrayWithRandomUniqueElements(PHOTOS, getRandomIntInclusive(1, PHOTOS.length - 1)),
      location: {
        x: locationX,
        y: locationY,
      },
    },
  };
};

const createAdvertisements = (size) => {
  return new Array(size).fill('').map(() => createRandomAdvertisement());
}

createAdvertisements(ADVERTISEMENT_COUNT);

export { createAdvertisements };
