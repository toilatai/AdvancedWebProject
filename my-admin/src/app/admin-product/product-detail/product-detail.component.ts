import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  product: any;
  errMessage: string = '';
  constructor(public _service: AdminProductService, private router: Router, private activateRoute: ActivatedRoute) {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchProduct(id);
      }
    });
  }
  searchProduct(productId: string) {
    this._service.getProduct(productId).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }
  
  goBack() {
    this.router.navigate(['product-management']);
  }
}
