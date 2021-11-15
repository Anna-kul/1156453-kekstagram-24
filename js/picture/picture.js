import {getData} from '../api.js';
import {setState, getState} from '../state.js';
import {showBigPicture} from './big-picture.js';
import '../form/slider.js';
import {showNotificationPopup} from '../notification-popup.js';

const SIMILAR_PICTURES_COUNT = 25;
const RANDOM_PICTURES_COUNT = 10;

const pictureContainer = document.querySelector('.pictures');
const picturesTitle = pictureContainer.querySelector('.pictures__title');
const imgFilters = document.querySelector('.img-filters');
const imgUpload = document.querySelector('.img-upload');
const imgUploadTitle = pictureContainer.querySelector('.img-upload__title');

export const createPicture = (pictureData) => {
  const pictureTemplate = document.querySelector('#picture');

  if (pictureTemplate === null) {
    // eslint-disable-next-line no-console
    console.warn('Элемент pictureTemplate не найден');

    return;
  }

  const pictureFromTemplate = pictureTemplate.content.querySelector('.picture');

  if (pictureFromTemplate === null) {
    // eslint-disable-next-line no-console
    console.warn('Элемент pictureFromTemplate не найден');

    return;
  }

  const picture = pictureFromTemplate.cloneNode(true);
  const image = picture.querySelector('.picture__img');
  const likes = picture.querySelector('.picture__likes');
  const comments = picture.querySelector('.picture__comments');

  if (image === null || likes === null || comments === null) {
    // eslint-disable-next-line no-console
    console.warn('Необходимые элементы отсутствуют');

    return;
  }

  image.src = pictureData.url;
  likes.textContent = pictureData.likes;
  comments.textContent = pictureData.comments.length;

  const handlePictureClick = (evt) => {
    evt.preventDefault();

    showBigPicture(pictureData);
  };

  picture.addEventListener('click', handlePictureClick);

  return picture;
};

const renderPictures = (pictureDatas) => {
  const fragment = document.createDocumentFragment();

  pictureDatas.forEach((pictureData) =>{
    const picture = createPicture(pictureData);

    fragment.appendChild(picture);
  });

  pictureContainer.appendChild(fragment);

  picturesTitle.classList.remove('visually-hidden');
  imgUploadTitle.classList.remove('visually-hidden');
  imgFilters.classList.remove('img-filters--inactive');
};


const handleGetDataSuccess = (pictureDatas) => {
  setState('pictures', pictureDatas);

  renderPictures(pictureDatas.slice(0, SIMILAR_PICTURES_COUNT));
};

const handleGetDataFail = () => {
  // eslint-disable-next-line no-use-before-define
  showNotificationPopup({type: 'error', text: 'Не удалось загрузить фотографии', button: {text: 'Попробовать ещё раз', onclick: getDataRecursively()}});
};

const getDataRecursively = () => {
  getData(handleGetDataSuccess, handleGetDataFail);
};

const removePictures = () => {
  while (imgUpload.nextElementSibling) {
    imgUpload.nextElementSibling.remove();
  }
};

const filterRandomPictures = (pictureDatas) => pictureDatas.slice().sort(() => Math.random() - Math.random());

const filterDiscussedPictures = (pictureDatas) => pictureDatas.slice().sort((a, b) => b.comments.length - a.comments.length);

const handleFilterChange = (evt) => {
  removePictures();
  switch (evt.detail.currentFilter) {
    case 'random':
      renderPictures(
        filterRandomPictures(getState().pictures).slice(0, RANDOM_PICTURES_COUNT),
      );

      break;
    case 'discussed':
      renderPictures(
        filterDiscussedPictures(getState().pictures).slice(0, SIMILAR_PICTURES_COUNT),
      );

      break;

    default:
      renderPictures(getState().pictures.slice(0, SIMILAR_PICTURES_COUNT));
  }
};

document.addEventListener('filter/change', handleFilterChange);

getDataRecursively();
