import { render, screen } from "@testing-library/react";

import Box from "../Box";

describe("components/flexboxgrid/Box", () => {
  test("should render box", () => {
    render(<Box>children</Box>);

    expect(screen.getByText("children")).toBeInTheDocument();
  });
});
