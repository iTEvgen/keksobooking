import { FEATURE_VALUES } from './data.js';
import { getRandomInteger, getRandomArrayElement } from './util.js';

const getCheckDuplicatesArray = (array) => {
  const featureLength = getRandomInteger(1, array.length - 1);
  const features = Array.from({ length: featureLength }, () => getRandomArrayElement(FEATURE_VALUES));
  const uniqueFeatures = Array.from(new Set(features));
  return uniqueFeatures;
};

export { getCheckDuplicatesArray };
