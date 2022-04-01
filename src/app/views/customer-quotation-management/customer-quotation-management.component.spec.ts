import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerQuotationManagementComponent } from './customer-quotation-management.component';

describe('CustomerQuotationManagementComponent', () => {
  let component: CustomerQuotationManagementComponent;
  let fixture: ComponentFixture<CustomerQuotationManagementComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerQuotationManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerQuotationManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
