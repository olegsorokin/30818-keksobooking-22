'use strict';

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

const validateArguments = (min, max) => {
  if (typeof min !== 'number' || typeof max !== 'number') {
    throw 'Передаваемые параметры должны быть числами';
  }

  if (min < 0 || max < 0) {
    throw 'Передаваемые параметры должны быть больше 0';
  }

  if (min >= max) {
    throw 'Минимальное значение должно быть меньше максимального';
  }
};

/**
 * Функция возвращает случайное целое число из диапазона от min до max (включительно)
 * @param {number} min - Минимальное число
 * @param {number} max - Максимальное число
 * @returns {number}
 */
const getRandomIntInclusive = (min, max) => {
  validateArguments(min, max);

  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

/**
 * Функция возвращает случайное число с плавающей точкой из диапазона от min до max (включительно)
 * @param {number} min - Минимальное число
 * @param {number} max - Максимальное число
 * @param {number} fractionDigits - Число знаков после запятой
 * @returns {number}
 */
const getRandomFloatInRange = (min, max, fractionDigits = 0) => {
  validateArguments(min, max);

  const randomArbitrary = Math.random() * (max - min) + min;
  return Number.parseFloat(randomArbitrary.toFixed(fractionDigits));
};

/**
 * Функция возвращает случайный элемент массива
 * @param {Array} elements - Массив
 * @returns {*}
 */
const getRandomArrayElement = (elements) => {
  return elements[getRandomIntInclusive(0, elements.length - 1)];
};

/**
 * Функция возвращает массив случайных элементов длинны size из массива elements
 * @param {Array} elements - Массив допустимых значений
 * @param {number} size - Длинна конечного массива
 * @returns {*[]}
 */
const getArrayWithRandomUniqueElements = (elements, size) => {
  const array = new Array(size).fill('').map(() => getRandomArrayElement(elements));
  const uniqueElements = new Set(array);

  return Array.from(uniqueElements);
};

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
