import { render } from "../../../../internals/test";
import Portal from "../Portal";

describe("components/portal/Portal", () => {
  test("should create container if don't exists", () => {
    jest.spyOn(document.body, "appendChild");

    const contanerId = "containerId";
    const children = "children";
    render(<Portal containerId={contanerId}>{children}</Portal>);

    expect(document.body.appendChild).lastCalledWith(
      expect.objectContaining({
        id: contanerId,
        textContent: children,
      })
    );
  });
});
