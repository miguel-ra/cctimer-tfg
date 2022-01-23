import userEvent from "@testing-library/user-event";

import { ReactComponent as ErrorIcon } from "assets/icons/error.svg";

import { renderWithProviders, screen, waitFor } from "../../../../internals/test";
import Notification from "../Notification";

const notificationProps = {
  title: "title",
  children: "children",
  hideNotification: jest.fn(),
};

describe("components/notification/Notification", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render notification", () => {
    renderWithProviders(<Notification {...notificationProps} />);

    expect(screen.getByRole("heading", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByText("children")).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /close/i,
      })
    ).toBeInTheDocument();
  });

  test("should render icon", () => {
    renderWithProviders(<Notification {...notificationProps} Icon={ErrorIcon} />);

    expect(screen.getByTitle(/icon notification/i)).toBeInTheDocument();
  });

  test("should call hideNotification callback", async () => {
    renderWithProviders(<Notification {...notificationProps} Icon={ErrorIcon} />);

    const closeButton = screen.getByRole("button", {
      name: /close/i,
    });

    expect(notificationProps.hideNotification).not.toHaveBeenCalled();

    userEvent.click(closeButton);

    await waitFor(() => expect(notificationProps.hideNotification).toHaveBeenCalled());
  });
});
