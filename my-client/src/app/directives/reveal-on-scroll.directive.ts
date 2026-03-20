import { AfterViewInit, Directive, ElementRef, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRevealOnScroll]'
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private readonly elementRef: ElementRef<HTMLElement>, private readonly renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const element = this.elementRef.nativeElement;
    this.renderer.addClass(element, 'reveal-on-scroll');

    if (typeof IntersectionObserver === 'undefined') {
      this.renderer.addClass(element, 'is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(element, 'is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
