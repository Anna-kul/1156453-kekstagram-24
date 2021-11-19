import {isEscapeKey} from './utils/utils.js';

const notificationPopupTemplate = document.querySelector('template#notification-popup');

let currentNotificationPopup = null;

if (notificationPopupTemplate === null) {
  throw new Error();
}

const notificationPopupElementToClone = notificationPopupTemplate.content.querySelector('.notification-popup');

if (notificationPopupElementToClone === null) {
  throw new Error();
}

/*
{
    type: 'error',
    text: 'Ошибка загрузки файла',
    button: {
      text: 'Загрузить другой файл',
      onClick: openLoadModal,
    },
  }
  */

export const hideNotificationPopup = () => {
  currentNotificationPopup.remove();

  currentNotificationPopup = null;

  window.removeEventListener('keydown', onWindowEscKeyDown);
};

function onWindowEscKeyDown(evt) {
  if (!isEscapeKey(evt)) {
    return;
  }
  hideNotificationPopup();
}

const createNotificationPopup = ({type, text, button}) => {
  const notificationPopup = notificationPopupElementToClone.cloneNode(true);
  const title = notificationPopup.querySelector('.notification-popup__title');
  const buttonEl = notificationPopup.querySelector('.notification-popup__button');

  notificationPopup.classList.add(`notification-popup_${type}`);
  title.textContent = text;

  buttonEl.textContent = button.text || 'Окей';

  notificationPopup.addEventListener('click', (evt) => {
    if (evt.target !== notificationPopup) {
      return;
    }

    hideNotificationPopup();
  });

  buttonEl.addEventListener('click', (evt) => {
    evt.stopPropagation();
    if (button.onClick) {
      button.onClick(evt);
    }

    hideNotificationPopup();
  });

  return notificationPopup;
};

export const showNotificationPopup = (config) => {
  if (currentNotificationPopup !== null) {
    hideNotificationPopup();
  }

  const notificationPopup = createNotificationPopup(config);

  currentNotificationPopup = document.body.appendChild(notificationPopup);
  window.addEventListener('keydown', onWindowEscKeyDown);
};
