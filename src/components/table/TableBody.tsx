import { createUseStyles } from "react-jss";

import theme from "styles/theme";

import { useTable } from "./tableContext";

type TableBodyProps<T> = {
  data: T[];
};

const useStyles = createUseStyles({
  tbody: {
    "& td": {
      padding: "1rem 1.2rem",
      borderTop: `1px solid ${theme.palette.border.primary}`,
      transition: theme.transition.generate(["border"]),
    },
    "& tr:first-child td": {
      border: "none",
      paddingTop: "1rem",
    },
  },
});

function TableBody<T>({ data }: TableBodyProps<T>) {
  const { columns } = useTable();
  const classes = useStyles();

  return (
    <tbody className={classes.tbody}>
      {data.map((row, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td key={column.prop}>{row[column.prop as keyof T]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
