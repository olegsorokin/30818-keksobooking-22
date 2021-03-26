const ALERT_SHOW_TIME = 5000;

const mainElement = document.querySelector('main');
const successMessageTemplateContent = document.querySelector('#success').content;
const errorMessageTemplateContent = document.querySelector('#error').content;

const onEscKeyDown = (evt, onSuccess) => {
  const isEscKey = evt.key === 'Escape' || evt.key === 'Esc';

  if (isEscKey) {
    onSuccess();
  }
};

const showSuccessAlert = () => {
  const successMessageElement = successMessageTemplateContent
    .querySelector('.success')
    .cloneNode(true);

  successMessageElement.style.zIndex = 1000;

  const removeElementWithListeners = () => {
    successMessageElement.remove();

    document.removeEventListener('keydown', onRemoveAfterKeyDown);
    document.removeEventListener('click', removeElementWithListeners);
  };

  const onRemoveAfterKeyDown = (evt) => {
    onEscKeyDown(evt, removeElementWithListeners);
  };

  document.addEventListener('keydown', onRemoveAfterKeyDown);
  document.addEventListener('click', removeElementWithListeners);

  mainElement.append(successMessageElement);
};

const showErrorAlert = () => {
  const errorMessageElement = errorMessageTemplateContent
    .querySelector('.error')
    .cloneNode(true);
  const errorButton = errorMessageElement.querySelector('.error__button');

  errorMessageElement.style.zIndex = 1000;

  const removeElementWithListeners = () => {
    errorMessageElement.remove();

    document.removeEventListener('keydown', onRemoveAfterKeyDown);
    document.removeEventListener('click', removeElementWithListeners);
    errorButton.removeEventListener('click', removeElementWithListeners);
  };

  const onRemoveAfterKeyDown = (evt) => {
    onEscKeyDown(evt, removeElementWithListeners);
  };

  document.addEventListener('keydown', onRemoveAfterKeyDown);
  document.addEventListener('click', removeElementWithListeners);
  errorButton.addEventListener('click', removeElementWithListeners);

  mainElement.append(errorMessageElement);
};

/**
 * Функция рендеринга сообщения об ошибке
 * @param {String} message - Текст сообщения об ошибке
 */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '18px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {
  showAlert,
  showErrorAlert,
  showSuccessAlert
}
