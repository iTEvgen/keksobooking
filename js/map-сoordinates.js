import { getCalculateCoordinates } from './util.js';
import { Coordinates } from './data.js';

const MANTISSA = 5;

const housingLocationObject = () => ({
  x: getCalculateCoordinates(Coordinates.MIN_X, Coordinates.MAX_X, MANTISSA),
  y: getCalculateCoordinates(Coordinates.MIN_Y, Coordinates.MAX_Y, MANTISSA),
});

export { housingLocationObject };
