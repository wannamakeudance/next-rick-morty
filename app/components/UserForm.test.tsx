import { ChakraProvider } from "@chakra-ui/react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import UserForm from "./UserForm";

const renderWithChakra = (ui: React.ReactElement) => {
  return render(<ChakraProvider>{ui}</ChakraProvider>);
};

describe("UserForm Component", () => {
  const mockSubmit = jest.fn();

  it("should render the form elements correctly", () => {
    renderWithChakra(
      <UserForm
        defaultValues={{ username: "", jobTitle: "" }}
        onSubmit={mockSubmit}
        buttonText="Submit"
      />
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Job Title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("should display validation messages for empty required fields", async () => {
    renderWithChakra(
      <UserForm
        defaultValues={{ username: "", jobTitle: "" }}
        onSubmit={mockSubmit}
        buttonText="Submit"
      />
    );

    // Click the submit button without entering any data
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText("Username is required")).toBeInTheDocument();
      expect(screen.getByText("Job Title is required")).toBeInTheDocument();
    });
  });

  it("should display validation messages for invalid username length", async () => {
    renderWithChakra(
      <UserForm
        defaultValues={{ username: "", jobTitle: "" }}
        onSubmit={mockSubmit}
        buttonText="Submit"
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "ab" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Username must be at least 3 characters long")
      ).toBeInTheDocument();
    });

    // Enter a username that is too long
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "thisusernameiswaytoolong" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Username must not exceed 18 characters")
      ).toBeInTheDocument();
    });
  });

  it("should display validation messages for invalid job title length", async () => {
    renderWithChakra(
      <UserForm
        defaultValues={{ username: "", jobTitle: "" }}
        onSubmit={mockSubmit}
        buttonText="Submit"
      />
    );

    // Enter a job title that is too short
    fireEvent.change(screen.getByPlaceholderText("Job Title"), {
      target: { value: "a" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Job Title must be at least 2 characters long")
      ).toBeInTheDocument();
    });

    // Enter a job title that is too long
    fireEvent.change(screen.getByPlaceholderText("Job Title"), {
      target: { value: "thisjobtitleiswaytoolong" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Job Title must not exceed 20 characters")
      ).toBeInTheDocument();
    });
  });

  it("should display the loading spinner when the submit button is clicked and isLoading is true", () => {
    renderWithChakra(
      <UserForm
        defaultValues={{ username: "", jobTitle: "" }}
        onSubmit={mockSubmit}
        buttonText="Submit"
        isLoading={true}
      />
    );

    // Check if the submit button shows a loading spinner
    expect(screen.getByRole("button", { name: /submit/i })).toHaveAttribute(
      "data-loading"
    );
  });
});
