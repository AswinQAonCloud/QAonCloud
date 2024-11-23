Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
require('cypress-xpath');


describe('Script for week 1 topics', () => {

  before(() => {
    cy.log("Week 1 Test Script Runner")
  })

  beforeEach(() => {
    cy.visit('https://demo.automationtesting.in/Index.html')
    cy.contains('Skip Sign In').click() // intreact with textt // move to registration page
  })
  
  after(() => {
    cy.log("Week 1 Test Script end")
  })  

  afterEach(() => {
    cy.go('back'); // back to home page
  })

 
  it('Input box and its validation', () => {

    // cy.visit("https://demo.automationtesting.in/Register.html")
    cy.url().should('include', 'automationtesting')  // check the text included in url
      .and("eq", 'https://demo.automationtesting.in/Register.html') //check the expected url
    cy.get("img[alt='image not displaying']")  // check the web logo
      .should('be.visible').and('be.exist')
    cy.get("input[placeholder='First Name']").type('cypress').should('have.value', 'cypress').and('be.visible')
    cy.get("input[placeholder='Last Name']").type('training').should('have.value', 'training').and('be.visible')
    cy.get('#submitbtn').click()
    cy.get("input[type='email']").then(($input) => {
      // Check the validationMessage for required email field
      expect($input[0].validationMessage).to.eq('Please fill out this field.')
    });

    cy.get("input[type='email']").click()
    cy.get("input[type='email']").then(($inputEmail) => {
      // Check the validationMessage for required email field
      expect($inputEmail[0].validationMessage).to.eq('Please fill out this field.')
    });
  });

  it('Radio button and checkbox', () => {

    //  cy.visit("https://demo.automationtesting.in/Register.html")
    // Radio button, check box and dropdown
    cy.get("input[value='Male']").click().should('be.checked');
    cy.get("input[value='FeMale']").should('not.be.checked');
    cy.get("input[value='FeMale']").click().should('be.checked');
    cy.get("input[value='Male']").should('not.be.checked');

    // fund element by xpath, here we used index value

    cy.xpath("(//div[@class='col-md-4 col-xs-4 col-sm-4'])[6]//input")
      .should('have.length', 3) // Validate there are 3 checkboxes
      .each((checkbox, index) => {
        // Single select: Check one checkbox
        if (index === 0) {
          cy.wrap(checkbox).check().should('be.checked');
        }
      });
    // Multi-select: Check all checkboxes
    cy.xpath("(//div[@class='col-md-4 col-xs-4 col-sm-4'])[6]//input").each((checkbox) => {
      cy.wrap(checkbox).check().should('be.checked');
    });
  });

  // dropdown and search option within dropdown
  it('Dropdown', () => {

    // cy.visit("https://demo.automationtesting.in/Register.html")
    cy.get('#Skills > option').should('have.length', 78) // Validate there are 78 options
    cy.get('#Skills').select('Windows').should('have.value', 'Windows').and('be.visible')
    cy.get('[role="combobox"]').click();
    // Type into the search input to filter results
    const countryToSearch = 'India';
    cy.get('.select2-search__field').type(countryToSearch);
    // Wait for the dropdown to filter and display matching results
    cy.get('.select2-results__option').should('contain', countryToSearch);
    // Select the country from the results
    cy.get('.select2-results__option').contains(countryToSearch).click();
    // Validate the selected country
    cy.get('[role="combobox"]').should('contain', countryToSearch);
  });

});
