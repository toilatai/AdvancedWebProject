import { Component, OnInit, Renderer2, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../SERVICES/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollArrow') scrollArrow!: ElementRef;
  @ViewChild('typingEffect') typingEffect!: ElementRef; // Thêm ViewChild cho hiệu ứng typing của "Customization"
  @ViewChild('workshopTypingEffect') workshopTypingEffect!: ElementRef; // Thêm ViewChild cho hiệu ứng typing của "WORKSHOP"

  category: string = '';
  categories: any[] | undefined;
  products: any[] | undefined;
  quantity: number = 1;
  randomFeaturedProducts: any[] | undefined;
  productCategory: any;
  product: any;
  errMessage: string = '';
  displayProduct: boolean = true;

  constructor(
    public _service: ProductsService,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const numRandomProducts = 5;
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.randomFeaturedProducts = this.getRandomProducts(numRandomProducts, data);
      },
      error: (err) => {
        console.error(err);
      }
    });

    // Gắn sự kiện cuộn để ẩn mũi tên khi cuộn xuống
    this.renderer.listen(window, 'scroll', () => {
      const arrow = this.scrollArrow.nativeElement;
      if (window.scrollY > 100) { // Ẩn mũi tên khi cuộn xuống 100px
        this.renderer.addClass(arrow, 'hide-arrow');
      } else {
        this.renderer.removeClass(arrow, 'hide-arrow');
      }
    });
  }

  ngAfterViewInit(): void {
    // Bắt đầu hiệu ứng typing cho cả "Customization" và "WORKSHOP"
    this.startTypingEffect(this.typingEffect.nativeElement);
    this.startTypingEffect(this.workshopTypingEffect.nativeElement);
  }

  startTypingEffect(element: HTMLElement) {
    const text = element.textContent || '';
    let index = 0;

    const type = () => {
      if (index < text.length) {
        this.renderer.setProperty(element, 'textContent', text.substring(0, index + 1));
        index++;
        setTimeout(type, 100);
      }
    };

    // Gọi lại hàm typing mỗi 5 giây
    setInterval(() => {
      this.renderer.setProperty(element, 'textContent', '');
      index = 0;
      type();
    }, 3000);

    type(); // Bắt đầu typing ngay lập tức
  }

  viewProductDetail(f: any) {
    this.router.navigate(['app-product-detail', f._id]).then(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    });
  }

  addToCart(cos: any): void {
    cos.quantity = 1;
    this._service.addToCart(cos).subscribe(
      (response: any) => {
        console.log(response);
        alert("Thêm sản phẩm vào giỏ hàng thành công");
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  scrollToNextSection() {
    const sectionPosition = document.getElementById('listproduct')?.offsetTop || 0;
    const offset = 20; // Adjust this offset if needed

    window.scrollTo({
      top: sectionPosition - offset,
      behavior: 'smooth'
    });

    // Hide the arrow after scrolling
    const arrow = this.scrollArrow.nativeElement;
    this.renderer.addClass(arrow, 'hide-arrow');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const arrow = this.scrollArrow.nativeElement;

    // Show the arrow only if we are at the top of the page
    if (window.scrollY === 0) {
      this.renderer.removeClass(arrow, 'hide-arrow');
    } else {
      this.renderer.addClass(arrow, 'hide-arrow');
    }
  }

  getRandomProducts(numRandomProducts: number, sourceProducts: any[] | undefined = this.products) {
    const totalProducts = sourceProducts?.length ?? 0;
    const randomIndices: number[] = [];
    while (randomIndices.length < numRandomProducts && totalProducts > 0) {
      const randomIndex = Math.floor(Math.random() * totalProducts);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
      }
    }
    return randomIndices.map(index => sourceProducts?.[index]);
  }

  browseProduct() {
    this.router.navigate(['/app-category']);
  }

  toCustomize() {
    window.scrollTo(0, 0); // Cuộn về đầu trang
    this.router.navigate(['/app-customization']);
  }
  toWorkshop() {
    window.scrollTo(0, 0); // Cuộn về đầu trang
    this.router.navigate(['/workshop']);
}

}
