const body = document.body;

const successContent = body.querySelector('#success').content.querySelector('.success');
const popupTemplate = successContent.cloneNode(true);

body.appendChild(popupTemplate);

