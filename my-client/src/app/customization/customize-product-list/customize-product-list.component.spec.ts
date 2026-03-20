import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeProductListComponent } from './customize-product-list.component';

describe('CustomizeProductListComponent', () => {
  let component: CustomizeProductListComponent;
  let fixture: ComponentFixture<CustomizeProductListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizeProductListComponent]
    });
    fixture = TestBed.createComponent(CustomizeProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
