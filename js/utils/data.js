import {getRandomPositiveInteger, getItem}  from './utils.js';
const NAMES_FOR_COMMENTS = [
  'Антон',
  'Юрий',
  'Александр',
  'Юлия',
  'Егор',
  'Илья',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const DESCRIPTIONS = [
  'Пляж с высоты',
  'Идем на пляж',
  'Голубая лагуна',
  'Девушка с фотоаппартом',
  'Супчик',
  'Черный демон',
  'Диета',
  'Компот',
  'Ловлю самолет',
  'Новый пляж',
  'Сын маминой подруги вернулся на родину',
  'Утро похмельной богемы',
  'Твои любмые суши',
  'Протяни ноги к свету',
  'Начало новой жизни',
  'Командная работа',
  'Кристина',
  'Фонарики',
  'Пальмы',
  'Обед зожника',
  'Море',
  'Краб',
  'Рейв',
  'Сафари',
  'Порядок',
];
const SIMILAR_PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR = 1;
const MAX_AVATAR = 6;
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
<<<<<<< HEAD

=======
const createComment = (index) => ({
  id: index,
  avatar: `img/avatar-${  getRandomPositiveInteger(MIN_AVATAR, MAX_AVATAR)  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES_FOR_COMMENTS),
});
const createComments = () => {
  const quantity = getRandomPositiveInteger(1, 20);
  return Array(quantity).fill(null).map(() => createComment());
};
>>>>>>> d30bfcb4a8bd3ce200020877bf0538e12a0d2359
const createPhoto = getItem().map((index) => ({
  id: index,
  url: `/photos/${  index  }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
}),
);
export {NAMES_FOR_COMMENTS, MESSAGES, DESCRIPTIONS, SIMILAR_PHOTO_COUNT, createPhoto};
