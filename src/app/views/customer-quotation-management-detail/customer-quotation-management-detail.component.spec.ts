import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerQuotationManagementDetailComponent } from './customer-quotation-management-detail.component';

describe('CustomerQuotationManagementDetailComponent', () => {
  let component: CustomerQuotationManagementDetailComponent;
  let fixture: ComponentFixture<CustomerQuotationManagementDetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerQuotationManagementDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerQuotationManagementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
