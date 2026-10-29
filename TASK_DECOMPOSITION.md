# TASK_DECOMPOSITION.md — HW1: Accessible Data-Grid (WCAG 2.2 AA)

> MSSV: 24520199 · MSIS207 · Lab 2 · HW1
> Đọc `rule-lab2.md` trước. File này chỉ chứa phạm vi, contract và task của HW1.
> Mục tiêu (rule §0 Scope Guard): **làm tối thiểu, đủ đúng yêu cầu của đề**, không thêm tính năng.
> Cái gì không có trong file này → hỏi trước khi thêm.

---

## 1. Phạm vi

### Làm (đúng yêu cầu đề)

| Yêu cầu | Cách đáp ứng |
|---|---|
| Sorting | Bấm nút ở header cột `sortable`: tăng dần → giảm dần → không sort |
| Filtering | 1 ô tìm kiếm chung, lọc theo chuỗi con, không phân biệt hoa thường |
| Pagination | Nút Previous / Next + "Page x of y", 10 hàng/trang, đặt trong `<nav aria-label="Pagination">` |
| Native markup | `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`, `<button>` |
| ARIA grid | `role="grid"` trên `<table>`, `role="row"` trên `<tr>`, `role="gridcell"` trên `<td>`, `aria-sort` trên `<th>` |
| Keyboard | Mũi tên di chuyển giữa các ô; Enter chọn hàng; Space toggle chọn hàng |
| Screen reader | Live region `aria-live="polite"` đọc kết quả sau sort/filter/đổi trang |
| Landmarks | Skip link → `<header>` (chứa `<h1>`) → `<main id="main-content">` → `<nav>` phân trang |
| Contrast 4.5:1 | Một bộ màu sáng, khai báo bằng custom property trong `:root` |
| Lighthouse 100 | Accessibility + Best Practices trên bản build |

### Không làm (ngoài đề, rule §0)

Dark mode / theme toggle, animation, multi-column sort, filter theo từng cột, đổi page size,
ẩn/hiện/resize cột, virtualization, Home/End/Ctrl+Home, routing, backend, unit test framework.

---

## 2. Contract

### 2.1 Types (`src/types/data-grid-contract.ts`) — giữ nguyên của đề, chỉ thêm `id`

```ts
export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T;
  sortable?: boolean;
}

export interface DataGridProps<T extends { id: string }> {
  data: T[];
  columns: ColumnDef<T>[];
  onRowSelect?: (item: T) => void;
  ariaLabel: string;
}

export type SortState<T> =
  | { kind: 'none' }
  | { kind: 'sorted'; key: keyof T; direction: 'ascending' | 'descending' };

/** row 0 = hàng header, 1..n = hàng body của trang hiện tại. */
export interface CellPosition {
  row: number;
  col: number;
}

export type GridAction = 'up' | 'down' | 'left' | 'right' | 'select' | 'toggle';
```

- `T extends { id: string }`: selection và `key` theo `id`, không theo index.
- `direction` trùng giá trị với `aria-sort` để gán thẳng.
- `SortState` là discriminated union (rule §5.2), không dùng cặp boolean.

### 2.2 Logic dữ liệu (`src/lib/grid.ts`) — hàm thuần, không import React

```ts
nextSort(current, key)           // none → ascending → descending → none; đổi cột → ascending
sortRows(rows, sort)             // [...rows].sort(...), không mutate data
filterRows(rows, columns, query) // includes() trên String(value).toLowerCase(), không dùng RegExp
paginate(rows, page, pageSize)   // trả { rows, page (đã clamp), pageCount }
```

### 2.3 Logic bàn phím (`src/lib/keyboard.ts`) — hàm thuần, tách khỏi component (rule §12)

```ts
const KEY_TO_ACTION: Record<string, GridAction>   // bảng dữ liệu: 'ArrowUp' → 'up', 'Enter' → 'select', ' ' → 'toggle'
getGridAction(key: string): GridAction | null     // tra bảng, phím khác → null
moveCell(pos, action, rowCount, colCount): CellPosition // clamp ở biên, không wrap
```

Đổi phím trong Live Defense → chỉ sửa `KEY_TO_ACTION`.

### 2.4 Hành vi bàn phím

| Phím | Ở đâu | Hành vi |
|---|---|---|
| ↑ ↓ ← → | Mọi ô | Di chuyển 1 ô, dừng ở biên (hàng 0 = header) |
| Enter | Ô body | Chọn hàng, gọi `onRowSelect(row)` |
| Space | Ô body | Bật/tắt hàng trong `selectedIds`, `preventDefault()` để trang không cuộn |
| Enter / Space | Nút sort ở header | Hành vi native của `<button>` (không chặn) |
| Tab | Grid | Grid chỉ là 1 tab stop (roving tabindex), Tab tiếp thì rời grid |

