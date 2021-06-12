import { renderWithProviders, screen } from "../../../../internals/test";
import ModalHeader from "../ModalHeader";

describe("components/modal/ModalHeader", () => {
  test("should render modal header", () => {
    renderWithProviders(<ModalHeader label="label" />);

    expect(
      screen.getByRole("heading", {
        name: /label/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /close/i,
      })
    ).toBeInTheDocument();
  });

  test("should not render close button if showClose is false", () => {
    renderWithProviders(<ModalHeader label="label" showClose={false} />);

    expect(
      screen.queryByRole("button", {
        name: /close/i,
      })
    ).not.toBeInTheDocument();
  });

  test("should render children", () => {
    renderWithProviders(
      <ModalHeader label="label" showClose={false}>
        <button>children button</button>
      </ModalHeader>
    );

    expect(
      screen.getByRole("button", {
        name: /children button/i,
      })
    ).toBeInTheDocument();
  });
});
