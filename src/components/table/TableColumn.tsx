import { useEffect } from "react";

import { useTable } from "./tableContext";

type TableColumnProps<T> = {
  prop: keyof T & string;
  label: string;
  width?: string;
};

function TableColumn<T>({ label, prop, width }: TableColumnProps<T>) {
  const { updateColumn } = useTable();

  useEffect(() => {
    updateColumn({ label, prop, width });
  }, [prop, label, width, updateColumn]);

  return null;
}

export default TableColumn;
