import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../Interfaces/Products';
import { ProductsService } from '../SERVICES/product.service';
import { CategoryService } from '../SERVICES/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  selectedCategory: string = '';
  categories: any[] | undefined;
  products: any;
  product = new Products();
  errMessage: string = '';

  constructor(
    public _service: ProductsService,
    public _fs: CategoryService,
    private router: Router,
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
    this.loadData();
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

  filterProducts(): any[] {
    return this.selectedCategory === '' ? this.products : this.products.filter((product: any) => product.Category === this.selectedCategory);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
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
        alert("Product added to cart successfully!");
        window.location.reload();
        // Thêm sản phẩm vào giỏ hàng thành công
      },
      (error: any) => {
        console.log(error);
        // Xảy ra lỗi khi thêm sản phẩm vào giỏ hàng
      }
    );
  }
}
