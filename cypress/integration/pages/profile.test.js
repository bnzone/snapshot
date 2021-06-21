/* eslint-disable no-undef */
describe('Profile', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.config().baseUrl}/p/silvester`);
  });

  it('goes to a profile page and validates the UI', () => {
    cy.get('body').within(() => {
      cy.get('div').should('contain.text', 'silvester');
      cy.get('div').should('contain.text', 'Silvester Stalone');
      cy.get('div').should('contain.text', '4 photos');
      cy.get('div').should('contain.text', '2 followers');
      cy.get('div').should('contain.text', '0 following');
    });
  });
});
