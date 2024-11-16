describe('implicit and explicit',function(){
 
    it('Implicit',function(){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        cy.url().should('include','orangehrmlive')  // check the text included in url
        .and("eq",'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') //check the expected url
        cy.get('.orangehrm-login-logo')  // check the web logo
        .should('be.visible')
        cy.xpath('//*[@id="app"]/div[1]/div/div[2]/img').should('be.visible')
       .and('be.exist')
        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title') // check the page title
        .should('be.visible')
        .and('contain','Login')
        .and('not.contain','Rigester')  
        .and('be.exist')  


        cy.get(".oxd-text.oxd-text--p")   // check the data content for input data
        .should('contain','Username : Admin')
        .and('contain','Password : admin123')
        .and('not.contain','Username : orange')
        .and('not.contain','Password : orange123')
        .and('be.visible')
        .and('be.exist')


        cy.get('.oxd-label')                  // get two input field heading from one element
        .should('be.visible')
        .and('have.text','UsernamePassword')
        .and('be.exist')


        cy.get('.oxd-icon.bi-person.oxd-input-group__label-icon')  // check User icon from attribute
        .should('be.visible')
        .and('have.class','oxd-icon bi-person oxd-input-group__label-icon')


        cy.get("input[placeholder='Username']")  // check the input name field
        .should('be.visible')
        .and('be.enabled')
        .and('have.text','')
        .type('Admin')
        .should('have.value','Admin')
        .and('be.visible')
        .and('be.exist')


        cy.get('.oxd-icon.bi-key.oxd-input-group__label-icon')    // check password icon from attribute
        .should('be.visible')
        .and('have.class','oxd-icon bi-key oxd-input-group__label-icon')


        cy.get("input[placeholder='Password']")  // check the input password field
        .should('be.visible')
        .and('be.enabled')
        .and('have.text','')
        .type('admin123')
        .should('have.value','admin123')
        .and('be.visible')
        .and('be.exist')


        cy.get(".oxd-form-actions.orangehrm-login-action")
        .should('be.visible')
        .and('be.exist')
        .and('have.text',' Login ')
        .click()
       


    })
    it('Explicit',function(){
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")


        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title')  // check the title text is equal to expected
        .should(Title =>{
            expect(Title.text()).to.be.equal('Login')  
        })


        cy.get('.oxd-text.oxd-text--h5.orangehrm-login-title')  // check the title text length is expected
        .should(Textlength =>{
            expect(Textlength.text()).to.have.lengthOf(5)
        })
       
        cy.get("input[placeholder='Username']")  
        .type('Admin')
        cy.get("input[placeholder='Password']")  
        .type('admin123')
        cy.get(".oxd-form-actions.orangehrm-login-action")
        .click()


        cy.get("div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']")  // check the field doesn't have any text name it is empty
        .should(empty1 =>{
            expect(empty1.text()).be.empty
        })
        cy.get(".oxd-select-text-input")       // check the field have a text name so it can't be empty
        .should(nonempty=>{
        expect(nonempty.text()).not.be.empty    
        })
    })
})
