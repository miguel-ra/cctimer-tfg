import { renderWithProviders, screen } from "../../../../internals/test";
import ErrorNotification from "../ErrorNotification";

describe("components/notification/Notification", () => {
  test("should render error notification", () => {
    renderWithProviders(<ErrorNotification hideNotification={jest.fn()}>children</ErrorNotification>);

    expect(screen.getByRole("heading", { name: /error/i })).toBeInTheDocument();
  });
});
