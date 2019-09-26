describe('Dev', () => {
  beforeEach(() => {
    cy
      .visit('#/manage-specialty/0')
      .location()
      .should((location) => {
        console.log('#DH# loc', location);
        expect(location.hash).to.eq('#/manage-specialty/0');
      });
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
      .get('[data-test="aanbieder"] label.ui-inputtext')
      .click()
      .get('[data-test="aanbieder"] input.ui-dropdown-filter.ui-inputtext')
      .type('Agrodis{downarrow}{enter}')

      .typeInTextArea('titel')

      // Check vaardigheden
      .get('[data-test="vaardigheidid2174"]')
      .check()
      .get('[data-test="vaardigheidid2145"]')
      .check()
      .get('[data-test="vaardigheidid2175"]')
      .check()
      .get('[data-test="vaardigheidid2130"]')
      .check()
      .get('[data-test="vaardigheidid2167"]')
      .check()
      .get('[data-test="vaardigheidid2128"]')
      .check()

      // Check akkerbouw
      .get('[data-test="kennisgebiedAkkerbouw"]')
      .check()

      // Navigate to Wat tab
      .get('#ui-tabpanel-1-label')
      .click()
      .should('have.attr', 'aria-selected')

      .typeInTextArea('doelstelling')
      .typeInTextArea('doelstellingS')
      .typeInTextArea('doelstellingM')
      .typeInTextArea('doelstellingA')
      .typeInTextArea('doelstellingR')
      .typeInTextArea('doelstellingT')
      .typeInTextArea('inhoud')
      .typeInTextArea('geintegreerdeGewasbescherming')
      .typeInTextArea('preventieveMaatregelen')
      // .typeInTextArea('teelttechnischeMaatregelen')
      .typeInTextArea('waarschuwingEnAdviesSystemen')
      // .typeInTextArea('nietChemischeMogelijkheden')
      .typeInTextArea('chemischeGewasbescherming')
      .typeInTextArea('emissieBeperking')
      .typeInTextArea('actualiteiten')
      .typeInTextArea('individueleRelevantie')

      // Navigate to Hoe tab
      .get('#ui-tabpanel-2-label')
      .click()
      .should('have.attr', 'aria-selected')

      .typeInTextArea('werkvorm')
      .typeInTextArea('docenten')
      .typeInTextArea('promotietekst')
      .typeInTextArea('evaluatieWijze')

      // Navigate to Overige tab
      .get('#ui-tabpanel-3-label')
      .click()
      .should('have.attr', 'aria-selected')

      .typeInTextArea('materiaal')
      // kostenPerDeelname
      .get('[data-test="kostenPerDeelname"]')
      .clear()
      .type('12,50')
      // groepsgrootte
      .get('[data-test="groepsgrootte"]')
      .clear()
      .type('50')
      // aantalSessies
      .get('[data-test="aantalSessies"]')
      .clear()
      .type('1')

      // tijdsduur
      .get('[data-test="tijdsduur"]')
      .clear()
      .type('3,5')

      .typeInTextArea('website');

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
