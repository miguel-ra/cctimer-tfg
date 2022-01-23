import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";

import PuzzleIconWrapper from "../PuzzleIconWrapper";


const puzzleIconWrapperProps = {
  "data-id": 1,
  onClick: jest.fn(),
  timeoutId: createRef<NodeJS.Timeout | null>(),
  showDeleteId: null,
  setShowDeleteId: jest.fn(),
  onSelect: jest.fn(),
  onDelete: jest.fn(),
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

  test("should call setShowDeleteId on hover", async () => {
    render(<PuzzleIconWrapper {...puzzleIconWrapperProps}>children</PuzzleIconWrapper>);

    const puzzleIconButton = screen.getByRole("button", {
      name: "children",
    });

    expect(puzzleIconWrapperProps.setShowDeleteId).not.toHaveBeenCalled();

    userEvent.hover(puzzleIconButton);

    await waitFor(() => expect(puzzleIconWrapperProps.setShowDeleteId).toHaveBeenCalled());

    expect(puzzleIconWrapperProps.setShowDeleteId).toHaveBeenCalledWith(puzzleIconWrapperProps["data-id"]);
  });

  test("should call setShowDeleteId on unhover", async () => {
    render(<PuzzleIconWrapper {...puzzleIconWrapperProps}>children</PuzzleIconWrapper>);

    const puzzleIconButton = screen.getByRole("button", {
      name: "children",
    });

    userEvent.hover(puzzleIconButton);
    jest.clearAllMocks();

    expect(puzzleIconWrapperProps.setShowDeleteId).not.toHaveBeenCalled();

    userEvent.unhover(puzzleIconButton);

    await waitFor(() => expect(puzzleIconWrapperProps.setShowDeleteId).toHaveBeenCalled());

    expect(puzzleIconWrapperProps.setShowDeleteId).toHaveBeenCalledWith(null);
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
    expect(puzzleIconWrapperProps.onDelete).not.toHaveBeenCalled();

    fireEvent.keyDown(puzzleIconButton, {
      key: "Enter",
    });

    await waitFor(() => expect(puzzleIconWrapperProps.onSelect).toHaveBeenCalled());

    fireEvent.keyDown(puzzleIconButton, {
      key: "Delete",
    });

    await waitFor(() => expect(puzzleIconWrapperProps.onDelete).toHaveBeenCalled());
  });
});
