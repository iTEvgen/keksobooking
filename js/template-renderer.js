const getTypeDescription = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    default:
      return '';
  }
};

const renderCard = (cardTemplate, cardData) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = cardData.author.avatar;
  cardElement.querySelector('.popup__title').textContent = cardData.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = cardData.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = `${cardData.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = getTypeDescription(cardData.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${cardData.offer.checkin} выезд до ${cardData.offer.checkout}`;
  cardElement.querySelector('.popup__description').textContent = cardData.offer.description;

  const featuresList = cardElement.querySelector('.popup__features');
  featuresList.innerHTML = '';
  cardData.offer.features.forEach((features) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${features}`);
    featureElement.ariaLabel = `доступные удобства ${features}`;
    featuresList.appendChild(featureElement);
  });

  const photosContainer = cardElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  cardData.offer.photos.forEach((photo) => {
    const photoElement = document.createElement('img');
    photoElement.classList.add('popup__photo');
    photoElement.src = photo;
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photosContainer.appendChild(photoElement);
  });

  const validationRules = {
    '.popup__title': (data) => !data.offer.title,
    '.popup__text--address': (data) => !data.offer.address,
    '.popup__text--price': (data) => !data.offer.price,
    '.popup__type': (data) => !data.offer.type,
    '.popup__text--capacity': (data) => !data.offer.rooms || !data.offer.guests,
    '.popup__text--time': (data) => !data.offer.checkin || !data.offer.checkout,
    '.popup__description': (data) => !data.offer.description,
    '.popup__features': (data) => !data.offer.features || data.offer.features.length === 0,
    '.popup__photos': (data) => !data.offer.photos || data.offer.photos.length === 0,
    '.popup__avatar': (data) => !data.author.avatar
  };

  const elementToCheck = Object.entries(validationRules).map(([selector, conditionFn]) => ({
    selector,
    conditionFn: conditionFn(cardData),
  }));

  elementToCheck.forEach(({selector, conditionFn}) => {
    if (conditionFn) {
      const element = cardElement.querySelector(selector);
      if (element) {
        element.remove();

      }
    }
  });
  return cardElement;
};

const renderCardToFragment = (cardTemplate, cardData) => {
  const fragment = document.createDocumentFragment();
  const cardClone = renderCard (cardTemplate, cardData);
  fragment.appendChild(cardClone);
  return fragment;
};

export { renderCardToFragment };
