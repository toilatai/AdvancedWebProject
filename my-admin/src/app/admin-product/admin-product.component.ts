import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductService } from '../services/admin-product.service';
import { PaginatePipe } from 'ngx-pagination';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css'],
})

export class AdminProductComponent {
  [x: string]: any;
  products: any;
  errMessage: string = '';
  constructor(public _service: AdminProductService, private router: Router, private activateRoute: ActivatedRoute) {
    this._service.getProducts().subscribe({
      next: (data) => {
        // Lấy danh sách các Products
        this.products = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  addProduct() {
    this.router.navigate(['add-product']);
  }

  viewDetailProduct(f: any) {
    this.router.navigate(['product-detail', f._id]);
  }

  updateProduct(f: any) {
    this.router.navigate(['product-detail/edit', f._id]);
  }

  deleteProduct(_id: any) {
    if (window.confirm('Are you sure to delete this product?')) {
      this._service.deleteProduct(_id).subscribe({
        next: () => {
          // Reload the page after deleting the product
          location.reload();
        },
        error: (err) => {
          this.errMessage = err;
        }
      });
    }
  }
}
