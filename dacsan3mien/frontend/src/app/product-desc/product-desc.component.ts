import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-product-desc',
  templateUrl: './product-desc.component.html',
  styleUrls: ['./product-desc.component.css']
})
export class ProductDescComponent implements OnInit {
  @Input() product: any;
  selectedTab: string = 'description';
  reviews: { user: string; comment: string; timestamp: string }[] = [];
  newComment: string = '';
  isLoggedIn: boolean = false;
  userEmail: string = '';
  reviewsPerPage: number = 3;
  currentPage: number = 1;
  pagedReviews: { user: string; comment: string; timestamp: string }[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((status) => {
      this.isLoggedIn = status;
    });

    this.authService.getUserEmail().subscribe((email) => {
      this.userEmail = email ? `${email[0]}${email[1]}...` : 'User';
    });

    this.loadReviews();
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  addReview(): void {
    if (this.isLoggedIn && this.newComment.trim()) {
      const newReview = {
        user: this.userEmail,
        comment: this.newComment,
        timestamp: new Date().toLocaleString()
      };
      this.reviews.push(newReview);
      this.newComment = '';
      this.saveReviews();
      this.updatePagedReviews();
    } else {
      alert('Vui lòng đăng nhập để thêm đánh giá.');
    }
  }

  loadReviews(): void {
    const savedReviews = localStorage.getItem(`reviews_${this.product.product_name}`);
    this.reviews = savedReviews ? JSON.parse(savedReviews) : [];
    this.updatePagedReviews();
  }

  saveReviews(): void {
    localStorage.setItem(`reviews_${this.product.product_name}`, JSON.stringify(this.reviews));
  }

  updatePagedReviews(): void {
    const startIndex = (this.currentPage - 1) * this.reviewsPerPage;
    const endIndex = startIndex + this.reviewsPerPage;
    this.pagedReviews = this.reviews.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.reviews.length / this.reviewsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagedReviews();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagedReviews();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePagedReviews();
  }

  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index + 1);
  }
}
