const adFormUsers = document.querySelector('.ad-form');

// Модуль для обработки формы
const formHandler = () => {
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
};

export { formHandler };
