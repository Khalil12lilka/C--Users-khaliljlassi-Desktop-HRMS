import React from 'react';
interface TableColumn<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}
interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  onRowClick?: (item: T) => void;
}
function Table<T>({
  columns,
  data,
  className = '',
  onRowClick
}: TableProps<T>) {
  return <div className="overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => <th key={index} scope="col" className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.className || ''}`}>
                {column.header}
              </th>)}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((item, rowIndex) => <tr key={rowIndex} className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''} onClick={() => onRowClick && onRowClick(item)}>
              {columns.map((column, colIndex) => <td key={colIndex} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${column.className || ''}`}>
                  {typeof column.accessor === 'function' ? column.accessor(item) : item[column.accessor] as React.ReactNode}
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>;
}
export default Table;