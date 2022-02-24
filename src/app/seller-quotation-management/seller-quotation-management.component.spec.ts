import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerQuotationManagementComponent } from './seller-quotation-management.component';

describe('SellerQuotationManagementComponent', () => {
  let component: SellerQuotationManagementComponent;
  let fixture: ComponentFixture<SellerQuotationManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerQuotationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerQuotationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
