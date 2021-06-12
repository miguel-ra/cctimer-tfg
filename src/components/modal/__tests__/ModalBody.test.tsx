import { render, screen } from "@testing-library/react";
import ModalBody from "../ModalBody";

describe("components/modal/ModalBody", () => {
  test("should render modal body", () => {
    render(<ModalBody>children</ModalBody>);

    expect(screen.getByText("children")).toBeInTheDocument();
  });
});
