'use strict';

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

getRandomIntInclusive(1, 5);
getRandomFloatInRange(1, 5, 2);
