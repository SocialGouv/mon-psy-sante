describe("Admin pages", () => {
  it("Login", () => {
    cy.visit("/administration-annuaire");
    cy.url().should(
      "include",
      "/administration-annuaire/connexion?callbackurl=/administration-annuaire"
    );

    cy.get('[type="email"]').type("wronguie@test.com");
    cy.get('[type="password"]').type("wrong");
    cy.get('[type="submit"]').click();
    cy.url().should(
      "include",
      "/administration-annuaire/connexion?callbackurl=/administration-annuaire"
    );
    cy.get(".fr-error-text").should(
      "have.text",
      "Veuillez verifier votre email ou mot de passe."
    );

    cy.get('[type="email"]').type("0@test.fr");
    cy.get('[type="password"]').type("admin0");
    cy.get('[type="submit"]').click();

    cy.get(".fr-error-text").should(
      "have.text",
      "Veuillez verifier votre email ou mot de passe."
    );
    cy.get("h1").should("have.text", "Psychologues");
    cy.get("h2").should("have.text", "Nombre de psychologues");
    cy.get(".fr-text--lead").should("have.text", "159");

    cy.get('[title="Déconnexion"]').click();
    cy.url().should(
      "include",
      "/administration-annuaire/connexion?callbackurl=/administration-annuaire"
    );
    cy.get("h1").should("have.text", "Connexion");
  });
});
