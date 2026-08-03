# Sổ Gieo Hạt K365 — bản tự dựng

Một PWA (progressive web app) chạy hoàn toàn bằng HTML/CSS/JS thuần — không cần cài đặt gì, không cần server, giống hệt cách app gốc hoạt động.

## Chạy thử ngay trên máy

Mở file `index.html` trực tiếp bằng trình duyệt (double-click). Dữ liệu sẽ được lưu vào `localStorage` của trình duyệt đó.

⚠️ Lưu ý: nếu bạn mở file bằng cách `file://` trên một số trình duyệt, tính năng lưu có thể bị giới hạn. Cách chắc chắn nhất là deploy lên GitHub Pages (miễn phí) như bên dưới.

## Deploy lên GitHub Pages (giống bản gốc)

1. Tạo một repo mới trên GitHub, ví dụ `so-gieo-hat`.
2. Upload 3 file: `index.html`, `manifest.json`, và (tuỳ chọn) `AppsScript.js`, `README.md`.
3. Vào **Settings → Pages** → chọn nhánh `main`, thư mục `/root` → Save.
4. Sau vài phút, app sẽ có ở địa chỉ dạng:
   `https://<ten-github-cua-ban>.github.io/so-gieo-hat/`
5. Mở link đó trên điện thoại → làm theo hướng dẫn "Thêm vào Màn hình chính" (giống bản gốc: Safari cho iPhone, Chrome cho Android).

## Bật đồng bộ Google Sheets

1. Mở Google Sheets mới (dùng riêng cho app này).
2. **Extensions → Apps Script**, dán toàn bộ nội dung file `AppsScript.js` vào.
3. **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy URL `.../exec`, dán vào app ở tab **👤 Hồ sơ → Google Sheets URL** → bấm **Cập nhật URL** → **Kiểm tra**.
5. Từ giờ mỗi lần bấm Lưu, dữ liệu tự động gửi lên Sheets. Dùng nút **↻ Tải Sheets** ở tab Tiến độ khi đổi máy mới để lấy lại dữ liệu cũ.

## Cấu trúc dữ liệu

Toàn bộ dữ liệu người dùng được lưu dưới dạng 1 object JSON (trong `localStorage`, key `sgh_k365_data`, và đồng bộ y hệt lên ô A1 của sheet "Data"):

```
{
  profile:   { name, bigWhy, goals[], sheetsUrl },
  entries:   { "YYYY-MM-DD": { plan: {...}, action: {...} } },
  todos:     { "YYYY-MM-DD": { checklist[], gratitude[] } },
  diamonds:  { mine[], admired[] },
  finance:   { entries[], funds[], jars[], incomeGoal },
  appointments: []
}
```

## Những gì đã có trong bản này

- 🏠 Trang chủ: streak (vòng tăng trưởng), tổng hạt giống, lối tắt, checklist hôm nay, lịch hẹn sắp tới
- 📝 B1-B2: chọn ngày kế hoạch, chọn mục tiêu, mảnh đất màu mỡ, 3 cách gieo hạt
- ☀️ B3-B4: hành động thực tế, Thiền cafe 4 ý, Bốn Sức Mạnh
- ✅ To Do: checklist + biết ơn theo từng ngày
- 💎 Kim Cương: hạt mình gieo / hạt ngưỡng mộ, theo loại, quỹ, số tiền
- 💰 Tài chính: chi tiêu / gieo hạt / thu nhập / phân bổ hũ, số dư tự tính, quản lý danh sách quỹ & hũ
- 📊 Tiến độ: streak, tổng check-in, biểu đồ 7 ngày, tiến độ từng mục tiêu, nhật ký gần nhất
- 👤 Hồ sơ: tên, Big Why, mục tiêu, kết nối Google Sheets, lịch hẹn, đặt lại dữ liệu
- 🔄 Đồng bộ hai chiều với Google Sheets (đẩy lên tự động sau mỗi lần lưu, kéo về thủ công)

## Có thể tự mở rộng thêm

- Tách riêng từng chức năng như file gốc (multi-file thay vì 1 file HTML)
- Thêm Service Worker để dùng offline hoàn toàn
- Thêm biểu đồ tháng/quý/năm chi tiết hơn ở tab Tiến độ
- Thêm xác thực nhiều người dùng nếu muốn dùng chung 1 Sheet cho cả nhóm
