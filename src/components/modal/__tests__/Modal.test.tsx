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
});
