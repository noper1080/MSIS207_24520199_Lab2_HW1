import type { ColumnDef, SortState } from '../types/data-grid-contract';

export interface PageResult<T> {
  rows: T[];
  page: number;
  pageCount: number;
}

/** Cycle on the same column: none → ascending → descending → none. A new column starts ascending. */
export function nextSort<T>(current: SortState<T>, key: keyof T): SortState<T> {
  if (current.kind === 'none' || current.key !== key) {
    return { kind: 'sorted', key, direction: 'ascending' };
  }
  if (current.direction === 'ascending') {
    return { kind: 'sorted', key, direction: 'descending' };
  }
  return { kind: 'none' };
}

function compareValues(a: unknown, b: unknown): number {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b;
  }
  return String(a).localeCompare(String(b));
}

/** Returns a sorted copy; the input array is never mutated. */
export function sortRows<T>(rows: T[], sort: SortState<T>): T[] {
  if (sort.kind === 'none') {
    return rows;
  }
  const sign = sort.direction === 'ascending' ? 1 : -1;
  return [...rows].sort((a, b) => sign * compareValues(a[sort.key], b[sort.key]));
}

/** Case-insensitive substring match on any column. Uses includes(), not RegExp, so input like "(" is safe. */
export function filterRows<T>(rows: T[], columns: ColumnDef<T>[], query: string): T[] {
  const needle = query.trim().toLowerCase();
  if (needle === '') {
    return rows;
  }
  return rows.filter((row) =>
    columns.some((column) => String(row[column.accessorKey]).toLowerCase().includes(needle)),
  );
}

/** `page` is 1-based and clamped to [1, pageCount]; pageCount is at least 1 even with no rows. */
export function paginate<T>(rows: T[], page: number, pageSize: number): PageResult<T> {
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const current = Math.min(Math.max(1, page), pageCount);
  const start = (current - 1) * pageSize;
  return { rows: rows.slice(start, start + pageSize), page: current, pageCount };
}
