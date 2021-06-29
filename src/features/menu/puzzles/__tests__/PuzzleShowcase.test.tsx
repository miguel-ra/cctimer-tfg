import { renderWithProviders, screen } from "../../../../../internals/test";
import { UserPuzzle, puzzlesConfig } from "models/puzzles/Puzzle";
import { useMenu } from "store/menuContext";
import { useModal } from "store/modalContext";
import { usePuzzle } from "../puzzleViewModel";
import PuzzleShowcase from "../PuzzleShowcase";
import userEvent from "@testing-library/user-event";

jest.mock("store/menuContext", () => {
  const actualMenuContext = jest.requireActual("store/menuContext");
  return {
    ...actualMenuContext,
    useMenu: jest.fn(),
  };
});
const mockedUseMenu = useMenu as any;

jest.mock("store/modalContext", () => {
  const actualMenuContext = jest.requireActual("store/modalContext");
  return {
    ...actualMenuContext,
    useModal: jest.fn(),
  };
});
const mockedUseModal = useModal as any;

jest.mock("../puzzleViewModel");
const mockedUsePuzzle = usePuzzle as jest.Mock;

const puzzles: UserPuzzle[] = [
  { id: 1, key: "cube2" },
  { id: 2, key: "cube3" },
];
const menuContext = { setSelectedItem: jest.fn(), selectedItem: puzzles[1] };
const modalContext = { openModal: jest.fn() };

describe("features/menu/puzzles/PuzzleShowcase", () => {
  beforeEach(() => {
    mockedUseMenu.mockImplementation(() => menuContext);
    mockedUseModal.mockImplementation(() => modalContext);
    mockedUsePuzzle.mockImplementation(() => ({ puzzles }));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render puzzle showcase", () => {
    renderWithProviders(<PuzzleShowcase />);

    puzzles.forEach((puzzle) => {
      expect(
        screen.getByRole("button", {
          name: puzzlesConfig[puzzle.key].label,
        })
      ).toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", {
        name: /add puzzle/i,
      })
    ).toBeInTheDocument();
  });

  test("should add aria selected puzzle", () => {
    renderWithProviders(<PuzzleShowcase />);

    expect(
      screen.getByRole("button", {
        name: puzzlesConfig[menuContext.selectedItem.key].label,
        expanded: true,
      })
    ).toBeInTheDocument();
  });

  test("should select puzzle", () => {
    renderWithProviders(<PuzzleShowcase />);

    const puzzleButton = screen.getByRole("button", {
      name: puzzlesConfig[puzzles[0].key].label,
      expanded: false,
    });

    expect(menuContext.setSelectedItem).not.toHaveBeenCalled();

    userEvent.click(puzzleButton);

    expect(menuContext.setSelectedItem).toHaveBeenCalled();
    expect(menuContext.setSelectedItem).toBeCalledWith({ type: "puzzle", ...puzzles[0] });
  });

  test("should open add puzzle modal", () => {
    renderWithProviders(<PuzzleShowcase />);

    const addPuzzleButton = screen.getByRole("button", {
      name: /add puzzle/i,
    });

    expect(modalContext.openModal).not.toHaveBeenCalled();

    userEvent.click(addPuzzleButton);

    expect(modalContext.openModal).toHaveBeenCalled();
    expect(modalContext.openModal.mock.calls[0][0]).toMatchInlineSnapshot(`
      <ModalPuzzleSelector
        onAddPuzzle={[Function]}
      />
    `);
  });
});
