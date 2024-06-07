import { faker } from "@faker-js/faker";
import PokemonDetail from ".";
import { fetchPokemonDetail } from "../../services/PokemonService";
import { render, screen } from "@testing-library/react";
import * as reactRouterDom from "react-router-dom"

const mockFn = vi.fn(fetchPokemonDetail);
const mockFetchPokemonDetailFn = mockFn.mockImplementation(async () => {
    return {
        id: 1,
        image: faker.image.urlPlaceholder(),
        name: "Pikachu",
        type: "Eletric",
    };
});

describe("Testa o componente PokemonDetail", () => {
    vi.mock("react-router-dom", () => {
        return {
            useParams: () => ({
                id: 1,
            }),
            Link: vi.fn().mockImplementation((props) => props.children),
        };
    });

    test("Deve haver um Pikachu na página", async () => {
        render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn} />);

        const pikachu = await screen.findByText("Pikachu");
        expect(pikachu).toBeInTheDocument();
    });

    test("Deve haver um link com o nome 'Voltar'", async () => {
        render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn}/>);
        
        const link = await screen.findByText("Voltar");
        expect(link).toBeInTheDocument();
    });

    test("Deve validar quando não vier parâmetro na rota ", async () => {
        vi.spyOn(reactRouterDom, "useParams").mockImplementationOnce(() => ({id: "0"}));

        render(<PokemonDetail fetchPokemonDetail={mockFetchPokemonDetailFn}/>);

        const errorText = await screen.findByText("O id não é válido!");
        ;expect(errorText).toBeInTheDocument();
    })
});