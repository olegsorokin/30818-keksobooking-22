const FILE_TYPES = ['jpg', 'jpeg', 'png'];
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

const generateImage = (previewElement, file) => {
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewElement.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

export {
  generateImage,
  getWordForm,
  render,
  RenderPosition
};
