import { fireEvent, render } from "@testing-library/react";
import { expect, suite, test } from "vitest";



import Home from "../app/page";
import { SignIn } from "../app/sign-in/sign-in";


suite("Unit Testing", () => {

  test("renders h2 element with the correct text", () => {
    const { getByText } = render(<Home />);
    const headingElement = getByText(
      "A new way to prepare for the Foundation Exam.",
    );

    expect(headingElement);
  });


  test("submits form with valid input", () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const nidInput = getByPlaceholderText("jd123456");
    const passwordInput = getByPlaceholderText("********");
    const submitButton = getByText("Submit");

    fireEvent.change(nidInput, { target: { value: "aa999999" } });
    fireEvent.change(passwordInput, { target: { value: "Test1234!" } });
    fireEvent.click(submitButton);

  });

  test("displays error messages for invalid input", () => {
    const { getByPlaceholderText, getByText } = render(<SignIn />);
    const nidInput = getByPlaceholderText("jd123456");
    const passwordInput = getByPlaceholderText("********");
    const submitButton = getByText("Submit");

    fireEvent.change(nidInput, { target: { value: "a1234" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });
    fireEvent.click(submitButton);

  });




});