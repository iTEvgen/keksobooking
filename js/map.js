/* global L:readonly */

import { disableForm, enableForm } from './form-js-module/form-state.js';
import { LocationInput } from './form-js-module/form-elements.js';
import { renderCardToFragment } from './template-renderer.js';
import { createIcon } from './util.js';

const DEFAULT_LAT = 35.68950;
const DEFAULT_LNG = 139.69171;

let mainMarkerInstance = null;
let mapInstance = null;

const updateCoordinates = ({ lat, lng }) => {
  const format = (num) => num.toFixed(5);
  if(mainMarkerInstance) {
    mainMarkerInstance.bindPopup(`Координаты: ${format(lat)}, ${format(lng)}`);
  }
  LocationInput.value = `x:${format(lat)}, y:${format(lng)}`;
};

const resetMainMarker = () => {
  if (mainMarkerInstance) {
    mainMarkerInstance.setLatLng([DEFAULT_LAT, DEFAULT_LNG]);
    updateCoordinates(mainMarkerInstance.getLatLng());
  }
  if (mapInstance) {
    mapInstance.setView([DEFAULT_LAT, DEFAULT_LNG], 11);
  }
};

const renderMarkers = (cardDataArray, map) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const userIcon = createIcon('../libs/leaflet/img/pin.svg', [40, 40], [20, 40]);

  cardDataArray.forEach((cardData) => {
    const popupContent = document.createElement('div');
    popupContent.classList.add('popup-container');
    popupContent.append(
      renderCardToFragment(popupTemplate, cardData)
    );

    const userMarker = L.marker(
      {
        lat: cardData.location.lat,
        lng: cardData.location.lng,
      },
      {
        icon: userIcon,
      }
    );
    userMarker
      .addTo(map)
      .bindPopup(popupContent,
        {
          keepInView: true,
        }
      );
  });
};

const initializationMaps = () => {
  disableForm();
  return new Promise((resolve) => {
    setTimeout(() => {
      const map = L.map('map-canvas')
        .setView({
          lat: DEFAULT_LAT,
          lng: DEFAULT_LNG,
        }, 11);

      mapInstance = map;

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      ).addTo(map);

      const mainMarker = L.marker(
        {
          lat: DEFAULT_LAT,
          lng: DEFAULT_LNG
        },
        {
          draggable: true,
          icon: createIcon('../libs/leaflet/img/main-pin.svg', [52, 52], [26, 52])
        }
      );
      mainMarker.addTo(map);

      updateCoordinates(mainMarker.getLatLng());

      mainMarker.on('moveend', (evt) => updateCoordinates(evt.target.getLatLng()));

      mainMarkerInstance = mainMarker;

      map.whenReady(() => {
        enableForm();
        resolve(map);
      });
    }, 500);
  });
};

const addMarkersToMap = (cardDataArray, map) => {
  renderMarkers(cardDataArray, map);
};

export { initializationMaps, resetMainMarker, addMarkersToMap };
