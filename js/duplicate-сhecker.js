import { getRandomInteger, getRandomArrayElement } from './util.js';

const getCheckDuplicatesArray = (array) => {
  const featureLength = getRandomInteger(0, array.length);
  const uniqueFeatures = new Set();
  while (uniqueFeatures.size < featureLength) {
    uniqueFeatures.add(getRandomArrayElement(array));
  }
  return Array.from(uniqueFeatures);
};

export { getCheckDuplicatesArray };
