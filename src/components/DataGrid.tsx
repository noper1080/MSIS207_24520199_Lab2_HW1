import { useId, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ColumnDef, DataGridProps, SortState } from '../types/data-grid-contract';
import { filterRows, nextSort, paginate, sortRows } from '../lib/grid';

const PAGE_SIZE = 10;

function describeSort<T>(sort: SortState<T>, columns: ColumnDef<T>[]): string {
  if (sort.kind === 'none') {
    return 'Sorting removed.';
  }
  const column = columns.find((c) => c.accessorKey === sort.key);
  return `Sorted by ${column?.header ?? String(sort.key)}, ${sort.direction}.`;
}

function describeResults(total: number, page: number, pageCount: number): string {
  return `${total} ${total === 1 ? 'result' : 'results'}. Page ${page} of ${pageCount}.`;
}

export default function DataGrid<T extends { id: string }>({
  data,
  columns,
  ariaLabel,
}: DataGridProps<T>) {
  const filterId = useId();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortState<T>>({ kind: 'none' });
  const [page, setPage] = useState(1);
  const [announcement, setAnnouncement] = useState('');
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const filtered = filterRows(data, columns, query);
  const view = paginate(sortRows(filtered, sort), page, PAGE_SIZE);

  function handleQueryChange(nextQuery: string) {
    const matches = filterRows(data, columns, nextQuery);
    setQuery(nextQuery);
    setPage(1);
    setAnnouncement(describeResults(matches.length, 1, paginate(matches, 1, PAGE_SIZE).pageCount));
  }

  function handleSort(key: keyof T) {
    const nextState = nextSort(sort, key);
    setSort(nextState);
    setPage(1);
    setAnnouncement(
      `${describeSort(nextState, columns)} ${describeResults(filtered.length, 1, view.pageCount)}`,
    );
  }

  /**
   * A pagination button that becomes disabled loses focus, so move focus to the other one.
   * flushSync commits the new page first; before that the target button may still be disabled.
   */
  function goToPage(nextPage: number) {
    flushSync(() => {
      setPage(nextPage);
      setAnnouncement(`Page ${nextPage} of ${view.pageCount}.`);
    });
    if (nextPage === 1) {
      nextRef.current?.focus();
    } else if (nextPage === view.pageCount) {
      prevRef.current?.focus();
    }
  }

  return (
    <div className="data-grid">
      <div className="grid-toolbar">
        <label htmlFor={filterId}>Filter rows</label>
        <input
          id={filterId}
          type="search"
          autoComplete="off"
          value={query}
          onChange={(event) => handleQueryChange(event.target.value)}
        />
      </div>

      <div className="grid-scroll">
        <table role="grid" aria-label={ariaLabel}>
          <caption>{ariaLabel}</caption>
          <thead>
            <tr role="row">
              {columns.map((column) => {
                const direction =
                  sort.kind === 'sorted' && sort.key === column.accessorKey
                    ? sort.direction
                    : undefined;
                return (
                  <th key={String(column.accessorKey)} scope="col" aria-sort={direction}>
                    {column.sortable ? (
                      <button type="button" onClick={() => handleSort(column.accessorKey)}>
                        {column.header}
                        {direction && (
                          <span aria-hidden="true">{direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                        )}
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                );
              })}
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
        <button
          ref={prevRef}
          type="button"
          disabled={view.page === 1}
          onClick={() => goToPage(view.page - 1)}
        >
          Previous
        </button>
        <p>
          Page {view.page} of {view.pageCount}
        </p>
        <button
          ref={nextRef}
          type="button"
          disabled={view.page === view.pageCount}
          onClick={() => goToPage(view.page + 1)}
        >
          Next
        </button>
      </nav>

      <p role="status" aria-live="polite" className="visually-hidden">
        {announcement}
      </p>
    </div>
  );
}
