describe("Home & landing pages", () => {
  it("Home should be visible", () => {
    cy.visit("/");

    cy.get("h1").should(
      "have.text",
      "Vous rencontrez une situation difficile ?Avec Mon soutien psy, bénéficiez de 8 séances par an chez un ou une psychologue"
    );

    cy.get("h2").first().should("have.text", "Pourquoi consulter ?");
  });

  it("robots.txt should be visible", () => {
    cy.visit("/");
    cy.request("/robots.txt")
      .its("body")
      .should("include", "User-agent: *\nAllow: /");
  });
});
