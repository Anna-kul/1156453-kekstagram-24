import {isEscapeKey, isEnterKey} from '../utils/utils.js';
import {sendData} from '../api.js';
import {validateInputForHashtag} from './user-form.js';
import {showNotificationPopup} from '../notification-popup.js';

const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const MIN_SCALE_VALUE = 25;

export const imgUploadForm = document.querySelector('.img-upload__form');
const inputForHashtag = imgUploadForm.querySelector('.text__hashtags');
const userComments = imgUploadForm.querySelector('.text__description');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const uploadFileOpen = document.querySelector('#upload-file');
const bodyAll = document.querySelector('body');
const closeButton = document.querySelector('#upload-cancel');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');

const onLoadEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    if (document.activeElement === userComments || document.activeElement === inputForHashtag) {
      evt.stopPropagation;
    } else {
      loadModalCloseHandler();
    }
  }
};

export function loadModalOpenHandler() {
  imgUploadOverlay.classList.remove('hidden');
  bodyAll.classList.add('modal-open');
  document.addEventListener('keydown', onLoadEscKeydown);
}

export function loadModalCloseHandler() {
  imgUploadOverlay.classList.add('hidden');
  bodyAll.classList.remove('modal-open');
  document.removeEventListener('keydown', onLoadEscKeydown);
  uploadFileOpen.innerHTML = '';
  imgUploadPreview.style.transform = 'scale(1)';
  imgUploadForm.classList.remove('img-upload__form_validation');
  imgUploadForm.reset();
}

uploadFileOpen.addEventListener ('change', loadModalOpenHandler);

uploadFileOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    loadModalOpenHandler();
  }
});

closeButton.addEventListener ('click', loadModalCloseHandler);

closeButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    loadModalCloseHandler();
  }
});

scaleControlSmaller.addEventListener('click', () => {
  const value = scaleControlValue.value;
  const length = value.length-1;
  const valueArr = value.split('').splice(0,length);
  const number = Number(valueArr.join(''));
  const currentValue = number - STEP_SCALE_VALUE;

  if (currentValue < MIN_SCALE_VALUE){
    return;
  }

  scaleControlValue.value = `${currentValue}%`;
  scale(currentValue /100);
});

scaleControlBigger.addEventListener('click', () => {
  const value = scaleControlValue.value;
  const length = value.length-1;
  const valueArr = value.split('').splice(0,length);
  const number = Number(valueArr.join(''));
  const currentValue = number + STEP_SCALE_VALUE;

  if (currentValue > MAX_SCALE_VALUE){
    return;
  }

  scaleControlValue.value = `${currentValue}%`;
  scale(currentValue /100);
});

function scale(value){
  imgUploadPreview.style.transform=(`scale(${value})`);
}

inputForHashtag.addEventListener('input', () => {
  validateInputForHashtag(inputForHashtag);
});

const handleSendDataSuccess = () => {
  loadModalCloseHandler();
  showNotificationPopup({
    type: 'success',
    text: 'Изображение успешно загружено',
    button: {
      text: 'Окей',
    },
  });
};

const handleSendDataFail = () => {
  loadModalCloseHandler();
  showNotificationPopup({
    type: 'error',
    text: 'Ошибка загрузки файла',
    button: {
      text: 'Загрузить другой файл',
      onClick: loadModalCloseHandler,
    },
  });
};

imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  imgUploadForm.classList.remove('img-upload__form_validation');

  if (!imgUploadForm.checkValidity()) {
    imgUploadForm.classList.add('img-upload__form_validation');
    imgUploadForm.reportValidity();

    return;
  }

  sendData(handleSendDataSuccess, handleSendDataFail, new FormData(imgUploadForm));
});
