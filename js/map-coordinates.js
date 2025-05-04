import { getRandomFloatNumber } from './util.js';
import { Coordinates } from './data.js';

const MANTISSA = 5;

const housingLocationObject = () => ({
  x: getRandomFloatNumber(Coordinates.MIN_X, Coordinates.MAX_X, MANTISSA),
  y: getRandomFloatNumber(Coordinates.MIN_Y, Coordinates.MAX_Y, MANTISSA),
});
export { housingLocationObject };
