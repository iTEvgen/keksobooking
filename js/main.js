const MAX_STEPS = 10;
const NUMBER_ARRAY = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10'
];
const AD_TITLES = [
  'Уникальная возможность: Сдача в аренду элегантного дома в историческом районе',
  'Лакшери-апартаменты в центре Токио: Роскошь и комфорт',
  'Аренда на длительный срок: Просторная квартира с высокими потолками',
  'Стильная студия в центре Токио: Идеальное жилье для одиночек или пар',
  'Новый жилой комплекс в сердце Токио: Современный дизайн и удобства',
  'Аренда роскошного пентхауса в центре города: Эксклюзивное жилье',
  'Уютная квартира в центральном районе: Идеальное расположение и удобства',
  'Аренда на короткий срок: Минимализм и комфорт в центре Токио',
  'Исторический дом в центре Токио: Уникальный опыт проживания',
  'Современные апартаменты в Токио: Идеальный выбор для деловых путешественников'
];
const AD_DESCRIPTION = [
  'Уникальное предложение для тех, кто ценит комфорт и историю! Сдается в аренду элегантный дом, расположенный в живописном историческом районе. Это отличный вариант для семей, которые хотят совместить удобство современной жизни с очарованием старинной архитектуры и атмосферой.',
  'Элитные апартаменты в центре Токио предлагают роскошь и комфорт для самых взыскательных гостей японской столицы.',
  'Просторная квартира на длительный срок аренды расположена в престижном районе города. Она отличается высокими потолками и комфортной планировкой, что делает ее идеальным выбором для семей или компаний друзей. Квартира полностью оборудована всей необходимой мебелью и техникой, обеспечивая жильцам удобство и уют.',
  'Стильная студия в самом сердце Токио - идеальный выбор для тех, кто ценит удобство и стиль. Она станет комфортным жильем для одиноких профессионалов или молодых пар, ведущих активный городской образ жизни.',
  'Новый жилой комплекс в центре Токио предлагает резиденциям современный дизайн, роскошные удобства и привилегированное местоположение.',
  'Пентхаус класса люкс ждет своих арендаторов в самом центре города. Эксклюзивное расположение и неповторимый вид из окон делают это жилье идеальным выбором для состоятельных гостей. Роскошная обстановка и интерьер подчеркнут статус своих жильцов, а высокий уровень комфорта сделает их пребывание незабываемым.',
  'Уютная квартира в центре города с идеальным расположением и всеми удобствами для комфортного проживания.',
  'Апартаменты в центре Токио доступны для краткосрочной аренды. Просторное помещение с минималистичным дизайном обеспечивает комфорт и уют, идеально подходящее для деловых поездок или туристических визитов.',
  'Исторический дом в центральной части Токио предлагает уникальный опыт проживания в роскошных апартаментах. Интерьер дома сохранил многие оригинальные элементы, такие как старинные деревянные полы и камины, что придает ему неповторимый шарм. В то же время, дом оснащен всеми современными удобствами, такими как кондиционеры и Wi-Fi, для обеспечения комфортного проживания.',
  'Современные апартаменты в Токио - идеальный выбор для деловых путешественников, предлагающий комфортное проживание и удобное расположение в центре города.'
];
const TYPE_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow'
];
const FEATURE_VALUES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DATE_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const IMAGES = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const ROOMS = [
  1,
  2,
  3,
  100,
];

const GUESTS = [
  0,
  1,
  2,
  3,
];

const PRICE = [
  0,
  1000,
  3000,
  5000,
  10000,
];

const MANTISSA = 5;

const Coordinates = {
  MIN_X: 35.65,
  MAX_X: 35.75,
  MIN_Y: 139.70,
  MAX_Y: 139.80,
};

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getCalculateCoordinates = (min, max, decimalPlace) => {
  if (min < 0 || max < 0) {
    return -1;
  }

  if (min > max) {
    [min, max] = [max, min];
  }
  const randomFloat = Math.random() * (max - min + 1) + min;
  return randomFloat.toFixed(decimalPlace);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getCheckDuplicatesArray = (array) => {
  const featureLength = getRandomInteger(1, array.length - 1);
  const features = Array.from({ length: featureLength }, () => getRandomArrayElement(FEATURE_VALUES));
  const uniqueFeatures = Array.from(new Set(features));
  return uniqueFeatures;
};

const housingLocationObject = () => ({
  x: getCalculateCoordinates(Coordinates.MIN_X, Coordinates.MAX_X, MANTISSA),
  y: getCalculateCoordinates(Coordinates.MIN_Y, Coordinates.MAX_Y, MANTISSA),
});

const title = getRandomArrayElement(AD_TITLES);

// const getStringCount = (text) => {
//   const length = text.length;
//   return (length >= 30 && length <= 100) ? console.log('Все отлично заголовок нужной длины.') : console.log('Все пропало залогово не подходит.');
// };

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
