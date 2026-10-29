
> <ide_opened_file>The user opened the file d:\Đại học\Phát triển ứng dụng web
  MSIS207\thuc_hanh\Lab2\MSIS207_24520199_Lab2_HW1\TASK_DECOMPOSITION.md in the
  IDE. This may or may not be related to the current task.</ide_opened_file>
  ⎿  [Image #1]

> phân tích bài tập trên và rule được viết ở rule-lab2. nói sơ bộ về kế hoạch
  làm bài và tiến hành xây dựng file TASK_DECOMPOSITION.md

  Ran 1 shell command (ctrl+o to expand)

● Write(TASK_DECOMPOSITION.md)
  ⎿  Wrote 494 lines to TASK_DECOMPOSITION.md
      1 # TASK_DECOMPOSITION.md — HW1: Production Enterprise Data-Grid (W
        CAG 2.2 AA)
      2
      3 > MSSV: 24520199 · Môn: MSIS207 · Lab 2 · Homework 1 (1 tuần)
      4 > **Đọc `rule-lab2.md` trước khi đọc file này.** File này chỉ chứ
        a contract và kế hoạch riêng của HW1.
      5 > Mọi thay đổi contract (mục 3) phải được cập nhật tại đây trước
        khi sửa code (rule §5.7).
      6
      7 ---
     … +487 lines (ctrl+o to expand)

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      468  
      469  ## 8. Kế hoạch AI_FAILURE_AUDIT (lỗi AI dự kiến cần săn)
      470  
      471 -1. `[...]`-less `data.sort(...)` → mutate prop (phát hiện: dữ 
          -liệu frozen throw / `git diff`).                              
      471 +1. Gọi `data.sort(...)` trực tiếp (không copy `[...data]`) → m
          +utate prop (phát hiện: dữ liệu frozen throw / `git diff`).    
      472  2. `key={index}` trong body → mất focus/selection khi sort (ph
           át hiện: DevTools Elements nhấp nháy, React DevTools).
      473  3. `<div role="button" onClick>` hoặc `<td onClick>` thay cho 
           `<button>` (phát hiện: axe, keyboard).
      474  4. `tabindex="0"` trên mọi ô → hàng trăm tab stop (phát hiện: 
           phím Tab, kiểm I1).

● Tài liệu được viết cho bạn (sinh viên), giảng viên và các AI agent sẽ đọc
  rule-lab2.md trước.

  Mình đã viết xong TASK_DECOMPOSITION.md. Mình chưa commit gì cả.

  Phân tích đề

  Đề yêu cầu làm một Data-Grid có sắp xếp (sort), lọc (filter) và phân trang
  (pagination). Các điều kiện chính:
  - Đạt chuẩn WCAG 2.2 AA.
  - Lighthouse đạt 100/100 ở mục Accessibility và Best Practices.
  - Di chuyển giữa các ô bằng phím mũi tên, Enter để chọn, Space để bật/tắt
    chọn.
  - Dùng thẻ <table> gốc của HTML, không xếp bảng bằng một đống <div>.

  rule-lab2.md thêm các ràng buộc:
  - Dùng React 18 + TypeScript strict + Vite.
  - Cấm dùng thư viện bảng có sẵn như AG Grid hay TanStack.
  - Không được thay đổi trực tiếp mảng data; không dùng key={index}.
  - Dữ liệu đã sort/lọc/phân trang phải tính ra từ dữ liệu gốc, không lưu riêng
    vào state.
  - Focus không bao giờ được rơi về <body>.
  - Kết quả sort/lọc phải được đọc cho screen reader qua aria-live.

  Những chỗ khó và cách mình chọn (mục 1.3 trong file)

  1. Bảng gốc kết hợp với vai trò grid của ARIA: dùng <table role="grid">, mỗi
     <tr> có role="row", mỗi <td> có role="gridcell". Header vẫn là <th
     scope="col">, và cột nào sort được thì chứa một <button>.
  2. Enter và Space ở hàng tiêu đề: khi focus đang ở nút sort, để nút tự xử lý
     Enter/Space như bình thường. Ở phần thân bảng thì:
     - Enter chọn đúng một hàng và gọi onRowSelect.
     - Space bật/tắt hàng đó trong danh sách nhiều hàng được chọn.
  3. Chỉ một ô nhận Tab (roving tabindex): cả bảng chỉ có một ô tabindex="0",
     nên Tab đi vào bảng một lần rồi đi ra. Vị trí focus được nhớ theo (rowId,
     columnKey) thay vì số thứ tự, để focus không bị lạc khi sort, lọc hay đổi
     trang.
  4. Bẫy với nút Next bị disabled: bấm Next tới trang cuối làm chính nút đó bị
     vô hiệu hóa, và focus rơi về <body>. Cách xử lý là chuyển focus sang nút
     của trang hiện tại.
  5. Phân trang với screen reader: dùng aria-rowcount và aria-rowindex để screen
     reader biết tổng số hàng, dù mỗi lần chỉ hiển thị một trang.

  Kế hoạch 7 ngày (26 task, mỗi task một commit)

  ┌──────┬───────────────────────────────────────────────────────────────────┐
  │ Ngày │                               Việc                                │
  ├──────┼───────────────────────────────────────────────────────────────────┤
  │ 1    │ Viết tài liệu kế hoạch, dựng dự án Vite, cấu hình ESLint          │
  ├──────┼───────────────────────────────────────────────────────────────────┤
  │ 2    │ Viết các kiểu dữ liệu (types) trước, rồi các hàm thuần: sort,     │
  │      │ lọc, phân trang, di chuyển focus, bảng phím tắt                   │
  ├──────┼───────────────────────────────────────────────────────────────────┤
  │ 3    │ Viết HTML ngữ nghĩa cho bảng (chưa có CSS)                        │
  ├──────┼───────────────────────────────────────────────────────────────────┤
  │ 4    │ Các biến màu và khoảng cách cho chế độ sáng/tối, giao diện ở màn  │
  │      │ hình 375px                                                        │
  ├──────┼───────────────────────────────────────────────────────────────────┤
  │ 5    │ Nối các thao tác, xử lý bàn phím, giữ focus, thông báo cho screen │
  │      │  reader                                                           │
  ├──────┼───────────────────────────────────────────────────────────────────┤
  │ 6    │ Kiểm tra bằng Lighthouse, axe, NVDA, zoom 200% và bộ nhớ          │
  ├──────┼───────────────────────────────────────────────────────────────────┤
  │ 7    │ Viết AI_FAILURE_AUDIT.md và tập dượt Live Defense                 │
  └──────┴───────────────────────────────────────────────────────────────────┘

  File còn có thêm:
  - Contract đầy đủ: giữ nguyên các field của đề, chỉ thêm field tùy chọn.
  - Bảng phím tắt.
  - 6 điều kiện bất biến về DOM.
  - 15 kịch bản kiểm thử.
  - Bảng cho biết khi giảng viên yêu cầu sửa trong Live Defense thì cần sửa file
    nào.
  - 8 lỗi AI hay mắc, để ghi vào AI_FAILURE_AUDIT.md.

  Cần hỏi giảng viên (mục 9)

  - Bài này dùng React thật hay phải tự viết mini-React?
  - Có được cài thêm Vitest để kiểm thử các hàm không? Rule không có trong danh
    sách cho phép, nên mình chưa đưa vào.
  - Cách chia Enter = chọn một hàng, Space = bật/tắt chọn nhiều hàng có đúng ý
    đề không?
  - Chỉ cần một ô tìm kiếm chung cho cả bảng, hay phải có bộ lọc riêng cho từng
    cột?

  Nếu bạn đồng ý với kế hoạch, bước tiếp theo là T-01 (commit file này) rồi T-02
  (dựng dự án Vite).

> <ide_opened_file>The user opened the file d:\Đại học\Phát triển ứng dụng web
  MSIS207\thuc_hanh\Lab2\MSIS207_24520199_Lab2_HW1\TASK_DECOMPOSITION.md in the
  IDE. This may or may not be related to the current task.</ide_opened_file>

> ừm tôi thấy scope có hơi to nhỉ mình chỉ làm 1 dự án đơn giản đạt đủ yêu cầu
  từ đề bài thôi.

