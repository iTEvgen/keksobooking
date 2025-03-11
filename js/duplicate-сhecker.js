import { getRandomInteger, getRandomArrayElement } from './util.js';

const getCheckDuplicatesArray = (array) => {
  const featureLength = getRandomInteger(1, array.length);
  const features = Array.from({ length: featureLength }, () => getRandomArrayElement(array));
  const uniqueFeatures = features.filter((item, index) => features.indexOf(item) === index);
  return uniqueFeatures;
};

export { getCheckDuplicatesArray };
