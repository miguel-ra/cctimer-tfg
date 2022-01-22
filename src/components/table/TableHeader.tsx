import { useTable } from "./tableContext";

function TableHeader() {
  const { columns } = useTable();

  return (
    <thead>
      <tr>
        {columns.map(({ prop, label, width }) => (
          <th key={prop} style={width ? { width } : undefined}>
            {label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
