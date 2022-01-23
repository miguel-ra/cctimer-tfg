import clsx from "clsx";
import { ReactNode } from "react";
import { createUseStyles } from "react-jss";
import VisuallyHidden from "components/visually-hidden/VisuallyHidden";
import { TableProvider } from "./tableContext";
import TableColumn from "./TableColumn";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

type TableProps<T> = {
  data: T[];
  caption?: string;
  children: ReactNode;
  className?: string;
};

const useStyles = createUseStyles({
  table: {
    "& th, & td": {
      fontSize: "1.4rem",
    },
    "& tr": {
      height: "3.9rem",
    },
  },
});

function Table<T>({ data, caption, children, className }: TableProps<T>) {
  const classes = useStyles();

  return (
    <TableProvider>
      <table className={clsx(classes.table, className)}>
        {caption && <VisuallyHidden as="caption">{caption}</VisuallyHidden>}
        <TableHeader />
        <TableBody<T> data={data} />
        {children}
      </table>
    </TableProvider>
  );
}

Table.Column = TableColumn;

export default Table;
