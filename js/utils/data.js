import {getRandomPositiveInteger, getItem, getItemAvatar} from './utils.js';
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
const createComments = () => ({
  id: getItem(),
  avatar: `img/avatar-${   getItemAvatar() }.svg`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length -1)],
  name: NAMES_FOR_COMMENTS[getRandomPositiveInteger(0, NAMES_FOR_COMMENTS.length -1)],
});
const createFoto =() => ({
  id:getItem(),
  url: `photos/${   getItem()  }.jpg`,
  description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length-1)],
  likes: getRandomPositiveInteger(15, 200),
  comments: createComments(),
});
const createFotos = () => Array.from({length: SIMILAR_FOTO_COUNT},createFoto);
export {createFotos, createFoto};
export {NAMES_FOR_COMMENTS, MESSAGES, DESCRIPTIONS, SIMILAR_FOTO_COUNT};
