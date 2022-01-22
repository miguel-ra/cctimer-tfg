import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type Column = {
  prop: string;
  label: string;
  width?: string;
};

type TableState = {
  columns: Column[];
  updateColumn: (column: Column) => void;
};

type TableProviderProps = {
  children: ReactNode;
};

const TableContext = createContext<TableState | null>(null);

function useTable() {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error("useTable must be used within the TableContext");
  }
  return context;
}

function TableProvider({ children }: TableProviderProps) {
  const [columns, setColumns] = useState<Column[]>([]);

  const updateColumn = useCallback((column: Column) => {
    setColumns((prevColumns) => {
      let newColumns = [...prevColumns];
      const columnIndex = newColumns.findIndex((element) => element.prop === column.prop);
      if (columnIndex === -1) {
        newColumns.push(column);
      } else {
        newColumns[columnIndex] = { ...column };
      }
      return newColumns;
    });
  }, []);

  return <TableContext.Provider value={{ columns, updateColumn }}>{children}</TableContext.Provider>;
}

export { TableProvider, useTable };
