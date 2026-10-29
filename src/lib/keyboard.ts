import type { CellPosition, GridAction } from '../types/data-grid-contract';

/** Key bindings as data: changing a key only means editing this table. Keys are `KeyboardEvent.key` values. */
export const KEY_TO_ACTION: Record<string, GridAction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'select',
  ' ': 'toggle',
};

/** Returns null for keys the grid does not handle, so the browser keeps its default behaviour. */
export function getGridAction(key: string): GridAction | null {
  return Object.hasOwn(KEY_TO_ACTION, key) ? KEY_TO_ACTION[key] : null;
}

function clamp(value: number, max: number): number {
  return Math.min(Math.max(0, value), max);
}

/** `rowCount` includes the header row. Movement stops at the edges, it never wraps. */
export function moveCell(
  pos: CellPosition,
  action: GridAction,
  rowCount: number,
  colCount: number,
): CellPosition {
  const lastRow = rowCount - 1;
  const lastCol = colCount - 1;
  switch (action) {
    case 'up':
      return { row: clamp(pos.row - 1, lastRow), col: pos.col };
    case 'down':
      return { row: clamp(pos.row + 1, lastRow), col: pos.col };
    case 'left':
      return { row: pos.row, col: clamp(pos.col - 1, lastCol) };
    case 'right':
      return { row: pos.row, col: clamp(pos.col + 1, lastCol) };
    case 'select':
    case 'toggle':
      return pos;
    default: {
      const unhandled: never = action;
      return unhandled;
    }
  }
}
