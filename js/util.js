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

// const getStringCount = (text) => {
//   const length = text.length;
//   return (length >= 30 && length <= 100) ? console.log('Все отлично заголовок нужной длины.') : console.log('Все пропало залогово не подходит.');
// };

export {
  getRandomInteger,
  getCalculateCoordinates,
  getRandomArrayElement,
};
