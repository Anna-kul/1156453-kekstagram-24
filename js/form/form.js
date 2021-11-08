import {isEscapeKey, isEnterKey} from '../utils/utils.js';
import {imgUploadPreview} from './validity-form.js';
import './validity-form.js';

const uploadFileOpen = document.querySelector('#upload-file');
const formEdit = document.querySelector('.img-upload__overlay');
const bodyAll = document.querySelector('body');
const closeButton = document.querySelector('#upload-cancel');
const formForHashtags = document.querySelector('.img-upload__text');
const inputForHashtag = formForHashtags.querySelector('input');
const userComments = document.querySelector('.text__description');

const onLoadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === userComments || document.activeElement === inputForHashtag) {
      evt.stopPropagation;
    } else {
      closeLoadModal();
    }
  }
};

function openLoadModal() {
  formEdit.classList.remove('hidden');
  bodyAll.classList.add('modal-open');
  //pictureContainer;
  document.addEventListener('keydown', onLoadEscKeydown);
}

function closeLoadModal() {
  formEdit.classList.add('hidden');
  bodyAll.classList.remove('modal-open');
  document.removeEventListener('keydown', onLoadEscKeydown);
  imgUploadPreview.style.transform = 'scale(1)';
}

uploadFileOpen.addEventListener ('change', openLoadModal);

uploadFileOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openLoadModal();
  }
});

closeButton.addEventListener ('click', closeLoadModal);

closeButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeLoadModal();
  }
});