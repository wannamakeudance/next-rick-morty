import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditProfileModal from "./EditProfileModal";
import { ChakraProvider } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("EditProfileModal", () => {
  const mockRouter = {
    refresh: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it("should render the EditProfileModal component", () => {
    const { getByText } = render(
      <ChakraProvider>
        <EditProfileModal username="testuser" jobTitle="Developer" />
      </ChakraProvider>
    );

    expect(getByText("Edit Profile")).toBeInTheDocument();
  });

  it("should open the modal when the Edit Profile button is clicked", () => {
    const { getByText, getByPlaceholderText } = render(
      <ChakraProvider>
        <EditProfileModal username="testuser" jobTitle="Developer" />
      </ChakraProvider>
    );

    fireEvent.click(getByText("Edit Profile"));

    expect(getByPlaceholderText("Username")).toBeInTheDocument();
    expect(getByPlaceholderText("Job Title")).toBeInTheDocument();
  });

  it("should update the username and job title", async () => {
    const { getByText, getByPlaceholderText } = render(
      <ChakraProvider>
        <EditProfileModal username="testuser" jobTitle="Developer" />
      </ChakraProvider>
    );

    fireEvent.click(getByText("Edit Profile"));

    const usernameInput = getByPlaceholderText("Username");
    const jobTitleInput = getByPlaceholderText("Job Title");

    fireEvent.change(usernameInput, { target: { value: "newuser" } });
    fireEvent.change(jobTitleInput, { target: { value: "Manager" } });

    expect(usernameInput).toHaveValue("newuser");
    expect(jobTitleInput).toHaveValue("Manager");

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      })
    ) as jest.Mock;

    fireEvent.click(getByText("Save Changes"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/save-user", {
        method: "POST",
        body: JSON.stringify({
          username: "newuser",
          jobTitle: "Manager",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    });

    expect(mockRouter.refresh).toHaveBeenCalled();
  });

  it("should close the modal when the Cancel button is clicked", () => {
    const { getByText, queryByPlaceholderText } = render(
      <ChakraProvider>
        <EditProfileModal username="testuser" jobTitle="Developer" />
      </ChakraProvider>
    );

    fireEvent.click(getByText("Edit Profile"));
    fireEvent.click(getByText("Cancel"));

    expect(queryByPlaceholderText("Username")).not.toBeVisible();
    expect(queryByPlaceholderText("Job Title")).not.toBeVisible();
  });
});
