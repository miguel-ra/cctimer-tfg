import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Field from "../Field";

describe("components/field/Field", () => {
  test("Should render label and input", () => {
    const label = "label";
    const name = "name";

    render(<Field label={label} name={name} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: label })).toBeInTheDocument();
  });

  test("Should prevent input changes when user input doesn't match the pattern", () => {
    const label = "label";
    const name = "name";

    render(<Field label={label} name={name} pattern={/^\d*$/} />);

    const input = screen.getByRole("textbox", {
      name: label,
    }) as HTMLInputElement;

    userEvent.type(input, "a");

    expect(input.value).toBe("");

    userEvent.type(input, "1");

    expect(input.value).toBe("1");
  });
});
