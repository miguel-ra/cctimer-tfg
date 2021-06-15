import { renderWithProviders, screen } from "../../../../internals/test";
import { generateNotifications } from "../../../../internals/test/mocks/notification";
import NotificationsContainer from "../NotificationsContainer";

const notificationsContainerProps = {
  containerId: "containerId",
  hideNotification: jest.fn(),
  removeNotification: jest.fn(),
  notifications: generateNotifications(["notification1", "notification2", "notification3"]),
};

describe("components/notification/NotificationsContainer", () => {
  test("should render notifications", () => {
    renderWithProviders(<NotificationsContainer {...notificationsContainerProps} />);

    expect(screen.getByText("notification1")).toBeInTheDocument();
    expect(screen.getByText("notification2")).toBeInTheDocument();
    expect(screen.getByText("notification3")).toBeInTheDocument();
  });
});
