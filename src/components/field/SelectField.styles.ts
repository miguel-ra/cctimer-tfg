import { createUseStyles } from "react-jss";
import theme from "styles/theme";

const useStyles = createUseStyles({
  select: {
    appearance: "none",
    padding: "0.4rem 2.55rem 0.5rem 0.75rem",
    cursor: "pointer",
    backgroundRepeat: "no-repeat",
    backgroundSize: "0.7rem auto",
    backgroundPosition: "calc(100% - 1rem) 0.45rem",
    backgroundImage: `url('data:image/svg+xml;charset=utf-8, <svg aria-hidden="true" focusable="false" class="svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="${theme.palette.text.primary}" d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>')`,
    "& option": {
      fontSize: "1.4rem",
      lineHeight: "1.4rem",
    },
  },
});

export default useStyles;
