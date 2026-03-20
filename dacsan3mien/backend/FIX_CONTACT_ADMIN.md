# 🔧 Sửa lỗi "Không thể tải danh sách liên hệ"

## ⚠️ VẤN ĐỀ

Backend cần RESTART để áp dụng các API endpoints mới cho Contact/Feedback.

## ✅ GIẢI PHÁP - Làm theo từng bước

### 📍 BƯỚC 1: Dừng Backend

1. **Tìm terminal đang chạy backend**
   - Cửa sổ terminal có dòng: `Server is listening on port 3002`

2. **Nhấn tổ hợp phím:**
   ```
   Ctrl + C
   ```

3. **Xác nhận dừng:**
   - Bạn sẽ thấy cursor trở lại command prompt

### 📍 BƯỚC 2: Khởi động lại Backend

Trong cùng terminal đó, gõ:

```bash
node index.js
```

**Kết quả mong đợi:**
```
Server is listening on port 3002
```

✅ Nếu thấy dòng này → Backend đã chạy!

### 📍 BƯỚC 3: Thêm dữ liệu Contact mẫu

**Mở terminal MỚI** (giữ terminal backend chạy), rồi:

```bash
cd backend
node seed_contacts.js
```

**Khi được hỏi, chọn:**
```
Your choice (1/2/3): 2  ← Nhập số 2 và Enter
```

**Kết quả mong đợi:**
```
✅ Successfully inserted 8 contacts!

📧 Sample contacts added:
   1. Nguyễn Văn An - NEW
   2. Trần Thị Bình - READ
   3. Lê Hoàng Minh - REPLIED
   ... (tổng 8 contacts)

📊 Summary:
   🔴 New: 4
   🟡 Read: 2
   🟢 Replied: 2
```

### 📍 BƯỚC 4: Test API

Vẫn trong terminal thứ 2:

```bash
node test_contact_api.js
```

**Kết quả mong đợi:**
```
✅ POST /feedback - SUCCESS (Create contact)
⚠️  GET /feedback - AUTHENTICATION REQUIRED
   (This is expected - need to be logged in as admin)
```

### 📍 BƯỚC 5: Reload trang Admin

1. **Mở trình duyệt**: `http://localhost:4200/admin/contact-adm`
2. **Nhấn F5** hoặc **Ctrl + R**
3. **Đợi vài giây**

**Kết quả mong đợi:**
- ✅ Thấy bảng với 8 liên hệ
- ✅ Có filter "Tất cả/Mới/Đã đọc/Đã trả lời"
- ✅ Có thể click "Xem" để xem chi tiết

---

## 🐛 Nếu vẫn lỗi - DEBUG

### Debug Bước 1: Kiểm tra Backend

**Windows:**
```bash
netstat -ano | findstr :3002
```

**Nếu thấy output** → Backend đang chạy ✅

**Nếu không thấy gì** → Backend chưa chạy:
```bash
cd backend
node index.js
```

### Debug Bước 2: Kiểm tra MongoDB

```bash
cd backend
node checkMongo.js
```

Hoặc:

```bash
# Windows
net start MongoDB

# Check if running
tasklist | findstr mongod
```

### Debug Bước 3: Xem Console Errors

1. Mở trang admin contact
2. **F12** → Tab **Console**
3. Xem error message màu đỏ

**Lỗi thường gặp:**

| Error | Nguyên nhân | Giải pháp |
|-------|-------------|-----------|
| `ERR_CONNECTION_REFUSED` | Backend không chạy | Restart backend |
| `401 Unauthorized` | Chưa login | Login lại |
| `403 Forbidden` | Không có quyền | Check role = admin |
| `500 Internal Server Error` | Backend lỗi | Xem backend logs |
| `404 Not Found` | Route không tồn tại | Restart backend |

### Debug Bước 4: Xem Network Tab

1. **F12** → Tab **Network**
2. **Reload trang** (F5)
3. Tìm request tên `feedback`
4. Click vào nó
5. Xem tab **Response**:

**Nếu Status 200:**
```json
{
  "feedback": [...],
  "total": 8,
  "page": 1
}
```
→ API hoạt động! ✅

**Nếu Status khác 200:**
- Xem Response message
- Kiểm tra Headers
- Xem Cookies

### Debug Bước 5: Xem Backend Terminal

Trong terminal chạy backend, xem có error logs không:

```
Error: feedbackCollection is not defined
→ Database chưa connect ❌

TypeError: Cannot read property 'find'
→ Collection chưa init ❌
```

Nếu thấy errors → Restart backend!

---

## 📝 Script nhanh (All-in-one)

Mở **PowerShell** với quyền Admin:

```powershell
# Dừng tất cả node processes (CẨNTHẬN!)
Stop-Process -Name "node" -Force

# Khởi động backend mới
cd C:\Users\ADMIN\dacsan3mien\backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node index.js"

# Đợi 2 giây
Start-Sleep -Seconds 2

# Seed contacts
node seed_contacts.js

# Test API
node test_contact_api.js
```

**⚠️ Lưu ý:** Script này sẽ kill TẤT CẢ node processes!

---

## ✅ Khi thành công

Bạn sẽ thấy trong trang admin:

```
┌─────────────────────────────────────────────────────┐
│ Quản lý Liên hệ                                     │
├─────────────────────────────────────────────────────┤
│ Danh sách liên hệ          [Tìm kiếm] [Tất cả ▼]   │
├───┬──────────────┬───────────┬───────────┬──────────┤
│ # │ Họ tên       │ Email     │ Trạng thái│ Hành động│
├───┼──────────────┼───────────┼───────────┼──────────┤
│ 1 │ Nguyễn Văn A │ ...       │ 🔴 Mới    │ Xem | Xóa│
│ 2 │ Trần Thị B   │ ...       │ 🟡 Đã đọc │ Xem | Xóa│
│ 3 │ Lê Hoàng M   │ ...       │ 🟢 Trả lời│ Xem | Xóa│
└───┴──────────────┴───────────┴───────────┴──────────┘
```

---

## 🚀 Tóm tắt nhanh

```bash
# Terminal 1: Restart backend
cd backend
# Ctrl+C để dừng backend cũ
node index.js

# Terminal 2: Add sample data
cd backend
node seed_contacts.js
# Chọn 2 (Clear and reseed)

# Browser: Reload
http://localhost:4200/admin/contact-adm
F5
```

---

**Good luck! 🍀**

