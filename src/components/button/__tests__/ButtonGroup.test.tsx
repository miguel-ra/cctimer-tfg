import { render, screen } from "@testing-library/react";

import Button from "../Button";
import ButtonGroup from "../ButtonGroup";

describe("components/button/Button", () => {
  test("should render button group", () => {
    render(
      <ButtonGroup>
        <Button>button1</Button>
        <Button>button2</Button>
      </ButtonGroup>
    );

    expect(
      screen.getByRole("button", {
        name: /button1/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /button2/i,
      })
    ).toBeInTheDocument();
  });
});
