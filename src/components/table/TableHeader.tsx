import { createUseStyles } from "react-jss";
import theme from "styles/theme";

import { useTable } from "./tableContext";

const border = `${theme.shape.borderWitdh} solid ${theme.palette.border.primary}`;

const useStyles = createUseStyles({
  thead: {
    borderCollapse: "separate",
    borderSpacing: "0",
    fontSize: "inherit",
    "& th": {
      padding: "0 1.2rem",
      color: theme.palette.text.primary,
      background: theme.palette.background.primary,
      border,
      borderWidth: `${theme.shape.borderWitdh} 0px ${theme.shape.borderWitdh} 0px`,
      borderRadius: "0",
      transition: theme.transition.generate(["border", "color", "background"]),

      "&:first-child": {
        border,
        borderWidth: `${theme.shape.borderWitdh} 0px ${theme.shape.borderWitdh} ${theme.shape.borderWitdh}`,
        borderTopLeftRadius: theme.shape.borderRadius,
        borderBottomLeftRadius: theme.shape.borderRadius,
      },
      "&:last-child": {
        borderWidth: `${theme.shape.borderWitdh} ${theme.shape.borderWitdh} ${theme.shape.borderWitdh} 0px `,
        borderTopRightRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius,
      },
    },
  },
  label: {
    display: "flex",
    alignItems: "center",
    textTransform: "uppercase",
    ...theme.typography.caption,
    lineHeight: 0,
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
