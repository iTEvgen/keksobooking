import {
  FEATURE_VALUES,
  Coordinates,
} from './data.js';

const MANTISSA = 5;

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getCalculateCoordinates = (min, max, decimalPlace) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  const randomFloat = Math.random() * (max - min + 1) + min;
  return randomFloat.toFixed(decimalPlace);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getCheckDuplicatesArray = (array) => {
  const featureLength = getRandomInteger(1, array.length - 1);
  const features = Array.from({ length: featureLength }, () => getRandomArrayElement(FEATURE_VALUES));
  const uniqueFeatures = Array.from(new Set(features));
  return uniqueFeatures;
};

const housingLocationObject = () => ({
  x: getCalculateCoordinates(Coordinates.MIN_X, Coordinates.MAX_X, MANTISSA),
  y: getCalculateCoordinates(Coordinates.MIN_Y, Coordinates.MAX_Y, MANTISSA),
});

// const getStringCount = (text) => {
//   const length = text.length;
//   return (length >= 30 && length <= 100) ? console.log('Все отлично заголовок нужной длины.') : console.log('Все пропало залогово не подходит.');
// };

export {
  getRandomInteger,
  getRandomArrayElement,
  getCheckDuplicatesArray,
  housingLocationObject,
};
