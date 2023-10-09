import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import HomeComponent from "./index";

describe("Home Component", () => {
  it("Search product", async () => {
    const { getByPlaceholderText } = render(<HomeComponent />);

    const productCodeInput = getByPlaceholderText("Pesquisar Produto");

    fireEvent.change(productCodeInput, { target: { value: "Abacaxi" } });

    const product = screen.getByText("Abacaxi");
    const notProduct = screen.queryByText("Manga");

    expect(product).toBeInTheDocument();
    expect(notProduct).not.toBeInTheDocument();
  });
});
