import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CheckboxField from "../CheckboxField";

describe("components/field/CheckboxField", () => {
  test("should render checkbox field", () => {
    const label = "label";
    const name = "name";

    render(<CheckboxField label={label} name={name} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(
      screen.getByRole("checkbox", {
        name: label,
      })
    ).toBeInTheDocument();
  });

  test("should toggle input on click label", () => {
    const label = "label";
    const name = "name";

    render(<CheckboxField label={label} name={name} />);

    const checkbox = screen.getByRole("checkbox", {
      name: label,
    });

    expect(checkbox).not.toBeChecked();

    userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
