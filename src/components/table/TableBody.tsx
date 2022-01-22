import { useTable } from "./tableContext";

type TableBodyProps<T> = {
  data: T[];
};

function TableBody<T>({ data }: TableBodyProps<T>) {
  const { columns } = useTable();

  return (
    <thead>
      {data.map((row, index) => (
        <tr key={index}>
          {columns.map((column) => (
            <td>{row[column.prop as keyof T]}</td>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export default TableBody;
