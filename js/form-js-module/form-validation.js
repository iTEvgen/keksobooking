import { adFormUsers } from './form-elements.js';
import { resetMainMarker } from '../map.js';
import { showSuccessPopup } from '../popup/popup-success.js';
import { showErrorPopup } from '../popup/popup-error.js';
import { sentData } from '../api.js';

// Модуль для обработки формы
const initFormValidation = () => {
  // Исправляем ID согласно HTML
  const housingType = adFormUsers.querySelector('#type');
  const priceInput = adFormUsers.querySelector('#price');
  const timeIn = adFormUsers.querySelector('#timein');
  const timeOut = adFormUsers.querySelector('#timeout');
  const titleInput = adFormUsers.querySelector('#title');
  const avatarInput = adFormUsers.querySelector('#avatar');
  const imagesInput = adFormUsers.querySelector('#images');
  const roomsInput = adFormUsers.querySelector('#room_number');
  const capacityInput = adFormUsers.querySelector('#capacity');
  const form = adFormUsers;

  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_PRICE = 1000000;

  // Минимальные цены для каждого типа жилья
  const minPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  // Соответствие комнат и гостей
  const roomCapacity = {
    '1': ['1'],									// 1 комната -> только 1 гость
    '2': ['1', '2'],						// 2 комнаты -> 1 или 2 гостя
    '3': ['1', '2', '3'],				// 3 комнаты -> 1, 2 или 3 гостя
    '100': ['0']								// 100 комнат -> не для гостей
  };

  // Синхронизация времени заезда и выезда
  const syncTime = (source, target) => {
    target.value = source.value;
  };

  // Валидация цены
  const validatePrice = (reportImmediately = false) => {
    const priceValue = Number(priceInput.value);
    const minPriceValue = minPrice[housingType.value];
    let isValid = true;

    priceInput.setCustomValidity('');

    if (!priceInput.value.trim()) {
      priceInput.setCustomValidity('Укажите цену');
      isValid = false;
    } else if (isNaN(priceValue)) {
      priceInput.setCustomValidity('Цена должна быть числом');
      isValid = false;
    } else if (priceValue < minPriceValue) {
      priceInput.setCustomValidity(`Минимальная цена для ${housingType.options[housingType.selectedIndex].text}: ${minPriceValue}`);
      isValid = false;
    } else if (priceValue > MAX_PRICE) {
      priceInput.setCustomValidity(`Максимальная цена: ${MAX_PRICE}`);
      isValid = false;
    } else if (priceValue < 0) {
      priceInput.setCustomValidity('Цена не может быть отрицательной');
      isValid = false;
    }

    if (reportImmediately && !isValid) {
      priceInput.reportValidity();
    }

    return isValid;
  };

  // Валидация файлов (изображений)
  const validateFile = (fileInput) => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];

      // Проверка типа файла
      if (!file.type.startsWith('image/')) {
        fileInput.setCustomValidity('Файл должен быть изображением');
        return false;
      }
    }

    fileInput.setCustomValidity('');
    return true;
  };

  // Синхронизация комнат и вместимости
  const syncRoomsCapacity = () => {
    const roomsValue = roomsInput.value;
    const allowedCapacities = roomCapacity[roomsValue];

    // Включаем все option сначала
    Array.from(capacityInput.options).forEach((option) => {
      option.disabled = false;
      option.hidden = false;
    });

    // Отключаем неподходящие варианты
    Array.from(capacityInput.options).forEach((option) => {
      if (!allowedCapacities.includes(option.value)) {
        option.disabled = true;
        option.hidden = true;
      }
    });

    // Если текущее значение capacity недопустимо, сбрасываем на первое допустимое
    if (!allowedCapacities.includes(capacityInput.value)) {
      capacityInput.value = allowedCapacities[0];
    }
  };

  // Обновление placeholder для цены при изменении типа жилья
  const updatePricePlaceholder = () => {
    const selectedType = housingType.value;
    priceInput.placeholder = minPrice[selectedType];
    priceInput.min = minPrice[selectedType];
  };

  // Валидация формы при отправке
  const validateForm = (evt) => {
    let isValid = true;

    // Валидация заголовка
    if (titleInput.value.length < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Минимальная длина заголовка: ${MIN_TITLE_LENGTH} символов`);
      titleInput.reportValidity();
      isValid = false;
    } else if (titleInput.value.length > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Максимальная длина заголовка: ${MAX_TITLE_LENGTH} символов`);
      titleInput.reportValidity();
      isValid = false;
    } else {
      titleInput.setCustomValidity('');
    }

    // Валидация цены
    if (!validatePrice()) {
      priceInput.reportValidity();
      isValid = false;
    }

    // Валидация аватара
    if (!validateFile(avatarInput)) {
      avatarInput.reportValidity();
      isValid = false;
    }

    // Валидация фотографий жилья
    if (!validateFile(imagesInput)) {
      imagesInput.reportValidity();
      isValid = false;
    }

    if (!isValid) {
      evt.preventDefault();
    }

    return isValid;
  };

  // ИНИЦИАЛИЗАЦИЯ ОБРАБОТЧИКОВ СОБЫТИЙ

  // Обработчик изменения типа жилья
  housingType.addEventListener('change', () => {
    updatePricePlaceholder();
    validatePrice(true);
  });

  // Обработчики для синхронизации времени
  timeIn.addEventListener('change', () => syncTime(timeIn, timeOut));
  timeOut.addEventListener('change', () => syncTime(timeOut, timeIn));

  // Обработчик для валидации цены в реальном времени
  priceInput.addEventListener('input', () => {
    // Автокоррекция максимального значения
    const priceValue = Number(priceInput.value);
    if (!isNaN(priceValue) && priceValue > MAX_PRICE) {
      priceInput.value = MAX_PRICE;
    }
    validatePrice(true);
  });

  // Обработчик для валидации заголовка в реальном времени
  titleInput.addEventListener('input', () => {
    const valueLength = titleInput.value.length;

    if (valueLength > 0 && valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} симв.`);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity(`Удалите ${valueLength - MAX_TITLE_LENGTH} симв.`);
    } else {
      titleInput.setCustomValidity('');
    }
    titleInput.reportValidity();
  });

  // Обработчики для валидации файлов
  avatarInput.addEventListener('change', () => validateFile(avatarInput));
  imagesInput.addEventListener('change', () => validateFile(imagesInput));

  // Обработчики для синхронизации комнат и вместимости
  roomsInput.addEventListener('change', syncRoomsCapacity);
  capacityInput.addEventListener('change', () => {
    // Дополнительная валидация
  });

  // Обработчик отправки формы
  const setUserFormSubmit = () => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      if (!validateForm(evt)) {
        return;
      }

      const formData = new FormData(form);

      sentData(
        formData,
        () => {
          showSuccessPopup();
          form.reset();
          updatePricePlaceholder();
          syncRoomsCapacity();
          resetMainMarker();
        },
        () => {
          showErrorPopup();
        }
      );
    });
  };

  updatePricePlaceholder();
  syncRoomsCapacity();
  setUserFormSubmit();

  const resetButton = form.querySelector('.ad-form__reset');
  if (resetButton) {
    resetButton.addEventListener('click', (evt) => {
      evt.preventDefault();
      resetMainMarker();
      form.reset();
      updatePricePlaceholder();
      syncRoomsCapacity();
    });
  }
};

export { initFormValidation };
