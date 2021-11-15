import {debounce} from './utils/debounce.js';

let currentFilter = 'default';

const ClassName = {
  filterButtonActive: 'img-filters__button--active',
};
const changeCurrentFilter = debounce((value) => {
  currentFilter = value;

  document.dispatchEvent(new CustomEvent('filter/change', {detail: {currentFilter: value}}));
});

const handleClick = (evt) => {
  if (!evt.target.id.startsWith('filter')) {
    return;
  }
  const filterButton = evt.target;
  const filterForm = filterButton.parentElement;
  Array.from(filterForm).forEach((currentFilterButton) => {
    currentFilterButton.classList.remove(ClassName.filterButtonActive);
  });
  filterButton.classList.add(ClassName.filterButtonActive);
  const filter = filterButton.id.slice(7);
  if (filter === currentFilter) {
    return;
  }
  changeCurrentFilter(filter);
};

document.addEventListener('click', handleClick);
