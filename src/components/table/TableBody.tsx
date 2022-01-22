import { createUseStyles } from "react-jss";
import { useTable } from "./tableContext";

type TableBodyProps<T> = {
  data: T[];
};

const useStyles = createUseStyles({
  tbody: {
    "& td": {
      height: "4rem",
      padding: "1.2rem",
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
            <td>{row[column.prop as keyof T]}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
