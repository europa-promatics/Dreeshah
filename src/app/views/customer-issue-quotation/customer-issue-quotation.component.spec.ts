import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomerIssueQuotationComponent } from './customer-issue-quotation.component';

describe('CustomerIssueQuotationComponent', () => {
  let component: CustomerIssueQuotationComponent;
  let fixture: ComponentFixture<CustomerIssueQuotationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerIssueQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerIssueQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
