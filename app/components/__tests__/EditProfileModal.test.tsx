import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditProfileModal from "../EditProfileModal";

test("renders example component", () => {
  render(<EditProfileModal username="sda" jobTitle="dsdad" />);
  // expect(screen.getByText("Hello, world!")).toBeInTheDocument();
});
