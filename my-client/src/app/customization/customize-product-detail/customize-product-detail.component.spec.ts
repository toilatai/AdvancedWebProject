import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeProductDetailComponent } from './customize-product-detail.component';

describe('CustomizeProductDetailComponent', () => {
  let component: CustomizeProductDetailComponent;
  let fixture: ComponentFixture<CustomizeProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizeProductDetailComponent]
    });
    fixture = TestBed.createComponent(CustomizeProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
