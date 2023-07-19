describe("FAQ", () => {
  it("should display FAQ with default tab", () => {
    cy.visit("/faq");
    cy.get("h1").should(
      "have.text",
      "Information sur le dispositif Mon soutien psy"
    );

    cy.get("h2").should("have.text", "PrésentationPatientPsychologueMédecin");
    cy.get('[role="tab"][aria-selected="true"]').should(
      "have.text",
      "Présentation"
    );
  });
  it("should open tab according to query param", () => {
    cy.visit("/faq?tab=psychologue");

    cy.get('[role="tab"][aria-selected="true"]').should(
      "have.text",
      "Psychologue"
    );
  });
});
