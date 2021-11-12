import {isEscapeKey} from '../utils/utils.js';

/**
 * Количество комментариев в момент открытия bigPicture и добавляемое при нажатии на кнопку "Загрузить ещё"
 */
const COMMENTS_COUNT = 5;

/**
 * Данные picture, которая открыта в настоящий момент
 */
let currentPictureData = null;

/**
 * Количество отображенных комментариев. Обновляется при нажати на кнопку "Загрузить ещё" на количество, указанное в {@link COMMENTS_COUNT}
 */
let visibleCommentsCount = 0;

const bigPicture = document.querySelector('.big-picture');

if (bigPicture === null) {
  // eslint-disable-next-line no-console
  console.warn('Элемент bigPicture не найден');
}

const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const social = bigPicture.querySelector('.big-picture__social.social');

if (
  bigPictureImg === null
  || social === null
  || closeButton === null
) {
  // eslint-disable-next-line no-console
  console.warn('Необходимые элементы отсутствуют');
}

const socialCaption = social.querySelector('.social__caption');
const socialLikes = social.querySelector('.social__likes');
const socialVisibleCommentCount = social.querySelector('.social__comment-count');
const socialComments = social.querySelector('.social__comments');
const socialCommentsLoader = social.querySelector('.social__comments-loader');

if (
  socialCaption === null
  || socialLikes === null
  || socialVisibleCommentCount === null
  || socialComments === null
  || socialCommentsLoader === null
) {
  // eslint-disable-next-line no-console
  console.warn('Необходимые элементы отсутствуют');
}

const socialLikesCount = socialLikes.querySelector('.likes-count');

if (socialLikesCount === null) {
  // eslint-disable-next-line no-console
  console.warn('Элемент socialLikesCount не найден');
}

const socialCommentsCount = socialVisibleCommentCount.querySelector('.comments-count');

if (socialCommentsCount === null) {
  // eslint-disable-next-line no-console
  console.warn('Элемент socialCommentsCount не найден');
}

/** Шаблон комментария. Не трогать ни при каких обстоятельствах */
const socialCommentTemplate = document.querySelector('.social__comment').cloneNode(true);

const createSocialComment = (commentData) => {
  const socialComment = socialCommentTemplate.cloneNode(true);

  if (socialComment === null) {
    // eslint-disable-next-line no-console
    console.warn('Элемент socialComment не найден');
  }

  const picture = socialComment.querySelector('.social__picture');
  const text = socialComment.querySelector('.social__text');

  if (picture === null || text === null) {
    // eslint-disable-next-line no-console
    console.warn('Необходимые элементы отсутствуют');

    return;
  }

  picture.src = commentData.avatar;
  picture.alt = commentData.name;
  text.textContent = commentData.message;

  return socialComment;
};

const updateBigPicture = (pictureData) => {
  bigPictureImg.src = pictureData.url;
  bigPictureImg.alt = pictureData.description;

  socialCaption.textContent = pictureData.description;

  if (pictureData.likes > 0) {
    socialLikesCount.textContent = pictureData.likes;
  } else {
    socialLikesCount.remove();
  }

  if (pictureData.comments.length > 0) {
    socialCommentsCount.textContent = pictureData.comments.length;
  } else {
    socialCommentsCount.remove();
  }

  socialComments.innerHTML = '';

  pictureData.comments.slice(0, COMMENTS_COUNT).forEach((comment) => {
    socialComments.appendChild(createSocialComment(comment));
  });

  visibleCommentsCount = COMMENTS_COUNT;

  if (visibleCommentsCount === pictureData.comments.length) {
    socialCommentsLoader.classList.add('hidden');
  } else {
    socialCommentsLoader.classList.remove('hidden');
  }
};

export const showBigPicture = (pictureData) => {
  updateBigPicture(pictureData);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  currentPictureData = pictureData;

  window.addEventListener('keydown', handleWindowEscKeyDown);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentPictureData = null;

  window.removeEventListener('keydown', handleWindowEscKeyDown);
};

const handleCloseButtonClick = () => {
  hideBigPicture();
};

function handleWindowEscKeyDown(evt) {
  if (!isEscapeKey(evt)) {
    return;
  }

  hideBigPicture();

  window.removeEventListener('keydown', handleWindowEscKeyDown);
}

const handleCommentsLoaderClick = () => {
  const currentVisibleCommentsCount = visibleCommentsCount;
  visibleCommentsCount = Math.min(currentPictureData.comments.length, visibleCommentsCount + COMMENTS_COUNT);

  currentPictureData.comments.slice(currentVisibleCommentsCount, visibleCommentsCount).forEach((comment) => {
    socialComments.appendChild(createSocialComment(comment));
  });

  if (visibleCommentsCount === currentPictureData.comments.length) {
    socialCommentsLoader.classList.add('hidden');
  }
};

closeButton.addEventListener('click', handleCloseButtonClick);
socialCommentsLoader.addEventListener('click', handleCommentsLoaderClick);
