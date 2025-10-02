import { initializationMaps, addMarkersToMap } from './map.js';
import { initFormValidation } from './form-js-module/form-validation.js';
import { getData } from './api.js';

const initApp = async () => {
  try {
    const map = await initializationMaps();

    getData((data) => {
      addMarkersToMap(data, map);
    });

    initFormValidation();
  } catch (error) {
    error('Ошибка при инициализации приложения:', error);
  }
};
initApp();
