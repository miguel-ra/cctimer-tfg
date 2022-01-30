import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "../Button";

describe("components/button/Button", () => {
  test("should render button", () => {
    render(<Button>label</Button>);

    expect(
      screen.getByRole("button", {
        name: /label/i,
      })
    ).toBeInTheDocument();
  });

  test("should call onClick prop when button is clicked", () => {
    const onClickFn = jest.fn();
    render(<Button onClick={onClickFn}>label</Button>);

    const button = screen.getByRole("button", {
      name: /label/i,
    });

    expect(onClickFn).not.toHaveBeenCalled();

    userEvent.click(button);

    expect(onClickFn).toHaveBeenCalled();
  });

  test("should render icon if it's specified", () => {
    const StartIcon = () => <i>icon</i>;
    render(<Button prefix={<StartIcon />}>label</Button>);

    const button = screen.getByRole("button", {
      name: /label/i,
    });

    expect(within(button).getByText(/icon/i)).toBeInTheDocument();
  });
});
