import { housingInformationArray } from'./data.js';
import {renderCardToFragment} from'./template-renderer.js';
import { formHandler } from './form-handler.js';

const cardElement = document.querySelector('#card').content.querySelector('.popup');
const firstCardData = housingInformationArray[0];

formHandler();
renderCardToFragment(cardElement, firstCardData, '#map-canvas');
