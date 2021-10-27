import {createPhoto} from './data.js';
const pictureContainer = document.querySelector('.pictures');
const picturesTitle = pictureContainer.querySelector('.pictures__title');
picturesTitle.classList.remove('visually-hidden');
pictureContainer.querySelector('.img-upload__title').classList.remove('visually-hidden');
const fotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarFotos = createPhoto;
const similarFotosFragment = document.createDocumentFragment();
similarFotos.forEach(({url, likes, comments}) =>{
  const fotoElement = fotoTemplate.cloneNode(true);
  fotoElement.querySelector('.picture__img').src = url;
  fotoElement.querySelector('.picture__likes').textContent = likes;
  fotoElement.querySelector('.picture__comments').textContent = comments;
  similarFotosFragment.appendChild(fotoElement);
});
pictureContainer.appendChild(similarFotosFragment);
const clearPictureContainer = () => {
  pictureContainer.innerHTML = '';
};
export{pictureContainer, clearPictureContainer};
