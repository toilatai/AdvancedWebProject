# 📊 Dashboard - Trang Biểu đồ & Thống kê

## ✅ Đã hoàn thành!

Trang biểu đồ (Dashboard) đã được tạo với đầy đủ thống kê và analytics cho admin.

## 🎯 Tính năng

### 1. **Tổng quan (Overview Cards)**

4 cards chính với gradient đẹp:

| Card | Màu | Icon | Thông tin |
|------|-----|------|-----------|
| 📦 Sản phẩm | Tím | Box | Tổng số sản phẩm |
| 🛒 Đơn hàng | Xanh lá | Shopping Cart | Tổng đơn + Hoàn thành |
| 👥 Người dùng | Xanh dương | Users | Tổng người dùng |
| 💰 Doanh thu | Hồng | Dollar | Tổng doanh thu |

### 2. **Thống kê chi tiết**

4 cards phụ:

| Thống kê | Icon | Màu | Mô tả |
|----------|------|-----|-------|
| ⚠️ Đơn chờ xử lý | Exclamation | Vàng | Số đơn hàng pending |
| 📧 Liên hệ mới | Envelope | Xanh | Số liên hệ chưa đọc |
| 📝 Bài blog | Blog | Xanh lá | Tổng số blog |
| 📦 Sắp hết hàng | Box Open | Cam | Sản phẩm tồn ≤ 10 |

### 3. **Đơn hàng gần đây**

Table 5 đơn hàng mới nhất:
- Mã đơn (6 ký tự cuối)
- Tổng tiền
- Trạng thái (badge màu)
- Ngày tạo

### 4. **Sản phẩm sắp hết hàng**

Table 5 sản phẩm tồn kho thấp nhất:
- Tên sản phẩm
- Số lượng tồn (badge đỏ)
- Giá bán

### 5. **Top 5 sản phẩm bán chạy**

Cards sản phẩm best-seller:
- Rank badge (#1 vàng, #2 bạc, #3-5 xanh)
- ID sản phẩm
- Số lượng đã bán
- Doanh thu
- Progress bar so sánh

### 6. **Biểu đồ**

- 📊 Biểu đồ trạng thái đơn hàng (progress bars)
- 📧 Biểu đồ trạng thái liên hệ (progress bars)

### 7. **Thao tác nhanh (Quick Actions)**

4 nút lớn:
- ➕ Thêm sản phẩm
- 📋 Xem đơn hàng
- 📧 Xem liên hệ (với badge số lượng mới)
- ✍️ Viết blog

## 🎨 UI/UX Features

✅ **Gradient cards** - Đẹp, hiện đại
✅ **Hover effects** - Scale up, shadow
✅ **Icons** - Font Awesome
✅ **Color coding** - Dễ phân biệt
✅ **Responsive** - Mobile friendly
✅ **Loading spinner** - UX tốt
✅ **Badge notifications** - Highlight điểm quan trọng

## 📍 Truy cập

**URL:** `http://localhost:4200/admin/dashboard`

**Từ menu:**
```
Admin → Chức năng → Biểu đồ 📊
```

## 🔧 API Endpoint

**GET /dashboard/stats** (Admin only)

Returns:
```json
{
  "overview": {
    "totalProducts": 50,
    "totalOrders": 120,
    "totalUsers": 85,
    "totalBlogs": 8,
    "totalContacts": 15,
    "newContacts": 4,
    "pendingOrders": 10,
    "completedOrders": 100,
    "totalRevenue": 15000000
  },
  "recentOrders": [...],
  "lowStockProducts": [...],
  "topProducts": [...]
}
```

## 🚀 Cách sử dụng

### Bước 1: Restart Backend

```bash
cd backend
# Ctrl+C để dừng
node index.js
```

### Bước 2: Reload Frontend

```
F5 trong browser
```

### Bước 3: Vào trang Dashboard

```
http://localhost:4200/admin/dashboard
```

## 📊 Thống kê hiển thị

### Overview Section:
```
┌────────────┬────────────┬────────────┬────────────┐
│ 📦 50      │ 🛒 120     │ 👥 85      │ 💰 15M     │
│ Sản phẩm   │ Đơn hàng   │ Người dùng │ Doanh thu  │
└────────────┴────────────┴────────────┴────────────┘
```

### Detail Stats:
```
┌────────────┬────────────┬────────────┬────────────┐
│ ⚠️ 10      │ 📧 4/15    │ 📝 8       │ 📦 3       │
│ Chờ xử lý  │ Liên hệ    │ Blogs      │ Sắp hết    │
└────────────┴────────────┴────────────┴────────────┘
```

### Quick Actions:
```
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ ➕ Thêm SP  │ 📋 Đơn hàng │ 📧 Liên hệ  │ ✍️ Blog     │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

## 🎨 Tùy chỉnh

### Thay đổi màu gradient:

File: `frontend/src/app/admin/dashboard/dashboard.component.css`

```css
.bg-gradient-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  /* Thay đổi màu theo ý muốn */
}
```

### Thay đổi số lượng items hiển thị:

File: `backend/index.js`

```javascript
// Recent orders
const recentOrders = await orderCollection.find()
  .sort({ createdAt: -1 })
  .limit(5); // ← Thay đổi số này

// Low stock products  
const lowStockProducts = await productCollection.find({ 
  stocked_quantity: { $lte: 10 } // ← Thay đổi threshold
})
  .limit(5); // ← Thay đổi số này
```

### Thêm thống kê mới:

```typescript
// Trong dashboard.component.ts
loadDashboardStats() {
  this.dashboardService.getDashboardStats().subscribe({
    next: (data) => {
      this.stats = data.overview;
      // Thêm stats mới ở đây
    }
  });
}
```

## 📱 Responsive Breakpoints

- **Desktop (xl):** 4 cards/row
- **Laptop (lg):** 3-4 cards/row
- **Tablet (md):** 2 cards/row
- **Mobile (sm):** 1 card/row

## 🔍 Debug

### Dashboard không load:

1. **Kiểm tra backend running:**
   ```bash
   netstat -ano | findstr :3002
   ```

2. **Test API:**
   ```bash
   cd backend
   # Tạo file test nếu cần
   curl http://localhost:3002/dashboard/stats
   ```

3. **Xem Console (F12):**
   - Tab Console → Xem errors
   - Tab Network → Xem request `/dashboard/stats`

### Dữ liệu = 0:

- Database trống
- Chưa có orders/products/users
- Bình thường khi mới setup

## 💡 Tips

1. **Real-time updates:** Thêm auto-refresh
   ```typescript
   ngOnInit() {
     this.loadDashboardStats();
     
     // Auto refresh every 30 seconds
     setInterval(() => {
       this.loadDashboardStats();
     }, 30000);
   }
   ```

2. **Export data:** Thêm nút export Excel/PDF

3. **Date range filter:** Thống kê theo ngày/tháng

4. **More charts:** Tích hợp Chart.js hoặc ng2-charts

## 📦 File đã tạo

✅ `/backend/index.js` - API endpoint `/dashboard/stats`
✅ `/frontend/src/app/dashboard-api.service.ts` - API service
✅ `/frontend/src/app/admin/dashboard/` - Dashboard component
✅ `/frontend/src/app/admin/admin-routing.module.ts` - Route `/admin/dashboard`
✅ `/frontend/src/app/admin/admin.module.ts` - Module imports

❌ `/backend/TailAdmin-1.0.0.zip` - **ĐÃ XÓA**

---

**Enjoy your beautiful dashboard! 📊✨**

