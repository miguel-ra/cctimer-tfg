import { renderWithProviders, screen, waitFor } from "../../../../../internals/test";
import { useModal } from "store/modalContext";
import { PuzzleKey, puzzlesData } from "models/puzzles/Puzzle";
import ModalPuzzleSelector from "../ModalPuzzleSelector";
import userEvent from "@testing-library/user-event";

jest.mock("store/modalContext", () => {
  const actualMenuContext = jest.requireActual("store/modalContext");
  return {
    ...actualMenuContext,
    useModal: jest.fn(),
  };
});
const mockedUseModal = useModal as any;
const modalContext = { closeModal: jest.fn() };

describe("features/menu/puzzles/ModalPuzzleSelector", () => {
  beforeEach(() => {
    mockedUseModal.mockImplementation(() => modalContext);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render puzzle selector", () => {
    renderWithProviders(<ModalPuzzleSelector onAddPuzzle={jest.fn()} />);

    expect(
      screen.getByRole("heading", {
        name: /add puzzle/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /close/i,
      })
    ).toBeInTheDocument();

    (Object.keys(puzzlesData) as PuzzleKey[]).forEach((puzzleKey) => {
      screen.getByRole("button", {
        name: puzzlesData[puzzleKey].label,
      });
    });
  });

  test("should close modal after select a puzzle", async () => {
    const onAddPuzzle = jest.fn().mockResolvedValue(true);
    renderWithProviders(<ModalPuzzleSelector onAddPuzzle={onAddPuzzle} />);

    expect(onAddPuzzle).not.toHaveBeenCalled();
    expect(modalContext.closeModal).not.toHaveBeenCalled();

    userEvent.click(
      screen.getByRole("button", {
        name: /2x2 cube/i,
      })
    );

    expect(onAddPuzzle).toHaveBeenCalled();

    await waitFor(() => expect(modalContext.closeModal).toHaveBeenCalled());
  });
});
