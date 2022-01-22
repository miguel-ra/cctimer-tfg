import { createUseStyles } from "react-jss";
import theme from "styles/theme";

import { useTable } from "./tableContext";

const useStyles = createUseStyles({
  thead: {
    borderCollapse: "separate",
    borderSpacing: "0",
    fontSize: "inherit",
    "& th": {
      ...theme.typography.caption,
      minHeight: "4rem",
      padding: "0.8rem 1.2rem",
      color: "#888",
      background: theme.palette.background.primary,
      borderBottom: "1px solid #333",
      borderTop: "1px solid #333",
      borderRadius: "0",

      "&:first-child": {
        borderBottom: "1px solid #333",
        borderLeft: "1px solid #333",
        borderTop: "1px solid #333",
        borderTopLeftRadius: "5px",
        borderBottomLeftRadius: "5px",
      },
      "&:last-child": {
        borderBottom: "1px solid #333",
        borderRight: "1px solid #333",
        borderTop: "1px solid #333",
        borderTopRightRadius: "5px",
        borderBottomRightRadius: "5px",
      },
    },
  },
  label: {
    display: "flex",
    alignItems: "center",
    minHeight: "calc(2.5 * var(--table-font-size))",
    textTransform: "uppercase",
  },
});

function TableHeader() {
  const classes = useStyles();
  const { columns } = useTable();

  return (
    <thead className={classes.thead}>
      <tr>
        {columns.map(({ prop, label, width }) => (
          <th key={prop} style={width ? { width } : undefined}>
            <span className={classes.label}>{label}</span>
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
