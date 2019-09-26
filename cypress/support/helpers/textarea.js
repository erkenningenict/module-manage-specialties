import { getApp } from '../utils';

Cypress.Commands.add('typeInTextArea', (controlName, value) => {
  const val = value ? value : controlName;
  getApp()
    .find(`[data-test="${controlName}"]`)
    .clear()
    .type(val);
});
