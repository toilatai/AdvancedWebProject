import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interfaces/category';
import { Products } from 'src/app/interfaces/products';
import { AdminCategoryService } from 'src/app/services/admin-category.service';
import { AdminProductService } from 'src/app/services/admin-product.service';

@Component({
  selector: 'app-add-caterogy-level-1',
  templateUrl: './add-caterogy-level-1.component.html',
  styleUrls: ['./add-caterogy-level-1.component.css']
})
export class AddCaterogyLevel1Component {

  category = new Category();
  errMessage: string = '';

  constructor(public _service: AdminCategoryService, private router: Router, private activateRoute: ActivatedRoute) { }

  public setCategory(f: Category) {
    this.category = f;
  }

  postCategory() {
    this._service.postCategory(this.category).subscribe({
      next: (data) => {
        this.category = data;
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
    alert("Category added successfully")
    this.goBack();
  }

  goBack() {
    this.router.navigate(['admin-category-management']);
  }
}
