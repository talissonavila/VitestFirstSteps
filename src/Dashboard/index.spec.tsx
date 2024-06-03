import { render, screen } from "@testing-library/react"
import Dashboard from "."

describe("testa o component página", () => {
    test("deve haver um titulo na pagina", async () => {
        render(<Dashboard/>);
        const title = await screen.findByRole("heading");
        expect(title).toHaveTextContent("Dashboard");
    })
})