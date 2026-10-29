import { useId, useRef, useState, type FocusEvent, type KeyboardEvent } from 'react';
import { flushSync } from 'react-dom';
import type {
  CellPosition,
  ColumnDef,
  DataGridProps,
  SortState,
} from '../types/data-grid-contract';
import { filterRows, nextSort, paginate, sortRows } from '../lib/grid';
import { getGridAction, moveCell } from '../lib/keyboard';

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
  onRowSelect,
  ariaLabel,
}: DataGridProps<T>) {
  const filterId = useId();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortState<T>>({ kind: 'none' });
  const [page, setPage] = useState(1);
  const [announcement, setAnnouncement] = useState('');
  const [activeCell, setActiveCell] = useState<CellPosition>({ row: 0, col: 0 });
  // Keyed by row id, so selection survives sorting, filtering and paging.
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const filtered = filterRows(data, columns, query);
  const view = paginate(sortRows(filtered, sort), page, PAGE_SIZE);

  // Row 0 is the header. With no results only the header row is navigable.
  const rowCount = view.rows.length + 1;
  // Clamp so the single tabindex="0" cell still exists after filtering or paging shrinks the grid.
  const active: CellPosition = {
    row: Math.min(activeCell.row, rowCount - 1),
    col: Math.min(activeCell.col, columns.length - 1),
  };
  const tabIndexFor = (row: number, col: number) =>
    row === active.row && col === active.col ? 0 : -1;

  /** Header cells with a sort button focus the button; every other cell focuses itself. */
  function focusCell(pos: CellPosition) {
    const cell = tableRef.current?.rows[pos.row]?.cells[pos.col];
    const target =
      cell?.firstElementChild instanceof HTMLButtonElement ? cell.firstElementChild : cell;
    target?.focus();
  }

  const rowLabel = (row: T) => String(row[columns[0].accessorKey]);

  /** Enter: make this the only selected row and notify the parent. */
  function selectRow(row: T) {
    setSelectedIds(new Set([row.id]));
    setAnnouncement(`${rowLabel(row)} selected.`);
    onRowSelect?.(row);
  }

  /** Space: add or remove this row from the selection. */
  function toggleRow(row: T) {
    const next = new Set(selectedIds);
    const wasSelected = next.delete(row.id);
    if (!wasSelected) {
      next.add(row.id);
    }
    setSelectedIds(next);
    setAnnouncement(`${rowLabel(row)} ${wasSelected ? 'deselected' : 'selected'}.`);
  }

  function handleGridKeyDown(event: KeyboardEvent<HTMLTableElement>) {
    const action = getGridAction(event.key);
    if (action === null) {
      return;
    }
    if (action === 'select' || action === 'toggle') {
      // In the header, Enter/Space belong to the native sort button.
      const row = view.rows[active.row - 1];
      if (active.row === 0 || row === undefined) {
        return;
      }
      // preventDefault stops Space from scrolling the page; repeats would flip the toggle repeatedly.
      event.preventDefault();
      if (event.repeat) {
        return;
      }
      if (action === 'select') {
        selectRow(row);
      } else {
        toggleRow(row);
      }
      return;
    }
    event.preventDefault();
    const next = moveCell(active, action, rowCount, columns.length);
    setActiveCell(next);
    focusCell(next);
  }

  /** Keeps the roving tabindex in sync when a cell is focused by mouse or Tab. */
  function handleGridFocus(event: FocusEvent<HTMLTableElement>) {
    const cell = event.target.closest('th, td');
    if (cell instanceof HTMLTableCellElement && cell.parentElement instanceof HTMLTableRowElement) {
      setActiveCell({ row: cell.parentElement.rowIndex, col: cell.cellIndex });
    }
  }

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
        <table
          ref={tableRef}
          role="grid"
          aria-label={ariaLabel}
          aria-multiselectable="true"
          onKeyDown={handleGridKeyDown}
          onFocus={handleGridFocus}
        >
          <caption>{ariaLabel}</caption>
          <thead>
            <tr role="row">
              {columns.map((column, colIndex) => {
                const direction =
                  sort.kind === 'sorted' && sort.key === column.accessorKey
                    ? sort.direction
                    : undefined;
                return (
                  <th
                    key={String(column.accessorKey)}
                    scope="col"
                    aria-sort={direction}
                    tabIndex={column.sortable ? undefined : tabIndexFor(0, colIndex)}
                  >
                    {column.sortable ? (
                      <button
                        type="button"
                        tabIndex={tabIndexFor(0, colIndex)}
                        onClick={() => handleSort(column.accessorKey)}
                      >
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
              view.rows.map((row, rowIndex) => (
                <tr key={row.id} role="row" aria-selected={selectedIds.has(row.id)}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={String(column.accessorKey)}
                      role="gridcell"
                      tabIndex={tabIndexFor(rowIndex + 1, colIndex)}
                    >
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