● Write(TASK_DECOMPOSITION.md)
  ⎿  Added 79 lines, removed 444 lines
       1 -# TASK_DECOMPOSITION.md — HW1: Production Enterprise Data-Grid 
         -(WCAG 2.2 AA)                                                  
       1 +# TASK_DECOMPOSITION.md — HW1: Accessible Data-Grid (WCAG 2.2 A
         +A)                                                             
       2  
       3 -> MSSV: 24520199 · Môn: MSIS207 · Lab 2 · Homework 1 (1 tuần)  
       4 -> **Đọc `rule-lab2.md` trước khi đọc file này.** File này chỉ c
         -hứa contract và kế hoạch riêng của HW1.                        
       5 -> Mọi thay đổi contract (mục 3) phải được cập nhật tại đây trướ
         -c khi sửa code (rule §5.7).                                    
       3 +> MSSV: 24520199 · MSIS207 · Lab 2 · HW1                       
       4 +> Đọc `rule-lab2.md` trước. File này chỉ chứa phạm vi, contract
         + và task của HW1.                                              
       5 +> Mục tiêu: **một dự án gọn, đạt đủ yêu cầu của đề**, không thê
         +m tính năng ngoài đề.                                          
       6  
       7  ---
       8  
       9 -## 1. Phân tích đề bài                                         
       9 +## 1. Phạm vi                                                  
      10  
      11 -### 1.1 Yêu cầu gốc (từ đề)                                    
      11 +### Làm (đúng yêu cầu đề)                                      
      12  
      13 -| # | Yêu cầu | Diễn giải kỹ thuật |                           
      14 -|---|---|---|                                                  
      15 -| R1 | Data-Grid đầy đủ: **sorting, filtering, pagination** | 3
         - pure function `sortRows`, `filterRows`, `paginate` chạy theo p
         -ipeline; không mutate `data` |                                 
      16 -| R2 | **WCAG 2.2 AA**, contrast **4.5:1**, hỗ trợ screen reade
         -r đầy đủ | Token màu đã kiểm tra contrast (light + dark), `aria
         --sort`, `aria-selected`, `aria-rowcount/rowindex`, live region 
         -thông báo kết quả |                                            
      17 -| R3 | **Arrow keys** di chuyển giữa các ô; **Enter** chọn; **S
         -pace** toggle | Pattern ARIA Grid + roving tabindex (chỉ 1 ô `t
         -abindex="0"`) |                                                
      18 -| R4 | Lighthouse **100/100** Accessibility + Best Practices | 
         -Audit trên bản build (`vite preview`), 0 lỗi console, 0 vi phạm
         - axe |                                                         
      19 -| R5 | **Zero div-soup**: `<table>`, `<thead>`, `<tbody>`, `<th
         - scope="col">`, `<button>` | Bảng native; nút sort là `<button>
         -` bên trong `<th>`; `<div>` chỉ dùng làm khung cuộn |          
      20 -| R6 | Contract `ColumnDef<T>`, `DataGridProps<T>` | Giữ nguyên
         - các field của đề, chỉ **mở rộng** (không xoá/đổi tên) |       
      21 -| R7 | Invariant: `role="grid"`, `role="row"`, `role="gridcell"
         -` | Gắn role tường minh lên `<table>`, `<tr>`, `<td>`; header d
         -ùng `<th scope="col">` (role ngầm định `columnheader`) |       
      13 +| Yêu cầu | Cách đáp ứng |                                     
      14 +|---|---|                                                      
      15 +| Sorting | Bấm nút ở header cột `sortable`: tăng dần → giảm dầ
         +n → không sort |                                               
      16 +| Filtering | 1 ô tìm kiếm chung, lọc theo chuỗi con, không phâ
         +n biệt hoa thường |                                            
      17 +| Pagination | Nút Previous / Next + "Page x of y", 10 hàng/tra
         +ng |                                                           
      18 +| Native markup | `<table>`, `<caption>`, `<thead>`, `<tbody>`,
         + `<th scope="col">`, `<button>` |                              
      19 +| ARIA grid | `role="grid"` trên `<table>`, `role="row"` trên `
         +<tr>`, `role="gridcell"` trên `<td>`, `aria-sort` trên `<th>` |
      20 +| Keyboard | Mũi tên di chuyển giữa các ô; Enter chọn hàng; Spa
         +ce toggle chọn hàng |                                          
      21 +| Screen reader | Live region `aria-live="polite"` đọc kết quả 
         +sau sort/filter/đổi trang |                                    
      22 +| Contrast 4.5:1 | Màu khai báo bằng token trong `:root`, có da
         +rk mode |                                                      
      23 +| Lighthouse 100 | Accessibility + Best Practices trên bản buil
         +d |                                                            
      24  
      23 -### 1.2 Ràng buộc từ `rule-lab2.md` áp dụng cho HW1            
      25 +### Không làm (ngoài đề)                                       
      26  
      25 -- Stack: React 18 + TypeScript `strict` + Vite; CSS thuần với c
         -ustom properties. **Cấm** AG Grid, TanStack Table, MUI DataGrid
         -, react-table, Tailwind, UI kit, CSS-in-JS (§1).               
      26 -- Không `innerHTML`/`dangerouslySetInnerHTML`; không `key={inde
         -x}`; không `.sort()` trực tiếp trên `data`; không `keyCode`/`ke
         -ypress` (§2).                                                  
      27 -- Derived data (sorted/filtered/paged rows) **tính toán, không 
         -lưu vào state** (§6.3).                                        
      28 -- Selection keyed theo `id`, không theo index (§12 HW1).       
      29 -- Focus phải sống sót qua sort/filter/đổi trang, không bao giờ 
         -rơi về `<body>` (§3.8).                                        
      30 -- Thông báo kết quả bất đồng bộ qua `aria-live="polite"`, không
         - cướp focus (§3.7).                                            
      31 -- Target tương tác ≥ 24×24 px; focus ring ≥ 3:1; không truyền t
         -hông tin chỉ bằng màu (§3.9).                                  
      32 -- Mobile-first 375px; bảng cuộn ngang trong container `overflow
         --x: auto` riêng (§4.5).                                        
      33 -- Filter text là dữ liệu không tin cậy: không dựng `RegExp` từ 
         -input thô (§8).                                                
      34 -- Tách logic / markup / style / keyboard ra file riêng để Live 
         -Defense chỉ đụng 1 file (§16).                                 
      27 +Multi-column sort, filter theo từng cột, đổi page size, ẩn/hiện
         + cột, resize cột, virtualization, Home/End/Ctrl+Home, unit test
         + framework.                                                    
      28  
      36 -### 1.3 Các điểm khó cần quyết định thiết kế                   
      37 -                                                               
      38 -1. **Bảng native + ARIA grid cùng lúc.** `<table role="grid">` 
         -là hợp lệ theo ARIA in HTML. Bảng vẫn giữ `<caption>`, `<thead>
         -`, `<tbody>`, `<th scope="col">`; chỉ thêm role để screen reade
         -r bật chế độ tương tác grid.                                   
      39 -2. **Ô header chứa `<button>`.** Theo APG Grid pattern, khi ô c
         -hứa đúng một widget thì focus đặt vào widget đó. → Ở hàng heade
         -r, phần tử nhận roving tabindex là **nút sort** (nếu cột `sorta
         -ble`), còn lại là chính `<th>`.                                
      40 -3. **Enter vs Space.** Enter/Space trên nút sort là hành vi nat
         -ive của `<button>` → handler bàn phím của grid **không** `preve
         -ntDefault` khi target là nút header. Ở body:                   
      41 -   - **Enter** = chọn hàng (single select): selection = `{row.i
         -d}`, gọi `onRowSelect(row)`.                                   
      42 -   - **Space** = toggle hàng trong tập multi-select; `preventDe
         -fault()` để trang không cuộn.                                  
      43 -4. **Focus sau khi dữ liệu thay đổi.** Lưu vị trí focus dưới dạ
         -ng **(rowId | 'header', columnKey)** chứ không phải chỉ số. Khi
         - hàng đó biến mất (bị lọc / sang trang khác) → clamp về cùng ch
         -ỉ số hàng hợp lệ gần nhất, nếu trang rỗng → về header.         
      44 -5. **Nút phân trang bị `disabled`.** Bấm "Next" tới trang cuối 
         -làm nút đó `disabled` → focus rơi về `<body>` (vi phạm §3.8). →
         - Khi điều này xảy ra, chuyển focus sang nút trang hiện tại (`ar
         -ia-current="page"`).                                           
      45 -6. **Pagination và screen reader.** Chỉ render 1 trang → đặt `a
         -ria-rowcount` = tổng số hàng sau lọc + 1 (header), mỗi `<tr>` c
         -ó `aria-rowindex` tuyệt đối.                                   
      46 -7. **Trạng thái rỗng.** Khi filter không khớp hàng nào: render 
         -1 hàng `<td colSpan>` thông báo "No results", vẫn là `role="row
         -"`/`gridcell` hợp lệ — trạng thái rỗng là state tường minh (§10
         -).                                                             
      47 -                                                               
      29  ---
      30  
      50 -## 2. Kế hoạch tổng thể (Roadmap 1 tuần)                       
      31 +## 2. Contract (giữ nguyên của đề, chỉ thêm `id`)              
      32  
      52 -| Ngày | Giai đoạn | Đầu ra | Task |                           
      53 -|---|---|---|---|                                              
      54 -| 1 | Spec + Scaffold | WBS này, Vite + TS strict + ESLint, cấu
         - trúc thư mục | T-01 → T-03 |                                  
      55 -| 2 | Contract + Pure logic | Types, `sortRows`, `filterRows`, 
         -`paginate`, `moveFocus`, keymap | T-04 → T-09 |                
      56 -| 3 | Semantic markup | `DataGrid`, header, body, filter bar, p
         -agination, live region (chưa có style) | T-10 → T-14 |         
      57 -| 4 | CSS | Reset, tokens light/dark, layout responsive 375px |
         - T-15 → T-17 |                                                 
      58 -| 5 | Behavior + Keyboard | Wire state, roving tabindex, giữ fo
         -cus, selection, thông báo live | T-18 → T-21 |                 
      59 -| 6 | Audit + Fix | Lighthouse, axe, NVDA, keyboard-only, 200% 
         -zoom, Memory | T-22 → T-24 |                                   
      60 -| 7 | Báo cáo + Dry-run Live Defense | `AI_FAILURE_AUDIT.md`, R
         -EADME, tập mutation | T-25 → T-26 |                            
      61 -                                                               
      62 -Thứ tự commit theo §14: **spec → scaffold → types → pure logic 
         -→ semantic markup → tokens/CSS → state/behavior → keyboard/a11y
         - → audit → AI failure report.**                                
      63 -                                                               
      64 ----                                                            
      65 -                                                               
      66 -## 3. Contracts (Contract-First — commit trước mọi implementati
         -on)                                                            
      67 -                                                               
      68 -### 3.1 Contract gốc của đề (KHÔNG được xoá/đổi tên field)     
      69 -                                                               
      33  ```ts
      34  // src/types/data-grid-contract.ts
      35  export interface ColumnDef<T> {
     ...
       38    sortable?: boolean;
       39  }
       40  
       78 -export interface DataGridProps<T> {                           
       41 +export interface DataGridProps<T extends { id: string }> {    
       42    data: T[];
       43    columns: ColumnDef<T>[];
       44    onRowSelect?: (item: T) => void;
       45    ariaLabel: string;
       46  }
       84 -// Invariant: Full ARIA grid semantics (role="grid", role="row
          -", role="gridcell")                                           
       85 -```                                                           
       47  
       87 -### 3.2 Mở rộng (chỉ thêm field optional, tương thích ngược)  
       88 -                                                              
       89 -```ts                                                         
       90 -export type RowId = string;                                   
       91 -                                                              
       92 -/** Mọi hàng phải có id ổn định (rule §5.4, §6.5). */         
       93 -export interface Identifiable {                               
       94 -  readonly id: RowId;                                         
       95 -}                                                             
       96 -                                                              
       97 -export interface ColumnDef<T> {                               
       98 -  header: string;                                             
       99 -  accessorKey: keyof T;                                       
      100 -  sortable?: boolean;                                         
      101 -  /** Cột có tham gia tìm kiếm của filter không. Mặc định: tru
          -e. */                                                         
      102 -  filterable?: boolean;                                       
      103 -  /** Định dạng hiển thị; trả về string (text, không bao giờ l
          -à HTML). */                                                   
      104 -  format?: (value: T[keyof T], row: T) => string;             
      105 -}                                                             
      106 -                                                              
      107 -export interface DataGridProps<T extends Identifiable> {      
      108 -  data: readonly T[];                                         
      109 -  columns: readonly ColumnDef<T>[];                           
      110 -  onRowSelect?: (item: T) => void;                            
      111 -  ariaLabel: string;                                          
      112 -  /** Số hàng mỗi trang. Mặc định: 10. */                     
      113 -  pageSize?: number;                                          
      114 -  /** Caption hiển thị của bảng. Mặc định: ariaLabel. */      
      115 -  caption?: string;                                           
      116 -}                                                             
       48 +export type SortState<T> =                                    
       49 +  | { kind: 'none' }                                          
       50 +  | { kind: 'sorted'; key: keyof T; direction: 'ascending' | '
          +descending' };                                                
       51  ```
       52  
      119 -> Ghi chú: `data: T[]` → `readonly T[]` là nới lỏng tham số (m
          -ảng thường vẫn truyền được), không phá contract gốc.          
       53 +- `T extends { id: string }`: rule §5.5 — selection và `key` t
          +heo `id`, không theo index.                                   
       54 +- `direction` trùng giá trị với `aria-sort` để gán thẳng.     
       55  
      121 -### 3.3 State types (discriminated unions — rule §5.3)        
       56 +### Hàm thuần (`src/lib/grid.ts`)                             
       57  
       58  ```ts
      124 -export type SortDirection = 'ascending' | 'descending';       
      125 -                                                              
      126 -/** Giá trị trùng tên với aria-sort để map trực tiếp. */      
      127 -export type SortState<T> =                                    
      128 -  | { readonly kind: 'unsorted' }                             
      129 -  | { readonly kind: 'sorted'; readonly key: keyof T; readonly
          - direction: SortDirection };                                  
      130 -                                                              
      131 -export interface PageState {                                  
      132 -  readonly pageIndex: number; // 0-based                      
      133 -  readonly pageSize: number;                                  
      134 -}                                                             
      135 -                                                              
      136 -export interface PageResult<T> {                              
      137 -  readonly rows: readonly T[];                                
      138 -  readonly pageIndex: number;  // đã clamp                    
      139 -  readonly pageCount: number;  // >= 1                        
      140 -  readonly totalRows: number;  // tổng sau filter             
      141 -  readonly startRowIndex: number; // chỉ số tuyệt đối của hàng
          - đầu trang (cho aria-rowindex)                                
      142 -}                                                             
      143 -                                                              
      144 -/** Vị trí focus theo danh tính, không theo chỉ số. */        
      145 -export type FocusTarget<T> =                                  
      146 -  | { readonly area: 'header'; readonly columnKey: keyof T }  
      147 -  | { readonly area: 'body'; readonly rowId: RowId; readonly c
          -olumnKey: keyof T };                                          
      148 -                                                              
      149 -/** Vị trí lưới tính bằng chỉ số (dùng nội bộ cho phép tính di
          - chuyển). */                                                  
      150 -export interface CellCoord {                                  
      151 -  readonly row: number; // 0 = header, 1..n = hàng body của tr
          -ang hiện tại                                                  
      152 -  readonly col: number;                                       
      153 -}                                                             
      154 -                                                              
      155 -export type GridAction =                                      
      156 -  | 'MOVE_UP' | 'MOVE_DOWN' | 'MOVE_LEFT' | 'MOVE_RIGHT'      
      157 -  | 'MOVE_ROW_START' | 'MOVE_ROW_END'      // Home / End      
      158 -  | 'MOVE_GRID_START' | 'MOVE_GRID_END'    // Ctrl+Home / Ctrl
          -+End                                                          
      159 -  | 'SELECT_ROW'                           // Enter           
      160 -  | 'TOGGLE_ROW';                          // Space           
      161 -                                                              
      162 -export type SelectionState = ReadonlySet<RowId>;              
      163 -                                                              
      164 -export type GridView<T> =                                     
      165 -  | { readonly status: 'empty'; readonly reason: 'no-data' | '
          -no-match' }                                                   
      166 -  | { readonly status: 'ready'; readonly page: PageResult<T> }
          -;                                                             
       59 +nextSort(current, key)          // none → ascending → descendi
          +ng → none; đổi cột → ascending                                
       60 +sortRows(rows, sort)            // [...rows].sort(...), không 
          +mutate data                                                   
       61 +filterRows(rows, columns, query) // includes() trên String(val
          +ue).toLowerCase(), không dùng RegExp                          
       62 +paginate(rows, page, pageSize)  // trả { rows, page (đã clamp)
          +, pageCount }                                                 
       63  ```
       64  
      169 -### 3.4 Pure function signatures                              
       65 +Pipeline: `data → filterRows → sortRows → paginate → render`. 
          +Kết quả là **derived**, không lưu vào state.                  
       66 +State trong component: `query`, `sort`, `page`, `selectedIds`,
          + `activeCell { row, col }`.                                   
       67  
      171 -```ts                                                         
      172 -// src/lib/sort.ts                                            
      173 -export function nextSortState<T>(current: SortState<T>, key: k
          -eyof T): SortState<T>;                                        
      174 -//   Chu kỳ: unsorted → ascending → descending → unsorted (đổi
          - cột → ascending)                                             
      175 -export function sortRows<T>(rows: readonly T[], sort: SortStat
          -e<T>): readonly T[];                                          
      176 -//   Copy trước khi sort; stable; so sánh số theo số, chuỗi th
          -eo Intl.Collator (numeric, sensitivity 'base'); null/undefined
          - xếp cuối                                                     
       68 +### Keyboard                                                  
       69  
      178 -// src/lib/filter.ts                                          
      179 -export function filterRows<T>(rows: readonly T[], columns: rea
          -donly ColumnDef<T>[], query: string): readonly T[];           
      180 -//   Trim + so khớp substring không phân biệt hoa thường (toLo
          -caleLowerCase); KHÔNG dùng RegExp từ input                    
       70 +| Phím | Ở đâu | Hành vi |                                    
       71 +|---|---|---|                                                 
       72 +| ↑ ↓ ← → | Mọi ô | Di chuyển 1 ô, dừng ở biên (hàng 0 = heade
          +r) |                                                          
       73 +| Enter | Ô body | Chọn hàng, gọi `onRowSelect(row)` |        
       74 +| Space | Ô body | Bật/tắt hàng trong `selectedIds`, `preventD
          +efault()` để trang không cuộn |                               
       75 +| Enter / Space | Nút sort ở header | Hành vi native của `<but
          +ton>` (không chặn) |                                          
       76 +| Tab | Grid | Grid chỉ là 1 tab stop (roving tabindex), Tab t
          +iếp thì rời grid |                                            
       77  
      182 -// src/lib/paginate.ts                                        
      183 -export function paginate<T>(rows: readonly T[], page: PageStat
          -e): PageResult<T>;                                            
      184 -//   Clamp pageIndex vào [0, pageCount-1]; pageCount tối thiểu
          - 1                                                            
       78 +Roving tabindex: chỉ ô đang active có `tabindex="0"`, các ô kh
          +ác `-1`. Ở header, phần tử nhận focus là `<button>` sort.     
       79 +Khi filter/đổi trang làm số hàng giảm → clamp `activeCell` vào
          + phạm vi hợp lệ để focus không rơi về `<body>`.               
       80  
      186 -// src/lib/grid-navigation.ts                                 
      187 -export function moveFocus(coord: CellCoord, action: GridAction
          -, bounds: { rows: number; cols: number }): CellCoord;         
      188 -//   Không wrap; clamp tại biên; exhaustive switch + never che
          -ck                                                            
      189 -export function resolveFocus<T>(target: FocusTarget<T>, ...): 
          -CellCoord; // FocusTarget → CellCoord (clamp nếu hàng biến mất
          -)                                                             
      190 -                                                              
      191 -// src/lib/keymap.ts                                          
      192 -export const GRID_KEYMAP: Readonly<Record<string, GridAction>>
          -;                                                             
      193 -export function toGridAction(event: Pick<KeyboardEvent, 'key' 
          -| 'ctrlKey' | 'metaKey'>): GridAction | null;                 
      194 -//   Bảng keybinding là DATA (rule §7.3) → Live Defense "đổi p
          -hím" chỉ sửa 1 dòng                                           
      195 -                                                              
      196 -// src/lib/selection.ts                                       
      197 -export function toggleSelection(sel: SelectionState, id: RowId
          -): SelectionState; // trả Set mới                             
      198 -export function selectOnly(id: RowId): SelectionState;        
      199 -                                                              
      200 -// src/lib/announce.ts                                        
      201 -export function describeView(...): string; // "Sorted by Name,
          - ascending. 42 results. Page 2 of 5."                         
      202 -```                                                           
      203 -                                                              
      204 -### 3.5 Keyboard contract                                     
      205 -                                                              
      206 -| Phím | Ngữ cảnh | Hành vi | `preventDefault` |              
      207 -|---|---|---|---|                                             
      208 -| ↑ ↓ ← → | Mọi ô | Di chuyển 1 ô, dừng ở biên (không wrap) | 
          -Có |                                                          
      209 -| Home / End | Mọi ô | Ô đầu / cuối của hàng | Có |           
      210 -| Ctrl+Home / Ctrl+End | Mọi ô | Ô đầu header / ô cuối hàng cu
          -ối của trang | Có |                                           
      211 -| Enter | Ô body | Chọn hàng (single), gọi `onRowSelect(row)` 
          -| Có |                                                        
      212 -| Space | Ô body | Toggle hàng trong tập chọn (multi) | Có (ch
          -ặn cuộn trang) |                                              
      213 -| Enter / Space | Nút sort ở header | Hành vi native của `<but
          -ton>` → đổi sort | **Không** |                                
      214 -| Tab / Shift+Tab | Grid | Rời grid (chỉ 1 tab stop) — không b
          -ẫy focus | Không |                                            
      215 -| `event.repeat` | Enter/Space | Bỏ qua để tránh toggle liên t
          -ục | — |                                                      
      216 -                                                              
      217 -### 3.6 DOM / ARIA contract (output mong đợi)                 
      218 -                                                              
      219 -```html                                                       
      220 -<section aria-labelledby="grid-heading">                      
      221 -  <h2 id="grid-heading">Employees</h2>                        
      222 -  <form role="search"> <label for="grid-filter">Filter rows</l
          -abel> <input id="grid-filter" type="search" aria-describedby="
          -grid-filter-hint"> … </form>                                  
      223 -  <div class="grid-scroll" tabindex="-1">            <!-- chỉ 
          -để cuộn ngang -->                                             
      224 -    <table role="grid" aria-label="…" aria-rowcount="43" aria-
          -multiselectable="true">                                       
      225 -      <caption>…</caption>                                    
      226 -      <thead>                                                 
      227 -        <tr role="row" aria-rowindex="1">                     
      228 -          <th scope="col" aria-sort="ascending"><button type="
          -button" tabindex="0">Name <span aria-hidden="true">▲</span></b
          -utton></th>                                                   
      229 -          <th scope="col"><button type="button" tabindex="-1">
          -Role</button></th>                                            
      230 -        </tr>                                                 
      231 -      </thead>                                                
      232 -      <tbody>                                                 
      233 -        <tr role="row" aria-rowindex="2" aria-selected="false"
          ->                                                             
      234 -          <td role="gridcell" tabindex="-1">…</td>            
      235 -        </tr>                                                 
      236 -      </tbody>                                                
      237 -    </table>                                                  
      238 -  </div>                                                      
      239 -  <nav aria-label="Pagination"> <button aria-current="page">1<
          -/button> … </nav>                                             
      240 -  <p role="status" aria-live="polite" class="visually-hidden">
          -…</p>                                                         
      241 -</section>                                                    
      242 -```                                                           
      243 -                                                              
      244 -Invariants (kiểm tra được bằng DevTools / test):              
      245 -- I1: Tại mọi thời điểm có **đúng 1** phần tử trong grid có `t
          -abindex="0"`.                                                 
      246 -- I2: Chỉ cột đang sort có `aria-sort="ascending|descending"`;
          - cột khác không có hoặc `none`.                               
      247 -- I3: `aria-rowcount` = `totalRows + 1`; `aria-rowindex` liên 
          -tục, tuyệt đối theo trang.                                    
      248 -- I4: `aria-selected` khớp với `SelectionState` theo `id`; hàn
          -g được chọn có dấu hiệu **không chỉ bằng màu** (icon ✓ + đậm v
          -iền).                                                         
      249 -- I5: Sau sort/filter/đổi trang, `document.activeElement !== d
          -ocument.body`.                                                
      250 -- I6: `data` prop không bao giờ bị mutate (`Object.isFrozen` t
          -rên mock data trong dev).                                     
      251 -                                                              
       81  ---
       82  
      254 -## 4. Cấu trúc thư mục dự kiến                                
       83 +## 3. Cấu trúc file                                           
       84  
       85  ```
      257 -MSIS207_24520199_Lab2_HW1/                                    
      258 -├─ rule-lab2.md                                               
      259 -├─ TASK_DECOMPOSITION.md                                      
      260 -├─ AI_FAILURE_AUDIT.md                                        
      261 -├─ index.html                     # lang="en", title, viewport
          -, skip link target                                            
      262 -├─ src/                                                       
      263 -│  ├─ main.tsx                    # StrictMode                
      264 -│  ├─ App.tsx                     # header / main#main-content
          - / footer, dùng DataGrid                                      
      265 -│  ├─ types/data-grid-contract.ts # mục 3                     
      266 -│  ├─ data/employees.ts           # mock data (Object.freeze, 
          -id ổn định)                                                   
      267 -│  ├─ lib/                        # pure, không import React  
      268 -│  │  ├─ compare.ts  sort.ts  filter.ts  paginate.ts          
      269 -│  │  ├─ grid-navigation.ts  keymap.ts  selection.ts  announce
          -.ts                                                           
      270 -│  ├─ hooks/                                                  
      271 -│  │  └─ useGridFocus.ts          # roving tabindex + khôi phụ
          -c focus (ref, không querySelector)                            
      272 -│  ├─ components/DataGrid/                                    
      273 -│  │  ├─ DataGrid.tsx             # giữ state tối thiểu, tính 
          -derived data                                                  
      274 -│  │  ├─ GridHeader.tsx  GridBody.tsx  FilterBar.tsx  Paginati
          -on.tsx  LiveRegion.tsx                                        
      275 -│  └─ styles/                                                 
      276 -│     ├─ reset.css  tokens.css  layout.css  data-grid.css     
       86 +index.html                 # lang="en", title, viewport       
       87 +src/                                                          
       88 +  main.tsx                 # StrictMode                       
       89 +  App.tsx                  # header, main#main-content, skip l
          +ink, h1                                                       
       90 +  types/data-grid-contract.ts                                 
       91 +  data/employees.ts        # ~30 hàng mẫu, có id              
       92 +  lib/grid.ts              # 4 hàm thuần ở mục 2              
       93 +  components/DataGrid.tsx  # bảng + filter + pagination + live
          + region                                                       
       94 +  styles/tokens.css        # reset + biến màu light/dark      
       95 +  styles/data-grid.css     # style bảng, focus ring, hàng được
          + chọn                                                         
       96  ```
       97  
      279 -**State tối thiểu trong `DataGrid`:** `query`, `sort`, `pageIn
          -dex`, `selection`, `focusTarget`. Mọi thứ khác (`filtered`, `s
          -orted`, `page`, `view`, thông báo) là derived.                
      280 -                                                              
      281 -Pipeline: `data → filterRows(query) → sortRows(sort) → paginat
          -e(page) → render`.                                            
      282 -Khi `query` hoặc `sort` đổi → reset `pageIndex = 0`.          
      283 -                                                              
       98  ---
       99  
      286 -## 5. Danh sách task (Atomic — mỗi task = 1 prompt AI = 1 comm
          -it)                                                           
      100 +## 4. Task list (mỗi task = 1 prompt AI = 1 commit)           
      101  
      288 -Ký hiệu: **F** = files được phép sửa · **AC** = acceptance cri
          -teria · **V** = cách kiểm chứng độc lập.                      
      102 +| # | Task | File | Acceptance | Commit |                     
      103 +|---|---|---|---|---|                                         
      104 +| T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs
          +(spec): add HW1 task decomposition` |                         
      105 +| T-02 | Scaffold Vite React-TS, xoá boilerplate, ESLint react
          +-hooks | config, `index.html`, `main.tsx`, `App.tsx` | `npm ru
          +n dev`, `lint`, `typecheck` sạch | `chore(setup): scaffold vit
          +e react-ts` |                                                 
      106 +| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2, không `
          +any` | `feat(types): define data-grid contract` |             
      107 +| T-04 | Mock data | `employees.ts` | ~30 hàng, có 1 hàng chứa
          + `<img src=x onerror=alert(1)>` | `feat(data): add employee fi
          +xture` |                                                      
      108 +| T-05 | Hàm thuần sort/filter/paginate | `lib/grid.ts` | Khôn
          +g mutate input; filter `(` không crash | `feat(logic): add sor
          +t, filter, paginate` |                                        
      109 +| T-06 | Markup bảng + filter + pagination + live region | `Da
          +taGrid.tsx`, `App.tsx` | Native table + role grid/row/gridcell
          +, `<label>` cho input, skip link, 1 `<h1>` | `feat(html): rend
          +er semantic data-grid` |                                      
      110 +| T-07 | CSS | `tokens.css`, `data-grid.css` | Token màu, dark
          + mode, contrast ≥ 4.5:1, focus ring rõ, hàng chọn có ✓ (không 
          +chỉ màu), 375px không scroll ngang | `feat(css): style data-gr
          +id with tokens` |                                             
      111 +| T-08 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
          + trạng thái, `aria-sort` đúng; filter/sort reset về trang 1; l
          +ive region đọc kết quả | `feat(state): wire sort, filter, pagi
          +nation` |                                                     
      112 +| T-09 | Keyboard: arrow + roving tabindex | `DataGrid.tsx` | 
          +Đúng bảng Keyboard; chỉ 1 `tabindex="0"`; focus không rơi về `
          +<body>` | `feat(a11y): add arrow-key grid navigation` |       
      113 +| T-10 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
          +lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
          +nter-select and space-toggle` |                               
      114 +| T-11 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
          + | A11y 100, Best Practices 100, 0 lỗi console | `fix(a11y): …
          +` / `docs(audit): …` |                                        
      115 +| T-12 | AI_FAILURE_AUDIT.md (≥ 3 lỗi AI) | `AI_FAILURE_AUDIT.
          +md` | Defect → Prompt/Output → Risk → Detection → Fix | `docs(
          +audit): add AI failure audit` |                               
      116  
      290 -### Giai đoạn A — Spec & Scaffold                             
      291 -                                                              
      292 -**T-01 · Viết WBS**                                           
      293 -- F: `TASK_DECOMPOSITION.md`                                  
      294 -- AC: Có phân tích đề, contract, task list, ma trận kiểm thử. 
      295 -- Commit: `docs(spec): add HW1 task decomposition`            
      296 -                                                              
      297 -**T-02 · Scaffold Vite + React + TS strict**                  
      298 -- F: `package.json`, `tsconfig*.json`, `vite.config.ts`, `inde
          -x.html`, `src/main.tsx`, `src/App.tsx`                        
      299 -- AC: `npm run dev` chạy; `strict: true`, `jsx: react-jsx`; sc
          -ripts `dev`, `build`, `preview`, `lint`, `typecheck`; xoá toàn
          - bộ boilerplate demo (logo, counter, CSS mẫu).                
      300 -- V: `npm run typecheck` sạch; mở qua `http://` (không `file:/
          -//`).                                                         
      301 -- Commit: `chore(setup): scaffold vite react-ts with strict co
          -nfig`                                                         
      302 -                                                              
      303 -**T-03 · ESLint + Prettier**                                  
      304 -- F: `eslint.config.js`, `.prettierrc`, `package.json`        
      305 -- AC: Có `eslint-plugin-react-hooks` (rules-of-hooks = error, 
          -exhaustive-deps = error).                                     
      306 -- V: `npm run lint` 0 warning.                                
      307 -- Commit: `chore(setup): configure eslint with react-hooks and
          - prettier`                                                    
      308 -                                                              
      309 -### Giai đoạn B — Contract & Pure Logic                       
      310 -                                                              
      311 -**T-04 · Types**                                              
      312 -- F: `src/types/data-grid-contract.ts`                        
      313 -- AC: Đúng mục 3.1–3.3; không implementation; không `any`.    
      314 -- Commit: `feat(types): define data-grid contract and state un
          -ions`                                                         
      315 -                                                              
      316 -**T-05 · Mock data**                                          
      317 -- F: `src/data/employees.ts`                                  
      318 -- AC: ≥ 45 hàng (≥ 5 trang), có cột số, chuỗi, ngày ISO, giá t
          -rị trùng nhau (kiểm tra stable sort), 1 hàng chứa chuỗi XSS `<
          -img src=x onerror=alert(1)>`; `Object.freeze`.                
      319 -- Commit: `feat(data): add frozen employee fixture with stable
          - ids`                                                         
      320 -                                                              
      321 -**T-06 · Compare + Sort**                                     
      322 -- F: `src/lib/compare.ts`, `src/lib/sort.ts`                  
      323 -- AC: `nextSortState` theo chu kỳ mục 3.4; `sortRows` không mu
          -tate input, stable, null cuối.                                
      324 -- V: Gọi với mảng frozen không throw; kiểm `git diff` không có
          - `.sort(` trên tham số.                                       
      325 -- Commit: `feat(logic): implement pure sort with tri-state cyc
          -le`                                                           
      326 -                                                              
      327 -**T-07 · Filter**                                             
      328 -- F: `src/lib/filter.ts`                                      
      329 -- AC: Case-insensitive substring trên các cột `filterable !== 
          -false`, dùng `format` nếu có; query rỗng → trả nguyên mảng; ký
          - tự đặc biệt (`.*(`) không gây lỗi.                           
      330 -- Commit: `feat(logic): implement pure text filter without reg
          -exp`                                                          
      331 -                                                              
      332 -**T-08 · Paginate**                                           
      333 -- F: `src/lib/paginate.ts`                                    
      334 -- AC: Clamp pageIndex; `pageCount >= 1`; `startRowIndex` đúng.
      335 -- Commit: `feat(logic): implement pure pagination with clampin
          -g`                                                            
      336 -                                                              
      337 -**T-09 · Navigation + Keymap + Selection + Announce**         
      338 -(4 file nhỏ, mỗi file 1 prompt, có thể 4 commit riêng)        
      339 -- F: `src/lib/grid-navigation.ts`, `src/lib/keymap.ts`, `src/l
          -ib/selection.ts`, `src/lib/announce.ts`                       
      340 -- AC: `moveFocus` exhaustive switch + `never`; keymap là objec
          -t dữ liệu; selection trả Set mới; announce trả câu tiếng Anh n
          -gắn.                                                          
      341 -- Commits: `feat(logic): add grid focus navigation`, `feat(log
          -ic): add data-driven keymap`, `feat(logic): add immutable sele
          -ction helpers`, `feat(logic): add view announcement builder`  
      342 -                                                              
      343 -### Giai đoạn C — Semantic Markup (chưa style, chưa keyboard) 
      344 -                                                              
      345 -**T-10 · App shell**                                          
      346 -- F: `index.html`, `src/App.tsx`                              
      347 -- AC: Skip link là phần tử focus đầu tiên → `#main-content`; `
          -<header>`, `<main id="main-content">`, `<footer>`; đúng 1 `<h1
          ->`.                                                           
      348 -- Commit: `feat(html): add semantic app shell with skip link` 
      349 -                                                              
      350 -**T-11 · GridHeader**                                         
      351 -- F: `src/components/DataGrid/GridHeader.tsx`                 
      352 -- AC: `<thead><tr role="row">`, `<th scope="col">`, cột sortab
          -le chứa `<button type="button">`, `aria-sort` đúng I2; mũi tên
          - `aria-hidden`.                                               
      353 -- Commit: `feat(ui): render semantic grid header with sort but
          -tons`                                                         
      354 -                                                              
      355 -**T-12 · GridBody**                                           
      356 -- F: `src/components/DataGrid/GridBody.tsx`                   
      357 -- AC: `key={row.id}`; `<td role="gridcell">`; giá trị render d
          -ạng text (JSX), không HTML; trạng thái rỗng = 1 hàng `colSpan`
          -.                                                             
      358 -- Commit: `feat(ui): render grid body rows with stable keys`  
      359 -                                                              
      360 -**T-13 · FilterBar + Pagination + LiveRegion**                
      361 -- F: `FilterBar.tsx`, `Pagination.tsx`, `LiveRegion.tsx`      
      362 -- AC: Input có `<label for>` hiển thị + hint `aria-describedby
          -`; `<nav aria-label="Pagination">` với Prev/Next/số trang, `ar
          -ia-current="page"`, `disabled` ở biên; live region `role="stat
          -us"`.                                                         
      363 -- Commit: `feat(ui): add filter bar, pagination nav and live r
          -egion`                                                        
      364 -                                                              
      365 -**T-14 · DataGrid composition**                               
      366 -- F: `src/components/DataGrid/DataGrid.tsx`                   
      367 -- AC: Ghép component; `<table role="grid" aria-label aria-rowc
          -ount aria-multiselectable>` + `<caption>`; state tối thiểu (mụ
          -c 4); derived data tính bằng pipeline.                        
      368 -- Commit: `feat(state): compose data-grid with derived pipelin
          -e`                                                            
      369 -                                                              
      370 -### Giai đoạn D — CSS                                         
      371 -                                                              
      372 -**T-15 · Reset + Tokens**                                     
      373 -- F: `src/styles/reset.css`, `src/styles/tokens.css`          
      374 -- AC: Reset theo §4.1; mọi màu/spacing/radius/focus là custom 
          -property; dark mode qua `prefers-color-scheme`; mỗi cặp màu gh
          -i tỉ lệ contrast trong comment (text ≥ 4.5:1, UI ≥ 3:1).      
      375 -- Commit: `feat(css): add reset and design tokens with dark mo
          -de`                                                           
      376 -                                                              
      377 -**T-16 · Layout**                                             
      378 -- F: `src/styles/layout.css`                                  
      379 -- AC: Grid cho khung trang, Flex cho toolbar/pagination, dùng 
          -`gap`; không scroll ngang ở 375px.                            
      380 -- Commit: `feat(css): add mobile-first page layout`           
      381 -                                                              
      382 -**T-17 · Data-grid styles**                                   
      383 -- F: `src/styles/data-grid.css`                               
      384 -- AC: `.grid-scroll { overflow-x: auto }`; `:focus-visible` ri
          -ng rõ ràng (≥ 3:1, không `outline: none`); hàng chọn có ✓ + vi
          -ền (không chỉ màu); target ≥ 24×24; zebra/hover dùng token; `p
          -refers-reduced-motion`; `.visually-hidden`.                   
      385 -- Commit: `feat(css): style data-grid with visible focus and s
          -election`                                                     
      386 -                                                              
      387 -### Giai đoạn E — Behavior & Keyboard                         
      388 -                                                              
      389 -**T-18 · Wire sort/filter/pagination**                        
      390 -- F: `DataGrid.tsx`                                           
      391 -- AC: Click/Enter nút sort → `nextSortState`; nhập filter → re
          -set trang 0; Prev/Next/số trang hoạt động.                    
      392 -- Commit: `feat(state): wire sort, filter and pagination handl
          -ers`                                                          
      393 -                                                              
      394 -**T-19 · Roving tabindex + arrow navigation**                 
      395 -- F: `src/hooks/useGridFocus.ts`, `DataGrid.tsx`              
      396 -- AC: Một `onKeyDown` duy nhất trên `<table>` (React delegatio
          -n); dùng `toGridAction`; I1 luôn đúng; focus bằng `ref`, không
          - `querySelector`; `preventDefault` chỉ cho phím đã xử lý; khôn
          -g chặn Enter/Space trên nút header.                           
      397 -- Commit: `feat(a11y): add roving tabindex and arrow-key navig
          -ation`                                                        
      398 -                                                              
      399 -**T-20 · Selection (Enter/Space)**                            
      400 -- F: `DataGrid.tsx`, `GridBody.tsx`                           
      401 -- AC: Enter → `selectOnly` + `onRowSelect(row)`; Space → `togg
          -leSelection`; bỏ qua `event.repeat`; `aria-selected` theo I4; 
          -selection giữ nguyên khi sort/filter/đổi trang (vì theo `id`).
      402 -- Commit: `feat(a11y): implement enter-select and space-toggle
          - by row id`                                                   
      403 -                                                              
      404 -**T-21 · Giữ focus + thông báo**                              
      405 -- F: `src/hooks/useGridFocus.ts`, `Pagination.tsx`, `DataGrid.
          -tsx`                                                          
      406 -- AC: I5 đúng trong mọi kịch bản: sort (focus ở lại nút sort),
          - filter (ở lại input), Next tới trang cuối (chuyển sang nút tr
          -ang hiện tại), hàng focus bị lọc mất (clamp). Live region đọc 
          -`describeView` sau mỗi thay đổi, không cướp focus.            
      407 -- Commit: `feat(a11y): preserve focus across data changes and 
          -announce results`                                             
      408 -                                                              
      409 -### Giai đoạn F — Audit & Báo cáo                             
      410 -                                                              
      411 -**T-22 · Lighthouse + axe**                                   
      412 -- Chạy trên `npm run build && npm run preview`, cửa sổ ẩn danh
          -, cả light và dark.                                           
      413 -- AC: Accessibility 100, Best Practices 100; axe 0 vi phạm; 0 
          -lỗi console. Lưu ảnh chụp vào `docs/audit/`.                  
      414 -- Commit: `docs(audit): add lighthouse and axe reports` (+ các
          - `fix(a11y): …` riêng nếu có)                                 
      415 -                                                              
      416 -**T-23 · Kiểm thử thủ công (Quality Gates §15)**              
      417 -- Keyboard-only, NVDA (Chrome/Firefox), 375px, zoom 200%, cont
          -rast light/dark, XSS payload hiển thị dạng text.              
      418 -- Commit: `docs(audit): record manual a11y test matrix`       
      419 -                                                              
      420 -**T-24 · Kiểm tra bộ nhớ & Strict Mode**                      
      421 -- Mount/unmount grid 20 lần → heap snapshot không tăng, không 
          -detached node; effect chạy 2 lần trong Strict Mode không lỗi. 
      422 -- Commit: `docs(audit): add memory and strict-mode verificatio
          -n`                                                            
      423 -                                                              
      424 -**T-25 · AI_FAILURE_AUDIT.md**                                
      425 -- ≥ 3 lỗi do AI, theo format: **Defect → AI prompt/output → Ri
          -sk → Detection → Refactored fix**.                            
      426 -- Commit: `docs(audit): add AI failure audit`                 
      427 -                                                              
      428 -**T-26 · README + diễn tập Live Defense**                     
      429 -- Commit: `docs(spec): add readme with run and defense notes` 
      430 -                                                              
      117  ---
      118  
      433 -## 6. Ma trận kiểm thử (Acceptance)                           
      119 +## 5. Checklist nghiệm thu                                    
      120  
      435 -| ID | Kịch bản | Kỳ vọng | Công cụ |                         
      436 -|---|---|---|---|                                             
      437 -| A1 | Tab vào grid | Focus vào đúng 1 phần tử (nút sort đầu t
          -iên), Tab tiếp → rời grid | Bàn phím |                        
      438 -| A2 | ↓ từ header | Vào ô body hàng 1 cùng cột | Bàn phím |  
      439 -| A3 | → ở cột cuối / ↓ ở hàng cuối | Không di chuyển, không w
          -rap | Bàn phím |                                              
      440 -| A4 | Enter trên nút sort 3 lần | ascending → descending → un
          -sorted; `aria-sort` cập nhật; NVDA đọc thông báo | NVDA |     
      441 -| A5 | Enter trên ô body | Hàng được chọn, `onRowSelect` gọi đ
          -úng item, ✓ hiển thị | DevTools |                             
      442 -| A6 | Space 2 lần trên hàng | Toggle bật/tắt; trang không cuộ
          -n | Bàn phím |                                                
      443 -| A7 | Gõ filter không khớp | Hàng "No results"; live region "
          -0 results" | NVDA |                                           
      444 -| A8 | Next tới trang cuối | Focus không về `<body>` | `docume
          -nt.activeElement` |                                           
      445 -| A9 | Sort khi đang ở trang 3 | Về trang 1, selection theo id
          - giữ nguyên | DevTools |                                      
      446 -| A10 | Hàng chứa `<img src=x onerror=alert(1)>` | Hiển thị dạ
          -ng chữ, không alert | Trình duyệt |                           
      447 -| A11 | Viewport 375px | Không scroll ngang trang; bảng cuộn t
          -rong container | DevTools device |                            
      448 -| A12 | Zoom 200% | Không mất nội dung/chức năng | Trình duyệt
          - |                                                            
      449 -| A13 | Dark mode | Contrast text ≥ 4.5:1, focus ring ≥ 3:1 | 
          -DevTools contrast |                                           
      450 -| A14 | Lighthouse | A11y 100, Best Practices 100 | Lighthouse
          - |                                                            
      451 -| A15 | Filter `.*(` | Không lỗi, lọc theo chuỗi literal | Bàn
          - phím |                                                       
      452 -                                                              
      453 ----                                                           
      454 -                                                              
      455 -## 7. Bản đồ Live Defense (mutation → file duy nhất cần sửa)  
      456 -                                                              
      457 -| Mutation có thể gặp | File |                                
      458 -|---|---|                                                     
      459 -| Đổi page size | `DataGrid.tsx` (default prop) |             
      460 -| Đổi chu kỳ sort (vd. bỏ trạng thái unsorted) | `src/lib/sort
          -.ts` → `nextSortState` |                                      
      461 -| Đổi keybinding (vd. dùng `j/k`, wrap ở biên) | `src/lib/keym
          -ap.ts` / `grid-navigation.ts` |                               
      462 -| Đổi Enter ↔ Space | `src/lib/keymap.ts` |                   
      463 -| Filter theo từng cột / phân biệt hoa thường | `src/lib/filte
          -r.ts` |                                                       
      464 -| Đổi màu / focus ring | `src/styles/tokens.css` |            
      465 -| Đổi câu thông báo | `src/lib/announce.ts` |                 
      466 -                                                              
      467 ----                                                           
      468 -                                                              
      469 -## 8. Kế hoạch AI_FAILURE_AUDIT (lỗi AI dự kiến cần săn)      
      470 -                                                              
      471 -1. Gọi `data.sort(...)` trực tiếp (không copy `[...data]`) → m
          -utate prop (phát hiện: dữ liệu frozen throw / `git diff`).    
      472 -2. `key={index}` trong body → mất focus/selection khi sort (ph
          -át hiện: DevTools Elements nhấp nháy, React DevTools).        
      473 -3. `<div role="button" onClick>` hoặc `<td onClick>` thay cho 
          -`<button>` (phát hiện: axe, keyboard).                        
      474 -4. `tabindex="0"` trên mọi ô → hàng trăm tab stop (phát hiện: 
          -phím Tab, kiểm I1).                                           
      475 -5. `new RegExp(query)` → crash với `(` (phát hiện: test A15). 
      476 -6. `aria-live` đặt lên `<tbody>` → đọc toàn bộ bảng mỗi lần đổ
          -i (phát hiện: NVDA).                                          
      477 -7. `disabled` nút Next khi đang focus → focus về `<body>` (phá
          -t hiện: A8).                                                  
      478 -8. Listener `keydown` gắn vào `window` không cleanup (phát hiệ
          -n: Memory / Event Listeners panel).                           
      479 -                                                              
      480 ----                                                           
      481 -                                                              
      482 -## 9. Giả định & câu hỏi cần xác nhận với giảng viên          
      483 -                                                              
      484 -- Q1: Dùng React 18 thật (không phải mini-React tự viết) cho H
          -W1? → Giả định: **React 18**.                                 
      485 -- Q2: Có được thêm **Vitest** để unit test các pure function k
          -hông? (rule §1 chưa liệt kê) → Chưa thêm; tạm kiểm chứng thủ c
          -ông + DevTools. **Không tự ý thêm dependency.**               
      486 -- Q3: Space ở body là multi-select toggle, Enter là single-sel
          -ect + callback — có đúng ý đề không?                          
      487 -- Q4: Có cần bộ lọc theo từng cột không, hay một ô tìm kiếm to
          -àn cục là đủ? → Giả định: **toàn cục**.                       
      488 -- Q5: Pagination dạng nút số trang + Prev/Next, page size cố đ
          -ịnh 10 (không có selector)? → Giả định: **có**.               
      489 -                                                              
      490 ----                                                           
      491 -                                                              
      492 -## 10. Definition of Done (mỗi task)                          
      493 -                                                              
      494 -Áp dụng nguyên `rule-lab2.md` §17: AC đạt · lint + typecheck 0
          - warning · không vi phạm §2–11 (soát `git diff`) · kiểm 375px 
          -+ chỉ bàn phím · effect có cleanup (Strict Mode) · 0 lỗi conso
          -le · commit atomic Conventional Commits · tự giải thích được t
          -ừng dòng.                                                     
      121 +- [ ] Tab vào grid 1 lần, mũi tên di chuyển đúng, Tab tiếp thì
          + ra khỏi grid                                                 
      122 +- [ ] Sort 3 trạng thái; `aria-sort` cập nhật; NVDA đọc thông 
          +báo                                                           
      123 +- [ ] Filter không khớp → hiện "No results"; gõ `(` hoặc `.*` 
          +không lỗi                                                     
      124 +- [ ] Enter chọn hàng (gọi `onRowSelect`), Space toggle, trang
          + không cuộn                                                   
      125 +- [ ] Hàng XSS hiển thị dạng chữ, không alert                 
      126 +- [ ] 375px không scroll ngang trang; bảng cuộn trong khung ri
          +êng                                                           
      127 +- [ ] Contrast đạt ở light và dark                            
      128 +- [ ] Lighthouse Accessibility 100, Best Practices 100 (`npm r
          +un build && npm run preview`)                                 
      129 +- [ ] `npm run lint` và `npm run typecheck` sạch, 0 lỗi consol
          +e                                                             

● Mình đã viết lại TASK_DECOMPOSITION.md cho gọn, chỉ giữ những gì đề yêu cầu.
  Từ 26 task còn 12, mỗi task là một commit.

  Đã bỏ:
  - Multi-column sort, lọc theo từng cột, phím Home/End/Ctrl+Home.
  - Các trường mở rộng như filterable, format, pageSize.
  - Bảng chuẩn bị cho Live Defense, kiểm tra bộ nhớ, lưu focus theo rowId.

  Vẫn giữ, vì đề hoặc rule-lab2.md bắt buộc:
  - Sort, lọc và phân trang, viết thành 4 hàm thuần trong một file lib/grid.ts.
  - Bảng dùng thẻ <table> gốc, kèm role="grid", role="row", role="gridcell" và
    aria-sort.
  - Phím mũi tên để di chuyển, Enter để chọn hàng, Space để bật/tắt chọn. Cả
    bảng chỉ có một ô nhận Tab.
  - aria-live để screen reader đọc kết quả sau khi sort, lọc hoặc đổi trang.
  - Màu khai báo bằng biến CSS, có chế độ tối, độ tương phản ≥ 4.5:1.
  - Lighthouse đạt 100 ở Accessibility và Best Practices, cùng file
    AI_FAILURE_AUDIT.md.

  Code giờ chỉ gồm khoảng 8 file. Toàn bộ giao diện nằm trong một DataGrid.tsx.
  Đổi lại, khi giảng viên bắt sửa trong Live Defense, phần giao diện sẽ phải sửa
  trong cùng file đó. Phần logic vẫn tách riêng ở lib/grid.ts, nên những thay
  đổi kiểu đổi chu kỳ sort hay số hàng mỗi trang chỉ cần sửa một chỗ. Nếu sau
  này DataGrid.tsx dài quá thì tách ra lúc đó cũng được.

  Nếu bạn ổn với bản này, mình sẽ commit nó (T-01) rồi dựng dự án Vite (T-02).

> commit đầu tiên cho việc xây dựng TASK_DECOMPOSITION đi sau đó bắt tay vào
  làm task 1

  Ran 1 shell command (ctrl+o to expand)

● T-01 đã commit xong. Tiếp theo là T-02, dựng khung dự án (scaffold).

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && mkdir -p src && cat >
      package.json <<'EOF'
      {…)
  ⎿  Created .gitignore (+4 -0)
      1 +node_modules                                                    
      2 +dist                                                            
      3 +*.tsbuildinfo                                                   
      4 +.vite                                                           
  ⎿  Created package.json (+29 -0)
       1 +{                                                              
       2 +  "name": "msis207-lab2-hw1-data-grid",                        
       3 +  "private": true,                                             
       4 +  "version": "0.0.0",                                          
       5 +  "type": "module",                                            
       6 +  "scripts": {                                                 
       7 +    "dev": "vite",                                             
       8 +    "build": "tsc -b && vite build",                           
       9 +    "preview": "vite preview",                                 
      10 +    "lint": "eslint . --max-warnings 0",                       
      11 +    "typecheck": "tsc -b --noEmit"                             
      12 +  },                                                           
      13 +  "dependencies": {                                            
      14 +    "react": "^18.3.1",                                        
      15 +    "react-dom": "^18.3.1"                                     
      16 +  },                                                           
      17 +  "devDependencies": {                                         
      18 +    "@eslint/js": "^10.0.1",                                   
      19 +    "@types/react": "^18.3.31",                                
      20 +    "@types/react-dom": "^18.3.7",                             
      21 +    "@vitejs/plugin-react": "^6.1.2",                          
      22 +    "eslint": "^10.13.0",                                      
      23 +    "eslint-plugin-react-hooks": "^7.1.1",                     
      24 +    "globals": "^17.13.0",                                     
      25 +    "typescript": "^6.0.3",                                    
      26 +    "typescript-eslint": "^8.72.1",                            
      27 +    "vite": "^8.3.5"                                           
      28 +  }                                                            
      29 +}                                                              
  ⎿  … 1 more file changed
  ⎿  (timeout 5m)

  Ran 1 shell command (ctrl+o to expand)

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && node - <<'EOF'
      const fs = require('fs');…)
  ⎿  Created eslint.config.js (+25 -0)
       1 +import js from '@eslint/js';                                   
       2 +import globals from 'globals';                                 
       3 +import reactHooks from 'eslint-plugin-react-hooks';            
       4 +import tseslint from 'typescript-eslint';                      
       5 +                                                               
       6 +export default tseslint.config(                                
       7 +  { ignores: ['dist'] },                                       
       8 +  {                                                            
       9 +    files: ['**/*.{ts,tsx}'],                                  
      10 +    extends: [js.configs.recommended, ...tseslint.configs.recom
         +mended],                                                       
      11 +    languageOptions: {                                         
      12 +      ecmaVersion: 2022,                                       
      13 +      globals: globals.browser,                                
      14 +    },                                                         
      15 +    plugins: { 'react-hooks': reactHooks },                    
      16 +    rules: {                                                   
      17 +      ...reactHooks.configs.recommended.rules,                 
      18 +      'react-hooks/rules-of-hooks': 'error',                   
      19 +      'react-hooks/exhaustive-deps': 'error',                  
      20 +      'no-console': 'error',                                   
      21 +      'no-var': 'error',                                       
      22 +      'prefer-const': 'error',                                 
      23 +    },                                                         
      24 +  },                                                           
      25 +);                                                             
  ⎿  Created index.html (+13 -0)
       1 +<!doctype html>                                                
       2 +<html lang="en">                                               
       3 +  <head>                                                       
       4 +    <meta charset="UTF-8" />                                   
       5 +    <meta name="viewport" content="width=device-width, initial-
         +scale=1.0" />                                                  
       6 +    <meta name="description" content="Accessible enterprise dat
         +a-grid with sorting, filtering and pagination." />             
       7 +    <title>Accessible Data-Grid | MSIS207 HW1</title>          
       8 +  </head>                                                      
       9 +  <body>                                                       
      10 +    <div id="root"></div>                                      
      11 +    <script type="module" src="/src/main.tsx"></script>        
      12 +  </body>                                                      
      13 +</html>                                                        
  ⎿  Updated package.json (+2 -2)
       5    "type": "module",
       6    "scripts": {
       7      "dev": "vite",
       8 -    "build": "tsc -b && vite build",                           
       8 +    "build": "tsc --noEmit && vite build",                     
       9      "preview": "vite preview",
      10      "lint": "eslint . --max-warnings 0",
      11 -    "typecheck": "tsc -b --noEmit"                             
      11 +    "typecheck": "tsc --noEmit"                                
      12    },
      13    "dependencies": {
      14      "react": "^18.3.1",
  ⎿  Created src\App.tsx (+7 -0)
      1 +export default function App() {                                 
      2 +  return (                                                      
      3 +    <main id="main-content">                                    
      4 +      <h1>Employee Directory</h1>                               
      5 +    </main>                                                     
      6 +  );                                                            
      7 +}                                                               
  ⎿  Created src\main.tsx (+14 -0)
       1 +import { StrictMode } from 'react';                            
       2 +import { createRoot } from 'react-dom/client';                 
       3 +import App from './App';                                       
       4 +                                                               
       5 +const container = document.getElementById('root');             
       6 +if (!container) {                                              
       7 +  throw new Error('Root element #root not found');             
       8 +}                                                              
       9 +                                                               
      10 +createRoot(container).render(                                  
      11 +  <StrictMode>                                                 
      12 +    <App />                                                    
      13 +  </StrictMode>,                                               
      14 +);                                                             
  ⎿  … 2 more files changed
  ⎿  (timeout 3m)

● Typecheck, lint và build đều chạy sạch. Giờ kiểm tra thêm dev server:

  Ran 2 shell commands (ctrl+o to expand)

● Mình đã commit T-01 và làm xong T-02 (dựng khung dự án), cũng đã commit. Lưu ý
  là trong kế hoạch, task 1 (T-01) chính là việc viết TASK_DECOMPOSITION.md,
  nên "task 1" ở đây mình hiểu là bước làm tiếp theo, tức T-02.

  86f69ec chore(setup): scaffold vite react-ts
  2d1c074 docs(spec): add HW1 task decomposition

  T-02 gồm:
  - package.json: cài React 18, TypeScript, Vite, ESLint và plugin react-hooks.
    Có 5 lệnh: dev, build, preview, lint, typecheck. Không có thư viện nào ngoài
    danh sách cho phép trong rule.
  - tsconfig.json: bật strict và jsx: react-jsx.
  - eslint.config.js: rules-of-hooks và exhaustive-deps báo lỗi thay vì cảnh
    báo; cấm console, cấm var, bắt dùng const khi biến không bị gán lại.
  - index.html: có lang="en", charset, viewport, description và <title>.
  - src/main.tsx chạy trong StrictMode. src/App.tsx tạm thời chỉ có <main> và
    một <h1>, không có code mẫu của Vite.

  Kết quả kiểm tra: typecheck, lint và build đều chạy sạch. Dev server trả về
  trang qua http:// bình thường.

  Hai điều cần biết:
  - rule-lab2.md vẫn chưa được commit, vì bạn chỉ bảo commit file kế hoạch. Nếu
    muốn đưa nó vào repo, mình sẽ commit riêng với message docs(spec): add
    shared lab rules.
  - Bạn đang commit thẳng trên nhánh master. Bài cá nhân thì như vậy là ổn.

  Nếu bạn đồng ý thì task tiếp theo là T-03: viết file kiểu dữ liệu (types)
  src/types/data-grid-contract.ts.

> tôi mới cập nhật cho rule-lab2 bạn hãy phân tích lại rồi commit nó. dự kiến
  có thay đổi gì không?

  Ran 2 shell commands (ctrl+o to expand)

● Mình đã commit bản rule-lab2.md mới (7d8f9e0 docs(spec): add shared lab 2
  rules).

  Bản rule mới thay đổi gì

  Rule mới thêm mục 0 (Scope Guard) lên đầu với mức ưu tiên cao nhất: chỉ làm
  phần tối thiểu đủ đáp ứng đề, không thêm theme, tùy chọn hay hiệu ứng, khoảng
  20 dòng dữ liệu mẫu là đủ. Điều này khớp với bản kế hoạch đã rút gọn, nên
  hướng làm vẫn giữ nguyên. Hai task đã xong (T-01, T-02) vẫn đúng rule mới,
  không cần sửa.

  Kế hoạch cần chỉnh 5 chỗ

  #: 1
  Rule mới: §0: dữ liệu mẫu khoảng 20 dòng
  Kế hoạch hiện tại: T-04: khoảng 30 dòng
  Cần sửa: Còn 20 dòng, 10 dòng/trang là 2 trang, vẫn đủ để thể hiện phân trang
  ────────────────────────────────────────
  #: 2
  Rule mới: §0 cấm thêm theme; §4 không còn yêu cầu chế độ tối
  Kế hoạch hiện tại: T-07 có chế độ tối
  Cần sửa: Bỏ chế độ tối. Chỉ cần một bộ màu sáng đạt tương phản 4.5:1
  ────────────────────────────────────────
  #: 3
  Rule mới: §12: tách logic, markup, CSS và xử lý phím ra file riêng
  Kế hoạch hiện tại: T-09 viết xử lý phím chung trong DataGrid.tsx
  Cần sửa: Thêm file src/lib/keyboard.ts gồm hai hàm thuần: đổi phím thành hành
  động, và tính ô kế tiếp. DataGrid.tsx chỉ gọi hai hàm này
  ────────────────────────────────────────
  #: 4
  Rule mới: §3: các vùng <header>, <nav>, <main>
  Kế hoạch hiện tại: T-06 chưa nói rõ
  Cần sửa: App.tsx có <header> chứa <h1>, và <main>. Phần phân trang đặt trong
  <nav aria-label="Pagination">
  ────────────────────────────────────────
  #: 5
  Rule mới: §12: định dạng audit đổi thành Defect → AI output → Risk → How
  detected → Fix
  Kế hoạch hiện tại: T-12 ghi định dạng cũ
  Cần sửa: Cập nhật lại cho đúng

  Một chỗ rule tự mâu thuẫn, bạn cần quyết

  §1 ghi stack có Prettier, nhưng §0 lại nói "Never add a dependency... STOP and
  ask". Hiện dự án chưa cài Prettier. Theo mình nên cài, vì rule đã liệt kê nó
  trong stack, nó chỉ là devDependency và chỉ dùng để format code. Nếu cài, mình
  sẽ làm thành một commit riêng chore(setup): add prettier.

  Bạn xác nhận giúp mình hai việc:
  1. Mình áp 5 chỗ chỉnh trên vào TASK_DECOMPOSITION.md và commit riêng
     (docs(spec): align HW1 plan with updated rules) nhé?
  2. Có cài Prettier không?

  Xong hai việc đó thì mình làm tiếp T-03 (viết các kiểu dữ liệu).

> cài đi và cập nhật bổ sung cho TASK_DECOMPOSITION.md

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && npm install -D
      prettier 2>&1 | tail -2 && cat > .prettierrc <<'EOF'…)
  ⎿  Created .prettierignore (+4 -0)
      1 +dist                                                            
      2 +node_modules                                                    
      3 +package-lock.json                                               
      4 +*.md                                                            
  ⎿  Created .prettierrc (+7 -0)
      1 +{                                                               
      2 +  "singleQuote": true,                                          
      3 +  "semi": true,                                                 
      4 +  "trailingComma": "all",                                       
      5 +  "printWidth": 100,                                            
      6 +  "endOfLine": "auto"                                           
      7 +}                                                               
  ⎿  Updated package-lock.json (+17 -0)
      19          "eslint": "^10.13.0",
      20          "eslint-plugin-react-hooks": "^7.1.1",
      21          "globals": "^17.13.0",
      22 +        "prettier": "^3.9.10",                                 
      23          "typescript": "^6.0.3",
      24          "typescript-eslint": "^8.72.1",
      25          "vite": "^8.3.5"
     ...
      2375          "node": ">= 0.8.0"
      2376        }
      2377      },
      2378 +    "node_modules/prettier": {                               
      2379 +      "version": "3.9.10",                                   
      2380 +      "resolved": "https://registry.npmjs.org/prettier/-/pret
           +tier-3.9.10.tgz",                                            
      2381 +      "integrity": "sha512-skGHTH1Yb9QvaTC4hWnRTzEYtCpApF0UMB
           +Pz+t/0ZPzP8ihefo/btKd+QA7pUE0fEwA1SbS/NmhyEcstdXOIdA==",     
      2382 +      "dev": true,                                           
      2383 +      "license": "MIT",                                      
      2384 +      "bin": {                                               
      2385 +        "prettier": "bin/prettier.cjs"                       
      2386 +      },                                                     
      2387 +      "engines": {                                           
      2388 +        "node": ">=14"                                       
      2389 +      },                                                     
      2390 +      "funding": {                                           
      2391 +        "url": "https://github.com/prettier/prettier?sponsor=
           +1"                                                           
      2392 +      }                                                      
      2393 +    },                                                       
      2394      "node_modules/punycode": {
      2395        "version": "2.3.1",
      2396        "resolved": "https://registry.npmjs.org/punycode/-/puny
            code-2.3.1.tgz",
  ⎿  Updated package.json (+4 -1)
       8      "build": "tsc --noEmit && vite build",
       9      "preview": "vite preview",
      10      "lint": "eslint . --max-warnings 0",
      11 -    "typecheck": "tsc --noEmit"                                
      11 +    "typecheck": "tsc --noEmit",                               
      12 +    "format": "prettier --write .",                            
      13 +    "format:check": "prettier --check ."                       
      14    },
      15    "dependencies": {
      16      "react": "^18.3.1",
     ...
      24      "eslint": "^10.13.0",
      25      "eslint-plugin-react-hooks": "^7.1.1",
      26      "globals": "^17.13.0",
      27 +    "prettier": "^3.9.10",                                     
      28      "typescript": "^6.0.3",
      29      "typescript-eslint": "^8.72.1",
      30      "vite": "^8.3.5"
  ⎿  (timeout 3m)

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && npx prettier --write
      index.html && git diff index.html && npm run fo…)
  ⎿  Updated index.html (+4 -1)
       3    <head>
       4      <meta charset="UTF-8" />
       5      <meta name="viewport" content="width=device-width, initial-
          scale=1.0" />
       6 -    <meta name="description" content="Accessible enterprise dat
         -a-grid with sorting, filtering and pagination." />             
       6 +    <meta                                                      
       7 +      name="description"                                       
       8 +      content="Accessible enterprise data-grid with sorting, fi
         +ltering and pagination."                                       
       9 +    />                                                         
      10      <title>Accessible Data-Grid | MSIS207 HW1</title>
      11    </head>
      12    <body>

