import { renderWithProviders, screen } from "../../../../internals/test";
import Typography from "../Typography";
import useStyles from "../Typography.styles";

function UseStylesHookExample() {
  const classes = useStyles({});
  return (
    <>
      <span data-testid="classes.h1">{classes.h1}</span>
      <span data-testid="classes.h2">{classes.h2}</span>
      <span data-testid="classes.h3">{classes.h3}</span>
      <span data-testid="classes.h4">{classes.h4}</span>
      <span data-testid="classes.h5">{classes.h5}</span>
      <span data-testid="classes.h6">{classes.h6}</span>
      <span data-testid="classes.subtitle1">{classes.subtitle1}</span>
      <span data-testid="classes.subtitle2">{classes.subtitle2}</span>
      <span data-testid="classes.body1">{classes.body1}</span>
      <span data-testid="classes.body2">{classes.body2}</span>
      <span data-testid="classes.caption">{classes.caption}</span>
      <span data-testid="classes.overline">{classes.overline}</span>
    </>
  );
}

describe("components/typography/Typography", () => {
  test("should render the text", () => {
    renderWithProviders(<Typography variant="h1">cctimer</Typography>);

    expect(screen.getByText("cctimer")).toBeInTheDocument();
  });

  test("should add custom variants styles", () => {
    renderWithProviders(
      <>
        <UseStylesHookExample />
        <Typography variant="h1">h1</Typography>
        <Typography variant="h2">h2</Typography>
        <Typography variant="h3">h3</Typography>
        <Typography variant="h4">h4</Typography>
        <Typography variant="h5">h5</Typography>
        <Typography variant="h6">h6</Typography>
        <Typography variant="subtitle1">subtitle1</Typography>
        <Typography variant="subtitle2">subtitle2</Typography>
        <Typography variant="body1">body1</Typography>
        <Typography variant="body2">body2</Typography>
        <Typography variant="caption">caption</Typography>
        <Typography variant="overline">overline</Typography>
      </>
    );

    const h1 = screen.getByText("h1");
    const h2 = screen.getByText("h2");
    const h3 = screen.getByText("h3");
    const h4 = screen.getByText("h4");
    const h5 = screen.getByText("h5");
    const h6 = screen.getByText("h6");
    const subtitle1 = screen.getByText("subtitle1");
    const subtitle2 = screen.getByText("subtitle2");
    const body1 = screen.getByText("body1");
    const body2 = screen.getByText("body2");
    const caption = screen.getByText("caption");
    const overline = screen.getByText("overline");

    expect(h1.classList).toContain(screen.getByTestId("classes.h1").textContent);
    expect(h2.classList).toContain(screen.getByTestId("classes.h2").textContent);
    expect(h3.classList).toContain(screen.getByTestId("classes.h3").textContent);
    expect(h4.classList).toContain(screen.getByTestId("classes.h4").textContent);
    expect(h5.classList).toContain(screen.getByTestId("classes.h5").textContent);
    expect(h6.classList).toContain(screen.getByTestId("classes.h6").textContent);
    expect(subtitle1.classList).toContain(screen.getByTestId("classes.subtitle1").textContent);
    expect(subtitle2.classList).toContain(screen.getByTestId("classes.subtitle2").textContent);
    expect(body1.classList).toContain(screen.getByTestId("classes.body1").textContent);
    expect(body2.classList).toContain(screen.getByTestId("classes.body2").textContent);
    expect(caption.classList).toContain(screen.getByTestId("classes.caption").textContent);
    expect(overline.classList).toContain(screen.getByTestId("classes.overline").textContent);
  });

  test('should use "as" prop as element type', () => {
    renderWithProviders(<Typography as="h6">children</Typography>);

    expect(screen.getByRole("heading", { name: /children/i })).toBeInTheDocument();
  });
});
