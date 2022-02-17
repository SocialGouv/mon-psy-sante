describe("FAQ", () => {
  it("shoudl display FAQ", () => {
    cy.visit("/faq");
    cy.get("h1").should("have.text", "Information sur le dispositif MonPsy");

    cy.get("h2").should(
      "have.text",
      "Présentation du dispositif MonPsyPatientPsychologueMédecin"
    );
  });
});
