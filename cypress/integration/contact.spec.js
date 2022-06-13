describe("Contact page", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/contact").as("contact");

    cy.visit("/contact");
  });

  it("should send a mail with reason for psychologist", () => {
    cy.get('[data-test-id="user-type-select"] > option')
      .eq(1)
      .then((element) =>
        cy
          .get('[data-test-id="user-type-select"]')
          .select(element.val())
      );
    cy.get('[data-test-id="last-name-input"]')
      .type('Doe');
    cy.get('[data-test-id="first-name-input"]')
      .type('John');
    cy.get('[data-test-id="email-input"]')
      .type('john.doe@msp.fr');
    cy.get('[data-test-id="department-select"]')
      .type('95');
    cy.get('[data-test-id="reason-select"] > select > option')
      .eq(2)
      .then((element) =>
        cy
          .get('[data-test-id="reason-select"] > select')
          .select(element.val())
      );
    cy.get('[data-test-id="message-input"]')
      .type('Is this working ?');

    cy.get('[data-test-id="alert"]').should('not.exist')

    cy.get('[data-test-id="submit-button"]')
      .click();

    cy.wait("@contact")

    cy.get('[data-test-id="alert"]').should('have.text', "Votre message a bien été transmis à nos équipes, nous vous répondrons dans les plus brefs délais.")
  });

  it("should send a mail without reason for others", () => {
    cy.get('[data-test-id="user-type-select"] > option')
      .eq(5)
      .then((element) =>
        cy
          .get('[data-test-id="user-type-select"]')
          .select(element.val())
      );
    cy.get('[data-test-id="last-name-input"]')
      .type('Doe');
    cy.get('[data-test-id="first-name-input"]')
      .type('John');
    cy.get('[data-test-id="email-input"]')
      .type('john.doe@msp.fr');
    cy.get('[data-test-id="department-select"]')
      .type('95');
    cy.get('[data-test-id="reason-select"]').should('not.exist')
    cy.get('[data-test-id="message-input"]')
      .type('Is this working ?');

    cy.get('[data-test-id="alert"]').should('not.exist')

    cy.get('[data-test-id="submit-button"]')
      .click();

    cy.wait("@contact")

    cy.get('[data-test-id="alert"]').should('have.text', "Votre message a bien été transmis à nos équipes, nous vous répondrons dans les plus brefs délais.")
  });

  it("should display public info", () => {
    cy.get('[data-test-id="public-info"]')
      .should('not.exist')

    cy.get('[data-test-id="user-type-select"] > option')
      .eq(3)
      .then((element) =>
        cy
          .get('[data-test-id="user-type-select"]')
          .select(element.val())
      );
    cy.get('[data-test-id="public-info"]')
      .should('exist')
  });

  it("should display psychologist info", () => {
    cy.get('[data-test-id="psychologist-info"]')
      .should('not.exist')

    cy.get('[data-test-id="user-type-select"] > option')
      .eq(2)
      .then((element) =>
        cy
          .get('[data-test-id="user-type-select"]')
          .select(element.val())
      );
    cy.get('[data-test-id="psychologist-info"]')
      .should('exist')
  });

  it("should display doctor info", () => {
    cy.get('[data-test-id="psychologist-info"]')
      .should('not.exist')

    cy.get('[data-test-id="user-type-select"] > option')
      .eq(4)
      .then((element) =>
        cy
          .get('[data-test-id="user-type-select"]')
          .select(element.val())
      );
    cy.get('[data-test-id="psychologist-info"]')
      .should('exist')
  });
});
