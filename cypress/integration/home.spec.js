describe("Home & landing pages", () => {
  it("Home should be visible", () => {
    cy.visit("/");

    cy.get("h1").should(
      "have.text",
      "MonPsy A partir d’avril 2022, l’accès à un accompagnement psychologique pour tous (dès 3 ans)"
    );

    cy.get("nav")
      .first()
      .should(
        "have.text",
        "AccueilJe suis angoissé(e) ou déprimé(e)Je suis psychologueJe suis médecinFoire aux questions"
      );

    cy.get("h2").first().should("have.text", "Je suis angoissé(e), déprimé(e)");
  });

  it("Patient page should be visible", () => {
    cy.visit("/");

    cy.get("h2 a").first().click();

    cy.url().should("include", "/patients");

    cy.get("h1").should("have.text", "Je suis angoissé(e) ou déprimé(e)");
    cy.get("h2").first().should("have.text", "Quel est le rôle du médecin ?");
  });

  it("robots.txt should be visible", () => {
    cy.visit("/");
    cy.request("/robots.txt")
      .its("body")
      .should("include", "User-agent: *\nAllow: /");
  });
});
