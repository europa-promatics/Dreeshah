import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerQuotationManagementDetailComponent } from './seller-quotation-management-detail.component';

describe('SellerQuotationManagementDetailComponent', () => {
  let component: SellerQuotationManagementDetailComponent;
  let fixture: ComponentFixture<SellerQuotationManagementDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerQuotationManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerQuotationManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
