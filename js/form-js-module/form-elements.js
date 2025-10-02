const adFormUsers = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const inputs = document.querySelectorAll('input, select, textarea, button');
const LocationInput = document.querySelector('#address');

if (!LocationInput.hasAttribute('readonly')) {
  LocationInput.readOnly = true;
}

export { adFormUsers, mapFilters, inputs, LocationInput };
