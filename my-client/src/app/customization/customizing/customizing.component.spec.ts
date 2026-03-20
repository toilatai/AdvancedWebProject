import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizingComponent } from './customizing.component';

describe('CustomizingComponent', () => {
  let component: CustomizingComponent;
  let fixture: ComponentFixture<CustomizingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomizingComponent]
    });
    fixture = TestBed.createComponent(CustomizingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
