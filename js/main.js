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

getRandomInteger(1, 10);
getCalculateCoordinates(1, 10, 2);
