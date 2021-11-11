export const validateInputForHashtag = (inputForHashtag) => {
  inputForHashtag.setCustomValidity('');

  const inputValue = inputForHashtag.value;

  if (inputValue.length === 0) {
    return;
  }

  const arrayOfHashtags = inputForHashtag.value.trim().toLowerCase().split(' ').filter((item) => item.length > 0);
  const hasStringDuplicates =  (new Set(arrayOfHashtags)).size !== arrayOfHashtags.length;
  const hasSpaceBeforeHash = /\S#/.test(inputValue);
  const arrayFromValue = inputValue.split(' ').filter((item) => item.length > 0);

  if (hasStringDuplicates) {
    inputForHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');

    return;
  }

  if (arrayOfHashtags.length > 5){
    inputForHashtag.setCustomValidity('Нельзя указать больше пяти хэш-тегов');

    return;
  }

  if (hasSpaceBeforeHash){
    inputForHashtag.setCustomValidity('Хэш-теги разделяются пробелами');

    return;
  }

  if(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/.test(inputValue)){
    inputForHashtag.setCustomValidity('Хештег не может содержать эмоджи');

    return;
  }

  for(let i = 0;  i < arrayFromValue.length; i++) {
    const word = arrayFromValue[i].split('');

    for(let j = 0; j < word.length; j++){
      if(word[0] !== '#'){
        inputForHashtag.setCustomValidity('Хеш-тег должен начинаться с символа # (решетка)');

        return;
      }

      if (
        word[j] === '@'
        || word[j] === '$'
        || word[j] === '%'
        || word[j] === '&'
        || word[j] === '.'
        || word[j] === ','
        || word[j] === '!'
        || word[j] === '?'
        || word[j] === ':'
        || word[j] === '*'
        || word[j] === '+'
        || word[j] === '-'
        || word[j] === '/'
      ) {
        inputForHashtag.setCustomValidity('Хэш-тег не может содержать спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.)');

        return;
      }
    }

    if(word.length < 2) {
      inputForHashtag.setCustomValidity('Хэш-тег не может состоять только из решётки');

      return;
    }

    if (word.length > 20){
      inputForHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');

      return;
    }
  }
};
