import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductListComponent } from './seller-product-list.component';

describe('SellerProductListComponent', () => {
  let component: SellerProductListComponent;
  let fixture: ComponentFixture<SellerProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
