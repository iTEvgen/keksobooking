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
    photoElement.classList.add('.popup__photos');
    photoElement.src = photo;
    photoElement.width = 45;
    photoElement.height = 40;
    photoElement.alt = 'Фотография жилья';
    photosContainer.appendChild(photoElement);
  });

  const validationRules = {
    '.popup__title': !cardData.offer.title,
    '.popup__text--address': !cardData.offer.address,
    '.popup__text--price': !cardData.offer.price,
    '.popup__type': !cardData.offer.type,
    '.popup__text--capacity': !cardData.offer.rooms || !cardData.offer.guests,
    '.popup__text--time': !cardData.offer.checkin || !cardData.offer.checkout,
    '.popup__description': !cardData.offer.description,
    '.popup__features': !cardData.offer.features || cardData.offer.features.length === 0,
    '.popup__photos': !cardData.offer.photos || cardData.offer.photos.length === 0,
    '.popup__avatar': !cardData.author.avatar
  };

  const elementToCheck = Object.entries(validationRules).map(([selector, conditionFn]) => ({
    selector,
    conditionFn: conditionFn(cardData),
  }));

  elementToCheck.forEach(({selector, condition}) => {
    if (condition) {
      const element = cardElement.querySelector(selector);
      if (element) {
        element.remove();
      }
    }
  });

  return cardElement;
};

const renderCardToFragment = (cardTemplate, cardData, containerSelector) => {
  const fragment = document.createDocumentFragment();
  const cardClone = renderCard (cardTemplate, cardData);
  fragment.appendChild(cardClone);
  const containet = document.querySelector(containerSelector);
  containet.appendChild(fragment);
};

export { renderCardToFragment };

