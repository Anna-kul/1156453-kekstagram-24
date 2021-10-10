function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomSet = (amount) => {
  const items = [...Array(amount)].map((it, index) => index + 1);
  items.sort(() => Math.random() - 0,5);
  return () => items.pop();
};
const getItem = getRandomSet(25);
const getItemAvatar = getRandomSet(6);

const nameComment = [
  'Антон',
  'Юрий',
  'Александр',
  'Юлия',
  'Егор',
  'Илья',
];

const message = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const description = [
  'Пляж с высоты',
  'Идем на пляж',
  'Голубая лагуна',
  'Девушка с фотоаппартом',
  'Супчик',
  'Черный демон',
  'Диета',
  'Компот',
  'Ловлю самолет',
  'Порядок',
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
];

const createComments = () => ({
  id: getItem(),
  avatar: `img/avatar-${  getItemAvatar()  }.svg`,
  message: message[getRandomPositiveInteger(0, message.length -1)],
  name: nameComment[getRandomPositiveInteger(0, nameComment.length -1)],
});

const createFoto =() => ({
  id:getItem(),
  url: `photos/${  getItem()  }.jpg`,
  description: description[getRandomPositiveInteger(0, description.length-1)],
  likes: getRandomPositiveInteger(15, 200),
  comments: createComments(),
});
// eslint-disable-next-line no-unused-vars
const similarFoto = Array.from({length: 25},createFoto);
