describe('Testa a página de login', () => {
  it('quando clicar em login deve ir para a página de dashboard', () => {
    cy.visit('/');

    cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json"
    });

    cy.get("div").find("button").should(($button) => {
      expect($button).to.have.length(1);
      $button[0].click();
    })
    .then(() => {
      cy.contains('Dashboard');
    });
  });

  it("quando clicar em login deve ir para a página de dashboard e ter um pikachu", () => {
     cy.visit('/');

     cy.intercept("GET", "http://localhost:3000/pokemon", {
      fixture: "pokemons.json"
     });

     cy.contains("login").click();
     cy.contains("Dashboard");
     cy.contains("Pikachu");
  });

  it("quando clicar em sign up deve ir para a página de cadastro", () => {
    cy.visit("/");

    cy.contains("Não possui cadastro? Clique aqui!").click();
    cy.contains("Cadastre-se")
  });

  it("o botão deve ter 10px de margin top", () => {
    cy.visit("/sign-up");

    cy.get("div").find("button").should("have.css", "marginTop").and("match", /10px/);
});
})