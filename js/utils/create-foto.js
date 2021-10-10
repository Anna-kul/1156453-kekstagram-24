import {getRandomPositiveInteger, getItem, getItemAvatar} from './data.js';
import {NAMES_FOR_COMMENTS, MESSAGES, DESCRIPTIONS} from './utils.js';
const createComments = () => ({
  id: getItem(),
  avatar: `img/avatar-${  getItemAvatar()  }.svg`,
  message: MESSAGES[getRandomPositiveInteger(0, MESSAGES.length -1)],
  name: NAMES_FOR_COMMENTS[getRandomPositiveInteger(0, NAMES_FOR_COMMENTS.length -1)],
});
const createFoto =() => ({
  id:getItem(),
  url: `photos/${  getItem()  }.jpg`,
  description: DESCRIPTIONS[getRandomPositiveInteger(0, DESCRIPTIONS.length-1)],
  likes: getRandomPositiveInteger(15, 200),
  comments: createComments(),
});
export{createComments, createFoto};
