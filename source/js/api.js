const checkServerStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    const { status, statusText } = response;
    throw new Error(`${status} - ${statusText}`);
  }
};

const getData = (onSuccess, onFail) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => checkServerStatus(response))
    .then((response) => response.json())
    .then((response) => {
      onSuccess(response);
    })
    .catch(() => {
      onFail('Не удалось получить данные');
    })
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => checkServerStatus(response))
    .then((response) => response.json())
    .then((response) => {
      onSuccess(response);
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {
  getData,
  sendData
};
