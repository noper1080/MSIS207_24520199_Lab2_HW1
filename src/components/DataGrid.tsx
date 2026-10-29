import { useId } from 'react';
import type { DataGridProps } from '../types/data-grid-contract';
import { paginate } from '../lib/grid';

const PAGE_SIZE = 10;

export default function DataGrid<T extends { id: string }>({
  data,
  columns,
  ariaLabel,
}: DataGridProps<T>) {
  const filterId = useId();
  const view = paginate(data, 1, PAGE_SIZE);

  return (
    <div className="data-grid">
      <div className="grid-toolbar">
        <label htmlFor={filterId}>Filter rows</label>
        <input id={filterId} type="search" autoComplete="off" />
      </div>

      <div className="grid-scroll">
        <table role="grid" aria-label={ariaLabel}>
          <caption>{ariaLabel}</caption>
          <thead>
            <tr role="row">
              {columns.map((column) => (
                <th key={String(column.accessorKey)} scope="col">
                  {column.sortable ? <button type="button">{column.header}</button> : column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {view.rows.length === 0 ? (
              <tr role="row">
                <td role="gridcell" colSpan={columns.length}>
                  No results
                </td>
              </tr>
            ) : (
              view.rows.map((row) => (
                <tr key={row.id} role="row">
                  {columns.map((column) => (
                    <td key={String(column.accessorKey)} role="gridcell">
                      {String(row[column.accessorKey])}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <nav aria-label="Pagination" className="grid-pagination">
        <button type="button" disabled={view.page === 1}>
          Previous
        </button>
        <p>
          Page {view.page} of {view.pageCount}
        </p>
        <button type="button" disabled={view.page === view.pageCount}>
          Next
        </button>
      </nav>

      <p role="status" aria-live="polite" className="visually-hidden"></p>
    </div>
  );
}
