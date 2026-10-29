export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
}

/** Rows need a stable `id` so selection and React keys never depend on the row index. */
export interface DataGridProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowSelect?: (item: T) => void;
  ariaLabel: string;
}

/** `direction` uses the same values as `aria-sort`, so it can be passed straight through. */
export type SortState<T> =
  { kind: 'none' } | { kind: 'sorted'; key: keyof T; direction: 'ascending' | 'descending' };

/** row 0 is the header row; rows 1..n are the body rows of the current page. */
export interface CellPosition {
  row: number;
  col: number;
}

export type GridAction = 'up' | 'down' | 'left' | 'right' | 'select' | 'toggle';
