import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  showScrollButton: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.fragment.subscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.showScrollButton = window.pageYOffset > 700;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 680, behavior: 'smooth' });
  }

  goToDiscountProducts(): void {
    this.router.navigate(['/catalog'], { queryParams: { discount: 'true' } });
  }
}