- Roving tabindex: chỉ ô active có `tabindex="0"`, các ô khác `-1`. Ở header, phần tử nhận focus là `<button>` sort.
- Filter/đổi trang làm số hàng giảm → clamp ô active để focus không rơi về `<body>`.

### 2.5 State trong `DataGrid`

Chỉ lưu: `query`, `sort`, `page`, `selectedIds`, `activeCell`.
Pipeline derived (rule §5.4, không lưu state): `data → filterRows → sortRows → paginate → render`.
Đổi `query` hoặc `sort` → `page = 1`.

---

## 3. Cấu trúc file

```
index.html                  # lang="en", title, viewport
src/
  main.tsx                  # StrictMode
  App.tsx                   # skip link, header + h1, main#main-content
  types/data-grid-contract.ts
  data/employees.ts         # 20 hàng mẫu, có id
  lib/grid.ts               # sort / filter / paginate
  lib/keyboard.ts           # phím → hành động, di chuyển ô
  components/DataGrid.tsx   # markup + state, gọi lib/*
  styles/tokens.css         # reset + biến màu/spacing
  styles/data-grid.css      # style bảng, focus ring, hàng được chọn
```

Tách theo rule §12: logic dữ liệu, xử lý phím, markup, style nằm ở file khác nhau → mỗi thay đổi trong Live Defense chỉ đụng 1 file.

---

## 4. Task list (mỗi task = 1 prompt AI = 1 commit)

| # | Task | File | Acceptance | Commit | Trạng thái |
|---|---|---|---|---|---|
| T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs(spec): add HW1 task decomposition` | ✅ |
| T-02 | Scaffold Vite React-TS + ESLint react-hooks + Prettier | config, `index.html`, `main.tsx`, `App.tsx` | `dev`, `lint`, `typecheck`, `format:check` sạch | `chore(setup): …` | ✅ |
| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không `any` | `feat(types): define data-grid contract` | ✅ |
| T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa `<img src=x onerror=alert(1)>` | `feat(data): add employee fixture` | ✅ |
| T-05 | Sort / filter / paginate | `lib/grid.ts` | Không mutate input; filter `(` không crash | `feat(logic): add sort, filter, paginate` | ✅ |
| T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; clamp ở biên | `feat(logic): add grid keyboard helpers` | ✅ |
| T-07 | Markup: landmarks + bảng + filter + pagination + live region | `DataGrid.tsx`, `App.tsx` | Native table + role grid/row/gridcell, `<label for>` cho input, skip link, `<header>`/`<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data-grid` | ✅ |
| T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): style data-grid with tokens` | ✅ |
| T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3 trạng thái, `aria-sort` đúng; filter/sort về trang 1; live region đọc kết quả | `feat(state): wire sort, filter, pagination` | ✅ |
| T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>` | `feat(a11y): add arrow-key grid navigation` | ✅ |
| T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-selected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add enter-select and space-toggle` | |
| T-12 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi | A11y 100, Best Practices 100, 0 lỗi console, CLS 0 | `fix(a11y): …` / `docs(audit): …` | |

> `AI_FAILURE_AUDIT.md` không làm cho HW1 (rule §8 chỉ yêu cầu ở HW3).

---

## 5. Checklist nghiệm thu

- [ ] Skip link là phần tử focus đầu tiên; có `<header>`, `<main>`, `<nav>`; đúng 1 `<h1>`
- [ ] Tab vào grid 1 lần, mũi tên di chuyển đúng, Tab tiếp thì ra khỏi grid
- [ ] Sort 3 trạng thái; `aria-sort` cập nhật; NVDA đọc thông báo
- [ ] Filter không khớp → hiện "No results"; gõ `(` hoặc `.*` không lỗi
- [ ] Enter chọn hàng (gọi `onRowSelect`), Space toggle, trang không cuộn
- [ ] Hàng XSS hiển thị dạng chữ, không alert
- [ ] 375px không scroll ngang trang; bảng cuộn trong khung riêng
- [ ] Contrast text ≥ 4.5:1, focus ring/UI ≥ 3:1
- [ ] Lighthouse Accessibility 100, Best Practices 100 (`npm run build && npm run preview`)
- [ ] `lint`, `typecheck`, `format:check` sạch; 0 lỗi console
