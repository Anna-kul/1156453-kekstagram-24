import {createPhoto} from './utils/data.js';
import {renderSimilarPhoto} from './picture/picture.js';
import './form/form.js';
import './utils/slider.js';

const SIMILAR_PHOTO_COUNT = 25;

fetch ('https://24.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photo) => renderSimilarPhoto(photo.slice(0, SIMILAR_PHOTO_COUNT)));
