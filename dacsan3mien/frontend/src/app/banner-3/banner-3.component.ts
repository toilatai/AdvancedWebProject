import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner-3',
  templateUrl: './banner-3.component.html',
  styleUrl: './banner-3.component.css'
})
export class Banner3Component {

  constructor(private router: Router) { }

  goToBeverageProducts(): void {
    this.router.navigate(['/catalog'], { queryParams: { category: 'beverages' } });
  }
}
