describe.skip("Admin pages", () => {
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
    cy.get('[type="password"]').type("password0");
    cy.get('[type="submit"]').click();

    cy.get("h1").should("have.text", "Psychologues");
    cy.get("h2").should("have.text", "Nombre de psychologues");
    cy.get(".fr-text--lead")
      .invoke("text")
      .then(parseInt)
      .then((number) => {
        expect(number).to.be.lessThan(200);
        expect(number).to.be.greaterThan(130);
      });

    cy.get('[title="Déconnexion"]').click();
    cy.url().should(
      "include",
      "/administration-annuaire/connexion?callbackurl=/administration-annuaire"
    );
    cy.get("h1").should("have.text", "Connexion");
  });

  it("Admin user", () => {
    cy.visit(
      "/administration-annuaire/connexion?callbackurl=/administration-annuaire"
    );

    cy.get('[type="email"]').type("admin@test.fr");
    cy.get('[type="password"]').type("admin123");
    cy.get('[type="submit"]').click();

    cy.get("h1").should("have.text", "Admin");
    cy.get("h2").should("have.text", "Nombre de psychologues");
    cy.get(".fr-text--lead").should("have.text", "1000");

    cy.get("input").type("1234567890");
    cy.get('[type="submit"]').click();

    cy.get("input").clear();
    cy.get("input").type("1");
    cy.get('[type="submit"]').click();
    cy.get("h1").should("have.text", "Modifier le psychologue");
  });
});
