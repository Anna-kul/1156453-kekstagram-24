import {pictureContainer, clearPictureContainer} from './pictures.js';
import {isEscapeKey, isEnterKey, debounce} from './utils.js';
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
function openLoadModal () {
  formEdit.classList.remove('hidden');
  bodyAll.classList.add('modal-open');
  pictureContainer;
  document.addEventListener('keydown', onLoadEscKeydown);
}
function closeLoadModal(){
  formEdit.classList.add('hidden');
  bodyAll.classList.remove('modal-open');
  clearPictureContainer();
  document.removeEventListener('keydown', onLoadEscKeydown);
}
uploadFileOpen.addEventListener ('change', () =>{
  openLoadModal();
});
uploadFileOpen.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    openLoadModal();
  }
});
closeButton.addEventListener ('click', () =>{
  closeLoadModal();
});
closeButton.addEventListener('keydown', (evt) => {
  if (isEnterKey(evt)) {
    closeLoadModal();
  }
});
const regExpHashtag = /[A-Za-zА-Яа-яЁё0-9]$/;
const regExpOneHash = /#\s/;
const regExpSpaceBeforeHashtag = /\S#/;
const handleInputForHashtagChange = debounce(() => {
  inputForHashtag.setCustomValidity('');
  const inputValue = inputForHashtag.value;
  const arrayOfHashtags = inputForHashtag.value.trim().toLowerCase().split(' ').filter((item) => item !== '');
  const hasStringDuplicates =  (new Set(arrayOfHashtags)).size !== arrayOfHashtags.length;
  const hasSpaceBeforeHash = regExpSpaceBeforeHashtag.test(inputValue);
  const isEveryHashtagMoreZeroSymbols = arrayOfHashtags.every((hashtag) => hashtag.length > 0);
  const isEveryHashtagLessTwentySymbols = arrayOfHashtags.every((hashtag) => hashtag.length > 20);
  const isEveryHashtagHasText = arrayOfHashtags.every((hashtag) => regExpOneHash.test(hashtag));
  const isEveryHashtagValid = arrayOfHashtags.every((hashtag) => regExpHashtag.test(hashtag.replace('#', '')) || hashtag === '#');
  const arrayFromValue = inputValue.split(' ');
  for(const hashtagText of arrayFromValue) {
    if(!hashtagText.startsWith('#')){
      inputForHashtag.setCustomValidity('Хеш-тег должен начинаться с символа # (решетка)');
    }
  }
  if(!isEveryHashtagMoreZeroSymbols){
    inputForHashtag.setCustomValidity('Минимальная длина одного хэш-тега 1 символов, не включая решётку');
  }
  if  (arrayOfHashtags.length > 5){
    inputForHashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
  }
  if (hasStringDuplicates) {
    inputForHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
  }
  if (hasSpaceBeforeHash){
    inputForHashtag.setCustomValidity('Хэш-теги разделяются пробелами');
  }
  if(isEveryHashtagLessTwentySymbols){
    inputForHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  }
  if(isEveryHashtagHasText){
    inputForHashtag.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
  }
  if(!isEveryHashtagValid){
    inputForHashtag.setCustomValidity('Хэш-тег не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
  }
  inputForHashtag.reportValidity();
});
inputForHashtag.addEventListener('change', handleInputForHashtagChange);
const MAX_LENGTH_COMMENT = 140;
userComments.addEventListener('input', () => {
  const valueLength = userComments.value.length;
  if(valueLength >= MAX_LENGTH_COMMENT){
    userComments.setCustomValidity('Комментарий не может превышать 140 символов');
  } else{
    userComments.setCustomValidity(`Еще максимум ${  MAX_LENGTH_COMMENT - valueLength  } символов`);
  }
  userComments.reportValidity();
});
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlValue = document.querySelector('.scale__control--value');
const MAX_SCALE_VALUE = 100;
const STEP_SCALE_VALUE = 25;
const MIN_SCALE_VALUE = 25;
scaleControlSmaller.addEventListener('click',()=>{
  const value = scaleControlValue.value;
  const length = value.length-1;
  const valueArr = value.split('').splice(0,length);
  const number = Number(valueArr.join(''));
  const currentValue = number - STEP_SCALE_VALUE;
  if(currentValue < MIN_SCALE_VALUE){
    return;
  }
  scaleControlValue.value = `${currentValue}%`;
  scale(currentValue /100);
});
scaleControlBigger.addEventListener('click',()=>{
  const value = scaleControlValue.value;
  const length = value.length-1;
  const valueArr = value.split('').splice(0,length);
  const number = Number(valueArr.join(''));
  const currentValue = number + STEP_SCALE_VALUE;
  if(currentValue > MAX_SCALE_VALUE){
    return;
  }
  scaleControlValue.value = `${currentValue}%`;
  scale(currentValue /100);
});
function scale(value){
  imgUploadPreview.style.transform=(`scale(${value})`);
}

