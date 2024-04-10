import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import Home from "../app/page";

test("renders h2 element with the correct text", () => {
  const { getByText } = render(<Home />);
  const headingElement = getByText(
    "A new way to prepare for the Foundation Exam.",
  );

  expect(headingElement);
});
