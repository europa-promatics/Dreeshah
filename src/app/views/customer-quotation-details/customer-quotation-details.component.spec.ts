import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerQuotationDetailsComponent } from './customer-quotation-details.component';

describe('CustomerQuotationDetailsComponent', () => {
  let component: CustomerQuotationDetailsComponent;
  let fixture: ComponentFixture<CustomerQuotationDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerQuotationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerQuotationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
