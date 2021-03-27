const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  AFTEREND: 'afterend',
  BEFOREEND: 'beforeend',
};

const render = (container, component, place) => {
  container.insertAdjacentHTML(place, component);
};

/**
 * Склонение слова в зависимости от числа
 * Пример: declOfNum(count, ['баннер', 'баннера', 'баннеров']);
 * @param n Число
 * @param titles
 * @return {*}
 */
const getWordForm = (n, titles) => {
  return titles[
    n % 10 === 1 && n % 100 !== 11
      ? 0
      : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
        ? 1
        : 2
  ];
};

export {
  getWordForm,
  render,
  RenderPosition
};
