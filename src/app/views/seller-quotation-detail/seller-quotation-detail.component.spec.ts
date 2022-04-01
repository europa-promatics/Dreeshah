import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerQuotationDetailComponent } from './seller-quotation-detail.component';

describe('SellerQuotationDetailComponent', () => {
  let component: SellerQuotationDetailComponent;
  let fixture: ComponentFixture<SellerQuotationDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerQuotationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerQuotationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
