import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  fullContent?: string;
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent {
  activeBlog: string | null = null;

  blogs: BlogPost[] = [
    {
      id: 'che-tan-cuong',
      title: '🌟 CHÈ TÂN CƯƠNG – LINH HỒN CỦA ĐẤT TRÀ THÁI NGUYÊN',
      description: 'Vùng đất Tân Cương – nơi hội tụ khí hậu và thổ nhưỡng hoàn hảo cho cây chè. Quy trình sao chè truyền thống giúp giữ hương cốm non và vị ngọt hậu độc đáo...',
      image: '/assets/provinces/Thái Nguyên.jpg',
      date: '15/01/2025'
    },
    {
      id: 'mam-ca-linh-ca-mau',
      title: '🐟 MẮM CÁ LINH CÀ MAU – HƯƠNG VỊ MÙA NƯỚC NỔI MIỀN TÂY',
      description: 'Khi mùa nước nổi tràn về, người dân háo hức đón mùa cá linh – "lộc trời ban" của vùng sông nước. Mắm cá linh Cà Mau mang trọn hương vị đồng quê và bản sắc miền Tây...',
      image: '/assets/mắm cá linh.jpg',
      date: '14/01/2025'
    },
    {
      id: 'ca-com-say-gion-nghe-an',
      title: '🐟 CÁ CƠM SẤY GIÒN NGHỆ AN – VỊ BIỂN MẶN MÀ, GIÒN TAN TRÊN ĐẦU LƯỠI',
      description: 'Đặc sản tuyệt vời từ biển Cửa Lò. Từng con cá cơm nhỏ, qua công nghệ chế biến hiện đại, trở thành món ăn giòn tan, đậm vị và đầy dinh dưỡng...',
      image: '/assets/cá cơm sấy giòn.jpg',
      date: '13/01/2025'
    },
    {
      id: 'nuoc-mam-phan-thiet',
      title: '🏝️ NƯỚC MẮM PHAN THIẾT – HƯƠNG VỊ ĐẬM ĐÀ TỪ BIỂN CÁT VÀ NẮNG GIÓ',
      description: 'Biểu tượng của nghề biển lâu đời hơn 300 năm. Hương thơm nồng đậm, vị mặn mòi hòa quyện cùng vị ngọt hậu đặc trưng, nước mắm Phan Thiết là linh hồn ẩm thực miền Trung...',
      image: '/assets/nước mắm.jpg',
      date: '12/01/2025'
    },
    {
      id: 'mat-ong-mau-son',
      title: '🍯 MẬT ONG MẪU SƠN – GIỌT NGỌT TINH KHIẾT TỪ ĐỈNH NÚI LẠNG SƠN',
      description: 'Trên độ cao hơn 1.000 mét của dãy Mẫu Sơn, nơi sương mù bao phủ quanh năm, những đàn ong rừng tạo nên mật ong Mẫu Sơn – đặc sản quý hiếm miền núi phía Bắc...',
      image: '/assets/mật ong mẫu sơn.jpg',
      date: '11/01/2025'
    },
    {
      id: 'giai-thuong-thuong-hieu-quoc-gia',
      title: '🏆 ĐẶC SẢN VIỆT NAM VINH DANH TẠI GIẢI THƯỞNG "THƯƠNG HIỆU QUỐC GIA 2025"',
      description: 'Nhiều sản phẩm đặc sản Việt Nam được vinh danh tại Giải thưởng Thương hiệu Quốc gia – chương trình do Bộ Công Thương tổ chức. Nước mắm Phú Quốc, Trà Tân Cương, Cà phê Buôn Ma Thuột...',
      image: '/assets/price.jpg',
      date: '10/01/2025'
    },
    {
      id: 'lap-xuong-hun-khoi-sapa',
      title: '🐂 LẠP XƯỞNG HUN KHÓI SA PA – ẨM THỰC TÂY BẮC TRONG TỪNG THỚ THỊT',
      description: 'Giữa cái lạnh quanh năm của Sa Pa, lạp xưởng hun khói ra đời như cách người dân giữ thịt qua mùa đông. Ướp với rượu ngô, mắc khén và hun bằng khói củi nghiến...',
      image: '/assets/lạp xưởng hun khói.jpg',
      date: '09/01/2025'
    },
    {
      id: 'ruou-ngo-na-hang',
      title: '🍯 RƯỢU NGÔ NA HANG – HƯƠNG MEN LÁ CỦA NÚI RỪNG TUYÊN QUANG',
      description: 'Ở vùng núi Na Hang, rượu không chỉ là thức uống mà còn là linh hồn văn hóa người Tày và Dao. Rượu ngô được nấu từ ngô bản địa và men lá với 20 loại thảo mộc quý...',
      image: '/assets/rượu ngô.png',
      date: '08/01/2025'
    }
  ];

  constructor(private router: Router) {}

  showBlogDetails(blogId: string): void {
    this.activeBlog = blogId;
  }

  viewBlogDetail(blogId: string): void {
    // Scroll to top then navigate
    window.scrollTo(0, 0);
    this.activeBlog = blogId;
  }

  showBlogList(): void {
    this.activeBlog = null;
    window.scrollTo(0, 0);
  }
}
