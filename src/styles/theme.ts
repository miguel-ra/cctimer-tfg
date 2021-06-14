import palette from "./palette";
import breakpoints from "./breakpoints";
import typography from "./typography";

const theme = {
  palette,
  breakpoints,
  typography,
  shape: {
    borderWitdh: "2px",
    borderRadius: 6,
  },
  transition: {
    duration: {
      scrambleColor: "0.5s",
      colorMode: "var(--transition-duration-colorMode)",
    },
  },
};

export default theme;
