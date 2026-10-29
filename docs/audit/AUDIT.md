# HW1 Audit (T-12)

> Ngày audit: 2026-10-29 · Đối tượng: bản build (`npm run build && npm run preview`), Chrome 64-bit headless.
> Commit được audit: sau `e845a31 fix(html): add empty favicon to stop 404 console error`.

## 1. Lighthouse 12.8.2

| Cấu hình | Performance | Accessibility | Best Practices | CLS | LCP |
|---|---|---|---|---|---|
| Mobile (mặc định) | 100 | **100** | **100** | 0 | 1.2 s |
| Desktop (`--preset=desktop`) | 100 | **100** | **100** | 0 | 0.3 s |

Báo cáo đầy đủ: [lighthouse-mobile.html](lighthouse-mobile.html), [lighthouse-desktop.html](lighthouse-desktop.html).

Lỗi tìm thấy và đã sửa trước khi chạy:

| Lỗi | Phát hiện | Sửa |
|---|---|---|
| Trình duyệt tự xin `/favicon.ico` → 404 → lỗi console (Best Practices trừ điểm) | Log console khi kiểm tra T-08 | `<link rel="icon" href="data:,">` trong `index.html` (commit `e845a31`) |

## 2. axe-core 4.14 trên các trạng thái tương tác

Lighthouse chỉ chấm trạng thái lúc tải trang, nên axe được chạy thêm sau từng thao tác
(tag `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`), ở 1280px và 375px.

| Trạng thái | 1280px | 375px |
|---|---|---|
| Lúc tải trang | 0 vi phạm | 0 vi phạm |
| Đang sort tăng dần | 0 | 0 |
| 2 hàng được chọn, focus ở ô body | 0 | 0 |
| Trang 2 (có hàng XSS) | 0 | 0 |
| Không có kết quả (`zzz`) | 0 | 0 |
| Xoá filter | 0 | 0 |

"Needs review" duy nhất: `color-contrast` trên mũi tên sort `▲/▼`. axe không tự chấm được vì
chỉ có ký tự không phải chữ. Mũi tên là `aria-hidden` (trang trí), màu `--color-accent` trên
`--color-header-bg` = 5.7:1, vẫn đạt 4.5:1.

## 3. Kiểm thử tự động bằng bàn phím/chuột thật (Chrome DevTools Protocol)

| Nhóm | Kết quả |
|---|---|
| Sort 3 trạng thái, `aria-sort`, đổi cột bắt đầu ascending, cột Role không sort | Đạt |
| Filter: case-insensitive, `(` và `.*` không lỗi, "No results", về trang 1 | Đạt |
| Pagination: Next/Previous, focus chuyển khi nút bị `disabled` | Đạt |
| Hàng `<img src=x onerror=alert(1)>` hiển thị dạng chữ, không tạo `<img>` | Đạt |
| Grid chỉ 1 tab stop; mũi tên dừng ở biên; Tab ra/vào nhớ ô; click dời tab stop | Đạt |
| Lọc/đổi trang làm grid nhỏ lại → tab stop được kéo về ô hợp lệ | Đạt |
| Enter chọn 1 hàng + `onRowSelect(row)`; Space toggle, không cuộn trang, bỏ qua `event.repeat` | Đạt |
| Enter/Space ở header vẫn là hành vi native của nút sort | Đạt |
| Selection giữ theo `id` qua sort, đổi trang, filter | Đạt |
| Console không có lỗi/cảnh báo (build và dev + StrictMode) | Đạt |

## 4. Responsive và zoom

| Kiểm tra | Kết quả |
|---|---|
| 375px: không scroll ngang trang, bảng cuộn trong `.grid-scroll` | Đạt |
| 640px (= 1280px ở zoom 200%): không scroll ngang trang | Đạt |
| 320px (WCAG 1.4.10 Reflow): không scroll ngang trang, caption vẫn đọc được | Đạt — [reflow-320.png](reflow-320.png) |
| Nút/ô nhập ≥ 24×24 px (thực tế ≥ 44 px) | Đạt |
| Hàng được chọn: nền + vạch trái + dấu ✓ (không chỉ bằng màu) | Đạt — [selected-row.png](selected-row.png) |

## 5. Kiểm thử thủ công (developer tự làm)

Các mục dưới đây cần người thật thao tác, công cụ tự động không thay thế được.

| Kiểm tra | Cách làm | Kết quả |
|---|---|---|
| NVDA + Chrome: vào grid đọc "Employees, grid" và số hàng/cột | Tab tới grid | ☐ |
| NVDA: mũi tên đọc nội dung ô, đổi cột đọc tên cột | ↑ ↓ ← → trong grid | ☐ |
| NVDA: sort đọc "Sorted by …, ascending. 20 results…" | Enter trên nút sort | ☐ |
| NVDA: Space đọc "… selected" / "… deselected" | Space trên ô body | ☐ |
| NVDA: filter đọc số kết quả, không cướp focus | Gõ vào ô Filter | ☐ |
| Zoom 200% thật bằng Ctrl + trên trình duyệt | Ctrl + + tới 200% | ☐ |
| Lighthouse chạy lại trong DevTools (cửa sổ ẩn danh) | DevTools → Lighthouse | ☐ |
