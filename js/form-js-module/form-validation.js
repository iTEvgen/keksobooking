import { adFormUsers } from './form-elements.js';

// Модуль для обработки формы
const initFormValidation = () => {
  const housingType = adFormUsers.querySelector('#type');
  const priceInput = adFormUsers.querySelector('#price');
  const timeIn = adFormUsers.querySelector('#timein');
  const timeOut = adFormUsers.querySelector('#timeout');

  // Минимальные цены для каждого типа жилья
  const minPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  //Синхронизация времени заезда и выезда
  const syncTime = (source, target) => {
    target.value = source.value;
  };

  // Обработчик изменения типа жилья
  housingType.addEventListener('change', () => {
    const selectedType = housingType.value;
    priceInput.min = minPrice[selectedType];
    priceInput.placeholder = minPrice[selectedType];
  });

  // Обработчики для синхронизации времени заезда и выезда
  timeIn.addEventListener('change', () => syncTime(timeIn, timeOut));
  timeOut.addEventListener('change', () => syncTime(timeOut, timeIn));

  const MAX_PRICE = 1000000;

  // Обработчик для ввода цены
  priceInput.addEventListener('input', () => {
    const valueLength = priceInput.value.length;
    if (valueLength > 0 && priceInput.value > MAX_PRICE) {
      priceInput.value = MAX_PRICE;
    }
  });
};

export { initFormValidation };
