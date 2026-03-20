import { Component } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  standalone: true, // Standalone component
  imports: [NgIf, NgClass], // Import NgIf and NgClass
})
export class AboutUsComponent {
  activeTab: string = 'vision';

  constructor(private router: Router) {} // Khởi tạo Router trong constructor

  toggleTab(tab: string) {
    this.activeTab = tab;
  }

  browseProduct() {
    this.router.navigate(['/app-category']); // Điều hướng đúng cách
  }
}
