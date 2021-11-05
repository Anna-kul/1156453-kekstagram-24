const getRandomPositiveInteger = (from, to) => {
  const min = Math.floor(Math.min(from, to));
  const max = Math.floor(Math.max(from, to));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const getRandomSet = (amount) => {
  const items = [...Array(amount)].map((it, index) => index + 1);
  items.sort(() => Math.random() - 0,5);
  return () => items;
};

const getItem = getRandomSet(25);
const isEscapeKey = (evt) => evt.key === 'Escape';
const isEnterKey = (evt) => evt.key === 'Enter';

const TIMEOUT_DELAY = 500;

const debounce = (callback, timeoutDelay = TIMEOUT_DELAY) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomPositiveInteger, getItem, isEscapeKey, isEnterKey, debounce};
