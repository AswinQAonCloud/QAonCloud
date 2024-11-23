Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  require('cypress-xpath');

describe('Handle Alerts ', () => {

    beforeEach(() => {
      // Navigate to the website
      cy.visit('https://demo.automationtesting.in/Alerts.html');
    });
  
    it('Handle JavaScript Alert', () => {
      // Click the "Alert with OK" link
      cy.contains('Alert with OK').click();
  
      // Click the button to trigger the alert
      cy.get('button[onclick="alertbox()"]').click();
  
      // Assert the alert message
      cy.on('window:alert', (alertText) => {
        expect(alertText).to.equal('I am an alert box!');
      });
    });
  
    it('Handle JavaScript Confirm (OK)', () => {
      // Click the "Alert with OK & Cancel" link
      cy.contains('Alert with OK & Cancel').click();
  
      // Click the button to trigger the confirm alert
      cy.get('button[onclick="confirmbox()"]').click();
  
      // Handle the confirmation alert (Click "OK")
      cy.on('window:confirm', (confirmText) => {
        expect(confirmText).to.equal('Press a Button !');
        return true; // Simulates clicking "OK"
      });
  
      // Verify that the action for OK is completed
      cy.xpath("//p[@id='demo']").should('have.text', 'You pressed Ok');
    });
  
    it('Handle JavaScript Confirm (Cancel)', () => {
      // Click the "Alert with OK & Cancel" link
      cy.contains('Alert with OK & Cancel').click();
  
      // Click the button to trigger the confirm alert
      cy.get('button[onclick="confirmbox()"]').click();
  
      // Handle the confirmation alert (Click "Cancel")
      cy.on('window:confirm', (confirmText) => {
        expect(confirmText).to.equal('Press a Button !');
        return false; // Simulates clicking "Cancel"
      });
  
      // Verify that the action for Cancel is completed
      cy.get('#demo').should('have.text', 'You Pressed Cancel');
    });
  
    it('Handle Prompt Alert (with input)', () => {
      // Click the "Alert with Textbox" link
      cy.contains('Alert with Textbox').click();
  
      // Stub the prompt alert
      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns('Aswin');
      });
  
      // Click the button to trigger the prompt
      cy.get('button[onclick="promptbox()"]').click();
  
      // Verify that the action for the input is completed
      cy.get('#demo1').should('have.text', 'Hello Aswin How are you today');
    });
  });
  