import { disableForm, enableForm } from './form-js-module/form-state.js';
import { LocationInput } from './form-js-module/form-elements.js';
import { renderCardToFragment } from './template-renderer.js';
import { housingInformationArray } from './data.js';
import { createIcon } from './util.js';

const initializationMaps = () => {
  disableForm();
  return new Promise((resolve) => {
    setTimeout(() => {
      const map = L.map('map-canvas')
        .setView({
          lat: 35.68950,
          lng: 139.69171,
        }, 11);

      L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        },
      ).addTo(map);

      const mainMarker = L.marker(
        {
          lat: 35.68950,
          lng: 139.69171
        },
        {
          draggable: true,
          icon: createIcon('../libs/leaflet/img/main-pin.svg', [52, 52], [26, 52])
        }
      );
      mainMarker.addTo(map);

      const updateCoordinates = ({ lat, lng }) => {
        const format = (num) => num.toFixed(5);
        mainMarker.bindPopup(`Координаты: ${format(lat)}, ${format(lng)}`);
        LocationInput.value = `x:${format(lat)}, y:${format(lng)}`;
      };

      updateCoordinates(mainMarker.getLatLng());

      mainMarker.on('moveend', (evt) => updateCoordinates(evt.target.getLatLng()));

      const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
      const userIcon = createIcon('../libs/leaflet/img/pin.svg', [40, 40], [20, 40]);

      housingInformationArray.forEach((cardData) => {
        const popupContent = document.createElement('div');
        popupContent.classList.add('popup-container');
        popupContent.append(
          renderCardToFragment(popupTemplate, cardData)
        );

        const userMarker = L.marker(
          {
            lat: cardData.location.x,
            lng: cardData.location.y,
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
            },
          );
      });

      map.whenReady(() => {
        enableForm();
        resolve(map);
      });
    }, 500);
  });
};

export { initializationMaps };
