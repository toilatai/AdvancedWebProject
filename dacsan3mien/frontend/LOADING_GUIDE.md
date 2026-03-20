# 🐟 Loading Effect - Hướng dẫn sử dụng

## ✅ Đã cài đặt xong!

Loading effect với hiệu ứng con cá dễ thương đã được tích hợp vào hệ thống.

## 🎯 Hoạt động tự động

Loading sẽ **tự động hiển thị** trong các trường hợp:

### 1. Khi chuyển trang (Navigation)
- Click vào menu
- Chuyển từ trang này sang trang khác
- Sử dụng router.navigate()

### 2. Khi gọi API (HTTP Requests)
- Lấy dữ liệu từ backend
- Gửi dữ liệu lên server
- Tất cả các HTTP requests

## 🎨 Tùy chỉnh giao diện

### Thay đổi màu sắc

Mở file: `frontend/src/app/shared/loading/loading.component.css`

```css
/* Màu con cá */
.loader {
  background:
    radial-gradient(farthest-side, #ffd1d1 94%, #0000) 4px 22px/5px 5px,
    radial-gradient(farthest-side, #ffd1d1 94%, #0000) 12px 18px/5px 5px,    
    radial-gradient(farthest-side, #ffd1d1 94%, #0000) 3px 6px/8px 8px,    
    radial-gradient(farthest-side, #eb8594 90%, #0000 94%) left/20px 100%,    
    #bd3342; /* ← Màu chính của con cá */
}

/* Màu đuôi cá */
.loader::before {
  background: #bd3342; /* ← Màu đuôi */
}

/* Màu text */
.loading-text {
  color: #bd3342; /* ← Màu chữ "Đang tải..." */
}
```

### Thay đổi text

Mở file: `frontend/src/app/shared/loading/loading.component.html`

```html
<div class="loading-text">Đang tải dữ liệu...</div>
<!-- Thay đổi text ở đây -->
```

### Thay đổi nền overlay

```css
.loading-overlay {
  background-color: rgba(255, 255, 255, 0.95); /* Nền trắng mờ 95% */
  /* Hoặc thử: */
  /* background-color: rgba(0, 0, 0, 0.7); */ /* Nền đen mờ 70% */
}
```

## 💻 Sử dụng thủ công trong code

### Option 1: Trong Component

```typescript
import { LoadingService } from './services/loading.service';

export class MyComponent {
  constructor(private loadingService: LoadingService) {}

  async doSomething() {
    // Hiển thị loading
    this.loadingService.show();

    try {
      // Làm việc gì đó...
      await this.someAsyncTask();
    } finally {
      // Ẩn loading
      this.loadingService.hide();
    }
  }
}
```

### Option 2: Trong Service

```typescript
import { LoadingService } from '../services/loading.service';

export class MyService {
  constructor(
    private http: HttpClient,
    private loadingService: LoadingService
  ) {}

  getData() {
    this.loadingService.show();
    
    return this.http.get('/api/data').pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
```

## 🔧 Tắt loading cho một API cụ thể

Nếu bạn không muốn hiển thị loading cho một API call cụ thể:

```typescript
// Thêm header đặc biệt
const headers = new HttpHeaders().set('X-Skip-Loading', 'true');

this.http.get('/api/data', { headers }).subscribe(...);
```

Sau đó cập nhật `loading.interceptor.ts`:

```typescript
intercept(request: HttpRequest<unknown>, next: HttpHandler) {
  // Bỏ qua loading nếu có header này
  if (request.headers.has('X-Skip-Loading')) {
    return next.handle(request);
  }
  
  // Còn lại thì hiển thị loading như bình thường
  this.loadingService.show();
  return next.handle(request).pipe(
    finalize(() => this.loadingService.hide())
  );
}
```

## 🎬 Animation settings

### Tốc độ animation

```css
.loader {
  animation: l7 3s infinite steps(10); /* 3s = 3 giây mỗi vòng lặp */
  /* Nhanh hơn: animation: l7 1.5s infinite steps(10); */
  /* Chậm hơn: animation: l7 5s infinite steps(10); */
}
```

### Độ mờ text

```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; } /* ← Độ mờ tối đa */
}
```

## 🐛 Troubleshooting

### Loading không hiển thị

1. **Kiểm tra console** (F12) xem có lỗi không
2. **Kiểm tra import** trong app.module.ts:
   ```typescript
   import { LoadingInterceptor } from './interceptors/loading.interceptor';
   ```
3. **Restart Angular dev server**:
   ```bash
   Ctrl+C
   ng serve
   ```

### Loading hiển thị mãi không tắt

```typescript
// Trong console (F12), chạy:
this.loadingService.forceHide();

// Hoặc trong code:
import { LoadingService } from './services/loading.service';

constructor(private loadingService: LoadingService) {
  // Force hide nếu bị stuck
  this.loadingService.forceHide();
}
```

### Muốn tắt loading cho admin pages

Trong `app.component.ts`:

```typescript
this.router.events.subscribe(event => {
  if (event instanceof NavigationStart) {
    // Chỉ show loading nếu không phải admin route
    if (!event.url.startsWith('/admin')) {
      this.loadingService.show();
    }
  }
  // ...
});
```

## 📊 Performance tips

1. **Delay nhỏ** giúp UX mượt hơn:
   ```typescript
   setTimeout(() => {
     this.loadingService.hide();
   }, 300); // 300ms delay
   ```

2. **Debounce** cho nhiều requests liên tiếp:
   - LoadingService đã tự động handle việc này
   - Có `loadingCount` để track số requests đang chạy

## 🎨 Các biến thể khác

### Con cá màu xanh dương

```css
.loader {
  background:
    radial-gradient(farthest-side, #d1e7ff 94%, #0000) 4px 22px/5px 5px,
    radial-gradient(farthest-side, #d1e7ff 94%, #0000) 12px 18px/5px 5px,    
    radial-gradient(farthest-side, #d1e7ff 94%, #0000) 3px 6px/8px 8px,    
    radial-gradient(farthest-side, #85b8eb 90%, #0000 94%) left/20px 100%,    
    #3342bd;
}
```

### Con cá màu xanh lá

```css
.loader {
  background:
    radial-gradient(farthest-side, #d1ffd1 94%, #0000) 4px 22px/5px 5px,
    radial-gradient(farthest-side, #d1ffd1 94%, #0000) 12px 18px/5px 5px,    
    radial-gradient(farthest-side, #d1ffd1 94%, #0000) 3px 6px/8px 8px,    
    radial-gradient(farthest-side, #85eb85 90%, #0000 94%) left/20px 100%,    
    #34bd34;
}
```

## 📱 Responsive

Loading đã responsive sẵn, hoạt động tốt trên mọi kích thước màn hình!

---

**Enjoy your loading animation! 🐟✨**

