import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import CharacterGrid from "./CharacterGrid";

const mockCharacters = [
  {
    id: "1",
    name: "Rick Sanchez",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    species: "Human",
    gender: "Male",
  },
  {
    id: "2",
    name: "Morty Smith",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
    species: "Human",
    gender: "Male",
  },
];

const mockInfo = {
  count: 2,
  pages: 1,
  next: null,
  prev: null,
};

describe("CharacterGrid Component", () => {
  it("should render the correct number of character cards", () => {
    render(
      <ChakraProvider>
        <CharacterGrid
          characters={mockCharacters}
          info={mockInfo}
          currentPage={1}
        />
      </ChakraProvider>
    );

    expect(screen.getAllByRole("img")).toHaveLength(mockCharacters.length);
  });

  it("should open and display character details in the modal when a character card is clicked", async () => {
    render(
      <ChakraProvider>
        <CharacterGrid
          characters={mockCharacters}
          info={mockInfo}
          currentPage={1}
        />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText("Rick Sanchez"));
    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument(); // Verify that the modal is open
    });
  });

  it("should close the modal when the close button is clicked", async () => {
    render(
      <ChakraProvider>
        <CharacterGrid
          characters={mockCharacters}
          info={mockInfo}
          currentPage={1}
        />
      </ChakraProvider>
    );

    fireEvent.click(screen.getByText("Rick Sanchez"));
    fireEvent.click(screen.getByTestId("charactor-modal-close-button"));

    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it('should render the "Previous" and "Next" buttons based on the pagination info', () => {
    render(
      <ChakraProvider>
        <CharacterGrid
          characters={mockCharacters}
          info={mockInfo}
          currentPage={1}
        />
      </ChakraProvider>
    );

    // Since `info.prev` and `info.next` are null, buttons should not be visible
    expect(screen.queryByText("Previous")).not.toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();

    // Re-render with `info.next` set to true
    const mockInfoWithNext = { ...mockInfo, next: 2 };
    render(
      <ChakraProvider>
        <CharacterGrid
          characters={mockCharacters}
          info={mockInfoWithNext}
          currentPage={1}
        />
      </ChakraProvider>
    );

    expect(screen.queryByText("Next")).toBeInTheDocument();
  });
});
