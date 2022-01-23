import { render, screen } from "@testing-library/react";

import SelectField from "../SelectField";

describe("components/field/SelectField", () => {
  test("should render select field", () => {
    const label = "label";
    const name = "name";

    render(
      <SelectField label={label} name={name}>
        <option value="option1">option1</option>
      </SelectField>
    );

    expect(
      screen.getByRole("combobox", {
        name: label,
      })
    ).toBeInTheDocument();
  });
});
