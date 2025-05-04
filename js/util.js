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

export {
  getRandomInteger,
  getRandomArrayElement,
  createIcon,
  getRandomFloatNumber
};


// const getStringCount = (text) => {
//   const length = text.length;
//   return (length >= 30 && length <= 100) ? console.log('Все отлично заголовок нужной длины.') : console.log('Все пропало залогово не подходит.');
// };
