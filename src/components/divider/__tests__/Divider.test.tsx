import { render, screen } from "@testing-library/react";
import Divider from "../Divider";

describe("components/divider/Divider", () => {
  test("should render divider", () => {
    render(<Divider />);

    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
