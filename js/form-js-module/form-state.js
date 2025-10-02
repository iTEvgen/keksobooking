import { mapFilters, adFormUsers, inputs } from './form-elements.js';

// Блокировка и разблокировка формы
const formControls = {
  sections: [
    { element: mapFilters, baseClass: 'map__filters' },
    { element: adFormUsers, baseClass: 'ad-form' }
  ],
  inputs: inputs
};

const setFormState = (isDisabled) => {
  formControls.sections.forEach(({ element, baseClass }) => {
    if (element) {
      const method = isDisabled ? 'add' : 'remove';
      element.classList[method](`${baseClass}--disabled`);
    }
  });
  formControls.inputs.forEach((input) => {
    input.disabled = isDisabled;
  });
};

const disableForm = () => setFormState(true);
const enableForm = () => setFormState(false);

export { disableForm, enableForm };
