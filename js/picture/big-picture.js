import {isEscapeKey} from '../utils/utils.js';

const COMMENTS_COUNT = 5;
let currentPictureData = null;
let visibleCommentsCount = 0;

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureImgSocial = bigPicture.querySelector('.big-picture__social.social');

const socialCaption = bigPictureImgSocial.querySelector('.social__caption');
const socialLikes = bigPictureImgSocial.querySelector('.social__likes');
const socialCommentsCountBlock = bigPictureImgSocial.querySelector('.social__comment-count');
const socialComments = bigPictureImgSocial.querySelector('.social__comments');
const socialCommentsLoader = bigPictureImgSocial.querySelector('.social__comments-loader');

const socialLikesCount = socialLikes.querySelector('.likes-count');
const socialCommentsCount = socialCommentsCountBlock.querySelector('.comments-count');
const socialVisibleCommentsCount = socialCommentsCountBlock.querySelector('.visible-comments-count');
const socialCommentTemplate = document.querySelector('.social__comment').cloneNode(true);

const createSocialComment = (commentData) => {
  const socialComment = socialCommentTemplate.cloneNode(true);

  const picture = socialComment.querySelector('.social__picture');
  const text = socialComment.querySelector('.social__text');

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
    socialVisibleCommentsCount.textContent = Math.min(pictureData.comments.length, COMMENTS_COUNT);
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

  window.addEventListener('keydown', onWindowEscKeyDown);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  currentPictureData = null;

  window.removeEventListener('keydown', onWindowEscKeyDown);
};

const onCloseButtonClick = () => {
  hideBigPicture();
};

function onWindowEscKeyDown(evt) {
  if (!isEscapeKey(evt)) {
    return;
  }

  hideBigPicture();

  window.removeEventListener('keydown', onWindowEscKeyDown);
}

const handleCommentsLoaderClick = () => {
  const currentVisibleCommentsCount = visibleCommentsCount;

  visibleCommentsCount = Math.min(currentPictureData.comments.length, visibleCommentsCount + COMMENTS_COUNT);
  socialVisibleCommentsCount.textContent = visibleCommentsCount;

  currentPictureData.comments.slice(currentVisibleCommentsCount, visibleCommentsCount).forEach((comment) => {
    socialComments.appendChild(createSocialComment(comment));
  });

  if (visibleCommentsCount === currentPictureData.comments.length) {
    socialCommentsLoader.classList.add('hidden');
  }
};

closeButton.addEventListener('click', onCloseButtonClick);
socialCommentsLoader.addEventListener('click', handleCommentsLoaderClick);
