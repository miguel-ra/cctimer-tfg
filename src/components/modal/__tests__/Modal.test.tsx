import userEvent from "@testing-library/user-event";

import { render, screen } from "../../../../internals/test";
import Modal from "../Modal";

const modalProps = {
  containerId: "containerId",
  closeModal: jest.fn(),
  children: "children",
  setPrevActiveElement: jest.fn(),
};

describe("components/modal/Modal", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render modal", () => {
    render(<Modal {...modalProps} />);

    expect(screen.getByText(modalProps.children)).toBeInTheDocument();
  });

  test("should call setPrevActiveElement", () => {
    render(<Modal {...modalProps} />);

    expect(modalProps.setPrevActiveElement).toBeCalled();
  });

  test("should close modal if overlay is clicked", () => {
    render(<Modal {...modalProps} />);

    expect(modalProps.closeModal).not.toBeCalled();

    userEvent.click(screen.getByTestId("overlay"));

    expect(modalProps.closeModal).toBeCalled();
  });

  test("should set focus frist focuseable element", () => {
    render(
      <Modal {...modalProps}>
        <button>button1</button>
        <button>button2</button>
      </Modal>
    );

    expect(screen.getByRole("button", { name: /button1/i })).toBe(document.activeElement);
  });

  test("should set focus to first element with auto-focus", () => {
    render(
      <Modal {...modalProps}>
        <button>button1</button>
        <button data-auto-focus>button2</button>
        <button data-auto-focus>button3</button>
      </Modal>
    );

    expect(screen.getByRole("button", { name: /button2/i })).toBe(document.activeElement);
  });
});
