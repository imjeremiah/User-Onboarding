describe("User Onboarding App", () => {
   
    beforeEach(() => {
      cy.visit("http://localhost:3000");
});
 
const textInput = () => cy.get('input[name="name"]');
const emailInput = () => cy.get('input[name="email"]');
const passwordInput = () => cy.get('input[name="password"]');
const termsCheckbox = () => cy.get('input[name="terms"]');
const submitButton = () => cy.get("#button");

it("Sanity Check.", () => {
    expect(1 + 2).to.equal(3);
    expect(2 + 2).not.to.equal(5);
});

it("Grab, Clear, and Input & then Assertions.", () => {

    textInput()
    .should("have.value", "")
    .type("Michael Scarn")
    .should("have.value", "Michael Scarn");

    emailInput()
    .should("have.value", "")
    .type("threatLevel@midnight.com")
    .should("have.value", "threatLevel@midnight.com");

    passwordInput()
    .should("have.value", "")
    .type("password123")
    .should("have.value", "password123");

    termsCheckbox()
    .should('be.visible')
    .check({ force: true})
    .should('be.checked')
    
});

it("Check to see if a user can submit the form data.", () => {

    submitButton().should("be.disabled");

    textInput().clear();
    textInput().type("Michael Scarn");

    emailInput().clear();
    emailInput().type("threatLevel@midnight.com");

    passwordInput().clear();
    passwordInput().type("password123");

    termsCheckbox().uncheck({ force: true})
    termsCheckbox().check({ force: true})

    submitButton().should("not.be.disabled");
    submitButton().click();

});

it("Check for form validation if an input is left empty.", () => {  

    submitButton().should("be.disabled");

    textInput().type("Michael Scarn");
    textInput().clear();
    
    emailInput().type("threatLevel@midnight.com");
    emailInput().clear();
    
    passwordInput().type("password123");
    passwordInput().clear();
    
    termsCheckbox().check({ force: true})
    termsCheckbox().uncheck({ force: true})
    
    submitButton().should("be.disabled");

    });

});