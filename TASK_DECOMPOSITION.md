# TASK_DECOMPOSITION.md — HW1: Accessible Data-Grid (WCAG 2.2 AA)

> MSSV: 24520199 · MSIS207 · Lab 2 · HW1
> Đọc `rule-lab2.md` trước. File này chỉ chứa phạm vi, contract và task của HW1.
> Mục tiêu: **một dự án gọn, đạt đủ yêu cầu của đề**, không thêm tính năng ngoài đề.

---

## 1. Phạm vi

### Làm (đúng yêu cầu đề)

| Yêu cầu | Cách đáp ứng |
|---|---|
| Sorting | Bấm nút ở header cột `sortable`: tăng dần → giảm dần → không sort |
| Filtering | 1 ô tìm kiếm chung, lọc theo chuỗi con, không phân biệt hoa thường |
| Pagination | Nút Previous / Next + "Page x of y", 10 hàng/trang |
| Native markup | `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<th scope="col">`, `<button>` |
| ARIA grid | `role="grid"` trên `<table>`, `role="row"` trên `<tr>`, `role="gridcell"` trên `<td>`, `aria-sort` trên `<th>` |
| Keyboard | Mũi tên di chuyển giữa các ô; Enter chọn hàng; Space toggle chọn hàng |
| Screen reader | Live region `aria-live="polite"` đọc kết quả sau sort/filter/đổi trang |
| Contrast 4.5:1 | Màu khai báo bằng token trong `:root`, có dark mode |
| Lighthouse 100 | Accessibility + Best Practices trên bản build |

### Không làm (ngoài đề)

Multi-column sort, filter theo từng cột, đổi page size, ẩn/hiện cột, resize cột, virtualization, Home/End/Ctrl+Home, unit test framework.

---

## 2. Contract (giữ nguyên của đề, chỉ thêm `id`)

```ts
// src/types/data-grid-contract.ts
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
```

- `T extends { id: string }`: rule §5.5 — selection và `key` theo `id`, không theo index.
- `direction` trùng giá trị với `aria-sort` để gán thẳng.

### Hàm thuần (`src/lib/grid.ts`)

```ts
nextSort(current, key)          // none → ascending → descending → none; đổi cột → ascending
sortRows(rows, sort)            // [...rows].sort(...), không mutate data
filterRows(rows, columns, query) // includes() trên String(value).toLowerCase(), không dùng RegExp
paginate(rows, page, pageSize)  // trả { rows, page (đã clamp), pageCount }
```

Pipeline: `data → filterRows → sortRows → paginate → render`. Kết quả là **derived**, không lưu vào state.
State trong component: `query`, `sort`, `page`, `selectedIds`, `activeCell { row, col }`.

### Keyboard

| Phím | Ở đâu | Hành vi |
|---|---|---|
| ↑ ↓ ← → | Mọi ô | Di chuyển 1 ô, dừng ở biên (hàng 0 = header) |
| Enter | Ô body | Chọn hàng, gọi `onRowSelect(row)` |
| Space | Ô body | Bật/tắt hàng trong `selectedIds`, `preventDefault()` để trang không cuộn |
| Enter / Space | Nút sort ở header | Hành vi native của `<button>` (không chặn) |
| Tab | Grid | Grid chỉ là 1 tab stop (roving tabindex), Tab tiếp thì rời grid |

Roving tabindex: chỉ ô đang active có `tabindex="0"`, các ô khác `-1`. Ở header, phần tử nhận focus là `<button>` sort.
Khi filter/đổi trang làm số hàng giảm → clamp `activeCell` vào phạm vi hợp lệ để focus không rơi về `<body>`.

---

## 3. Cấu trúc file

```
index.html                 # lang="en", title, viewport
src/
  main.tsx                 # StrictMode
  App.tsx                  # header, main#main-content, skip link, h1
  types/data-grid-contract.ts
  data/employees.ts        # ~30 hàng mẫu, có id
  lib/grid.ts              # 4 hàm thuần ở mục 2
  components/DataGrid.tsx  # bảng + filter + pagination + live region
  styles/tokens.css        # reset + biến màu light/dark
  styles/data-grid.css     # style bảng, focus ring, hàng được chọn
```

---

## 4. Task list (mỗi task = 1 prompt AI = 1 commit)

| # | Task | File | Acceptance | Commit |
|---|---|---|---|---|
| T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs(spec): add HW1 task decomposition` |
| T-02 | Scaffold Vite React-TS, xoá boilerplate, ESLint react-hooks | config, `index.html`, `main.tsx`, `App.tsx` | `npm run dev`, `lint`, `typecheck` sạch | `chore(setup): scaffold vite react-ts` |
| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2, không `any` | `feat(types): define data-grid contract` |
| T-04 | Mock data | `employees.ts` | ~30 hàng, có 1 hàng chứa `<img src=x onerror=alert(1)>` | `feat(data): add employee fixture` |
| T-05 | Hàm thuần sort/filter/paginate | `lib/grid.ts` | Không mutate input; filter `(` không crash | `feat(logic): add sort, filter, paginate` |
| T-06 | Markup bảng + filter + pagination + live region | `DataGrid.tsx`, `App.tsx` | Native table + role grid/row/gridcell, `<label>` cho input, skip link, 1 `<h1>` | `feat(html): render semantic data-grid` |
| T-07 | CSS | `tokens.css`, `data-grid.css` | Token màu, dark mode, contrast ≥ 4.5:1, focus ring rõ, hàng chọn có ✓ (không chỉ màu), 375px không scroll ngang | `feat(css): style data-grid with tokens` |
| T-08 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3 trạng thái, `aria-sort` đúng; filter/sort reset về trang 1; live region đọc kết quả | `feat(state): wire sort, filter, pagination` |
| T-09 | Keyboard: arrow + roving tabindex | `DataGrid.tsx` | Đúng bảng Keyboard; chỉ 1 `tabindex="0"`; focus không rơi về `<body>` | `feat(a11y): add arrow-key grid navigation` |
| T-10 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-selected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add enter-select and space-toggle` |
| T-11 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi | A11y 100, Best Practices 100, 0 lỗi console | `fix(a11y): …` / `docs(audit): …` |
| T-12 | AI_FAILURE_AUDIT.md (≥ 3 lỗi AI) | `AI_FAILURE_AUDIT.md` | Defect → Prompt/Output → Risk → Detection → Fix | `docs(audit): add AI failure audit` |

---

## 5. Checklist nghiệm thu

- [ ] Tab vào grid 1 lần, mũi tên di chuyển đúng, Tab tiếp thì ra khỏi grid
- [ ] Sort 3 trạng thái; `aria-sort` cập nhật; NVDA đọc thông báo
- [ ] Filter không khớp → hiện "No results"; gõ `(` hoặc `.*` không lỗi
- [ ] Enter chọn hàng (gọi `onRowSelect`), Space toggle, trang không cuộn
- [ ] Hàng XSS hiển thị dạng chữ, không alert
- [ ] 375px không scroll ngang trang; bảng cuộn trong khung riêng
- [ ] Contrast đạt ở light và dark
- [ ] Lighthouse Accessibility 100, Best Practices 100 (`npm run build && npm run preview`)
- [ ] `npm run lint` và `npm run typecheck` sạch, 0 lỗi console
