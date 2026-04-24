
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";


type Column<T> = {
  key: keyof T;
  label: string;
};

type variantTypes = 'simple' | 'striped'

type DynamicTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  variant?: variantTypes
};

const DynamicTable = <T extends object>({
  columns,
  data,
  variant = 'simple'
}: DynamicTableProps<T>) => {
  return (
    <TableContainer>
      <Table variant={variant} size="md">
        {/* HEADER */}
        <Thead>
          <Tr>
            {columns.map((col) => (
              <Th key={String(col.key)}>{col.label}</Th>
            ))}
          </Tr>
        </Thead>

        {/* BODY */}
        <Tbody>
          {data.map((row, rowIndex) => (
            <Tr key={rowIndex}>
              {columns.map((col) => (
                <Td key={String(col.key)}>
                  {String(row[col.key])}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default DynamicTable;