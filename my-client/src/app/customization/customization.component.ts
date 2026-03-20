import { Component, ViewChild, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Products } from '../Interfaces/Products';
import { ProductsService } from '../SERVICES/product.service';
import { CategoryService } from '../SERVICES/category.service';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css']
})
export class CustomizationComponent implements OnInit {
  @ViewChild('scrollArrow') scrollArrow!: ElementRef;
  selectedCategory: string = '';
  categories: any[] | undefined;
  products: any;
  product = new Products();
  errMessage: string = '';
  uploadNotification: string = '';
  specialDetails: string = '';


  constructor(
    public _service: ProductsService,
    public _fs: CategoryService,
    private router: Router,
    private renderer: Renderer2,
    private activateRoute: ActivatedRoute
    
  ) {
    activateRoute.paramMap.subscribe((param) => {
      let category = param.get('category');
      if (category != null) {
        this.selectCategory(category);
      }
    });
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();// Initialize any data here if needed
  }

  loadData(): void {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });

    this._fs.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }

  startCustomizing() {
    this.router.navigate(['/customize-product-list']);
  }

  scrollToNextSection() {
    const sectionPosition = document.getElementById('customized-products')?.offsetTop || 0;
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

  addToCart(cos: any): void {
    cos.quantity = 1;
    this._service.addToCart(cos).subscribe(
      (response: any) => {
        console.log(response);
        alert("Product added to cart successfully!");
        window.location.reload();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
