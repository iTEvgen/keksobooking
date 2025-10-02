import { showAlert } from './util.js';

const MAX_STEPS = 10;

const getData = (onSuccess) => {
  fetch('https://23.javascript.htmlacademy.pro/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showAlert('Не удалось получить данные с сервера');
        return Promise.reject();
      }
    })
    .then((data) => {
      onSuccess(data.slice(0, MAX_STEPS));
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера');
    });
};

const sentData = (formData, onSuccess, onError) => {
  fetch ('https://23.javascript.htmlacademy.pro/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    });
};

export { getData, sentData };
