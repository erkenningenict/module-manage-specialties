export const getApp = () => cy.get('body');

export const getStore = () => cy.window().its('store');
// For example
Cypress.Commands.add('getStoreItem', (property) => {
  return cy.window().its(`store.${property}`);
});

Cypress.Commands.add('getNonWhiteSpaceValue', (selector, expectedValue) => {
  return getApp()
    .find(`${selector}`)
    .should(($div) => {
      // access the native DOM element
      expect($div.get(0).innerText).to.eq(expectedValue);
    });
});
