import {getRandomPositiveInteger, getItem, getItemAvatar, }  from './utils.js'; 
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
const SIMILAR_FOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createComments = () => ({
  id: getRandomArrayElement(getItem()),
  avatar: `img/avatar-${  getRandomArrayElement(getItemAvatar())  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES_FOR_COMMENTS),
});

const createFoto =() => ({
  id: getRandomArrayElement(getItem()),
  url: `/photos/${  getRandomArrayElement(getItem())   }.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomPositiveInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});
const createFotos = () => Array.from({length: SIMILAR_FOTO_COUNT},createFoto);
export {NAMES_FOR_COMMENTS, MESSAGES, DESCRIPTIONS, SIMILAR_FOTO_COUNT, createFotos, createFoto};
