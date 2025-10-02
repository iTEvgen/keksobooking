import { setupPopupCloseHandler } from '../util.js';

const body = document.body;

const showErrorPopup = () => {
  const errorContent = body.querySelector('#error').content.querySelector('.error');
  const popupTemplate = errorContent.cloneNode(true);

  body.appendChild(popupTemplate);

  const cleanupHandlers = setupPopupCloseHandler(popupTemplate, () => {
    popupTemplate.remove();
    cleanupHandlers();
  }, false);

  const retryButton = popupTemplate.querySelector('.error__button');
  retryButton.addEventListener('click', () => {
    popupTemplate.remove();
    cleanupHandlers();
  });
};

export { showErrorPopup };
