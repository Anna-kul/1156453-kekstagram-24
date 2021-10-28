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
    closeLoadModal();
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

const hashtag = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
inputForHashtag.addEventListener('input', () => {
  const arrayOfStrings = inputForHashtag.value.trim().split(' ');
  const checkArray = arrayOfStrings.every((b) => hashtag.test(b));
  for (let i = 0; i < arrayOfStrings.length; i++){
    if(!checkArray){
      inputForHashtag.setCustomValidity('Хэш-тег должен начинаться с символа # и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;');
    }
  }

  //console.log(checkArray);
//   if  (arrayOfStrings.length > 5){
//     usersHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
//   }
//   // eslint-disable-next-line no-unused-vars
//   function hasDuplicates(array){
//     return (new Set(array)).size !== arrayOfStrings.length;
//   }
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
