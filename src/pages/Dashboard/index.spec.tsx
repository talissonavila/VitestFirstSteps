import { fireEvent, render, screen } from "@testing-library/react"
import Dashboard from "."
import { fetchPokemonList } from "../../services/PokemonService";
import { faker } from "@faker-js/faker";

const mockFetchListPokemonFn = vi.fn(fetchPokemonList).mockImplementation(async () => {
    return [
        {
            id: 1,
            name: "Pikachu",
            image: faker.image.urlPlaceholder(),
            type: "Eletric"
        },
        {
            id: 2,
            name: "Pichu",
            image: faker.image.urlPlaceholder(),
            type: "Eletric"
        },
    ];
});

const navigateMock = vi.fn();

describe("testa o component página", () => {
    vi.mock("react-router-dom", () => {
        return {
            useNavigate() {
                return navigateMock;
            }
        }
    })

    test("deve haver um titulo na pagina", async () => {
        render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />);
        const title = await screen.findByRole("heading");
        expect(title).toHaveTextContent("Dashboard");
    });

    test("deve haver uma lista com 10 pokemons", async () => {
        render(<Dashboard fetchPokemonList={mockFetchListPokemonFn} />)

        const items = await screen.findAllByRole("listitem");
        expect(items).toHaveLength(2);
    });

    test("deve haver um 'Pikachu' na lista de pokemons",  async () => {
        render(<Dashboard fetchPokemonList={mockFetchListPokemonFn}/>)
       
        const pikachu = await screen.findByText("Pikachu");
        expect(pikachu).toBeInTheDocument();
    });

    test("Deve ser possível clicar no 'li' para abrir a páginas de detalhes do pokemon", async () => {
        render(<Dashboard fetchPokemonList={mockFetchListPokemonFn}/>);
        
        const link = await screen.findByText("Pikachu");
        fireEvent.click(link);
        expect(navigateMock).toHaveBeenCalledOnce();
    })
});