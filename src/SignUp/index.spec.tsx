import { fireEvent, render, screen } from "@testing-library/react"
import SignUp from "./index"

const nagivateMock = vi.fn();

describe("testa o component SignUp", () => {
    vi.mock("react-router-dom", () => ({
        useNavigate() {
            return nagivateMock;
        },
        Link: vi.fn().mockImplementation((props) => props.children),
    }));

    test("devem haver 3 inputs na minha tela", async () => {
        render(<SignUp/>);
        const inputs = await screen.findAllByRole("textbox");

        expect(inputs).toHaveLength(3);
    });

    test("devem haver inputs para nome, email e senha", async () => {
        render(<SignUp/>);
        const inputName = await screen.findByPlaceholderText("Insira seu nome");
        const inputEmail = await screen.findByPlaceholderText("Insira seu e-mail");
        const inputPassword = await screen.findByPlaceholderText("Insira sua senha");

        expect(inputName).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
        expect(inputPassword).toBeInTheDocument();
    });

    test("deve haver um botão na tela", async () => {
        render(<SignUp/>);

        const button = await screen.findByRole("button");
        expect(button).toHaveTextContent("Sign Up");
    });

    test("deve haver um titulo chamado 'Cadastre-se'", async () => {
        render(<SignUp/>);
        const title = await screen.findByRole("heading", {
            level: 2,
        });
        expect(title).toHaveTextContent("Cadastre-se");
    });

    test("deve nagegar para a pagina de dashboard", async () => {
        render(<SignUp/>);

        const button = await screen.findByRole("button");
        fireEvent.click(button);

        expect(nagivateMock).toHaveBeenCalledOnce();
    });

    test("deve haver um link para ir até a página de login", () => {
        render(<SignUp/>);

        const link = screen.getByText("Já possui cadastro? Clique aqui.");
        expect(link).toBeInTheDocument();
    });
});