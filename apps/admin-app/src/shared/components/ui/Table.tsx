// apps/admin-app/src/shared/components/ui/Table.tsx
import React from 'react';

interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
}

export function Table<T>({ columns, data, onRowClick }: TableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full text-sm text-right">
        <thead className="bg-slate-800 text-slate-300">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, idx) => (
            <tr
              key={idx}
              onClick={() => onRowClick?.(item)}
              className="border-t border-slate-700 hover:bg-slate-800/50 cursor-pointer transition-colors"
            >
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-slate-200">
                  {col.render ? col.render(item) : String((item as any)[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}