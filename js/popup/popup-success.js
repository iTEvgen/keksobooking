import { setupPopupCloseHandler } from '../util.js';

const body = document.body;

const showSuccessPopup = () => {
  const successContent = body.querySelector('#success').content.querySelector('.success');
  const popupTemplate = successContent.cloneNode(true);

  body.appendChild(popupTemplate);

  const cleanupHandlers = setupPopupCloseHandler(popupTemplate, () => {
    popupTemplate.remove();
    cleanupHandlers();
  }, true);
};

export { showSuccessPopup };

