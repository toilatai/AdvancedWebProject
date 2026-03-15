import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Product } from '../../interface/Product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: Product;
  images: string[] = [];
  selectedImageIndex: number = 0;
  quantity: number = 1;
  isOutOfStock: boolean = false;
  isHovering: boolean = false;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    if (this.product) {
      this.images = [
        this.product.image_1,
        this.product.image_2,
        this.product.image_3,
        this.product.image_4,
        this.product.image_5
      ].filter(image => !!image);

      this.isOutOfStock = (this.product.stocked_quantity || 0) === 0;
      if (this.isOutOfStock) {
        this.quantity = 0;
      }
    }
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  increaseQuantity(): void {
    if (!this.isOutOfStock && this.quantity < (this.product.stocked_quantity || 0)) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (!this.isOutOfStock && this.quantity > 1) {
      this.quantity--;
    }
  }

  validateQuantity(): void {
    if (this.quantity > (this.product.stocked_quantity || 0)) {
      alert("Không thể đặt hàng vượt quá số lượng hàng tồn kho.");
      this.quantity = this.product.stocked_quantity || 0;
    }
  }

  getOriginalPrice(): number | null {
    if (this.product.discount && this.product.discount > 0) {
      const originalPrice = this.product.unit_price / (1 - this.product.discount);
      return Math.round(originalPrice / 1000) * 1000;
    }
    return null;
  }

  getStarFillPercentage(rating: number, starIndex: number): number {
    if (rating >= starIndex) {
      return 100;
    } else if (rating + 1 > starIndex) {
      return (rating - (starIndex - 1)) * 100;
    } else {
      return 0;
    }
  }

  onStarHover(): void {
    this.isHovering = true;
  }

  onStarLeave(): void {
    this.isHovering = false;
  }

  buyNow(): void {
    if (this.isOutOfStock || !this.product._id) {
      return;
    }
    this.cartService.saveSingleProductForCheckout(
      this.product._id,
      this.quantity,
      this.product.unit_price,
      this.product.product_name,
      this.product.image_1,
      this.product.stocked_quantity
    );
    this.router.navigate(['/payment']);
  }

  addToCart(event: Event): void {
    event.stopPropagation();
    this.cartService.addToCart(
      this.product._id,
      this.quantity,
      this.product.unit_price,
      this.product.product_name,
      this.product.image_1,
      this.product.stocked_quantity
    );
  }
}
