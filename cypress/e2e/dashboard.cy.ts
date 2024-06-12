describe("testa a página de dashboard", () => {
    it("deve carregar uma lista com 10 pokemons", () => {
        cy.visit("/dashboard");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemons.json"
        });

        cy.contains("Pikachu");
        cy.contains("Rotom");
        cy.contains("Minun");
        cy.contains("Venusaur");
        cy.contains("Geodude");
        cy.contains("Mewtwo");
        cy.contains("Petilil");
        cy.contains("Dusknoir");
        cy.contains("Lycanroc");
    });

    it("quando clicar em um pokemon, deve abrir os detalhes desse pokemon em outra pagina", () => {
        cy.visit("/dashboard");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemons.json"
        });
        cy.intercept("GET", "http://localhost:3000/pokemon/2", {
            fixture: "pokemon-detail.json"
        });

        cy.contains("Rotom").click();

        cy.contains("Rotom");
        cy.contains("Electric");
        cy.contains("Voltar");
    });

    it("quando clicar em um pokemon, deve abrir os detalhes desse pokemon em outra pagina, depois clica em voltar e todos os 10 pokemons aparecem em dashboard.", () => {
        cy.visit("/dashboard");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemons.json"
        });
        cy.intercept("GET", "http://localhost:3000/pokemon/2", {
            fixture: "pokemon-detail.json"
        });

        cy.contains("Rotom").click();

        cy.contains("Rotom");
        cy.contains("Electric");

        cy.contains("Voltar").click();

        cy.contains("Pikachu");
        cy.contains("Rotom");
        cy.contains("Minun");
        cy.contains("Venusaur");
        cy.contains("Geodude");
        cy.contains("Mewtwo");
        cy.contains("Petilil");
        cy.contains("Dusknoir");
        cy.contains("Lycanroc");
    });

    it("deve ter um display grid dentro de dashboard", () => {
        cy.visit("/dashboard");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemons.json"
        });
        cy.get("div").find("ul").should("have.css", "display").and("match", /grid/);
    });

    it("devem ter 10 li's", () => {
        cy.visit("/dashboard");

        cy.intercept("GET", "http://localhost:3000/pokemon", {
            fixture: "pokemons.json"
        });

        cy.get("div").find("li").should(($li) => {
            expect($li).to.have.length(10);
            const pikachu = $li[0];
            const rotom = $li[1];

            expect(pikachu.textContent).to.contain("Pikachu");
            expect(rotom.textContent).to.contain("Rotom");
        });
    })
});