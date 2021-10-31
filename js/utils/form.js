import {pictureContainer, clearPictureContainer} from './pictures.js';
import {isEscapeKey, isEnterKey} from './utils.js';
const uploadFileOpen = document.querySelector('#upload-file');
const formEdit = document.querySelector('.img-upload__overlay');
const bodyAll = document.querySelector('body');
const closeButton = document.querySelector('#upload-cancel');
//const usersHashtags = document.querySelector('.text__hashtags');
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
const regExpFirstSymbol = /^#/;
const regExpOneHash = /#\s/;
const regExpSpaceBeforeHashtag = /\S#/;
inputForHashtag.addEventListener('input', () => {
  const errors = [];
  const inputValue = inputForHashtag.value;
  const arrayOfHashtags = inputForHashtag.value.trim().toLowerCase().split(' ').filter((item) => item !== '');
  const hasStringDuplicates =  (new Set(arrayOfHashtags)).size !== arrayOfHashtags.length;
  const hasSpaceBeforeHash = regExpSpaceBeforeHashtag.test(inputValue);
  const isEveryHashtagStartsHash = arrayOfHashtags.every((hashtag) => regExpFirstSymbol.test(hashtag));
  const isEveryHashtagLessTwentySymbols = arrayOfHashtags.every((hashtag) => hashtag.length > 20);
  const isEveryHashtagHasText = arrayOfHashtags.every((hashtag) => regExpOneHash.test(hashtag));
  const isEveryHashtagValid = arrayOfHashtags.every((hashtag) => regExpHashtag.test(hashtag.replace('#', '')) || hashtag === '#');
  if  (arrayOfHashtags.length > 5){
    errors.push('\n- Нельзя указать больше пяти хэш-тегов');
  }
  if (hasStringDuplicates) {
    errors.push('\n- Один и тот же хэш-тег не может быть использован дважды');
  }
  if (hasSpaceBeforeHash){
    errors.push('\n- Хэш-теги разделяются пробелами');
  }
  if(!isEveryHashtagStartsHash){
    errors.push('\n- Хеш-тег должен начинаться с символа # (решетка)');
  }
  if(isEveryHashtagLessTwentySymbols){
    errors.push('\n- Максимальная длина одного хэш-тега 20 символов, включая решётку');
  }
  if(isEveryHashtagHasText){
    errors.push('\n- Хеш-тег не может состоять только из одной решётки');
  }
  if(!isEveryHashtagValid){
    errors.push('\n- Хэш-тег не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
  }
  inputForHashtag.setCustomValidity(errors.toString());
  inputForHashtag.reportValidity();
});
const MAX_LENGTH_COMMENT = 140;

userComments.addEventListener('input', () => {
  const valueLength = userComments.value.length;
  if(valueLength >= MAX_LENGTH_COMMENT){
    userComments.setCustomValidity('Комментарий не может превышать 140 символов');
  } else{
    userComments.setCustomValidity(`Еще${  MAX_LENGTH_COMMENT - valueLength  }символов`);
  }
  userComments.reportValidity();
});
