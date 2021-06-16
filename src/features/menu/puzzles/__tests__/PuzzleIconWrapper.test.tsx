import { createRef, Dispatch, SetStateAction } from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import PuzzleIconWrapper from "../PuzzleIconWrapper";
import userEvent from "@testing-library/user-event";

const puzzleIconWrapperProps = {
  "data-id": 1,
  onClick: jest.fn(),
  timeoutId: createRef<NodeJS.Timeout | null>(),
  showRemoveId: null,
  setShowRemoveId: jest.fn(),
  onSelect: jest.fn(),
  onRemove: jest.fn(),
};

describe("features/puzzles/PuzzleIconWrapper", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render puzzle icon", () => {
    render(<PuzzleIconWrapper {...puzzleIconWrapperProps}>children</PuzzleIconWrapper>);

    expect(
      screen.getByRole("button", {
        name: "children",
      })
    ).toBeInTheDocument();
  });

  test("should call setShowRemoveId on hover", async () => {
    render(<PuzzleIconWrapper {...puzzleIconWrapperProps}>children</PuzzleIconWrapper>);

    const puzzleIconButton = screen.getByRole("button", {
      name: "children",
    });

    expect(puzzleIconWrapperProps.setShowRemoveId).not.toHaveBeenCalled();

    userEvent.hover(puzzleIconButton);

    await waitFor(() => expect(puzzleIconWrapperProps.setShowRemoveId).toHaveBeenCalled());

    expect(puzzleIconWrapperProps.setShowRemoveId).toHaveBeenCalledWith(puzzleIconWrapperProps["data-id"]);
  });

  test("should call setShowRemoveId on unhover", async () => {
    render(<PuzzleIconWrapper {...puzzleIconWrapperProps}>children</PuzzleIconWrapper>);

    const puzzleIconButton = screen.getByRole("button", {
      name: "children",
    });

    userEvent.hover(puzzleIconButton);
    jest.clearAllMocks();

    expect(puzzleIconWrapperProps.setShowRemoveId).not.toHaveBeenCalled();

    userEvent.unhover(puzzleIconButton);

    await waitFor(() => expect(puzzleIconWrapperProps.setShowRemoveId).toHaveBeenCalled());

    expect(puzzleIconWrapperProps.setShowRemoveId).toHaveBeenCalledWith(null);
  });

  test("should call onClick", async () => {
    render(<PuzzleIconWrapper {...puzzleIconWrapperProps}>children</PuzzleIconWrapper>);

    const puzzleIconButton = screen.getByRole("button", {
      name: "children",
    });

    expect(puzzleIconWrapperProps.onClick).not.toHaveBeenCalled();

    userEvent.click(puzzleIconButton);

    await waitFor(() => expect(puzzleIconWrapperProps.onClick).toHaveBeenCalled());

    expect(puzzleIconWrapperProps.onClick.mock.calls[0][0].constructor.name).toMatchInlineSnapshot(
      `"SyntheticBaseEvent"`
    );
  });

  test("should support keyboard", async () => {
    render(<PuzzleIconWrapper {...puzzleIconWrapperProps}>children</PuzzleIconWrapper>);

    const puzzleIconButton = screen.getByRole("button", {
      name: "children",
    });

    expect(puzzleIconWrapperProps.onSelect).not.toHaveBeenCalled();
    expect(puzzleIconWrapperProps.onRemove).not.toHaveBeenCalled();

    fireEvent.keyDown(puzzleIconButton, {
      key: "Enter",
    });

    await waitFor(() => expect(puzzleIconWrapperProps.onSelect).toHaveBeenCalled());

    fireEvent.keyDown(puzzleIconButton, {
      key: "Delete",
    });

    await waitFor(() => expect(puzzleIconWrapperProps.onRemove).toHaveBeenCalled());
  });
});
