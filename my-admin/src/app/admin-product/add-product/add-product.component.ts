import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'src/app/interfaces/products';
import { AdminCategoryService } from 'src/app/services/admin-category.service';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  products: any;
  product = new Products();
  categories: any;
  categories_test: any;
  errMessage: string = '';

  constructor(public _service: AdminProductService,
              public _fs: AdminCategoryService,
              private router: Router, 
              private activatedRoute: ActivatedRoute) 
  {
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
        this.categories_test = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  public setProduct(f: Products) {
    this.product = f;
  }
  
  onFileSelected(event: any, product: Products) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      product.Image = reader.result!.toString();
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  postProduct() {
    //this.product.Create_date= ${new Date().getDate()}-${new Date().getMonth() + 1}-${new Date().getFullYear()};
    this._service.postProduct(this.product).subscribe({
      next: (data) => {
        this.product = data;
        alert('Add product successfully!');
        this.goBack();
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