import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../SERVICES/product.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  category: string = '';
  categories: any[] | undefined;
  products: any;
  cartItems: any[] = [];
  quantityItem: number = 0;
  displayItem: boolean = true;
  errMessage: string = '';
  Name: any;
  isFixed = false;

  email: string = '';  // For two-way binding with the input
  showError: boolean = false;  // Controls the display of the error message

  constructor(
    public _service: ProductsService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.loadData();
  }

  // Form submission handling
  onSubmit(): void {
    if (this.email && this.email.trim()) {
      this.showError = false;  // Hide error message if email is valid
      this.showSuccessMessage();
      this.resetForm();
    } else {
      this.showErrorMessage();
    }
  }

  // Display a success message as an alert on successful submission
  showSuccessMessage(): void {
    alert('Subscription successful! Thank you for subscribing to our newsletter.');
  }

  // Show error message if form is invalid
  showErrorMessage(): void {
    this.showError = true;  // Display inline error message
  }

  // Hide error message when the user focuses on the input field
  hideErrorMessage(): void {
    this.showError = false;
  }

  // Reset the form after successful submission
  resetForm(): void {
    this.email = '';  // Clear the email field
    this.showError = false;  // Hide the error message
  }

  // Other methods (unrelated to form submission)
  navigateToCategory(category: string): void {
    this.router.navigate(['/app-category', category]).then(() => {
      this.scrollToTop();
    });
  }

  navigateToHome() {
    this.router.navigate(['/']).then(() => {
      const chungnhanAnToanSection = document.getElementById('chungnhanAnToan');
      if (chungnhanAnToanSection) {
        chungnhanAnToanSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.activateRoute.fragment.subscribe(fragment => {
      if (fragment === 'top') {
        this.scrollToTop();
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  loadData(): void {
    this._service.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.categories = this.extractCategories(data);
      },
      error: (err) => {
        this.errMessage = err;
      },
    });
  }

  extractCategories(data: any[]): any[] {
    const categories = Array.from(
      new Set(data.map((x: { Category: any }) => x.Category))
    );
    return categories.map((category) => {
      return {
        Category: category,
        SubCategories: Array.from(
          new Set(
            data
              .filter((x: { Category: any }) => x.Category === category)
              .map((x: { SubCategory: any }) => x.SubCategory)
          )
        ),
      };
    });
  }

  selectCategory(category: string): void {
    this.router.navigate(['/app-category', category]).then(() => {
      this.scrollToTop();
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isFixed = window.scrollY > 320;
  }
}
