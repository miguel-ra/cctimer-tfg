import { render, screen } from "@testing-library/react";

import TextField from "../TextField";

describe("components/field/TextField", () => {
  test("should render text field", () => {
    const label = "label";
    const name = "name";

    render(<TextField label={label} name={name} />);

    expect(
      screen.getByRole("textbox", {
        name: label,
      })
    ).toBeInTheDocument();
  });
});
