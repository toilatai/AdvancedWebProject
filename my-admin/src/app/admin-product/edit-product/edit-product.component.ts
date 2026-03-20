import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/interfaces/products';
import { AdminProductService } from 'src/app/services/admin-product.service';
import { AdminCategoryService } from 'src/app/services/admin-category.service';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent {
  products: any;
  categories: any
  product = new Products();
  errMessage: string = '';

  constructor(public _service: AdminProductService,
    public _fs: AdminCategoryService,
    private router: Router,
    private activateRoute: ActivatedRoute) 
    {
    activateRoute.paramMap.subscribe((param) => {
      let id = param.get('id');
      if (id != null) {
        this.searchProduct(id);
      }
    });

    this._service.getProducts().subscribe({
      next: (data) => {
        // Lấy danh sách các Products
        this.products = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    // Lấy danh sách các category trong CategoryData
    this._fs.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  public setProduct(f: Products) {
    this.product = f;
  }
  searchProduct(_id: string) {
    this._service.getProduct(_id).subscribe({
      next: (data) => {
        this.product = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  putProduct() {
    this._service.putProduct(this.product).subscribe({
      next: (data) => { this.product = data },
      error: (err) => { this.errMessage = err }
    }),
    alert("Edit product successfully!")
    this.goBack()
  }

  goBack() {
    this.router.navigate(['product-management']);
  }

  onFileSelected(event: any, product: Products) {
    let me = this;
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      product.Image = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
}
