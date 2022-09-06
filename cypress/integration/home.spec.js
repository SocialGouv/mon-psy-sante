describe("Home & landing pages", () => {
  it("Home should be visible", () => {
    cy.visit("/");

    cy.get("h1").should(
      "have.text",
      "Vous rencontrez une situation difficile ?Avec MonPsy, bénéficiez de 8 séances par an chez un ou une psychologue"
    );

    cy.get("nav#navigation-main-nav")
      .first()
      .should(
        "have.text",
        "AccueilJe ne me sens pas bienJe suis psychologueJe suis médecinFoire aux questions"
      );

    cy.get("h2").first().should("have.text", "Je ne me sens pas bien");
  });

  it("robots.txt should be visible", () => {
    cy.visit("/");
    cy.request("/robots.txt")
      .its("body")
      .should("include", "User-agent: *\nAllow: /");
  });
});
