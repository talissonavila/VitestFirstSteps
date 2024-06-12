describe("testa a página de detalhes do pokemon", () => {
    it("deve renderizar um pokemon na nossa tela", () => {
        cy.visit("/pokemon-detail/2");

        cy.intercept("GET", "http://localhost:3000/pokemon/2", {
            fixture: "pokemon-detail.json"
        });

        cy.contains("Rotom");
        cy.contains("Electric");
        cy.get("img").should(
            "have.attr",
            "src",
            "https://assets.pokemon.com/assets/cms2/img/pokedex/full/479.png"
        );

        cy.get("div").find("div").should(($div) => {
            expect($div).to.have.length(2);

            const className = $div[0].className;
            expect(className).to.match(/container/);
        }).then(($div) => {
            expect($div).to.have.css("display", "flex");
        });
    });
});