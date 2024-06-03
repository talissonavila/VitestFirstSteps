import { fireEvent, render,screen } from "@testing-library/react"
import Login from "."

const navigateMock = vi.fn();

describe("Testa o componente de login", () => {
    vi.mock("react-router-dom", () => ({
        useNavigate() {
            return navigateMock;
        },
    }));

    test("deve haver um título escrito 'Sign In'", async () => {
        render(<Login/>);

        const title = await screen.findByRole("heading", {
            name: 'Sign in',
        });
        expect(title).toBeInTheDocument();
    });

    test("devem haver dois inputs na minha tela", async () => {
        render(<Login/>);

        const inputs = await screen.findAllByRole("textbox");

        expect(inputs).toHaveLength(2);
    });

    test("deve haver um botao na minha tela", async ()=> {
        render(<Login/>);

        const button = await screen.findByRole("button");

        expect(button.textContent).toBe("login");
    });

    test("deve haver um input para e-mail", async () => {
        render(<Login/>);

        const inputEmail = await screen.findByPlaceholderText("insira seu e-mail");

        expect(inputEmail).toBeInTheDocument();
    });

    test("deve haver um input para senha", async () => {
        render(<Login/>);

        const inputPassword = await screen.findByPlaceholderText("insira sua senha");

        expect(inputPassword).toBeInTheDocument();
    });

    test("ao clicar no botão", async () => {
        render(<Login/>);

        const button = await screen.findByRole("button");

        fireEvent.click(button);

        expect(navigateMock).toHaveBeenCalledOnce();
    })
});