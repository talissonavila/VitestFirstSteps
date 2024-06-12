describe("testa a página de sign up", () => {
    it("quando clicar em já possui cadastro, deve ir para a tela de login", () => {
        cy.visit("/sign-up");

        cy.contains("Já possui cadastro? Clique aqui.").click();
        cy.contains("login");
    });

    it("o botão deve ter 10px de margin top", () => {
        cy.visit("/sign-up");

        cy.get("div").find("button").should("have.css", "marginTop").and("match", /10px/);
    });
});