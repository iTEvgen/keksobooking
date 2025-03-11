const getRandomInteger = (min, max, decimalPlace) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  if (decimalPlace !== 0) {
    return random.toFixed(decimalPlace);
  }
  return random;
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// const getStringCount = (text) => {
//   const length = text.length;
//   return (length >= 30 && length <= 100) ? console.log('Все отлично заголовок нужной длины.') : console.log('Все пропало залогово не подходит.');
// };

export {
  getRandomInteger,
  getRandomArrayElement,
};
