const getRandomPositiveInteger = (from, to) => {
  const min = Math.floor(Math.min(from, to));
  const max = Math.floor(Math.max(from, to));
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const getRandomSet = (amount) => {
  const items = [...Array(amount)].map((it, index) => index + 1);
  items.sort(() => Math.random() - 0,5);
  return () => items.pop();
};
const getItem = getRandomSet(25);
const getItemAvatar = getRandomSet(6);

export {getRandomPositiveInteger, getItem, getItemAvatar};
