import { setupPopupCloseHandler } from '../util.js';

const body = document.body;

const showSuccessPopup = () => {
  const successContent = body.querySelector('#success').content.querySelector('.success');
  const popupTemplate = successContent.cloneNode(true);

  body.appendChild(popupTemplate);


  const closePopup = () => {
    popupTemplate.remove();
    cleanupHandlers();
  };

  const cleanupHandlers = setupPopupCloseHandler(popupTemplate, closePopup);
};

export { showSuccessPopup };

