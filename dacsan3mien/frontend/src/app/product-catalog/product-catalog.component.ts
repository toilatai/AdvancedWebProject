import { Component, OnInit } from '@angular/core';
import { Product } from '../../interface/Product';
import { ProductAPIService } from '../product-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  categories: { name: string; image: string; filterKey: string }[] = [];
  selectedCategory: string = 'Tất cả';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];
  productCount: number = 0;
  isLoading: boolean = true;
  errMessage: string = '';
  priceFilter: string = '';
  tagFilter: string = '';
  provinceFilter: string = '';
  searchQuery: string = '';
  
  // Pagination properties
  currentPage: number = 1;
  itemsPerPage: number = 36;
  totalPages: number = 0;
  totalItems: number = 0;
  
  // Province list
  provinces: string[] = [];
  filteredProvinces: string[] = [];
  provinceSearchQuery: string = '';
  showProvinceSuggestions: boolean = false;

  constructor(
    private productService: ProductAPIService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeCategories();
    this.loadProducts();
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      const provinceParam = params['province'] || '';
      const categoryParam = params['category'] || '';
      const discountParam = params['discount'] || '';
      
      if (this.searchQuery) {
        this.applySearchFilter(this.searchQuery);
      }
      
      if (provinceParam) {
        this.provinceFilter = provinceParam;
        console.log('🏛️ Auto-filtering by province:', this.provinceFilter);
      }
      
      if (categoryParam) {
        this.applyCategoryFilter(categoryParam);
        console.log('🏷️ Auto-filtering by category:', categoryParam);
      }
      
      if (discountParam === 'true') {
        this.applyDiscountFilter();
        console.log('💰 Auto-filtering by discount products');
      }
    });
  }

  initializeCategories(): void {
    this.categories = [
      { name: 'Tất cả', image: '/assets/Mẫu.jpg', filterKey: 'Tất cả' },
      { name: 'Thực phẩm khô', image: '/assets/thực phẩm khô.jpg', filterKey: 'Thực phẩm khô' },
      { name: 'Thức uống', image: '/assets/thucuong.jpg', filterKey: 'Thức uống' },
      { name: 'Bánh kẹo', image: '/assets/aboutanh7.jpg', filterKey: 'Bánh kẹo' },
      { name: 'Set quà tặng', image: '/assets/setqua.png', filterKey: 'Set quà tặng' },
      { name: 'Gia vị', image: '/assets/giavi.jpg', filterKey: 'Gia vị' },
    ];
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getProducts(1, 100).subscribe({
      next: (data) => {
        console.log('🔍 API Response Debug:', {
          totalProducts: data.products.length,
          total: data.total,
          page: data.page,
          pages: data.pages
        });
        
        this.products = data.products.map(productData => new Product(
          productData._id,
          productData.product_name,
          productData.product_detail,
          productData.stocked_quantity,
          productData.unit_price,
          productData.discount,
          productData.createdAt,
          productData.image_1,
          productData.image_2,
          productData.image_3,
          productData.image_4,
          productData.image_5,
          productData.product_dept,
          productData.rating,
          productData.isNew,
          productData.type || 'food'
        ));

        console.log('📦 Products after mapping:', this.products.length);
        this.products.forEach(product => product.checkIfNew());
        
        // Extract unique provinces
        this.provinces = [...new Set(this.products.map(p => p.product_dept).filter(dept => dept && dept.trim()))].sort();
        this.filteredProvinces = [...this.provinces];
        console.log('🏛️ Available provinces:', this.provinces);
        
        this.applyFilter(this.selectedCategory);
        if (this.searchQuery) {
          this.applySearchFilter(this.searchQuery);
        }
        
        // Apply province filter if set from query params
        if (this.provinceFilter) {
          this.applyProvinceFilter();
        }
        
        this.isLoading = false;
      },
      error: () => {
        this.errMessage = 'Failed to load products. Please try again later.';
        this.isLoading = false;
      }
    });
  }

  applyFilter(category: string): void {
    this.selectedCategory = category;
    this.currentPage = 1; // Reset to first page when changing category
    
    if (category === 'Tất cả') {
      this.filteredProducts = [...this.products];
    } else {
      // Map category names to type values
      const categoryToTypeMap: { [key: string]: string } = {
        'Thực phẩm khô': 'dried_food',
        'Thức uống': 'beverages',
        'Bánh kẹo': 'cakes_candies',
        'Set quà tặng': 'gift_set',
        'Gia vị': 'spices'
      };
      
      const typeFilter = categoryToTypeMap[category];
      this.filteredProducts = this.products.filter(product => 
        product.type === typeFilter || product.product_dept === category
      );
    }

    // Apply province filter if selected
    if (this.provinceFilter) {
      this.filteredProducts = this.filteredProducts.filter(product => 
        product.product_dept === this.provinceFilter
      );
    }

    this.applyAdditionalFilters();
    this.updateProductCount();
  }

  applySearchFilter(searchTerm: string): void {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.product_name.toLowerCase().includes(lowerCaseSearchTerm) ||
      product.product_detail.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.currentPage = 1; // Reset to first page when searching
    this.updateProductCount();
  }

  filterByPrice(event: Event): void {
    this.priceFilter = (event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to first page when filtering
    this.applyAdditionalFilters();
    this.updateProductCount();
  }

  filterByTag(event: Event): void {
    this.tagFilter = (event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to first page when filtering
    
    // Reset province filter when selecting "Tất cả" tag
    if (this.tagFilter === '') {
      this.provinceFilter = '';
      this.provinceSearchQuery = '';
    }
    
    this.applyFilter(this.selectedCategory);
  }

  filterByProvince(event: Event): void {
    this.provinceFilter = (event.target as HTMLSelectElement).value;
    this.currentPage = 1; // Reset to first page when filtering
    this.applyFilter(this.selectedCategory);
    
    // Apply province filter after category filter
    if (this.provinceFilter) {
      this.applyProvinceFilter();
    }
  }

  private applyAdditionalFilters(skipTag = false): void {
    if (!skipTag && this.tagFilter) {
      this.filteredProducts = this.filteredProducts.filter(product =>
        this.tagFilter === 'new'
          ? product.isNew
          : this.tagFilter === 'discount'
            ? product.discount > 0
            : true
      );
    }

    if (this.priceFilter) {
      this.filteredProducts.sort((a, b) =>
        this.priceFilter === 'lowToHigh' ? a.unit_price - b.unit_price : b.unit_price - a.unit_price
      );
    }
  }

  applyProvinceFilter(): void {
    if (this.provinceFilter) {
      this.filteredProducts = this.filteredProducts.filter(product => 
        product.product_dept === this.provinceFilter
      );
      console.log('🏛️ Filtered by province:', this.provinceFilter, 'Products:', this.filteredProducts.length);
    }
    this.updateProductCount();
  }

  onProvinceSearch(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase().trim();
    this.provinceSearchQuery = query;
    
    if (query.length === 0) {
      this.filteredProvinces = [...this.provinces];
      // Clear province filter when input is empty
      if (this.provinceFilter) {
        this.clearProvinceFilter();
      }
    } else {
      this.filteredProvinces = this.provinces.filter(province => 
        province.toLowerCase().includes(query)
      );
    }
    
    this.showProvinceSuggestions = true;
  }

  selectProvince(province: string): void {
    this.provinceFilter = province;
    this.provinceSearchQuery = province;
    this.showProvinceSuggestions = false;
    this.currentPage = 1;
    this.applyFilter(this.selectedCategory);
    
    if (this.provinceFilter) {
      this.applyProvinceFilter();
    }
  }

  clearProvinceFilter(): void {
    this.provinceFilter = '';
    this.provinceSearchQuery = '';
    this.showProvinceSuggestions = false;
    this.currentPage = 1;
    this.applyFilter(this.selectedCategory);
  }

  onProvinceInputBlur(): void {
    // Delay hiding suggestions to allow click events
    setTimeout(() => {
      this.showProvinceSuggestions = false;
    }, 200);
  }

  getProvinceProductCount(province: string): number {
    return this.products.filter(product => product.product_dept === province).length;
  }

  clearAllFilters(): void {
    this.provinceFilter = '';
    this.provinceSearchQuery = '';
    this.tagFilter = '';
    this.priceFilter = '';
    this.searchQuery = '';
    this.selectedCategory = 'Tất cả';
    this.currentPage = 1;
    this.applyFilter('Tất cả');
  }

  applyCategoryFilter(categoryType: string): void {
    // Map category types to category names
    const categoryTypeMap: { [key: string]: string } = {
      'dried_food': 'Thực phẩm khô',
      'beverages': 'Thức uống',
      'cakes_candies': 'Bánh kẹo',
      'gift_set': 'Set quà tặng',
      'spices': 'Gia vị'
    };
    
    const categoryName = categoryTypeMap[categoryType] || 'Tất cả';
    this.selectedCategory = categoryName;
    this.currentPage = 1;
    this.applyFilter(categoryName);
  }

  applyDiscountFilter(): void {
    this.selectedCategory = 'Tất cả';
    this.currentPage = 1;
    
    // Filter products with discount > 0
    this.filteredProducts = this.products.filter(product => product.discount > 0);
    
    this.applyAdditionalFilters();
    this.updateProductCount();
  }

  private updateProductCount(): void {
    this.productCount = this.filteredProducts.length;
    this.totalItems = this.filteredProducts.length;
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    
    // Only reset to first page if current page is beyond total pages
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    
    this.updatePaginatedProducts();
    this.errMessage = this.filteredProducts.length === 0
      ? 'No products found in this category.'
      : '';
  }

  private updatePaginatedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
    
    // Debug info
    console.log('Pagination Debug:', {
      currentPage: this.currentPage,
      totalPages: this.totalPages,
      totalItems: this.totalItems,
      itemsPerPage: this.itemsPerPage,
      filteredProductsLength: this.filteredProducts.length,
      paginatedProductsLength: this.paginatedProducts.length,
      startIndex,
      endIndex
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedProducts();
      this.scrollToTop();
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedProducts();
      this.scrollToTop();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedProducts();
      this.scrollToTop();
    }
  }

  private scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  getEndRange(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
  }
}
