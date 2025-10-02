import { setupPopupCloseHandler } from '../util.js';

const body = document.body;

const showErrorPopup = () => {
  const errorContent = body.querySelector('#error').content.querySelector('.error');
  const popupTemplate = errorContent.cloneNode(true);

  body.appendChild(popupTemplate);

  const closePopup = () => {
    popupTemplate.remove();
    cleanupHandlers();
  };

  const cleanupHandlers = setupPopupCloseHandler(popupTemplate, closePopup);
};

export { showErrorPopup };
