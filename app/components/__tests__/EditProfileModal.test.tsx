import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import EditProfileModal from "../EditProfileModal";

test("renders example component", () => {
  render(<EditProfileModal username="sda" jobTitle="dsdad" />);
  // expect(screen.getByText("Hello, world!")).toBeInTheDocument();
});
// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import "@testing-library/jest-dom";
// import EditProfileModal from "../EditProfileModal";

// describe("EditProfileModal", () => {
//   test("renders Edit Profile button", () => {
//     render(<EditProfileModal username="sda" jobTitle="dsdad" />);
//     expect(screen.getByText("Edit Profile")).toBeInTheDocument();
//   });

//   test("opens modal on Edit Profile button click", () => {
//     render(<EditProfileModal username="sda" jobTitle="dsdad" />);
//     userEvent.click(screen.getByText("Edit Profile"));
//     expect(screen.getByText("Edit Your Profile")).toBeInTheDocument();
//   });

//   test("renders input fields with initial values", () => {
//     render(<EditProfileModal username="sda" jobTitle="dsdad" />);
//     userEvent.click(screen.getByText("Edit Profile"));
//     expect(screen.getByPlaceholderText("Username")).toHaveValue("sda");
//     expect(screen.getByPlaceholderText("Job Title")).toHaveValue("dsdad");
//   });

//   // test("updates input fields on change", () => {
//   //   render(<EditProfileModal username="sda" jobTitle="dsdad" />);
//   //   userEvent.click(screen.getByText("Edit Profile"));

//   //   const usernameInput = screen.getByPlaceholderText("Username");
//   //   const jobTitleInput = screen.getByPlaceholderText("Job Title");

//   //   fireEvent.change(usernameInput, { target: { value: "newUsername" } });
//   //   fireEvent.change(jobTitleInput, { target: { value: "newJobTitle" } });

//   //   expect(usernameInput).toHaveValue("newUsername");
//   //   expect(jobTitleInput).toHaveValue("newJobTitle");
//   // });

//   test("closes modal on Cancel button click", () => {
//     render(<EditProfileModal username="sda" jobTitle="dsdad" />);
//     userEvent.click(screen.getByText("Edit Profile"));
//     userEvent.click(screen.getByText("Cancel"));
//     expect(screen.queryByText("Edit Your Profile")).not.toBeInTheDocument();
//   });

//   test("calls handleSave on Save Changes button click", async () => {
//     global.fetch = jest.fn(() =>
//       Promise.resolve({
//         json: () => Promise.resolve({}),
//       })
//     ) as jest.Mock;

//     render(<EditProfileModal username="sda" jobTitle="dsdad" />);
//     userEvent.click(screen.getByText("Edit Profile"));

//     const saveButton = screen.getByText("Save Changes");
//     userEvent.click(saveButton);

//     expect(global.fetch).toHaveBeenCalledWith(
//       "/api/save-user",
//       expect.any(Object)
//     );
//   });
// });
