/* global L:readonly */

const ALERT_SHOW_TIME = 5000;
const validateAndSwap = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }

  return { min, max };
};

const getRandomInteger = (min, max) => {
  const { min: validatedMin, max: validatedMax } = validateAndSwap(min, max);
  if (validatedMin === -1) {
    return -1;
  }

  const random = Math.floor(Math.random() * (validatedMax - validatedMin + 1)) + validatedMin;
  return random;
};

const DECIMAL_BASE = 10;

const getRandomFloatNumber = (min, max, decimalPlace) => {
  const { min: validatedMin, max: validatedMax } = validateAndSwap(min, max);
  if (validatedMin === -1) {
    return -1;
  }

  const randomNumber = Math.random() * (validatedMax - validatedMin) + validatedMin;
  const decimalShiftFactor = Math.pow(DECIMAL_BASE, decimalPlace);
  return Math.round(randomNumber * decimalShiftFactor) / decimalShiftFactor;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Генерация иконки для библиотеки leaflet
const createIcon = (url, size, anchor) => L.icon({
  iconUrl: url,
  iconSize: size,
  iconAnchor: anchor
});

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.borderRadius = '15px';
  alertContainer.style.fontSize = '28px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.color = 'white';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const createEscKeydownHandler = (closeCallback) => (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeCallback();
  }
};

const setupPopupCloseHandler = (popupTemplate, closeCallback, closeOnClick = true) => {
  const escHandler = createEscKeydownHandler(closeCallback);
  const clickHandler = () => closeCallback();

  document.addEventListener('keydown', escHandler);
  if (closeOnClick) {
    setTimeout(() => {
      document.addEventListener('click', clickHandler);
    }, 100);
  }

  // Возвращаем функции для очистки
  return () => {
    document.removeEventListener('keydown', escHandler);
    document.removeEventListener('click', clickHandler);
  };
};

export {
  getRandomInteger,
  getRandomArrayElement,
  createIcon,
  getRandomFloatNumber,
  showAlert,
  setupPopupCloseHandler
};
