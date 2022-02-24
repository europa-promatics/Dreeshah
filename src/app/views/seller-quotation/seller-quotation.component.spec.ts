import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerQuotationComponent } from './seller-quotation.component';

describe('SellerQuotationComponent', () => {
  let component: SellerQuotationComponent;
  let fixture: ComponentFixture<SellerQuotationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