● Prettier đã cài và commit xong. Giờ mình cập nhật kế hoạch:

● Write(TASK_DECOMPOSITION.md)
  ⎿  Added 72 lines, removed 41 lines
      2  
      3  > MSSV: 24520199 · MSIS207 · Lab 2 · HW1
      4  > Đọc `rule-lab2.md` trước. File này chỉ chứa phạm vi, contract 
         và task của HW1.
      5 -> Mục tiêu: **một dự án gọn, đạt đủ yêu cầu của đề**, không thêm
        - tính năng ngoài đề.                                            
      5 +> Mục tiêu (rule §0 Scope Guard): **làm tối thiểu, đủ đúng yêu c
        +ầu của đề**, không thêm tính năng.                              
      6 +> Cái gì không có trong file này → hỏi trước khi thêm.          
      7  
      8  ---
      9  
     ...
      15  |---|---|
      16  | Sorting | Bấm nút ở header cột `sortable`: tăng dần → giảm dầ
          n → không sort |
      17  | Filtering | 1 ô tìm kiếm chung, lọc theo chuỗi con, không phâ
          n biệt hoa thường |
      17 -| Pagination | Nút Previous / Next + "Page x of y", 10 hàng/tra
         -ng |                                                           
      18 +| Pagination | Nút Previous / Next + "Page x of y", 10 hàng/tra
         +ng, đặt trong `<nav aria-label="Pagination">` |                
      19  | Native markup | `<table>`, `<caption>`, `<thead>`, `<tbody>`,
           `<th scope="col">`, `<button>` |
      20  | ARIA grid | `role="grid"` trên `<table>`, `role="row"` trên `
          <tr>`, `role="gridcell"` trên `<td>`, `aria-sort` trên `<th>` |
      21  | Keyboard | Mũi tên di chuyển giữa các ô; Enter chọn hàng; Spa
          ce toggle chọn hàng |
      22  | Screen reader | Live region `aria-live="polite"` đọc kết quả 
          sau sort/filter/đổi trang |
      22 -| Contrast 4.5:1 | Màu khai báo bằng token trong `:root`, có da
         -rk mode |                                                      
      23 +| Landmarks | Skip link → `<header>` (chứa `<h1>`) → `<main id=
         +"main-content">` → `<nav>` phân trang |                        
      24 +| Contrast 4.5:1 | Một bộ màu sáng, khai báo bằng custom proper
         +ty trong `:root` |                                             
      25  | Lighthouse 100 | Accessibility + Best Practices trên bản buil
          d |
      26  
      25 -### Không làm (ngoài đề)                                       
      27 +### Không làm (ngoài đề, rule §0)                              
      28  
      27 -Multi-column sort, filter theo từng cột, đổi page size, ẩn/hiện
         - cột, resize cột, virtualization, Home/End/Ctrl+Home, unit test
         - framework.                                                    
      29 +Dark mode / theme toggle, animation, multi-column sort, filter 
         +theo từng cột, đổi page size,                                  
      30 +ẩn/hiện/resize cột, virtualization, Home/End/Ctrl+Home, routing
         +, backend, unit test framework.                                
      31  
      32  ---
      33  
      31 -## 2. Contract (giữ nguyên của đề, chỉ thêm `id`)              
      34 +## 2. Contract                                                 
      35  
      36 +### 2.1 Types (`src/types/data-grid-contract.ts`) — giữ nguyên 
         +của đề, chỉ thêm `id`                                          
      37 +                                                               
      38  ```ts
      34 -// src/types/data-grid-contract.ts                             
      39  export interface ColumnDef<T> {
      40    header: string;
      41    accessorKey: keyof T;
     ...
      52  export type SortState<T> =
      53    | { kind: 'none' }
      54    | { kind: 'sorted'; key: keyof T; direction: 'ascending' | 'd
          escending' };
      55 +                                                               
      56 +/** row 0 = hàng header, 1..n = hàng body của trang hiện tại. *
         +/                                                              
      57 +export interface CellPosition {                                
      58 +  row: number;                                                 
      59 +  col: number;                                                 
      60 +}                                                              
      61 +                                                               
      62 +export type GridAction = 'up' | 'down' | 'left' | 'right' | 'se
         +lect' | 'toggle';                                              
      63  ```
      64  
      53 -- `T extends { id: string }`: rule §5.5 — selection và `key` th
         -eo `id`, không theo index.                                     
      65 +- `T extends { id: string }`: selection và `key` theo `id`, khô
         +ng theo index.                                                 
      66  - `direction` trùng giá trị với `aria-sort` để gán thẳng.
      67 +- `SortState` là discriminated union (rule §5.2), không dùng cặ
         +p boolean.                                                     
      68  
      56 -### Hàm thuần (`src/lib/grid.ts`)                              
      69 +### 2.2 Logic dữ liệu (`src/lib/grid.ts`) — hàm thuần, không im
         +port React                                                     
      70  
      71  ```ts
      59 -nextSort(current, key)          // none → ascending → descendin
         -g → none; đổi cột → ascending                                  
      60 -sortRows(rows, sort)            // [...rows].sort(...), không m
         -utate data                                                     
      72 +nextSort(current, key)           // none → ascending → descendi
         +ng → none; đổi cột → ascending                                 
      73 +sortRows(rows, sort)             // [...rows].sort(...), không 
         +mutate data                                                    
      74  filterRows(rows, columns, query) // includes() trên String(valu
          e).toLowerCase(), không dùng RegExp
      62 -paginate(rows, page, pageSize)  // trả { rows, page (đã clamp),
         - pageCount }                                                   
      75 +paginate(rows, page, pageSize)   // trả { rows, page (đã clamp)
         +, pageCount }                                                  
      76  ```
      77  
      65 -Pipeline: `data → filterRows → sortRows → paginate → render`. K
         -ết quả là **derived**, không lưu vào state.                    
      66 -State trong component: `query`, `sort`, `page`, `selectedIds`, 
         -`activeCell { row, col }`.                                     
      78 +### 2.3 Logic bàn phím (`src/lib/keyboard.ts`) — hàm thuần, tác
         +h khỏi component (rule §12)                                    
      79  
      68 -### Keyboard                                                   
      80 +```ts                                                          
      81 +const KEY_TO_ACTION: Record<string, GridAction>   // bảng dữ li
         +ệu: 'ArrowUp' → 'up', 'Enter' → 'select', ' ' → 'toggle'       
      82 +getGridAction(key: string): GridAction | null     // tra bảng, 
         +phím khác → null                                               
      83 +moveCell(pos, action, rowCount, colCount): CellPosition // clam
         +p ở biên, không wrap                                           
      84 +```                                                            
      85  
      86 +Đổi phím trong Live Defense → chỉ sửa `KEY_TO_ACTION`.         
      87 +                                                               
      88 +### 2.4 Hành vi bàn phím                                       
      89 +                                                               
      90  | Phím | Ở đâu | Hành vi |
      91  |---|---|---|
      92  | ↑ ↓ ← → | Mọi ô | Di chuyển 1 ô, dừng ở biên (hàng 0 = header
          ) |
     ...
       95  | Enter / Space | Nút sort ở header | Hành vi native của `<but
           ton>` (không chặn) |
       96  | Tab | Grid | Grid chỉ là 1 tab stop (roving tabindex), Tab t
           iếp thì rời grid |
       97  
       78 -Roving tabindex: chỉ ô đang active có `tabindex="0"`, các ô kh
          -ác `-1`. Ở header, phần tử nhận focus là `<button>` sort.     
       79 -Khi filter/đổi trang làm số hàng giảm → clamp `activeCell` vào
          - phạm vi hợp lệ để focus không rơi về `<body>`.               
       98 +- Roving tabindex: chỉ ô active có `tabindex="0"`, các ô khác 
          +`-1`. Ở header, phần tử nhận focus là `<button>` sort.        
       99 +- Filter/đổi trang làm số hàng giảm → clamp ô active để focus 
          +không rơi về `<body>`.                                        
      100  
      101 +### 2.5 State trong `DataGrid`                                
      102 +                                                              
      103 +Chỉ lưu: `query`, `sort`, `page`, `selectedIds`, `activeCell`.
      104 +Pipeline derived (rule §5.4, không lưu state): `data → filterR
          +ows → sortRows → paginate → render`.                          
      105 +Đổi `query` hoặc `sort` → `page = 1`.                         
      106 +                                                              
      107  ---
      108  
      109  ## 3. Cấu trúc file
      110  
      111  ```
       86 -index.html                 # lang="en", title, viewport       
      112 +index.html                  # lang="en", title, viewport      
      113  src/
       88 -  main.tsx                 # StrictMode                       
       89 -  App.tsx                  # header, main#main-content, skip l
          -ink, h1                                                       
      114 +  main.tsx                  # StrictMode                      
      115 +  App.tsx                   # skip link, header + h1, main#mai
          +n-content                                                     
      116    types/data-grid-contract.ts
       91 -  data/employees.ts        # ~30 hàng mẫu, có id              
       92 -  lib/grid.ts              # 4 hàm thuần ở mục 2              
       93 -  components/DataGrid.tsx  # bảng + filter + pagination + live
          - region                                                       
       94 -  styles/tokens.css        # reset + biến màu light/dark      
       95 -  styles/data-grid.css     # style bảng, focus ring, hàng được
          - chọn                                                         
      117 +  data/employees.ts         # 20 hàng mẫu, có id              
      118 +  lib/grid.ts               # sort / filter / paginate        
      119 +  lib/keyboard.ts           # phím → hành động, di chuyển ô   
      120 +  components/DataGrid.tsx   # markup + state, gọi lib/*       
      121 +  styles/tokens.css         # reset + biến màu/spacing        
      122 +  styles/data-grid.css      # style bảng, focus ring, hàng đượ
          +c chọn                                                        
      123  ```
      124  
      125 +Tách theo rule §12: logic dữ liệu, xử lý phím, markup, style n
          +ằm ở file khác nhau → mỗi thay đổi trong Live Defense chỉ đụng
          + 1 file.                                                      
      126 +                                                              
      127  ---
      128  
      129  ## 4. Task list (mỗi task = 1 prompt AI = 1 commit)
      130  
      102 -| # | Task | File | Acceptance | Commit |                     
      103 -|---|---|---|---|---|                                         
      104 -| T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs
          -(spec): add HW1 task decomposition` |                         
      105 -| T-02 | Scaffold Vite React-TS, xoá boilerplate, ESLint react
          --hooks | config, `index.html`, `main.tsx`, `App.tsx` | `npm ru
          -n dev`, `lint`, `typecheck` sạch | `chore(setup): scaffold vit
          -e react-ts` |                                                 
      106 -| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2, không `
          -any` | `feat(types): define data-grid contract` |             
      107 -| T-04 | Mock data | `employees.ts` | ~30 hàng, có 1 hàng chứa
          - `<img src=x onerror=alert(1)>` | `feat(data): add employee fi
          -xture` |                                                      
      108 -| T-05 | Hàm thuần sort/filter/paginate | `lib/grid.ts` | Khôn
          -g mutate input; filter `(` không crash | `feat(logic): add sor
          -t, filter, paginate` |                                        
      109 -| T-06 | Markup bảng + filter + pagination + live region | `Da
          -taGrid.tsx`, `App.tsx` | Native table + role grid/row/gridcell
          -, `<label>` cho input, skip link, 1 `<h1>` | `feat(html): rend
          -er semantic data-grid` |                                      
      110 -| T-07 | CSS | `tokens.css`, `data-grid.css` | Token màu, dark
          - mode, contrast ≥ 4.5:1, focus ring rõ, hàng chọn có ✓ (không 
          -chỉ màu), 375px không scroll ngang | `feat(css): style data-gr
          -id with tokens` |                                             
      111 -| T-08 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
          - trạng thái, `aria-sort` đúng; filter/sort reset về trang 1; l
          -ive region đọc kết quả | `feat(state): wire sort, filter, pagi
          -nation` |                                                     
      112 -| T-09 | Keyboard: arrow + roving tabindex | `DataGrid.tsx` | 
          -Đúng bảng Keyboard; chỉ 1 `tabindex="0"`; focus không rơi về `
          -<body>` | `feat(a11y): add arrow-key grid navigation` |       
      113 -| T-10 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
          -lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
          -nter-select and space-toggle` |                               
      114 -| T-11 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
          - | A11y 100, Best Practices 100, 0 lỗi console | `fix(a11y): …
          -` / `docs(audit): …` |                                        
      115 -| T-12 | AI_FAILURE_AUDIT.md (≥ 3 lỗi AI) | `AI_FAILURE_AUDIT.
          -md` | Defect → Prompt/Output → Risk → Detection → Fix | `docs(
          -audit): add AI failure audit` |                               
      131 +| # | Task | File | Acceptance | Commit | Trạng thái |        
      132 +|---|---|---|---|---|---|                                     
      133 +| T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs
          +(spec): add HW1 task decomposition` | ✅ |                    
      134 +| T-02 | Scaffold Vite React-TS + ESLint react-hooks + Prettie
          +r | config, `index.html`, `main.tsx`, `App.tsx` | `dev`, `lint
          +`, `typecheck`, `format:check` sạch | `chore(setup): …` | ✅ |
      135 +| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
          + `any` | `feat(types): define data-grid contract` | |         
      136 +| T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
          +`<img src=x onerror=alert(1)>` | `feat(data): add employee fix
          +ture` | |                                                     
      137 +| T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
          +te input; filter `(` không crash | `feat(logic): add sort, fil
          +ter, paginate` | |                                            
      138 +| T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
          +amp ở biên | `feat(logic): add grid keyboard helpers` | |     
      139 +| T-07 | Markup: landmarks + bảng + filter + pagination + live
          + region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
          +/row/gridcell, `<label for>` cho input, skip link, `<header>`/
          +`<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
          +-grid` | |                                                    
      140 +| T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
          + rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
          + ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
          +le data-grid with tokens` | |                                 
      141 +| T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
          + trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
          +gion đọc kết quả | `feat(state): wire sort, filter, pagination
          +` | |                                                         
      142 +| T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
          +keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
          +` | `feat(a11y): add arrow-key grid navigation` | |           
      143 +| T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
          +lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
          +nter-select and space-toggle` | |                             
      144 +| T-12 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
          + | A11y 100, Best Practices 100, 0 lỗi console, CLS 0 | `fix(a
          +11y): …` / `docs(audit): …` | |                               
      145 +| T-13 | AI_FAILURE_AUDIT.md (≥ 3 lỗi AI) | `AI_FAILURE_AUDIT.
          +md` | Defect → AI output → Risk → How detected → Fix | `docs(a
          +udit): add AI failure audit` | |                              
      146  
      147  ---
      148  
      149  ## 5. Checklist nghiệm thu
      150  
      151 +- [ ] Skip link là phần tử focus đầu tiên; có `<header>`, `<ma
          +in>`, `<nav>`; đúng 1 `<h1>`                                  
      152  - [ ] Tab vào grid 1 lần, mũi tên di chuyển đúng, Tab tiếp thì
            ra khỏi grid
      153  - [ ] Sort 3 trạng thái; `aria-sort` cập nhật; NVDA đọc thông 
           báo
      154  - [ ] Filter không khớp → hiện "No results"; gõ `(` hoặc `.*` 
           không lỗi
      155  - [ ] Enter chọn hàng (gọi `onRowSelect`), Space toggle, trang
            không cuộn
      156  - [ ] Hàng XSS hiển thị dạng chữ, không alert
      157  - [ ] 375px không scroll ngang trang; bảng cuộn trong khung ri
           êng
      127 -- [ ] Contrast đạt ở light và dark                            
      158 +- [ ] Contrast text ≥ 4.5:1, focus ring/UI ≥ 3:1              
      159  - [ ] Lighthouse Accessibility 100, Best Practices 100 (`npm r
           un build && npm run preview`)
      129 -- [ ] `npm run lint` và `npm run typecheck` sạch, 0 lỗi consol
          -e                                                             
      160 +- [ ] `lint`, `typecheck`, `format:check` sạch; 0 lỗi console 

  Ran 1 shell command (ctrl+o to expand)

● Mình đã cài Prettier và cập nhật TASK_DECOMPOSITION.md, mỗi việc một commit:

  d31ebcd docs(spec): align HW1 plan with updated rules
  5f3eda3 chore(setup): add prettier

  Prettier
  - Cài thành devDependency. Cấu hình .prettierrc dùng nháy đơn, dòng dài tối đa
    100 ký tự.
  - Thêm hai lệnh: npm run format để format code, npm run format:check để kiểm
    tra.
  - File .prettierignore bỏ qua các file .md, nên rule-lab2.md và
    TASK_DECOMPOSITION.md giữ nguyên định dạng tự viết.
  - Prettier chỉ phải format lại index.html: nó tách thẻ <meta description> ra
    nhiều dòng.
  - lint, typecheck và format:check đều chạy sạch.

  Những gì thay đổi trong TASK_DECOMPOSITION.md
  - Dữ liệu mẫu còn 20 dòng. Bỏ chế độ tối, chỉ dùng một bộ màu sáng. Chế độ tối
    được đưa vào danh sách "Không làm".
  - Thêm task mới T-06 cho file src/lib/keyboard.ts, gồm:
    - KEY_TO_ACTION: bảng ánh xạ phím sang hành động, viết dưới dạng dữ liệu.
    - getGridAction: tra phím trong bảng đó.
    - moveCell: tính ô kế tiếp, dừng lại ở mép bảng.

    Nhờ vậy, nếu giảng viên bắt đổi phím trong Live Defense thì chỉ cần sửa một
    dòng.
  - Hai kiểu CellPosition và GridAction được đưa vào file types, để viết kiểu dữ
    liệu trước khi viết code.
  - T-07 nêu rõ trang có skip link, <header> chứa <h1>, <main>, và <nav> cho
    phân trang.
  - Định dạng của AI_FAILURE_AUDIT.md đã sửa theo rule mới.
  - Tổng cộng giờ là 13 task. Bảng task có thêm cột trạng thái: T-01 và T-02 đã
    xong.

  Task tiếp theo là T-03: viết file kiểu dữ liệu
  src/types/data-grid-contract.ts.
> bỏ task T-13 nha vì HW 1 không yêu cầu. bắt tay vào làm task tiếp theo đi

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 2 lines, removed 1 line
      142  | T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
           keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
           ` | `feat(a11y): add arrow-key grid navigation` | |
      143  | T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
           lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
           nter-select and space-toggle` | |
      144  | T-12 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
            | A11y 100, Best Practices 100, 0 lỗi console, CLS 0 | `fix(a
           11y): …` / `docs(audit): …` | |
      145 -| T-13 | AI_FAILURE_AUDIT.md (≥ 3 lỗi AI) | `AI_FAILURE_AUDIT.
          -md` | Defect → AI output → Risk → How detected → Fix | `docs(a
          -udit): add AI failure audit` | |                              
      145  
      146 +> `AI_FAILURE_AUDIT.md` không làm cho HW1 (rule §8 chỉ yêu cầu
          + ở HW3).                                                      
      147 +                                                              
      148  ---
      149  
      150  ## 5. Checklist nghiệm thu

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      132  |---|---|---|---|---|---|
      133  | T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs
           (spec): add HW1 task decomposition` | ✅ |
      134  | T-02 | Scaffold Vite React-TS + ESLint react-hooks + Prettie
           r | config, `index.html`, `main.tsx`, `App.tsx` | `dev`, `lint
           `, `typecheck`, `format:check` sạch | `chore(setup): …` | ✅ |
      135 -| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
          - `any` | `feat(types): define data-grid contract` | |         
      135 +| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
          + `any` | `feat(types): define data-grid contract` | ✅ |      
      136  | T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
           `<img src=x onerror=alert(1)>` | `feat(data): add employee fix
           ture` | |
      137  | T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
           te input; filter `(` không crash | `feat(logic): add sort, fil
           ter, paginate` | |
      138  | T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
           amp ở biên | `feat(logic): add grid keyboard helpers` | |

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      132  |---|---|---|---|---|---|
      133  | T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs
           (spec): add HW1 task decomposition` | ✅ |
      134  | T-02 | Scaffold Vite React-TS + ESLint react-hooks + Prettie
           r | config, `index.html`, `main.tsx`, `App.tsx` | `dev`, `lint
           `, `typecheck`, `format:check` sạch | `chore(setup): …` | ✅ |
      135 -| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
          - `any` | `feat(types): define data-grid contract` | ✅ |      
      135 +| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
          + `any` | `feat(types): define data-grid contract` | |         
      136  | T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
           `<img src=x onerror=alert(1)>` | `feat(data): add employee fix
           ture` | |
      137  | T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
           te input; filter `(` không crash | `feat(logic): add sort, fil
           ter, paginate` | |
      138  | T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
           amp ở biên | `feat(logic): add grid keyboard helpers` | |

  Ran 1 shell command (ctrl+o to expand)

● Đã bỏ T-13. Giờ làm T-03, theo đúng contract ở mục 2.1:

● Write(src\types\data-grid-contract.ts)
  ⎿  Wrote 26 lines to src\types\data-grid-contract.ts
       1 export interface ColumnDef<T> {
       2   header: string;
       3   accessorKey: keyof T;
       4   sortable?: boolean;
       5 }
       6
       7 /** Rows need a stable `id` so selection and React keys never de
         pend on the row index. */
       8 export interface DataGridProps<T extends { id: string }> {
       9   data: T[];
     … +17 lines (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

● format:check báo lỗi format, nhưng commit vẫn chạy: mình dùng | tail nên lỗi
  bị nuốt mất. Để xem Prettier muốn sửa gì:

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && npx prettier --write
      src/types/data-grid-contract.ts && git diff)
  ⎿  Updated src\types\data-grid-contract.ts (+1 -2)
      14  
      15  /** `direction` uses the same values as `aria-sort`, so it can 
          be passed straight through. */
      16  export type SortState<T> =
      17 -  | { kind: 'none' }                                           
      18 -  | { kind: 'sorted'; key: keyof T; direction: 'ascending' | 'd
         -escending' };                                                  
      17 +  { kind: 'none' } | { kind: 'sorted'; key: keyof T; direction:
         + 'ascending' | 'descending' };                                 
      18  
      19  /** row 0 is the header row; rows 1..n are the body rows of the
           current page. */
      20  export interface CellPosition {

  Ran 1 shell command (ctrl+o to expand)

● Mình đã bỏ T-13 khỏi kế hoạch và làm xong T-03. Mỗi việc là một commit:

  25fb5fd feat(types): define data-grid contract
  71e96ce docs(spec): drop AI failure audit task from HW1

  T-13: Mình đã xóa task này khỏi bảng và thêm một dòng ghi chú:
  AI_FAILURE_AUDIT.md chỉ bắt buộc ở HW3 (rule §8).

  T-03 – file src/types/data-grid-contract.ts:
  - ColumnDef<T> và DataGridProps<T> giữ đúng các field của đề. Khác biệt duy
    nhất là điều kiện T extends { id: string }, nghĩa là mỗi hàng dữ liệu phải
    có id.
  - SortState<T> chỉ có hai khả năng: none hoặc sorted. Giá trị direction trùng
    với giá trị của aria-sort, nên có thể gán thẳng.
  - CellPosition: vị trí ô, trong đó hàng 0 là hàng tiêu đề.
  - GridAction: 6 hành động bàn phím (4 hướng mũi tên, select, toggle).
  - File chỉ chứa kiểu dữ liệu, không có code xử lý và không dùng any.
    typecheck, lint và format:check đều chạy sạch.

  Có một sự cố nhỏ. Lần commit đầu đã đi qua dù file chưa đúng format của
  Prettier, vì cách mình nối lệnh làm mất lỗi của format:check. Mình đã format
  lại, chạy lại đủ ba bước kiểm tra, rồi amend vào chính commit đó, nên commit
  hiện tại đã sạch. Commit này chưa push nên sửa lại không ảnh hưởng gì. Từ giờ
  mình sẽ không dùng | tail ở bước kiểm tra nữa.

  Cột trạng thái trong TASK_DECOMPOSITION.md mình chưa đánh dấu T-03. Mình định
  gộp việc cập nhật trạng thái vào một commit docs riêng sau vài task, để không
  lẫn với commit code.

  Task tiếp theo là T-04: tạo 20 hàng dữ liệu mẫu trong src/data/employees.ts,
  trong đó có một hàng chứa chuỗi <img src=x onerror=alert(1)> để kiểm tra XSS.
  Bạn muốn mình làm tiếp luôn không?

> làm tiếp T-04 đi

● Write(src\data\employees.ts)
  ⎿  Wrote 32 lines to src\data\employees.ts
       1 export interface Employee {
       2   id: string;
       3   name: string;
       4   department: string;
       5   role: string;
       6   salary: number;
       7   startDate: string;
       8 }
       9
      10 /** Row e-13 holds an XSS payload: it must render as plain text,
     … +23 lines (~3 KB) (ctrl+o to expand)

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && npx prettier --write
      src/data/employees.ts >/dev/null && npm run for…)
  ⎿  Updated src\data\employees.ts (+160 -20)
        9  
       10  /** Row e-13 holds an XSS payload: it must render as plain tex
           t, never as HTML. */
       11  export const employees: Employee[] = [
       12 -  { id: 'e-01', name: 'Nguyen Van An', department: 'Engineerin
          -g', role: 'Frontend Developer', salary: 1800, startDate: '2021
          --03-15' },                                                    
       13 -  { id: 'e-02', name: 'Tran Thi Binh', department: 'Design', r
          -ole: 'UI Designer', salary: 1500, startDate: '2022-07-01' },  
       14 -  { id: 'e-03', name: 'Le Hoang Cuong', department: 'Engineeri
          -ng', role: 'Backend Developer', salary: 2100, startDate: '2019
          --11-20' },                                                    
       15 -  { id: 'e-04', name: 'Pham Minh Duc', department: 'Marketing'
          -, role: 'Content Writer', salary: 1100, startDate: '2023-01-09
          -' },                                                          
       16 -  { id: 'e-05', name: 'Hoang Thu Ha', department: 'Human Resou
          -rces', role: 'Recruiter', salary: 1200, startDate: '2020-05-18
          -' },                                                          
       17 -  { id: 'e-06', name: 'Vu Quang Huy', department: 'Engineering
          -', role: 'DevOps Engineer', salary: 2300, startDate: '2018-09-
          -03' },                                                        
       18 -  { id: 'e-07', name: 'Dang Ngoc Lan', department: 'Finance', 
          -role: 'Accountant', salary: 1300, startDate: '2021-10-11' },  
       19 -  { id: 'e-08', name: 'Bui Duc Long', department: 'Sales', rol
          -e: 'Account Manager', salary: 1600, startDate: '2022-02-14' },
       20 -  { id: 'e-09', name: 'Do Thanh Mai', department: 'Design', ro
          -le: 'UX Researcher', salary: 1700, startDate: '2020-08-24' }, 
       21 -  { id: 'e-10', name: 'Ngo Van Nam', department: 'Engineering'
          -, role: 'QA Engineer', salary: 1400, startDate: '2023-06-05' }
          -,                                                             
       22 -  { id: 'e-11', name: 'Duong Thi Oanh', department: 'Marketing
          -', role: 'SEO Specialist', salary: 1250, startDate: '2021-12-0
          -1' },                                                         
       23 -  { id: 'e-12', name: 'Ly Gia Phuc', department: 'Sales', role
          -: 'Sales Executive', salary: 1350, startDate: '2024-03-18' }, 
       24 -  { id: 'e-13', name: '<img src=x onerror=alert(1)>', departme
          -nt: 'Engineering', role: 'Security Tester', salary: 1900, star
          -tDate: '2022-09-12' },                                        
       25 -  { id: 'e-14', name: 'Trinh Bao Quyen', department: 'Finance'
          -, role: 'Financial Analyst', salary: 1750, startDate: '2019-04
          --22' },                                                       
       26 -  { id: 'e-15', name: 'Mai Xuan Son', department: 'Engineering
          -', role: 'Mobile Developer', salary: 2000, startDate: '2020-01
          --13' },                                                       
       27 -  { id: 'e-16', name: 'Cao Thi Tam', department: 'Human Resour
          -ces', role: 'HR Manager', salary: 2200, startDate: '2017-06-26
          -' },                                                          
       28 -  { id: 'e-17', name: 'Phan Anh Tuan', department: 'Sales', ro
          -le: 'Sales Manager', salary: 2400, startDate: '2016-10-10' }, 
       29 -  { id: 'e-18', name: 'Ho Kim Uyen', department: 'Design', rol
          -e: 'Graphic Designer', salary: 1150, startDate: '2024-08-19' }
          -,                                                             
       30 -  { id: 'e-19', name: 'Chu Dinh Vinh', department: 'Engineerin
          -g', role: 'Tech Lead', salary: 2800, startDate: '2015-02-02' }
          -,                                                             
       31 -  { id: 'e-20', name: 'La Hai Yen', department: 'Marketing', r
          -ole: 'Marketing Manager', salary: 2250, startDate: '2018-12-03
          -' },                                                          
       12 +  {                                                           
       13 +    id: 'e-01',                                               
       14 +    name: 'Nguyen Van An',                                    
       15 +    department: 'Engineering',                                
       16 +    role: 'Frontend Developer',                               
       17 +    salary: 1800,                                             
       18 +    startDate: '2021-03-15',                                  
       19 +  },                                                          
       20 +  {                                                           
       21 +    id: 'e-02',                                               
       22 +    name: 'Tran Thi Binh',                                    
       23 +    department: 'Design',                                     
       24 +    role: 'UI Designer',                                      
       25 +    salary: 1500,                                             
       26 +    startDate: '2022-07-01',                                  
       27 +  },                                                          
       28 +  {                                                           
     … 144 more lines (ctrl+o to expand)

● T-04 đã xong và đã commit: 9e0633c feat(data): add employee fixture.

  File src/data/employees.ts gồm:
  - Kiểu Employee có 6 trường: id, name, department, role, salary và startDate.
    Mình đặt kiểu này ngay trong file dữ liệu vì chỉ bộ dữ liệu mẫu dùng tới nó.
    File contract vẫn giữ ở dạng generic.
  - 20 hàng dữ liệu, mỗi hàng có id cố định (từ e-01 đến e-20). Mình đã kiểm tra
    bằng script: đủ 20 id và không trùng nhau.
  - Ba kiểu giá trị khác nhau để bước T-05 kiểm tra sort cho đủ:
    - Chuỗi: tên, phòng ban, chức danh.
    - Số: lương.
    - Ngày dạng ISO (YYYY-MM-DD): ngày bắt đầu làm việc. Kiểu ngày này so sánh
      như chuỗi cũng ra đúng thứ tự.
  - Phòng ban lặp lại nhiều lần (có 7 người thuộc Engineering). Nhờ vậy sort
    theo phòng ban sẽ có nhiều hàng cùng giá trị.
  - Hàng e-13 có name là <img src=x onerror=alert(1)>. Khi đã có giao diện, hàng
    này phải hiện ra đúng nguyên văn như chữ và không bật hộp thoại alert.

  format:check, lint và typecheck đều chạy sạch.

  Điểm bạn nên biết: mảng employees có kiểu Employee[], khớp với data: T[] của
  đề. Mình không dùng Object.freeze vì nó biến mảng thành readonly, khi đó phải
  sửa contract. Việc không làm thay đổi data sẽ được bảo đảm ở T-05: hàm sort
  luôn tạo bản sao bằng [...rows].sort() rồi mới sắp xếp.

  Task tiếp theo là T-05: viết nextSort, sortRows, filterRows và paginate trong
  src/lib/grid.ts.

> tới T-05 luôn đi

● Write(src\lib\grid.ts)
  ⎿  Wrote 53 lines to src\lib\grid.ts
       1 import type { ColumnDef, SortState } from '../types/data-grid-co
         ntract';
       2
       3 export interface PageResult<T> {
       4   rows: T[];
       5   page: number;
       6   pageCount: number;
       7 }
       8
       9 /** Cycle on the same column: none → ascending → descending → no
     … +45 lines (~2 KB) (ctrl+o to expand)

  Ran 1 shell command (ctrl+o to expand)

● Lỗi này là do đường dẫn kiểu Git Bash (/d/...), không phải do code. Mình đổi
  sang dùng file URL:

  Ran 2 shell commands (ctrl+o to expand)

● T-05 đã xong và đã commit: 4e16d96 feat(logic): add sort, filter, paginate.

  File src/lib/grid.ts chỉ chứa 4 hàm thuần, không import React:

  ┌──────────────────────┬──────────────────────────────────────────────────┐
  │         Hàm          │                     Hành vi                      │
  ├──────────────────────┼──────────────────────────────────────────────────┤
  │ nextSort(current,    │ Bấm lại cùng cột: không sort → tăng dần → giảm   │
  │ key)                 │ dần → không sort. Bấm sang cột khác thì bắt đầu  │
  │                      │ từ tăng dần                                      │
  ├──────────────────────┼──────────────────────────────────────────────────┤
  │                      │ Sort trên bản sao [...rows], không làm thay đổi  │
  │ sortRows(rows, sort) │ data. Cột số so sánh theo giá trị số, cột chữ    │
  │                      │ dùng localeCompare. Khi không sort thì trả về    │
  │                      │ nguyên mảng gốc                                  │
  ├──────────────────────┼──────────────────────────────────────────────────┤
  │ filterRows(rows,     │ Bỏ khoảng trắng hai đầu, không phân biệt hoa     │
  │ columns, query)      │ thường, tìm bằng includes() trên mọi cột. Không  │
  │                      │ tạo RegExp từ chữ người dùng gõ                  │
  ├──────────────────────┼──────────────────────────────────────────────────┤
  │ paginate(rows, page, │ Số trang tính từ 1. Trang được giới hạn trong    │
  │  pageSize)           │ khoảng [1, pageCount]. pageCount luôn ≥ 1, kể cả │
  │                      │  khi không có hàng nào                           │
  └──────────────────────┴──────────────────────────────────────────────────┘

  Ngoài 4 hàm trên, file còn định nghĩa thêm kiểu PageResult<T> (gồm rows, page,
  pageCount) cho giá trị mà paginate trả về. Vì kiểu này chỉ dùng nội bộ trong
  logic nên mình đặt ở đây, không đưa vào file contract.

  Đã kiểm chứng: mình viết một script kiểm tra tạm, đặt ngoài dự án. Node 24
  chạy thẳng được file .ts nên không cần cài thêm gì. Tất cả các kiểm tra đều
  qua:
  - Thứ tự sort đổi đúng chu kỳ.
  - Sort lương: tăng dần bắt đầu từ 1100, giảm dần bắt đầu từ 2800. Sort ngày:
    hàng đầu là 2015-02-02.
  - Mảng employees không bị thay đổi sau khi sort.
  - Sort giữ nguyên thứ tự gốc giữa các hàng có cùng giá trị (7 người
    Engineering).
  - Lọc "  ENGINEERING " ra 7 hàng, lọc "2800" ra e-19. Gõ ( không gây lỗi, chỉ
    khớp đúng hàng có chuỗi XSS. Gõ .* ra 0 hàng, vì được tìm như chữ thường chứ
    không phải biểu thức.
  - Phân trang: 20 hàng chia thành 2 trang. Xin trang 99 thì trả về trang 2, xin
    trang 0 thì trả về trang 1. Mảng rỗng vẫn có pageCount = 1.

  format:check, lint và typecheck đều chạy sạch.

  Điểm cần biết khi bảo vệ bài: khi người dùng chưa chọn sort, sortRows trả về
  đúng mảng gốc. Điều này an toàn vì không hàm nào làm thay đổi mảng đó.

  Task tiếp theo là T-06: viết KEY_TO_ACTION, getGridAction và moveCell trong
  src/lib/keyboard.ts.

> Tiếp tục T-06

● Write(src\lib\keyboard.ts)
  ⎿  Wrote 48 lines to src\lib\keyboard.ts
       1 import type { CellPosition, GridAction } from '../types/data-gri
         d-contract';
       2
       3 /** Key bindings as data: changing a key only means editing this
          table. Keys are `KeyboardEvent.key` values. */
       4 export const KEY_TO_ACTION: Record<string, GridAction> = {
       5   ArrowUp: 'up',
       6   ArrowDown: 'down',
       7   ArrowLeft: 'left',
       8   ArrowRight: 'right',
     … +40 lines (ctrl+o to expand)

  Ran 2 shell commands (ctrl+o to expand)

● T-06 đã xong và đã commit: f22d7de feat(logic): add grid keyboard helpers.

  File src/lib/keyboard.ts chỉ chứa hàm thuần, không import React:

  ┌───────────────────────┬─────────────────────────────────────────────────┐
  │      Thành phần       │                     Hành vi                     │
  ├───────────────────────┼─────────────────────────────────────────────────┤
  │                       │ Bảng dữ liệu nối phím với hành động:            │
  │ KEY_TO_ACTION         │ ArrowUp/Down/Left/Right → up/down/left/right,   │
  │                       │ Enter → select, ' ' (Space) → toggle. Trong     │
  │                       │ Live Defense, đổi phím chỉ cần sửa bảng này     │
  ├───────────────────────┼─────────────────────────────────────────────────┤
  │                       │ Tra phím trong bảng. Phím không có trong bảng   │
  │ getGridAction(key)    │ (Tab, chữ cái…) thì trả về null, để trình duyệt │
  │                       │  tự xử lý như bình thường                       │
  ├───────────────────────┼─────────────────────────────────────────────────┤
  │ moveCell(pos, action, │ Di chuyển một ô theo mũi tên và dừng ở mép      │
  │  rowCount, colCount)  │ bảng, không quay vòng. select/toggle giữ nguyên │
  │                       │  vị trí. rowCount tính cả hàng tiêu đề          │
  └───────────────────────┴─────────────────────────────────────────────────┘

  Hai chi tiết nên biết khi bảo vệ bài:
  - getGridAction kiểm tra bằng Object.hasOwn. Nếu chỉ viết KEY_TO_ACTION[key]
    thì một chuỗi như 'toString' sẽ lấy nhầm hàm có sẵn của mọi object
    JavaScript. Trường hợp này không xảy ra với event.key thật, nhưng viết thế
    này thì kiểu trả về luôn đúng.
  - moveCell dùng switch có nhánh never ở cuối. Nếu sau này thêm một hành động
    mới vào GridAction mà quên xử lý ở đây, TypeScript sẽ báo lỗi.

  Đã kiểm chứng: mình chạy một script kiểm tra tạm, tất cả đều qua:
  - Bảng phím ánh xạ đúng. Tab, a, toString và constructor đều trả về null.
  - Ở ô góc trên trái, đi lên hoặc sang trái thì đứng yên. Ở ô góc dưới phải, đi
    xuống hoặc sang phải cũng đứng yên.
  - Di chuyển giữa bảng ra đúng ô kế tiếp. select và toggle giữ nguyên vị trí.
  - Trang không có hàng nào (chỉ còn hàng tiêu đề): nhấn mũi tên xuống thì vẫn ở
    hàng tiêu đề.

  format:check, lint và typecheck đều chạy sạch.

  Phần logic đã xong. Task tiếp theo là T-07, làm phần HTML của trang:
  - src/App.tsx: skip link, <header> chứa <h1>, và <main>.
  - src/components/DataGrid.tsx: bảng <table role="grid">, ô lọc có <label>,
    <nav> phân trang và live region.

  Ở bước này chỉ dựng HTML ngữ nghĩa, chưa có CSS và chưa xử lý bàn phím. Mình
  cũng sẽ cập nhật cột trạng thái trong TASK_DECOMPOSITION.md (T-03 đến T-06)
  bằng một commit docs riêng trước khi bắt đầu T-07.

> Nhớ cập nhật trạng thái cho từng task ở WBS. Tiếp tục với T-07 đi

● Trước hết, mình cập nhật trạng thái T-03 đến T-06 trong WBS và lưu lại yêu cầu
  này để những lần sau tự làm:

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && node - <<'EOF'
      const fs = require('fs');…)
  ⎿  Updated TASK_DECOMPOSITION.md (+1 -1)
      1 -# TASK_DECOMPOSITION.md — HW1: Accessible Data-Grid (WCAG 2.2 AA
        -)                                                               
      1 +# TASK_DECOMPOSITION.md — HW1: Accessible Data-Grid (WCAG 2.2 ✅
        + ✅ ✅ ✅ ||||AA)                                               
      2  
      3  > MSSV: 24520199 · MSIS207 · Lab 2 · HW1
      4  > Đọc `rule-lab2.md` trước. File này chỉ chứa phạm vi, contract 
         và task của HW1.

● Script chỉ sửa được 1 dòng thay vì 4. Mình xem lại phần bảng:
  Read 1 file (ctrl+o to expand)

● Script không sửa được dòng nào (diff chỉ khác ký tự xuống dòng). Mình sửa tay
  bằng Edit:

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      132  |---|---|---|---|---|---|
      133  | T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs
           (spec): add HW1 task decomposition` | ✅ |
      134  | T-02 | Scaffold Vite React-TS + ESLint react-hooks + Prettie
           r | config, `index.html`, `main.tsx`, `App.tsx` | `dev`, `lint
           `, `typecheck`, `format:check` sạch | `chore(setup): …` | ✅ |
      135 -| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
          - `any` | `feat(types): define data-grid contract` | |         
      135 +| T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
          + `any` | `feat(types): define data-grid contract` | ✅ |      
      136  | T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
           `<img src=x onerror=alert(1)>` | `feat(data): add employee fix
           ture` | |
      137  | T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
           te input; filter `(` không crash | `feat(logic): add sort, fil
           ter, paginate` | |
      138  | T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
           amp ở biên | `feat(logic): add grid keyboard helpers` | |

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      133  | T-01 | Viết WBS | `TASK_DECOMPOSITION.md` | File này | `docs
           (spec): add HW1 task decomposition` | ✅ |
      134  | T-02 | Scaffold Vite React-TS + ESLint react-hooks + Prettie
           r | config, `index.html`, `main.tsx`, `App.tsx` | `dev`, `lint
           `, `typecheck`, `format:check` sạch | `chore(setup): …` | ✅ |
      135  | T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
            `any` | `feat(types): define data-grid contract` | ✅ |
      136 -| T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
          -`<img src=x onerror=alert(1)>` | `feat(data): add employee fix
          -ture` | |                                                     
      136 +| T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
          +`<img src=x onerror=alert(1)>` | `feat(data): add employee fix
          +ture` | ✅ |                                                  
      137  | T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
           te input; filter `(` không crash | `feat(logic): add sort, fil
           ter, paginate` | |
      138  | T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
           amp ở biên | `feat(logic): add grid keyboard helpers` | |
      139  | T-07 | Markup: landmarks + bảng + filter + pagination + live
            region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
           /row/gridcell, `<label for>` cho input, skip link, `<header>`/
           `<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
           -grid` | |

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      134  | T-02 | Scaffold Vite React-TS + ESLint react-hooks + Prettie
           r | config, `index.html`, `main.tsx`, `App.tsx` | `dev`, `lint
           `, `typecheck`, `format:check` sạch | `chore(setup): …` | ✅ |
      135  | T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
            `any` | `feat(types): define data-grid contract` | ✅ |
      136  | T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
           `<img src=x onerror=alert(1)>` | `feat(data): add employee fix
           ture` | ✅ |
      137 -| T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
          -te input; filter `(` không crash | `feat(logic): add sort, fil
          -ter, paginate` | |                                            
      137 +| T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
          +te input; filter `(` không crash | `feat(logic): add sort, fil
          +ter, paginate` | ✅ |                                         
      138  | T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
           amp ở biên | `feat(logic): add grid keyboard helpers` | |
      139  | T-07 | Markup: landmarks + bảng + filter + pagination + live
            region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
           /row/gridcell, `<label for>` cho input, skip link, `<header>`/
           `<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
           -grid` | |
      140  | T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
            rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
            ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
           le data-grid with tokens` | |

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      135  | T-03 | Types | `data-grid-contract.ts` | Đúng mục 2.1, không
            `any` | `feat(types): define data-grid contract` | ✅ |
      136  | T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
           `<img src=x onerror=alert(1)>` | `feat(data): add employee fix
           ture` | ✅ |
      137  | T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
           te input; filter `(` không crash | `feat(logic): add sort, fil
           ter, paginate` | ✅ |
      138 -| T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
          -amp ở biên | `feat(logic): add grid keyboard helpers` | |     
      138 +| T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
          +amp ở biên | `feat(logic): add grid keyboard helpers` | ✅ |  
      139  | T-07 | Markup: landmarks + bảng + filter + pagination + live
            region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
           /row/gridcell, `<label for>` cho input, skip link, `<header>`/
           `<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
           -grid` | |
      140  | T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
            rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
            ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
           le data-grid with tokens` | |
      141  | T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
            trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
           gion đọc kết quả | `feat(state): wire sort, filter, pagination
           ` | |

  Ran 2 shell commands (ctrl+o to expand)

● Script trước đã làm hỏng dòng tiêu đề số 1 của file. Mình xem rồi sửa lại:

  Read 1 file (ctrl+o to expand)

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      1 -# TASK_DECOMPOSITION.md — HW1: Accessible Data-Grid (WCAG 2.2 ✅
        - ✅ ✅ ✅ ||||AA)                                               
      1 +# TASK_DECOMPOSITION.md — HW1: Accessible Data-Grid (WCAG 2.2 AA
        +)                                                               
      2  
      3  > MSSV: 24520199 · MSIS207 · Lab 2 · HW1
      4  > Đọc `rule-lab2.md` trước. File này chỉ chứa phạm vi, contract 
         và task của HW1.

  Ran 1 shell command (ctrl+o to expand)

● Commit WBS giờ chỉ thay đổi đúng 4 dòng trạng thái. Mình lưu lại yêu cầu của
  bạn để lần sau tự làm:

  Wrote 2 memories (ctrl+o to expand)

● Giờ đến T-07: dựng phần HTML ngữ nghĩa, chưa có CSS, chưa có state và chưa xử
  lý bàn phím.

● Write(src\components\DataGrid.tsx)
  ⎿  Wrote 71 lines to src\components\DataGrid.tsx
       1 import { useId } from 'react';
       2 import type { DataGridProps } from '../types/data-grid-contract'
         ;
       3 import { paginate } from '../lib/grid';
       4
       5 const PAGE_SIZE = 10;
       6
       7 export default function DataGrid<T extends { id: string }>({
       8   data,
       9   columns,
     … +62 lines (ctrl+o to expand)

● Write(src\App.tsx)
  ⎿  Added 23 lines, removed 3 lines
       1 +import DataGrid from './components/DataGrid';                  
       2 +import { employees, type Employee } from './data/employees';   
       3 +import type { ColumnDef } from './types/data-grid-contract';   
       4 +                                                               
       5 +const columns: ColumnDef<Employee>[] = [                       
       6 +  { header: 'Name', accessorKey: 'name', sortable: true },     
       7 +  { header: 'Department', accessorKey: 'department', sortable: 
         +true },                                                        
       8 +  { header: 'Role', accessorKey: 'role' },                     
       9 +  { header: 'Salary (USD)', accessorKey: 'salary', sortable: tr
         +ue },                                                          
      10 +  { header: 'Start date', accessorKey: 'startDate', sortable: t
         +rue },                                                         
      11 +];                                                             
      12 +                                                               
      13  export default function App() {
      14    return (
       3 -    <main id="main-content">                                   
       4 -      <h1>Employee Directory</h1>                              
       5 -    </main>                                                    
      15 +    <>                                                         
      16 +      <a className="skip-link" href="#main-content">           
      17 +        Skip to main content                                   
      18 +      </a>                                                     
      19 +      <header>                                                 
      20 +        <h1>Employee Directory</h1>                            
      21 +      </header>                                                
      22 +      <main id="main-content">                                 
      23 +        <DataGrid data={employees} columns={columns} ariaLabel=
         +"Employees" />                                                 
      24 +      </main>                                                  
      25 +    </>                                                        
      26    );
      27  }

  Ran 1 shell command (ctrl+o to expand)

● Script kiểm tra nằm ngoài dự án nên Node không tìm thấy vite. Mình import
  thẳng từ node_modules của dự án:

  Ran 3 shell commands (ctrl+o to expand)

● Markup đã đạt yêu cầu; xssEscaped: false vì hàng e-13 ở trang 2 chưa hiển thị.
  Tôi sẽ chạy build rồi commit.

  Ran 1 shell command (ctrl+o to expand)

● Cập nhật trạng thái T-07 trong WBS:

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      136  | T-04 | Mock data | `employees.ts` | 20 hàng, có 1 hàng chứa 
           `<img src=x onerror=alert(1)>` | `feat(data): add employee fix
           ture` | ✅ |
      137  | T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
           te input; filter `(` không crash | `feat(logic): add sort, fil
           ter, paginate` | ✅ |
      138  | T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
           amp ở biên | `feat(logic): add grid keyboard helpers` | ✅ |
      139 -| T-07 | Markup: landmarks + bảng + filter + pagination + live
          - region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
          -/row/gridcell, `<label for>` cho input, skip link, `<header>`/
          -`<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
          --grid` | |                                                    
      139 +| T-07 | Markup: landmarks + bảng + filter + pagination + live
          + region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
          +/row/gridcell, `<label for>` cho input, skip link, `<header>`/
          +`<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
          +-grid` | ✅ |                                                 
      140  | T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
            rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
            ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
           le data-grid with tokens` | |
      141  | T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
            trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
           gion đọc kết quả | `feat(state): wire sort, filter, pagination
           ` | |
      142  | T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
           keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
           ` | `feat(a11y): add arrow-key grid navigation` | |

  Ran 1 shell command (ctrl+o to expand)

● Trạng thái trong WBS đã cập nhật, và T-07 đã xong và được commit.

  1219af0 docs(spec): mark T-07 as done
  7651116 feat(html): render semantic data-grid
  c8902d3 docs(spec): mark T-03 to T-06 as done

  Trạng thái WBS: T-01 đến T-07 đều đã đánh dấu ✅. Có một sự cố trong lúc làm:
  script tự động mình dùng lúc đầu đã làm hỏng dòng tiêu đề số 1 của
  TASK_DECOMPOSITION.md. Mình đã sửa lại tay và amend vào commit trạng thái đó,
  nên commit hiện tại chỉ đổi đúng 4 dòng trạng thái. Mình cũng đã lưu yêu cầu
  này vào bộ nhớ: từ giờ, xong mỗi task mình sẽ đánh dấu trạng thái bằng một
  commit docs(spec) riêng.

  T-07: HTML ngữ nghĩa
  - src/App.tsx: trang gồm skip link đặt đầu tiên, rồi <header> chứa <h1> duy
    nhất, rồi <main id="main-content">. Định nghĩa cột cũng nằm ở đây: 5 cột,
    trong đó cột Role không sort được.
  - src/components/DataGrid.tsx gồm:
    - Ô lọc có <label>. id của ô lọc được tạo bằng useId(), nên không bị trùng
      nếu trang có nhiều bảng.
    - <table role="grid"> có <caption>. <th scope="col"> chứa <button> ở những
      cột sort được. Hàng dùng role="row", ô dùng role="gridcell".
    - Khi không có kết quả, bảng hiện một hàng "No results".
    - <nav aria-label="Pagination"> chứa nút Previous/Next và dòng chữ "Page x
      of y".
    - Một vùng thông báo role="status" aria-live="polite".

    Hiện bảng chỉ hiển thị trang 1. State và xử lý bàn phím sẽ được thêm ở T-09
    đến T-11.

  Đã kiểm chứng: mình render trang thành HTML tĩnh bằng Vite rồi đếm từng thành
  phần. Kết quả: có đúng 1 <h1>, 1 <header>, 1 <main>, 1 <nav>; skip link đứng
  đầu; 5 <th scope="col">, trong đó 4 ô có nút sort; 11 hàng (1 hàng tiêu đề và
  10 hàng dữ liệu) với 50 ô; <label for> khớp với id của ô lọc; dòng "Page 1 of
  2" hiển thị đúng; nút Previous bị tắt ở trang đầu. lint, typecheck,
  format:check và build đều chạy sạch.

  Hàng chứa chuỗi XSS (e-13) nằm ở trang 2, nên chưa kiểm tra được ở bước này.
  Mình sẽ kiểm tra nó ở T-09, khi đã chuyển trang được.

  Task tiếp theo là T-08: viết CSS trong src/styles/tokens.css (phần reset và
  các biến màu, khoảng cách) và src/styles/data-grid.css.

> <ide_opened_file>The user opened the file d:\Đại học\Phát triển ứng dụng web
  MSIS207\thuc_hanh\Lab2\MSIS207_24520199_Lab2_HW1\TASK_DECOMPOSITION.md in the
  IDE. This may or may not be related to the current task.</ide_opened_file>

> làm T-08 đi

  Ran 1 shell command (ctrl+o to expand)

● Mọi cặp màu đều đạt: chữ ≥ 4.5:1, viền và focus ≥ 3:1. Giờ viết CSS:

● Write(src\styles\tokens.css)
  ⎿  Wrote 47 lines to src\styles\tokens.css
       1 *,
       2 *::before,
       3 *::after {
       4   box-sizing: border-box;
       5   margin: 0;
       6   padding: 0;
       7 }
       8
       9 /* Contrast ratios are against --color-bg unless noted. */
      10 :root {
     … +37 lines (ctrl+o to expand)

● Write(src\styles\data-grid.css)  ⎿  Wrote 172 lines to src\styles\data-grid.css
       1 /* Page frame */
       2 header,
       3 main {
       4   max-width: 64rem;
       5   margin-inline: auto;
       6   padding: var(--space-4);
       7 }
       8
       9 h1 {
      10   font-size: 1.75rem;
     … +162 lines (ctrl+o to expand)

● Giờ import CSS vào src/main.tsx. File này nằm ngoài danh sách của T-08, nhưng
  chỉ thêm 2 dòng import:

● Update(src\main.tsx)
  ⎿  Added 2 lines
      1  import { StrictMode } from 'react';
      2  import { createRoot } from 'react-dom/client';
      3  import App from './App';
      4 +import './styles/tokens.css';                                   
      5 +import './styles/data-grid.css';                                
      6  
      7  const container = document.getElementById('root');
      8  if (!container) {

  Ran 1 shell command (ctrl+o to expand)

● Không còn hex nào ngoài :root, không có outline: none, và bản build chạy sạch.
  Tiếp theo mình sẽ mở bản build bằng Chrome headless để đo tràn ngang ở 375px
  và chụp màn hình.

  Ran 1 shell command (ctrl+o to expand)

● Ở 375px, trang không tràn ngang và bảng cuộn trong khung riêng, các nút đều
  đạt 44px. Mình đang xem lỗi 404 trong console và chụp ảnh màn hình.

  Read 2 files, ran 1 shell command (ctrl+o to expand)

● Ảnh chụp đã ổn ở cả hai kích thước. Lỗi 404 do trình duyệt tự xin favicon.ico
  mà dự án không có, sẽ ảnh hưởng điểm Best Practices của Lighthouse nên mình
  ghi lại để sửa ở T-12; tiếp theo mình kiểm tra focus ring và skip link.

  Read 2 files, ran 1 shell command (ctrl+o to expand)

● Skip link hiện ra khi được focus, và focus ring nằm gọn bên trong ô tiêu đề.
  Giờ tắt server và commit:

  Ran 2 shell commands (ctrl+o to expand)

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      137  | T-05 | Sort / filter / paginate | `lib/grid.ts` | Không muta
           te input; filter `(` không crash | `feat(logic): add sort, fil
           ter, paginate` | ✅ |
      138  | T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
           amp ở biên | `feat(logic): add grid keyboard helpers` | ✅ |
      139  | T-07 | Markup: landmarks + bảng + filter + pagination + live
            region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
           /row/gridcell, `<label for>` cho input, skip link, `<header>`/
           `<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
           -grid` | ✅ |
      140 -| T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
          - rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
          - ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
          -le data-grid with tokens` | |                                 
      140 +| T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
          + rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
          + ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
          +le data-grid with tokens` | ✅ |                              
      141  | T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
            trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
           gion đọc kết quả | `feat(state): wire sort, filter, pagination
           ` | |
      142  | T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
           keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
           ` | `feat(a11y): add arrow-key grid navigation` | |
      143  | T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
           lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
           nter-select and space-toggle` | |

  Ran 1 shell command (ctrl+o to expand)

● T-08 đã xong, đã commit, và trạng thái trong WBS đã được đánh dấu.

  b8007d8 docs(spec): mark T-08 as done
  7f78c4e feat(css): style data-grid with tokens

  Các file đã viết
  - src/styles/tokens.css:
    - Phần reset theo rule.
    - Toàn bộ màu, khoảng cách, bo góc và kích thước focus ring đều là biến CSS
      trong :root. Cạnh mỗi màu có ghi chú tỉ lệ tương phản.
    - Một kiểu :focus-visible dùng chung cho cả trang.
  - src/styles/data-grid.css:
    - Khung trang, skip link chỉ hiện ra khi được focus, và class
      .visually-hidden.
    - Thanh lọc và phần phân trang xếp bằng Flexbox, dùng gap.
    - Bảng cuộn ngang bên trong .grid-scroll chứ không làm cả trang cuộn.
    - Nút sort chiếm trọn ô tiêu đề. Mọi nút và ô nhập đều cao ít nhất 44px.
    - Hàng được chọn có ba dấu hiệu cùng lúc: nền xanh nhạt, vạch xanh ở mép
      trái và dấu ✓. Như vậy thông tin không chỉ dựa vào màu.
  - src/main.tsx: thêm 2 dòng import CSS. File này không nằm trong danh sách
    file của T-08, nhưng CSS cần được import ở đâu đó mới có tác dụng.

  Đã kiểm chứng
  - Tỉ lệ tương phản tính bằng công thức WCAG:
    - Chữ: thấp nhất 6.4:1 (yêu cầu ≥ 4.5:1).
    - Viền và focus ring: thấp nhất 4.3:1 (yêu cầu ≥ 3:1). Mức thấp nhất này là
      viền nằm trên nền hàng xen kẽ.
  - Mình chạy bản build trong Chrome headless:
    - Ở 375px, trang không tràn ngang (scrollWidth = 375). Bảng rộng 640px cuộn
      trong khung riêng.
    - Nút và ô nhập nhỏ nhất là 44px.
    - Nhấn Tab lần đầu thì skip link hiện ra. Nhấn tiếp tới nút sort "Name" thì
      thấy rõ viền xanh nằm bên trong ô.
  - Không có mã màu hex nào ngoài :root, không có outline: none. lint,
    typecheck, format:check và build đều chạy sạch.
  - Mình đã xem ảnh chụp ở 375px và 1280px, bố cục hiển thị đúng.

  Chưa kiểm chứng được: kiểu hiển thị hàng được chọn (nền xanh, vạch, dấu ✓). Lý
  do là chưa có hàng nào mang aria-selected cho đến T-11, nên mình sẽ kiểm tra
  nó ở T-11.

  Lỗi tìm thấy, để dành sửa ở T-12: console có lỗi 404 do trình duyệt tự xin
  /favicon.ico mà dự án không có file này. Lighthouse Best Practices tính lỗi
  console là trừ điểm. Cách sửa là thêm một dòng <link rel="icon" href="data:,">
  vào index.html, commit riêng với message fix(...) ở T-12.

  Task tiếp theo là T-09: nối state cho sort, lọc và phân trang. Phần này gồm
  cập nhật aria-sort, đưa về trang 1 khi lọc hoặc sort, và thông báo kết quả qua
  vùng aria-live.

> làm T-09 luôn

● Write(src\components\DataGrid.tsx)
  ⎿  Added 93 lines, removed 13 lines
       1 -import { useId } from 'react';                                 
       2 -import type { DataGridProps } from '../types/data-grid-contract
         -';                                                             
       3 -import { paginate } from '../lib/grid';                        
       1 +import { useId, useRef, useState } from 'react';               
       2 +import type { ColumnDef, DataGridProps, SortState } from '../ty
         +pes/data-grid-contract';                                       
       3 +import { filterRows, nextSort, paginate, sortRows } from '../li
         +b/grid';                                                       
       4  
       5  const PAGE_SIZE = 10;
       6  
       7 +function describeSort<T>(sort: SortState<T>, columns: ColumnDef
         +<T>[]): string {                                               
       8 +  if (sort.kind === 'none') {                                  
       9 +    return 'Sorting removed.';                                 
      10 +  }                                                            
      11 +  const column = columns.find((c) => c.accessorKey === sort.key
         +);                                                             
      12 +  return `Sorted by ${column?.header ?? String(sort.key)}, ${so
         +rt.direction}.`;                                               
      13 +}                                                              
      14 +                                                               
      15 +function describeResults(total: number, page: number, pageCount
         +: number): string {                                            
      16 +  return `${total} ${total === 1 ? 'result' : 'results'}. Page 
         +${page} of ${pageCount}.`;                                     
      17 +}                                                              
      18 +                                                               
      19  export default function DataGrid<T extends { id: string }>({
      20    data,
      21    columns,
      22    ariaLabel,
      23  }: DataGridProps<T>) {
      24    const filterId = useId();
      13 -  const view = paginate(data, 1, PAGE_SIZE);                   
      25 +  const [query, setQuery] = useState('');                      
      26 +  const [sort, setSort] = useState<SortState<T>>({ kind: 'none'
         + });                                                           
      27 +  const [page, setPage] = useState(1);                         
      28 +  const [announcement, setAnnouncement] = useState('');        
      29 +  const prevRef = useRef<HTMLButtonElement>(null);             
      30 +  const nextRef = useRef<HTMLButtonElement>(null);             
      31  
      32 +  const filtered = filterRows(data, columns, query);           
      33 +  const view = paginate(sortRows(filtered, sort), page, PAGE_SI
         +ZE);                                                           
      34 +                                                               
      35 +  function handleQueryChange(nextQuery: string) {              
      36 +    const total = filterRows(data, columns, nextQuery).length; 
      37 +    setQuery(nextQuery);                                       
      38 +    setPage(1);                                                
      39 +    setAnnouncement(describeResults(total, 1, Math.max(1, Math.
         +ceil(total / PAGE_SIZE))));                                    
      40 +  }                                                            
      41 +                                                               
      42 +  function handleSort(key: keyof T) {                          
      43 +    const nextState = nextSort(sort, key);                     
      44 +    setSort(nextState);                                        
      45 +    setPage(1);                                                
      46 +    setAnnouncement(                                           
      47 +      `${describeSort(nextState, columns)} ${describeResults(fi
         +ltered.length, 1, view.pageCount)}`,                           
      48 +    );                                                         
      49 +  }                                                            
      50 +                                                               
      51 +  /** A pagination button that becomes disabled loses focus, so
         + move focus to the other one. */                               
      52 +  function goToPage(nextPage: number) {                        
      53 +    setPage(nextPage);                                         
      54 +    setAnnouncement(`Page ${nextPage} of ${view.pageCount}.`); 
      55 +    if (nextPage === 1) {                                      
      56 +      nextRef.current?.focus();                                
      57 +    } else if (nextPage === view.pageCount) {                  
      58 +      prevRef.current?.focus();                                
      59 +    }                                                          
      60 +  }                                                            
      61 +                                                               
      62    return (
      63      <div className="data-grid">
      64        <div className="grid-toolbar">
      65          <label htmlFor={filterId}>Filter rows</label>
      19 -        <input id={filterId} type="search" autoComplete="off" /
         ->                                                              
      66 +        <input                                                 
      67 +          id={filterId}                                        
      68 +          type="search"                                        
      69 +          autoComplete="off"                                   
      70 +          value={query}                                        
      71 +          onChange={(event) => handleQueryChange(event.target.v
         +alue)}                                                         
      72 +        />                                                     
      73        </div>
      74  
      75        <div className="grid-scroll">
     ...
       77            <caption>{ariaLabel}</caption>
       78            <thead>
       79              <tr role="row">
       27 -              {columns.map((column) => (                      
       28 -                <th key={String(column.accessorKey)} scope="co
          -l">                                                           
       29 -                  {column.sortable ? <button type="button">{co
          -lumn.header}</button> : column.header}                        
       30 -                </th>                                         
       31 -              ))}                                             
       80 +              {columns.map((column) => {                      
       81 +                const direction =                             
       82 +                  sort.kind === 'sorted' && sort.key === colum
          +n.accessorKey                                                 
       83 +                    ? sort.direction                          
       84 +                    : undefined;                              
       85 +                return (                                      
       86 +                  <th key={String(column.accessorKey)} scope="
          +col" aria-sort={direction}>                                   
       87 +                    {column.sortable ? (                      
       88 +                      <button type="button" onClick={() => han
          +dleSort(column.accessorKey)}>                                 
       89 +                        {column.header}                       
       90 +                        {direction && (                       
       91 +                          <span aria-hidden="true">{direction 
          +=== 'ascending' ? ' ▲' : ' ▼'}</span>                         
       92 +                        )}                                    
       93 +                      </button>                               
       94 +                    ) : (                                     
       95 +                      column.header                           
       96 +                    )}                                        
       97 +                  </th>                                       
       98 +                );                                            
       99 +              })}                                             
      100              </tr>
      101            </thead>
      102            <tbody>
     ...
      122        </div>
      123  
      124        <nav aria-label="Pagination" className="grid-pagination"
           >
       57 -        <button type="button" disabled={view.page === 1}>     
      125 +        <button                                               
      126 +          ref={prevRef}                                       
      127 +          type="button"                                       
      128 +          disabled={view.page === 1}                          
      129 +          onClick={() => goToPage(view.page - 1)}             
      130 +        >                                                     
      131            Previous
      132          </button>
      133          <p>
      134            Page {view.page} of {view.pageCount}
      135          </p>
       63 -        <button type="button" disabled={view.page === view.pag
          -eCount}>                                                      
      136 +        <button                                               
      137 +          ref={nextRef}                                       
      138 +          type="button"                                       
      139 +          disabled={view.page === view.pageCount}             
      140 +          onClick={() => goToPage(view.page + 1)}             
      141 +        >                                                     
      142            Next
      143          </button>
      144        </nav>
      145  
       68 -      <p role="status" aria-live="polite" className="visually-
          -hidden"></p>                                                  
      146 +      <p role="status" aria-live="polite" className="visually-
          +hidden">                                                      
      147 +        {announcement}                                        
      148 +      </p>                                                    
      149      </div>
      150    );
      151  }

● Trong goToPage, nút Previous vẫn disabled khi gọi focus() nên không có tác
  dụng; mình dùng flushSync để DOM cập nhật trước. Tiếp theo, mình sẽ gọn lại
  cách tính pageCount trong handleQueryChange.

● Update(src\components\DataGrid.tsx)
  ⎿  Added 8 lines, removed 3 lines
      48      );
      49    }
      50  
      51 -  /** A pagination button that becomes disabled loses focus, so
         - move focus to the other one. */                               
      51 +  /**                                                          
      52 +   * A pagination button that becomes disabled loses focus, so 
         +move focus to the other one.                                   
      53 +   * flushSync commits the new page first; before that the targ
         +et button may still be disabled.                               
      54 +   */                                                          
      55    function goToPage(nextPage: number) {
      53 -    setPage(nextPage);                                         
      54 -    setAnnouncement(`Page ${nextPage} of ${view.pageCount}.`); 
      56 +    flushSync(() => {                                          
      57 +      setPage(nextPage);                                       
      58 +      setAnnouncement(`Page ${nextPage} of ${view.pageCount}.`)
         +;                                                              
      59 +    });                                                        
      60      if (nextPage === 1) {
      61        nextRef.current?.focus();
      62      } else if (nextPage === view.pageCount) {

● Update(src\components\DataGrid.tsx)
  ⎿  Added 4 lines, removed 2 lines
      33    const view = paginate(sortRows(filtered, sort), page, PAGE_SI
          ZE);
      34  
      35    function handleQueryChange(nextQuery: string) {
      36 -    const total = filterRows(data, columns, nextQuery).length; 
      36 +    const matches = filterRows(data, columns, nextQuery);      
      37      setQuery(nextQuery);
      38      setPage(1);
      39 -    setAnnouncement(describeResults(total, 1, Math.max(1, Math.
         -ceil(total / PAGE_SIZE))));                                    
      39 +    setAnnouncement(                                           
      40 +      describeResults(matches.length, 1, paginate(matches, 1, P
         +AGE_SIZE).pageCount),                                          
      41 +    );                                                         
      42    }
      43  
      44    function handleSort(key: keyof T) {

● Update(src\components\DataGrid.tsx)
  ⎿  Added 1 line
      1  import { useId, useRef, useState } from 'react';
      2 +import { flushSync } from 'react-dom';                          
      3  import type { ColumnDef, DataGridProps, SortState } from '../typ
         es/data-grid-contract';
      4  import { filterRows, nextSort, paginate, sortRows } from '../lib
         /grid';
      5  

● Giờ chạy các bước kiểm tra, build bản mới, rồi thao tác thật trong Chrome
  headless:

  Ran 1 shell command (ctrl+o to expand)

● Câu lệnh sed bị lỗi dấu nháy. Mình viết lại toàn bộ script kiểm tra bằng công
  cụ Write cho chắc:

  Made 1 scratchpad edit +119 (ctrl+o to expand)

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && npx prettier --write
      src/components/DataGrid.tsx >/dev/null && npm r…)
  ⎿  Updated src\components\DataGrid.tsx (+1 -3)
      37      const matches = filterRows(data, columns, nextQuery);
      38      setQuery(nextQuery);
      39      setPage(1);
      40 -    setAnnouncement(                                           
      41 -      describeResults(matches.length, 1, paginate(matches, 1, P
         -AGE_SIZE).pageCount),                                          
      42 -    );                                                         
      40 +    setAnnouncement(describeResults(matches.length, 1, paginate
         +(matches, 1, PAGE_SIZE).pageCount));                           
      41    }
      42  
      43    function handleSort(key: keyof T) {
  ⎿  (timeout 3m)

● Tất cả các kiểm tra trên bản build đều qua. Để chắc chắn, mình chạy lại cùng
  script trên dev server (bật StrictMode và cảnh báo của React):

  Ran 1 shell command (ctrl+o to expand)

● Trên dev server chỉ có log debug/info của Vite và React DevTools, không có
  cảnh báo hay lỗi nào. Giờ tắt server và commit:

  Ran 2 shell commands (ctrl+o to expand)

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      138  | T-06 | Keyboard logic | `lib/keyboard.ts` | Đúng mục 2.3; cl
           amp ở biên | `feat(logic): add grid keyboard helpers` | ✅ |
      139  | T-07 | Markup: landmarks + bảng + filter + pagination + live
            region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
           /row/gridcell, `<label for>` cho input, skip link, `<header>`/
           `<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
           -grid` | ✅ |
      140  | T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
            rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
            ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
           le data-grid with tokens` | ✅ |
      141 -| T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
          - trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
          -gion đọc kết quả | `feat(state): wire sort, filter, pagination
          -` | |                                                         
      141 +| T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
          + trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
          +gion đọc kết quả | `feat(state): wire sort, filter, pagination
          +` | ✅ |                                                      
      142  | T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
           keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
           ` | `feat(a11y): add arrow-key grid navigation` | |
      143  | T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
           lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
           nter-select and space-toggle` | |
      144  | T-12 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
            | A11y 100, Best Practices 100, 0 lỗi console, CLS 0 | `fix(a
           11y): …` / `docs(audit): …` | |

  Ran 1 shell command (ctrl+o to expand)
● T-09 xong, đã commit và đã đánh dấu trong WBS: sort, lọc và phân trang giờ đã
  chạy được.

  ca09423 docs(spec): mark T-09 as done
  8e644ed feat(state): wire sort, filter, pagination

  Những gì đã thêm vào src/components/DataGrid.tsx
  - State chỉ gồm 4 giá trị: query, sort, page và announcement. Danh sách hàng
    hiển thị không lưu vào state mà được tính lại mỗi lần render: lọc → sắp xếp
    → phân trang.
  - Sort:
    - Nút sort đổi trạng thái bằng hàm nextSort.
    - <th> của cột đang sort được gắn aria-sort, kèm mũi tên ▲/▼. Mũi tên có
      aria-hidden nên screen reader không đọc nó.
    - Sort hoặc lọc đều đưa bảng về trang 1.
  - Lọc: ô lọc là input do React kiểm soát giá trị (controlled input). Nếu không
    có hàng nào khớp, bảng hiện hàng "No results".
  - Thông báo cho screen reader: vùng aria-live đọc các câu như "Sorted by
    Salary (USD), ascending. 20 results. Page 1 of 2." hoặc "7 results. Page 1
    of 1.". Lúc vừa tải trang, vùng này để trống.
  - Focus khi phân trang: khi bấm Next tới trang cuối, nút Next bị disabled, nên
    focus được chuyển sang nút Previous. Ở trang đầu thì ngược lại. Như vậy
    focus không bao giờ rơi về <body>.

  Một lỗi mình bắt được trước khi commit: bản đầu gọi focus() ngay trong hàm xử
  lý click. Lúc đó React chưa render lại nên nút Previous vẫn còn disabled, và
  lệnh focus() không có tác dụng. Mình sửa bằng flushSync: nó bắt React cập nhật
  DOM xong rồi mới chuyển focus.

  Đã kiểm chứng: mình chạy một script click và gõ phím thật trong Chrome
  headless, trên cả bản build lẫn dev server (có StrictMode). Tất cả các kiểm
  tra đều qua:
  - Sort lương cho ra thứ tự tăng dần → giảm dần → trở về thứ tự gốc. aria-sort
    và câu thông báo đúng ở từng bước. Focus vẫn nằm ở nút sort.
  - Đổi sang cột khác thì bắt đầu từ tăng dần. Cột Role không có nút sort.
  - Bấm Next thì focus chuyển sang Previous. Bấm Previous thì focus về lại Next.
  - Đang ở trang 2 mà sort hoặc lọc thì bảng quay về trang 1.
  - Hàng e-13 ở trang 2 hiện nguyên văn <img src=x onerror=alert(1)> dưới dạng
    chữ, không có thẻ <img> nào được tạo ra.
  - Lọc "engineering" ra 7 hàng, focus vẫn ở ô lọc. Gõ ( chỉ khớp hàng XSS. Gõ
    .* hay zzz thì hiện "No results"; ô này trải đủ 5 cột và cả hai nút phân
    trang đều bị tắt.
  - Console không có lỗi hay cảnh báo nào, trừ lỗi 404 của favicon đã biết từ
    trước (sẽ sửa ở T-12).

  Task tiếp theo là T-10: di chuyển giữa các ô bằng phím mũi tên, dùng roving
  tabindex. Cách làm này nghĩa là cả bảng chỉ có một ô tabindex="0", nên Tab chỉ
  dừng ở bảng một lần, rồi dùng mũi tên để đi giữa các ô.

> Quất luôn T-10

  Read 1 file (ctrl+o to expand)

● Update(src\components\DataGrid.tsx)
  ⎿  Added 8 lines, removed 2 lines
       1 -import { useId, useRef, useState } from 'react';               
       1 +import { useId, useRef, useState, type FocusEvent, type Keyboar
         +dEvent } from 'react';                                         
       2  import { flushSync } from 'react-dom';
       3 -import type { ColumnDef, DataGridProps, SortState } from '../ty
         -pes/data-grid-contract';                                       
       3 +import type {                                                  
       4 +  CellPosition,                                                
       5 +  ColumnDef,                                                   
       6 +  DataGridProps,                                               
       7 +  SortState,                                                   
       8 +} from '../types/data-grid-contract';                          
       9  import { filterRows, nextSort, paginate, sortRows } from '../li
          b/grid';
      10 +import { getGridAction, moveCell } from '../lib/keyboard';     
      11  
      12  const PAGE_SIZE = 10;
      13  

● Update(src\components\DataGrid.tsx)
  ⎿  Added 38 lines
      33    const [sort, setSort] = useState<SortState<T>>({ kind: 'none'
           });
      34    const [page, setPage] = useState(1);
      35    const [announcement, setAnnouncement] = useState('');
      36 +  const [activeCell, setActiveCell] = useState<CellPosition>({ 
         +row: 0, col: 0 });                                             
      37    const prevRef = useRef<HTMLButtonElement>(null);
      38    const nextRef = useRef<HTMLButtonElement>(null);
      39 +  const tableRef = useRef<HTMLTableElement>(null);             
      40  
      41    const filtered = filterRows(data, columns, query);
      42    const view = paginate(sortRows(filtered, sort), page, PAGE_SI
          ZE);
      43  
      44 +  // Row 0 is the header. With no results only the header row i
         +s navigable.                                                   
      45 +  const rowCount = view.rows.length + 1;                       
      46 +  // Clamp so the single tabindex="0" cell still exists after f
         +iltering or paging shrinks the grid.                           
      47 +  const active: CellPosition = {                               
      48 +    row: Math.min(activeCell.row, rowCount - 1),               
      49 +    col: Math.min(activeCell.col, columns.length - 1),         
      50 +  };                                                           
      51 +  const tabIndexFor = (row: number, col: number) =>            
      52 +    row === active.row && col === active.col ? 0 : -1;         
      53 +                                                               
      54 +  /** Header cells with a sort button focus the button; every o
         +ther cell focuses itself. */                                   
      55 +  function focusCell(pos: CellPosition) {                      
      56 +    const cell = tableRef.current?.rows[pos.row]?.cells[pos.col
         +];                                                             
      57 +    const target = cell?.firstElementChild instanceof HTMLButto
         +nElement ? cell.firstElementChild : cell;                      
      58 +    target?.focus();                                           
      59 +  }                                                            
      60 +                                                               
      61 +  function handleGridKeyDown(event: KeyboardEvent<HTMLTableElem
         +ent>) {                                                        
      62 +    const action = getGridAction(event.key);                   
      63 +    if (action === null || action === 'select' || action === 't
         +oggle') {                                                      
      64 +      return;                                                  
      65 +    }                                                          
      66 +    event.preventDefault();                                    
      67 +    const next = moveCell(active, action, rowCount, columns.len
         +gth);                                                          
      68 +    setActiveCell(next);                                       
      69 +    focusCell(next);                                           
      70 +  }                                                            
      71 +                                                               
      72 +  /** Keeps the roving tabindex in sync when a cell is focused 
         +by mouse or Tab. */                                            
      73 +  function handleGridFocus(event: FocusEvent<HTMLTableElement>)
         + {                                                             
      74 +    const cell = event.target.closest('th, td');               
      75 +    if (cell instanceof HTMLTableCellElement && cell.parentElem
         +ent instanceof HTMLTableRowElement) {                          
      76 +      setActiveCell({ row: cell.parentElement.rowIndex, col: ce
         +ll.cellIndex });                                               
      77 +    }                                                          
      78 +  }                                                            
      79 +                                                               
      80    function handleQueryChange(nextQuery: string) {
      81      const matches = filterRows(data, columns, nextQuery);
      82      setQuery(nextQuery);

● Update(src\components\DataGrid.tsx)
  ⎿  Added 19 lines, removed 4 lines
      123        </div>
      124  
      125        <div className="grid-scroll">
      126 -        <table role="grid" aria-label={ariaLabel}>            
      126 +        <table                                                
      127 +          ref={tableRef}                                      
      128 +          role="grid"                                         
      129 +          aria-label={ariaLabel}                              
      130 +          onKeyDown={handleGridKeyDown}                       
      131 +          onFocus={handleGridFocus}                           
      132 +        >                                                     
      133            <caption>{ariaLabel}</caption>
      134            <thead>
      135              <tr role="row">
      130 -              {columns.map((column) => {                      
      136 +              {columns.map((column, colIndex) => {            
      137                  const direction =
      138                    sort.kind === 'sorted' && sort.key === colum
           n.accessorKey
      139                      ? sort.direction
      140                      : undefined;
      141                  return (
      136 -                  <th key={String(column.accessorKey)} scope="
          -col" aria-sort={direction}>                                   
      142 +                  <th                                         
      143 +                    key={String(column.accessorKey)}          
      144 +                    scope="col"                               
      145 +                    aria-sort={direction}                     
      146 +                    tabIndex={column.sortable ? undefined : ta
          +bIndexFor(0, colIndex)}                                       
      147 +                  >                                           
      148                      {column.sortable ? (
      138 -                      <button type="button" onClick={() => han
          -dleSort(column.accessorKey)}>                                 
      149 +                      <button                                 
      150 +                        type="button"                         
      151 +                        tabIndex={tabIndexFor(0, colIndex)}   
      152 +                        onClick={() => handleSort(column.acces
          +sorKey)}                                                      
      153 +                      >                                       
      154                          {column.header}
      155                          {direction && (
      156                            <span aria-hidden="true">{direction 
           === 'ascending' ? ' ▲' : ' ▼'}</span>

● Update(src\components\DataGrid.tsx)
  ⎿  Added 7 lines, removed 3 lines
      172                  </td>
      173                </tr>
      174              ) : (
      175 -              view.rows.map((row) => (                        
      175 +              view.rows.map((row, rowIndex) => (              
      176                  <tr key={row.id} role="row">
      177 -                  {columns.map((column) => (                  
      178 -                    <td key={String(column.accessorKey)} role=
          -"gridcell">                                                   
      177 +                  {columns.map((column, colIndex) => (        
      178 +                    <td                                       
      179 +                      key={String(column.accessorKey)}        
      180 +                      role="gridcell"                         
      181 +                      tabIndex={tabIndexFor(rowIndex + 1, colI
          +ndex)}                                                        
      182 +                    >                                         
      183                        {String(row[column.accessorKey])}
      184                      </td>
      185                    ))}

● Giờ viết script kiểm tra T-10 rồi chạy cùng các bước kiểm tra tĩnh:

  Made 1 scratchpad edit +137 (ctrl+o to expand)

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && npx prettier --write
      src/components/DataGrid.tsx >/dev/null && npm r…)
  ⎿  Updated src\components\DataGrid.tsx (+2 -1)
      54    /** Header cells with a sort button focus the button; every o
          ther cell focuses itself. */
      55    function focusCell(pos: CellPosition) {
      56      const cell = tableRef.current?.rows[pos.row]?.cells[pos.col
          ];
      57 -    const target = cell?.firstElementChild instanceof HTMLButto
         -nElement ? cell.firstElementChild : cell;                      
      57 +    const target =                                             
      58 +      cell?.firstElementChild instanceof HTMLButtonElement ? ce
         +ll.firstElementChild : cell;                                   
      59      target?.focus();
      60    }
      61  
  ⎿  (timeout 2m)

● Kiểm tra tĩnh sạch. Giờ chạy thử trong Chrome headless, cả bản build lẫn dev
  server:

  Ran 1 shell command (ctrl+o to expand)

● Lỗi ở dòng 116 nằm ở script kiểm tra: trang đã cuộn 140px nên ô lọc khuất khỏi
  khung nhìn, còn mọi kiểm tra trước đó đều đạt. Mình sẽ sửa hàm click để cuộn
  phần tử vào khung nhìn trước khi bấm.

  Ran 1 shell command (ctrl+o to expand)

● Cả bản build và dev server đều qua hết, kiểm tra hồi quy của T-09 cũng qua.
  Tắt server, xem lại diff rồi commit:

  Ran 3 shell commands (ctrl+o to expand)

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      139  | T-07 | Markup: landmarks + bảng + filter + pagination + live
            region | `DataGrid.tsx`, `App.tsx` | Native table + role grid
           /row/gridcell, `<label for>` cho input, skip link, `<header>`/
           `<main>`/`<nav>`, 1 `<h1>` | `feat(html): render semantic data
           -grid` | ✅ |
      140  | T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
            rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
            ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
           le data-grid with tokens` | ✅ |
      141  | T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
            trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
           gion đọc kết quả | `feat(state): wire sort, filter, pagination
           ` | ✅ |
      142 -| T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
          -keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
          -` | `feat(a11y): add arrow-key grid navigation` | |           
      142 +| T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
          +keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
          +` | `feat(a11y): add arrow-key grid navigation` | ✅ |        
      143  | T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
           lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
           nter-select and space-toggle` | |
      144  | T-12 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
            | A11y 100, Best Practices 100, 0 lỗi console, CLS 0 | `fix(a
           11y): …` / `docs(audit): …` | |
      145  

  Ran 1 shell command (ctrl+o to expand)

● T-10 xong: giờ có thể dùng phím mũi tên để đi giữa các ô của bảng. Mình đã
  commit và đánh dấu xong trong WBS.

  c98328b docs(spec): mark T-10 as done
  452ab76 feat(a11y): add arrow-key grid navigation

  Cách hoạt động (trong src/components/DataGrid.tsx)
  - Bảng chỉ là một điểm dừng khi nhấn Tab (roving tabindex): state activeCell
    ghi nhớ ô đang được chọn. Chỉ ô đó có tabIndex=0, mọi ô khác là -1. Riêng ở
    hàng tiêu đề, nếu cột sort được thì chính nút sort nhận tabIndex, còn cột
    Role không sort được thì <th> nhận.
  - Một trình xử lý phím duy nhất gắn trên <table>. Nó dùng getGridAction và
    moveCell từ src/lib/keyboard.ts. preventDefault() chỉ được gọi cho 4 phím
    mũi tên.
  - Enter và Space không bị chặn: nhấn hai phím này trên nút sort vẫn sort như
    bình thường. Ở các ô trong thân bảng, hai phím này sẽ được dùng ở T-11.
  - onFocus trên bảng: khi click chuột hoặc Tab vào một ô, activeCell được cập
    nhật theo ô đó. Nhờ vậy, nhấn mũi tên sẽ đi tiếp từ đúng chỗ người dùng vừa
    đứng.
  - Giới hạn ô đang chọn khi bảng thu nhỏ: sau khi lọc hoặc đổi trang, nếu số
    hàng ít đi thì ô đang chọn được kéo về hàng cuối còn lại. Như vậy bảng luôn
    có đúng một ô nhận Tab. Khi không có kết quả nào, chỉ còn hàng tiêu đề để di
    chuyển.

  Đã kiểm chứng bằng phím và chuột thật trong Chrome headless, trên cả bản build
  và dev server:
  - Trong bảng chỉ có đúng một điểm dừng Tab. Thứ tự Tab là: skip link → ô lọc →
    bảng → Next. Nhấn Shift+Tab thì quay lại đúng ô cũ.
  - Đến mép bảng thì không đi tiếp. Ví dụ: đi lên hay sang trái ở ô đầu thì đứng
    yên; nhấn xuống 12 lần thì dừng ở hàng 10; sang phải thì dừng ở cột cuối.
  - Click vào một ô thì điểm dừng Tab chuyển sang ô đó, và mũi tên đi tiếp từ
    đó.
  - Enter và Space trên nút sort vẫn sort được, focus vẫn nằm trên nút.
  - Đang đứng ở hàng 10 mà lọc "Tech Lead" còn 1 hàng thì điểm dừng Tab chuyển
    về hàng 1. Lọc "zzz" thì điểm dừng nằm ở hàng tiêu đề, và mũi tên xuống
    không đi vào hàng "No results".
  - Console không có lỗi hay cảnh báo nào. Chạy lại bộ kiểm tra của T-09 vẫn qua
    hết.

  Lần chạy đầu có một kiểm tra thất bại, nhưng đó là lỗi của script kiểm tra chứ
  không phải của code. Trang đã cuộn xuống nên ô lọc nằm ngoài vùng nhìn thấy,
  và cú click giả lập bị trượt. Mình sửa script để cuộn phần tử vào tầm nhìn
  trước khi click, và mọi kiểm tra đều qua.

  Task tiếp theo là T-11: Enter để chọn hàng, Space để bật/tắt chọn. Phần này
  cũng sẽ là lúc kiểm tra cách hiển thị hàng được chọn (nền, vạch, dấu ✓) mà
  T-08 chưa kiểm được.

> bắt đầu làm T-011

  Searched for 1 pattern, read 1 file (ctrl+o to expand)

● Update(src\components\DataGrid.tsx)
  ⎿  Added 1 line
      26  export default function DataGrid<T extends { id: string }>({
      27    data,
      28    columns,
      29 +  onRowSelect,                                                 
      30    ariaLabel,
      31  }: DataGridProps<T>) {
      32    const filterId = useId();

● Update(src\components\DataGrid.tsx)
  ⎿  Added 2 lines
      35    const [page, setPage] = useState(1);
      36    const [announcement, setAnnouncement] = useState('');
      37    const [activeCell, setActiveCell] = useState<CellPosition>({ 
          row: 0, col: 0 });
      38 +  // Keyed by row id, so selection survives sorting, filtering 
         +and paging.                                                    
      39 +  const [selectedIds, setSelectedIds] = useState<ReadonlySet<st
         +ring>>(new Set());                                             
      40    const prevRef = useRef<HTMLButtonElement>(null);
      41    const nextRef = useRef<HTMLButtonElement>(null);
      42    const tableRef = useRef<HTMLTableElement>(null);

● Update(src\components\DataGrid.tsx)
  ⎿  Added 39 lines, removed 1 line
       62      target?.focus();
       63    }
       64  
       65 +  const rowLabel = (row: T) => String(row[columns[0].accessorK
          +ey]);                                                         
       66 +                                                              
       67 +  /** Enter: make this the only selected row and notify the pa
          +rent. */                                                      
       68 +  function selectRow(row: T) {                                
       69 +    setSelectedIds(new Set([row.id]));                        
       70 +    setAnnouncement(`${rowLabel(row)} selected.`);            
       71 +    onRowSelect?.(row);                                       
       72 +  }                                                           
       73 +                                                              
       74 +  /** Space: add or remove this row from the selection. */    
       75 +  function toggleRow(row: T) {                                
       76 +    const next = new Set(selectedIds);                        
       77 +    const wasSelected = next.delete(row.id);                  
       78 +    if (!wasSelected) {                                       
       79 +      next.add(row.id);                                       
       80 +    }                                                         
       81 +    setSelectedIds(next);                                     
       82 +    setAnnouncement(`${rowLabel(row)} ${wasSelected ? 'deselec
          +ted' : 'selected'}.`);                                        
       83 +  }                                                           
       84 +                                                              
       85    function handleGridKeyDown(event: KeyboardEvent<HTMLTableEle
           ment>) {
       86      const action = getGridAction(event.key);
       67 -    if (action === null || action === 'select' || action === '
          -toggle') {                                                    
       87 +    if (action === null) {                                    
       88        return;
       89      }
       90 +    if (action === 'select' || action === 'toggle') {         
       91 +      // In the header, Enter/Space belong to the native sort 
          +button.                                                       
       92 +      const row = view.rows[active.row - 1];                  
       93 +      if (active.row === 0 || row === undefined) {            
       94 +        return;                                               
       95 +      }                                                       
       96 +      // preventDefault stops Space from scrolling the page; r
          +epeats would flip the toggle repeatedly.                      
       97 +      event.preventDefault();                                 
       98 +      if (event.repeat) {                                     
       99 +        return;                                               
      100 +      }                                                       
      101 +      if (action === 'select') {                              
      102 +        selectRow(row);                                       
      103 +      } else {                                                
      104 +        toggleRow(row);                                       
      105 +      }                                                       
      106 +      return;                                                 
      107 +    }                                                         
      108      event.preventDefault();
      109      const next = moveCell(active, action, rowCount, columns.le
           ngth);
      110      setActiveCell(next);

● Update(src\components\DataGrid.tsx)
  ⎿  Added 1 line
      169            ref={tableRef}
      170            role="grid"
      171            aria-label={ariaLabel}
      172 +          aria-multiselectable="true"                         
      173            onKeyDown={handleGridKeyDown}
      174            onFocus={handleGridFocus}
      175          >

● Update(src\components\DataGrid.tsx)
  ⎿  Added 1 line, removed 1 line
      216                </tr>
      217              ) : (
      218                view.rows.map((row, rowIndex) => (
      219 -                <tr key={row.id} role="row">                  
      219 +                <tr key={row.id} role="row" aria-selected={sel
          +ectedIds.has(row.id)}>                                        
      220                    {columns.map((column, colIndex) => (
      221                      <td
      222                        key={String(column.accessorKey)}

● Để kiểm tra onRowSelect, mình sẽ tạo một trang thử tạm (không commit) vì
  App.tsx chưa truyền callback này và file đó nằm ngoài T-11. Xong việc sẽ xóa
  trang đó.

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && cat > harness.html
      <<'EOF'
      <!doctype html>…)
  ⎿  Created harness.html (+3 -0)
      1 +<!doctype html>                                                 
      2 +<html lang="en"><head><meta charset="UTF-8" /><title>harness</ti
        +tle></head>                                                     
      3 +<body><div id="root"></div><script type="module" src="/src/__har
        +ness.tsx"></script></body></html>                               
  ⎿  Created src\__harness.tsx (+17 -0)
       1 +import { StrictMode } from 'react';                            
       2 +import { createRoot } from 'react-dom/client';                 
       3 +import DataGrid from './components/DataGrid';                  
       4 +import { employees, type Employee } from './data/employees';   
       5 +                                                               
       6 +declare global { interface Window { __selected: string[] } }   
       7 +window.__selected = [];                                        
       8 +createRoot(document.getElementById('root')!).render(           
       9 +  <StrictMode>                                                 
      10 +    <DataGrid<Employee>                                        
      11 +      data={employees}                                         
      12 +      columns={[{ header: 'Name', accessorKey: 'name', sortable
         +: true }, { header: 'Salary', accessorKey: 'salary', sortable: 
         +true }]}                                                       
      13 +      ariaLabel="Harness"                                      
      14 +      onRowSelect={(e) => window.__selected.push(e.id)}        
      15 +    />                                                         
      16 +  </StrictMode>,                                               
      17 +);                                                             
  ⎿  (timeout 2m)
  Made 1 scratchpad edit +144, ran 1 shell command (ctrl+o to expand)

● Lỗi nằm ở script kiểm tra chứ không phải code: lần nhấn Space thừa đã bỏ chọn
  hàng "Hoang Thu Ha", và code xử lý đúng như vậy. Mình bỏ lần nhấn đó và chạy
  lại.

  Made 1 scratchpad edit +2 -3, ran 1 shell command (ctrl+o to expand)

● Lỗi lại nằm ở script: khi sort giảm dần, Hoàng (1200) và Ngô (1400) bị đẩy
  sang trang 2 nên hàm selected() bỏ sót. Mình chuyển sang sort tăng dần để cả
  hai cùng nằm ở trang 1.

  Made 1 scratchpad edit +5 -4, ran 1 shell command (ctrl+o to expand)

● Bộ lọc "Ha" trả về quá nhiều hàng nên có thể Hoang Thu Ha không nằm ở trang 1.
  Mình sẽ mở trực tiếp trình duyệt để tìm tên bà ấy.

  Ran 1 shell command (ctrl+o to expand)

● Chỉ có 5 hàng khớp, trong đó có Hoang. Vậy cần xem trình duyệt thật sự hiển
  thị gì ở bước này:

  Made 1 scratchpad edit +3 -1, ran 1 shell command (ctrl+o to expand)

● Bước lọc đã qua nhưng React cần thêm thời gian render, và chuỗi rỗng không xóa
  được ô lọc nên các bước sau chạy sai dữ liệu. Tôi đang sửa script: xóa ô lọc
  bằng Backspace, tăng thời gian chờ, và kiểm tra hàng tiêu đề theo nội dung
  thông báo.

  Made 1 scratchpad edit +30 -23, ran 1 shell command (ctrl+o to expand)

● Qua cả hai lần chạy liên tiếp. Mình xem ảnh chụp hàng được chọn, rồi chạy hồi
  quy T-09/T-10 trên bản build:

  Read 1 file (ctrl+o to expand)

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" && rm harness.html
      src/__harness.tsx && git status --short && npm run f…)
  ⎿  Deleted harness.html (+0 -3)
      1 -<!doctype html>                                                 
      2 -<html lang="en"><head><meta charset="UTF-8" /><title>harness</ti
        -tle></head>                                                     
      3 -<body><div id="root"></div><script type="module" src="/src/__har
        -ness.tsx"></script></body></html>                               
  ⎿  Deleted src\__harness.tsx (+0 -17)
       1 -import { StrictMode } from 'react';                            
       2 -import { createRoot } from 'react-dom/client';                 
       3 -import DataGrid from './components/DataGrid';                  
       4 -import { employees, type Employee } from './data/employees';   
       5 -                                                               
       6 -declare global { interface Window { __selected: string[] } }   
       7 -window.__selected = [];                                        
       8 -createRoot(document.getElementById('root')!).render(           
       9 -  <StrictMode>                                                 
      10 -    <DataGrid<Employee>                                        
      11 -      data={employees}                                         
      12 -      columns={[{ header: 'Name', accessorKey: 'name', sortable
         -: true }, { header: 'Salary', accessorKey: 'salary', sortable: 
         -true }]}                                                       
      13 -      ariaLabel="Harness"                                      
      14 -      onRowSelect={(e) => window.__selected.push(e.id)}        
      15 -    />                                                         
      16 -  </StrictMode>,                                               
      17 -);                                                             
  ⎿  (timeout 4m)

● Ảnh cho thấy hàng đã chọn có dấu ✓, vạch xanh và nền xanh nhạt, ô đang focus
  có viền xanh riêng. Tôi đã xóa trang thử tạm, giờ tắt server rồi commit.

  Ran 2 shell commands (ctrl+o to expand)

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      140  | T-08 | CSS | `tokens.css`, `data-grid.css` | Không hex trong
            rule component; contrast ≥ 4.5:1; focus ring rõ; hàng chọn có
            ✓ (không chỉ màu); 375px không scroll ngang | `feat(css): sty
           le data-grid with tokens` | ✅ |
      141  | T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
            trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
           gion đọc kết quả | `feat(state): wire sort, filter, pagination
           ` | ✅ |
      142  | T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
           keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
           ` | `feat(a11y): add arrow-key grid navigation` | ✅ |
      143 -| T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
          -lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
          -nter-select and space-toggle` | |                             
      143 +| T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
          +lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
          +nter-select and space-toggle` | ✅ |                          
      144  | T-12 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
            | A11y 100, Best Practices 100, 0 lỗi console, CLS 0 | `fix(a
           11y): …` / `docs(audit): …` | |
      145  
      146  > `AI_FAILURE_AUDIT.md` không làm cho HW1 (rule §8 chỉ yêu cầu
            ở HW3).

  Ran 1 shell command (ctrl+o to expand)

● T-11 xong: Enter chọn một hàng, Space bật/tắt chọn hàng. Mình đã commit và
  đánh dấu xong trong WBS.

  2b45052 docs(spec): mark T-11 as done
  3b98f77 feat(a11y): add enter-select and space-toggle

  Những gì đã thêm vào src/components/DataGrid.tsx
  - Lưu hàng đã chọn: state selectedIds là một tập các id của hàng. Vì lưu theo
    id nên hàng đang chọn vẫn giữ nguyên khi sort, lọc hay đổi trang.
  - Enter ở một ô trong thân bảng: hàng đó trở thành hàng được chọn duy nhất, và
    component gọi onRowSelect(row).
  - Space: thêm hàng vào danh sách đang chọn, hoặc bỏ ra nếu nó đã có sẵn. Hàm
    gọi preventDefault() để trang không bị cuộn. Khi giữ phím, các lần lặp phím
    (event.repeat) bị bỏ qua, nên chỉ đảo trạng thái một lần.
  - Ở hàng tiêu đề: Enter và Space vẫn để nút sort tự xử lý. Ở cột Role (không
    sort được), hai phím này không làm gì.
  - Cho screen reader: mỗi hàng có aria-selected, bảng có
    aria-multiselectable="true". Vùng thông báo đọc "… selected." hoặc "…
    deselected.".

  Đã kiểm chứng bằng thao tác phím và chuột thật trong Chrome headless:
  - Space: chọn được nhiều hàng; nhấn Space lần nữa thì bỏ chọn. Trang không
    cuộn. Giữ phím (5 lần lặp) chỉ đảo trạng thái đúng một lần.
  - Enter: thay toàn bộ lựa chọn bằng hàng hiện tại. Giữ Enter cũng không gây
    chọn lặp.
  - Hiển thị hàng được chọn (phần T-08 chưa kiểm được): có dấu ✓, vạch xanh bên
    trái và nền xanh nhạt. Mình đã kiểm qua style tính được lẫn ảnh chụp màn
    hình.
  - Giữ lựa chọn qua thao tác khác: hàng đã chọn vẫn được chọn sau khi sort
    (hàng di chuyển và dấu chọn đi theo), sau khi đổi trang qua lại, sau khi lọc
    và sau khi xóa ô lọc.
  - Ở hàng tiêu đề: Enter và Space sort như bình thường và không chọn hàng nào.
    Ở cột Role, hai phím này không làm gì.
  - onRowSelect: được gọi khi nhấn Enter, không gọi khi nhấn Space. Sau khi
    sort, callback nhận đúng hàng theo id (e-04), không theo vị trí.
  - Chạy lại bộ kiểm tra của T-09 và T-10 trên bản build vẫn qua hết. Console
    không có lỗi hay cảnh báo nào.

  Hai điều cần biết:
  - Cách kiểm onRowSelect: App.tsx hiện chưa truyền onRowSelect, và file này nằm
    ngoài danh sách được sửa của T-11. Vì vậy mình kiểm bằng một trang thử tạm
    (harness.html), sau đó đã xóa và không commit. Nếu bạn muốn người dùng thấy
    được callback hoạt động, ví dụ một dòng "Selected: Hoang Thu Ha" bên dưới
    bảng, thì cần sửa App.tsx. Đó là phần thêm ngoài WBS, nên mình chờ bạn
    quyết.
  - Mấy lần chạy kiểm tra bị đỏ: cả 3 lần đều do lỗi của script kiểm tra mình
    viết, không phải lỗi trong code:
    - Mình nhấn Space thừa một lần, nên hàng bị bỏ chọn đúng như code phải làm.
    - Mình kiểm hàng đã chọn trên trang 1, trong khi sau khi sort hàng đó đã
      chuyển sang trang 2.
    - Lệnh insertText('') không thực sự xóa được nội dung ô lọc.

    Sau khi sửa script, mình chạy lại hai lần liên tiếp và cả hai đều qua.

  Task cuối là T-12: chạy Lighthouse, kiểm tra bằng bàn phím và NVDA, rồi sửa
  lỗi. Việc đầu tiên trong đó là sửa lỗi 404 favicon đã ghi nhận từ T-08.

> bắt đầu làm T-12

● T-12 có 4 bước:
  1. Sửa lỗi 404 favicon.
  2. Chạy Lighthouse.
  3. Chạy axe trên các trạng thái mà Lighthouse không thấy được: sau khi sort,
     khi đã chọn hàng, khi không có kết quả.
  4. Kiểm tra thủ công.

  Bước 1, sửa favicon. Mình xem index.html hiện tại:

  Read 1 file (ctrl+o to expand)

● Update(index.html)
  ⎿  Added 2 lines
       8        content="Accessible enterprise data-grid with sorting, fi
          ltering and pagination."
       9      />
      10      <title>Accessible Data-Grid | MSIS207 HW1</title>
      11 +    <!-- Empty icon: stops the browser requesting /favicon.ico 
         +(404 = console error in Lighthouse). -->                       
      12 +    <link rel="icon" href="data:," />                          
      13    </head>
      14    <body>
      15      <div id="root"></div>

  Ran 1 shell command (ctrl+o to expand)

● Sau khi bỏ bộ lọc favicon trong script, console vẫn sạch. Mình commit riêng
  bản sửa này:

  Ran 1 shell command (ctrl+o to expand)

● Bước tiếp theo là chạy Lighthouse bằng npx, nên công cụ không được thêm vào
  package.json. Mình sẽ chạy cả cấu hình mobile lẫn desktop trên bản build.

  Ran 1 shell command (ctrl+o to expand)

● Lighthouse đạt 100/100 ở cả ba hạng mục trên mobile lẫn desktop, và git status
  vẫn sạch. Tiếp theo mình sẽ nạp axe-core để kiểm tra các trạng thái sau khi
  thao tác, vì Lighthouse chỉ kiểm tra lúc trang vừa tải xong.

  Made 1 scratchpad edit +70, ran 2 shell commands (ctrl+o to expand)

● Axe không báo vi phạm nào, nhưng để mục color-contrast ở trạng thái "needs
  review" vì có phần tử nó không tự tính được độ tương phản. Mình sẽ xem những
  phần tử đó cụ thể là gì.

  Ran 1 shell command (ctrl+o to expand)

● Axe không tự kết luận được mũi tên sort ▲, vì nó chỉ chứa ký tự không phải chữ
  và có aria-hidden; màu của nó đã đạt 5.7:1 ở T-08. Tiếp theo tôi sẽ thử
  reflow ở zoom 200% (khung nhìn 640px, so với mốc 320px của WCAG).

  Ran 1 shell command (ctrl+o to expand)

● Script bị treo ở bước đo, có lẽ do Chrome headless không phản hồi với
  deviceScaleFactor: 2. Mình sẽ kiểm tra Chrome còn chạy không rồi chạy lại với
  scale 1.

  Ran 1 shell command (ctrl+o to expand)

● Chrome headless đã bị tắt, không phải lỗi của trang. Mình khởi động lại rồi
  chạy tiếp:
  Ran 1 shell command (ctrl+o to expand)

● Trang không bị tràn ngang ở 640px và 320px; phần <caption> được đánh dấu tràn
  nhưng vẫn nằm trong khung cuộn. Mình sẽ kiểm tra ảnh 320px để xác nhận chữ
  "Employees" vẫn hiển thị.

  Read 1 file (ctrl+o to expand)

● Ở 320px, caption "Employees" hiển thị đủ và bảng cuộn ngang trong khung. Mình
  đang xem báo cáo Lighthouse để quyết định có đưa vào repo làm bằng chứng
  không.

  Ran 1 shell command (ctrl+o to expand)

● Mỗi báo cáo khoảng 650 KB, đủ nhỏ để đưa vào repo. Mình lưu hai báo cáo HTML
  và viết một file tóm tắt kết quả audit:

● Bash(cd "D:/Đại học/Phát triển ứng dụng web
      MSIS207/thuc_hanh/Lab2/MSIS207_24520199_Lab2_HW1" &&
      SP="C:/Users/Noper/AppData/Local/Temp/claude/d----i-h-c-Ph-t-tri-n--…)
  ⎿  Updated .prettierignore (+1 -0)
      2  node_modules
      3  package-lock.json
      4  *.md
      5 +docs/audit/*.html                                               
  ⎿  … 4 more files changed

● Write(docs\audit\AUDIT.md)
  ⎿  Wrote 76 lines to docs\audit\AUDIT.md
       1 # HW1 Audit (T-12)
       2
       3 > Ngày audit: 2026-10-29 · Đối tượng: bản build (`npm run build
         && npm run preview`), Chrome 64-bit headless.
       4 > Commit được audit: sau `e845a31 fix(html): add empty favicon t
         o stop 404 console error`.
       5
       6 ## 1. Lighthouse 12.8.2
       7
       8 | Cấu hình | Performance | Accessibility | Best Practices | CLS
     … +69 lines (~3 KB) (ctrl+o to expand)

  Ran 3 shell commands (ctrl+o to expand)

● Giờ cập nhật trạng thái T-12 trong WBS. Phần tự động đã xong, nhưng phần NVDA
  vẫn cần bạn tự kiểm, nên mình đánh dấu là đang chờ thay vì ✅:

● Update(TASK_DECOMPOSITION.md)
  ⎿  Added 1 line, removed 1 line
      141  | T-09 | Wire sort/filter/pagination | `DataGrid.tsx` | Sort 3
            trạng thái, `aria-sort` đúng; filter/sort về trang 1; live re
           gion đọc kết quả | `feat(state): wire sort, filter, pagination
           ` | ✅ |
      142  | T-10 | Arrow + roving tabindex | `DataGrid.tsx` | Dùng `lib/
           keyboard.ts`; chỉ 1 `tabindex="0"`; focus không rơi về `<body>
           ` | `feat(a11y): add arrow-key grid navigation` | ✅ |
      143  | T-11 | Enter chọn / Space toggle | `DataGrid.tsx` | `aria-se
           lected` theo `id`; `onRowSelect` được gọi | `feat(a11y): add e
           nter-select and space-toggle` | ✅ |
      144 -| T-12 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
          - | A11y 100, Best Practices 100, 0 lỗi console, CLS 0 | `fix(a
          -11y): …` / `docs(audit): …` | |                               
      144 +| T-12 | Audit Lighthouse + keyboard + NVDA, sửa lỗi | tuỳ lỗi
          + | A11y 100, Best Practices 100, 0 lỗi console, CLS 0 | `fix(a
          +11y): …` / `docs(audit): …` | ⏳ tự động xong, chờ kiểm NVDA t
          +hủ công (`docs/audit/AUDIT.md` §5) |                          
      145  
      146  > `AI_FAILURE_AUDIT.md` không làm cho HW1 (rule §8 chỉ yêu cầu
            ở HW3).
      147  

  Ran 1 shell command (ctrl+o to expand)

● T-12 đã xong phần tự động: Lighthouse đạt 100/100 cả Accessibility lẫn Best
  Practices, trên cả mobile và desktop. Phần kiểm bằng screen reader NVDA thì
  chưa làm, vì cần bạn tự thao tác (xem cuối tin nhắn).

  1b7e67e docs(spec): mark T-12 automated audit as done
  08c1b51 docs(audit): add lighthouse and axe audit results
  e845a31 fix(html): add empty favicon to stop 404 console error

  Đã sửa: lỗi 404 favicon. Mình thêm <link rel="icon" href="data:,"> vào
  index.html, commit riêng dưới dạng fix(html). Sau đó, khi bỏ bộ lọc favicon
  trong script kiểm tra, console vẫn sạch.

  Kết quả audit (chạy trên bản build, tổng hợp trong docs/audit/AUDIT.md):

  ┌──────────────────────────────────┬──────────────────────────────────────┐
  │             Kiểm tra             │               Kết quả                │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │                                  │ Performance 100 · Accessibility 100  │
  │ Lighthouse 12.8.2, mobile        │ · Best Practices 100 · CLS 0 · LCP   │
  │                                  │ 1.2s                                 │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Lighthouse 12.8.2, desktop       │ 100 · 100 · 100 · CLS 0 · LCP 0.3s   │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ axe-core 4.14, 6 trạng thái sau  │                                      │
  │ thao tác × 2 độ rộng (1280px và  │ 0 vi phạm                            │
  │ 375px)                           │                                      │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Reflow ở 640px (tương đương zoom │ Trang không tràn ngang, bảng cuộn    │
  │  200%) và 320px                  │ trong khung riêng                    │
  ├──────────────────────────────────┼──────────────────────────────────────┤
  │ Bộ kiểm tra bàn phím/chuột của   │ Qua hết, console sạch                │
  │ T-09, T-10, T-11                 │                                      │
  └──────────────────────────────────┴──────────────────────────────────────┘

  Lighthouse chỉ chấm trạng thái lúc trang vừa tải xong. Vì vậy mình chạy thêm
  axe sau từng thao tác: sau khi sort, khi đã chọn 2 hàng, ở trang 2 (có hàng
  XSS), khi không có kết quả, và sau khi xóa ô lọc.

  axe chỉ để lại một mục "needs review": mũi tên ▲/▼ cạnh tiêu đề cột. axe không
  tự chấm được độ tương phản vì đó là ký tự không phải chữ. Mũi tên này chỉ để
  trang trí (có aria-hidden), và màu của nó đạt 5.7:1, cao hơn mức yêu cầu
  4.5:1.

  Những gì đã đưa vào repo (thư mục docs/audit/):
  - Hai báo cáo Lighthouse dạng HTML, mỗi file khoảng 650 KB.
  - Ảnh chụp màn hình ở 320px và ảnh hàng đang được chọn.
  - File AUDIT.md tổng hợp kết quả.

  Mình đã thêm docs/audit/*.html vào .prettierignore để Prettier không định dạng
  lại các file báo cáo do Lighthouse sinh ra.

  Lighthouse được chạy bằng npx, nên không có dependency nào được thêm vào
  package.json.

  Việc bạn cần tự làm: kiểm thử bằng NVDA và zoom 200% thật trên trình duyệt.
  Checklist có ô đánh dấu nằm ở §5 của AUDIT.md (docs/audit/AUDIT.md). Mình
  không làm được phần này vì nó cần nghe screen reader đọc thật. Vì vậy trạng
  thái T-12 trong WBS đang để ⏳ thay vì ✅. Khi bạn kiểm xong, báo mình để đánh
  dấu hoàn thành.

  Một việc còn treo từ T-11: App.tsx chưa truyền onRowSelect, nên khi dùng app,
  người dùng không thấy callback này có tác dụng gì. Nếu giảng viên có thể hỏi
  về callback này lúc bảo vệ, mình có thể thêm một dòng "Selected: …" bên dưới
  bảng. Đó là phần làm thêm ngoài WBS, nên bạn quyết định giúp mình.