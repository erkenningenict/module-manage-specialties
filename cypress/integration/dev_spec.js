describe('Dev', () => {
  beforeEach(() => {
    cy.visit('/manage-specialty/23369');
    cy
      .location()
      .should((location) =>
        expect(location.pathname).to.eq('/manage-specialty/23369'),
      );
    cy.get('[data-test="saveButton"]').as('saveButton');
  });

  it('should work', () => {
    cy.server();
    cy.fixture('save2').as('saveJson');
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

    cy
      .route(
        'PUT',
        new RegExp(Cypress.env('apiUrl') + '/UpdateVak'),
        '@saveJson',
      )
      .as('updateVak');

    cy
      .get('#ui-tabpanel-1-label')
      .click()
      .should('have.attr', 'aria-selected');

    cy
      .get('[controlname="geintegreerdeGewasbescherming"] textarea')
      .clear()
      .type('Test gg1');

    cy
      .get('[controlname="preventieveMaatregelen"] textarea')
      .clear()
      .type('Test prev1');

    cy.get('@saveButton').click();

    // get the route
    cy.wait('@updateVak').then((xhr) => {
      console.log('!DH! xhr ', xhr.requestBody);
      expect(xhr.requestBody.AanbodCode).to.eq('23369');
      const expectedGG =
        '{"GeintegreerdeGewasbescherming":[{"text":"GG.","date":"2015-10-29T12:31:12.840Z","by":"Even, S."},{"text":"Test gg1","date":"2018';
      const expectedPrev = 'text":"Test prev1"';
      expect(xhr.requestBody.GeintegreerdeGewasbeschermingData).to.contains(
        expectedGG,
      );
      expect(xhr.requestBody.GeintegreerdeGewasbeschermingData).to.contains(
        expectedPrev,
      );
    });
  });
});
