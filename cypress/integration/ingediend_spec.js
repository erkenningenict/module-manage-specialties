describe('Dev', () => {
  beforeEach(() => {
    cy.visit('/manage-specialty/23368');
    cy
      .location()
      .should((location) =>
        expect(location.pathname).to.eq('/manage-specialty/23368'),
      );
  });

  it('should work', () => {
    // cy.server();
    // cy.fixture('save2').as('saveJson');
    // cy.fixture('get23369').as('get23369Json');
    // cy
    //   .route(
    //     'GET',
    //     new RegExp(
    //       Cypress.env('apiUrl') + "/GetVak\\?vakID=23369\\&forPrinting=false",
    //     ),
    //     '@get23369Json',
    //   )
    //   .as('getVak');

    // cy
    //   .route(
    //     'PUT',
    //     new RegExp(Cypress.env('apiUrl') + '/UpdateVak'),
    //     '@saveJson',
    //   )
    //   .as('updateVak');

    // .get('#ui-tabpanel-1-label')
    // .click()
    // .should('have.attr', 'aria-selected')

    cy
      // Should have a invalid control
      // TODO Renable again
      // .get('[data-test="invalidControls"]')
      // .should('contain', '32 / 33')
      // Save button must be disabled
      .get('[data-test="saveButton"]')
      .should('be.disabled')

      // Navigate to Beoordeling tab
      .get('#ui-tabpanel-4-label')
      .click()
      .should('have.attr', 'aria-selected')

      // Select beoordelaar Rood

      //   .get('[data-test="beoordelaar"] label.ui-inputtext')
      //   .click()
      // .get('[data-test="beoordelaar"] .ui-dropdown-items > :nth-child(3)')
      //   .click()
      .get('[data-test="beoordelaar"]')
      .select('311761')

      .get('[data-test="saveButton"]')
      .should('not.be.disabled');
    // .type('{downarrow}{downarrow}{enter}')

    // .get('button[data-test="saveButton"]')
    // .click();

    // get the route
    // cy.wait('@updateVak').then((xhr) => {
    //   console.log('!DH! xhr ', xhr.requestBody);
    // expect(xhr.requestBody.AanbodCode).to.eq('23369');
    // const expectedGG =
    //   '{"GeintegreerdeGewasbescherming":[{"text":"GG.","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Test gg1","date":"2018';
    // const expectedPrev = 'text":"Test prev1"';
    // expect(xhr.requestBody.GeintegreerdeGewasbeschermingData).to.contains(
    //   expectedGG,
    // );
    // expect(xhr.requestBody.GeintegreerdeGewasbeschermingData).to.contains(
    //   expectedPrev,
    // );
    // });
  });
});
