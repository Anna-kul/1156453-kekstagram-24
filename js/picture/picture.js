import {showBigPicture} from './big-picture.js';

const pictureContainer = document.querySelector('.pictures');
const picturesTitle = pictureContainer.querySelector('.pictures__title');

const createPicture = (pictureData) => {
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

export const renderSimilarPhoto = (similarPhoto) => {
  const similarFotosFragment = document.createDocumentFragment();
  similarPhoto.forEach((pictureData) =>{
    const picture = createPicture(pictureData);

    similarFotosFragment.appendChild(picture);
  });
  pictureContainer.appendChild(similarFotosFragment);
  picturesTitle.classList.remove('visually-hidden');
  pictureContainer.querySelector('.img-upload__title').classList.remove('visually-hidden');
};
export const clearPictureContiner = () =>{
  pictureContainer.innerHTML = '';
};


