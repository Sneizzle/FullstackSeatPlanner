import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "@/app/page";
import Background from "@/app/Background";
import SearchBar from "@/app/Components/SearchBar";

// jest.mock("axios");
describe("Homepage Testing", () => {
  //   it("Render Title", () => {
  //     render(<Home />);
  //     const header = screen.getByRole("heading");
  //     const headerText = "Who are you looking for?";
  //     expect(header).toHaveTextContent(headerText);
  //   });
  it("Render Title", () => {
    render(<Home />);
    const header = screen.getByRole("heading", {
      name: "Who are you looking for?",
    });
    expect(header).toBeInTheDocument();
  });

  it("Render Background", () => {
    render(<Background />);
    const background = screen.getByTestId("background");
    expect(background).toBeInTheDocument();
  });

  it("Render Searchbar", () => {
    render(<Home />);
    const searchbar = screen.getByPlaceholderText("Write name here"); // Assuming you have a placeholder in your SearchBar component
    expect(searchbar).toBeInTheDocument();
  });
  it("Render Admin Login", () => {
    render(<Home />);
    const adminLoginButton = screen.getByText("Admin Login");
    expect(adminLoginButton).toBeInTheDocument();
  });
});
