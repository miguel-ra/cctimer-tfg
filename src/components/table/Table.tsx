import clsx from "clsx";
import { ReactNode } from "react";
import { createUseStyles } from "react-jss";
import VisuallyHidden from "components/visually-hidden/VisuallyHidden";
import { TableProvider } from "./tableContext";
import TableColumn from "./TableColumn";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import theme from "styles/theme";

type TableProps<T> = {
  data: T[];
  caption?: string;
  children: ReactNode;
  className?: string;
};

const useStyles = createUseStyles({
  table: {
    "& th, & td": {
      letterSpacing: "0.4px",
      fontSize: "1.4rem",
      lineHeight: "1.4",
      padding: "0.75rem 0.5rem",
      borderTop: `1px solid ${theme.palette.border.primary}`,
      transition: `border ${theme.transition.duration.colorMode} linear`,
    },
    "& th": {
      textTransform: "uppercase",
      borderTop: "none",
      borderBottom: `1px solid ${theme.palette.border.primary}`,
      transition: `border ${theme.transition.duration.colorMode} linear`,
      fontWeight: "bold",
      textAlign: "left",
    },
    "& tr": {
      height: "4rem",
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
