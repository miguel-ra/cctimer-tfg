import { render, screen } from "@testing-library/react";

import IconButton from "../IconButton";

describe("components/button/IconButton", () => {
  test("should render icon button", () => {
    render(<IconButton>icon</IconButton>);

    expect(
      screen.getByRole("button", {
        name: /icon/i,
      })
    ).toBeInTheDocument();
  });
});
