import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "@/app/Components/SearchBar";

describe("SearchBar Component", () => {
  it("calls onItemSelect when an item is selected", async () => {
    const onItemSelectMock = jest.fn();
    const sampleItem = {
      markercoords: [[]],
      id: 1,
      location: "Some Location",
      team: "Team A",
      name: "John Doe",
      checkbox: true,
    };
    render(<SearchBar data={[sampleItem]} onItemSelect={onItemSelectMock} />);
    const inputElement = screen.getByPlaceholderText("Write name here");
    fireEvent.change(inputElement, { target: { value: "John Doe" } });
    await screen.findByText("John Doe");
    fireEvent.click(screen.getByText("John Doe"));
    expect(onItemSelectMock).toHaveBeenCalledWith(sampleItem);
  });
});
