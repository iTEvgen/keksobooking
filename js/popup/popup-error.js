const body = document.body;

const errorContent = body.querySelector('#error').content.querySelector('.error');
const popupTemplate = errorContent.cloneNode(true);

body.appendChild(popupTemplate);

