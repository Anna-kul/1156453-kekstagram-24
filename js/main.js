// eslint-disable-next-line no-unused-vars
import {closeLoadModal} from './form/form.js';
import {renderSimilarPhoto} from './picture/picture.js';
import './utils/slider.js';
import {getData} from './api.js';
import { showNotificationPopup } from './notification-popup.js';
const SIMILAR_PHOTO_COUNT = 25;
const getDataRecursively = () => {
  // eslint-disable-next-line no-use-before-define
  getData(handleGetDataSuccess, handleGetDataFail);
};
const handleGetDataSuccess = (photo)=> {
  renderSimilarPhoto(photo.slice(0, SIMILAR_PHOTO_COUNT));
};

const handleGetDataFail = () => {
  showNotificationPopup({type: 'error', text: 'Не удалось загрузить фотографии', button: {text: 'Попробовать ещё раз', onClick: getDataRecursively}});
};

getDataRecursively();

import './utils/big-picture.js';

