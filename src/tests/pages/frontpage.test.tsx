import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";

describe("Describe frontpage", () => {
  it("Should render properly", () => {
    render(<Home />);

    const header = screen.getByRole("heading");
    const headerText = "Who are you looking for?";
    expect(header).toHaveTextContent(headerText);
  });
});
