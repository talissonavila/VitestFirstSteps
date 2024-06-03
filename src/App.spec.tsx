import { render, screen } from "@testing-library/react";
import App from "./App";

describe("testa o componente App", () => {

    test("deve haver dois titulos na página", async () => {
        render(<App/>);

        const titles = await screen.findAllByRole("heading");

        expect(titles).toHaveLength(2);
    });


    test("deve haver um titulo escrito 'olá mundo!'", async () => {
        render(<App/>);

        const title = await screen.findByRole("heading", {
            name: 'olá mundo!',
        });

        expect(title).toBeInTheDocument();
    });


});