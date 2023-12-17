import {
  NUMBER_ARRAY,
  AD_TITLES,
  AD_DESCRIPTION,
  TYPE_HOUSING,
  FEATURE_VALUES,
  DATE_TIME,
  IMAGES,
  ROOMS,
  GUESTS,
  PRICE,
} from './data.js';

import {
  getRandomInteger,
  getRandomArrayElement,
  getCheckDuplicatesArray,
  housingLocationObject
} from './util.js';

const MAX_STEPS = 10;
const title = getRandomArrayElement(AD_TITLES);

const housingInformationObject = () => {
  const location = housingLocationObject();
  const address = `x: ${location.x}, y: ${location.y}`;

  return {
    author: {
      avatar: `img/avatars/user${getRandomArrayElement(NUMBER_ARRAY)}.svg`,
    },
    offer: {
      title: title,
      address: address,
      price: getRandomArrayElement(PRICE),
      type: getRandomArrayElement(TYPE_HOUSING),
      rooms: getRandomArrayElement(ROOMS),
      guests: getRandomArrayElement(GUESTS),
      checkin: getRandomArrayElement(DATE_TIME),
      checkout: getRandomArrayElement(DATE_TIME),
      features: getCheckDuplicatesArray(FEATURE_VALUES),
      description: getRandomArrayElement(AD_DESCRIPTION),
      photos: Array.from({length: getRandomInteger(1, IMAGES.length - 1)}, () => getRandomArrayElement(IMAGES)),
    },
    location: location,
  };
};

const housingInformationArray = new Array(MAX_STEPS).fill(null).map(() => housingInformationObject());

housingInformationArray();
