import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddIssueQuoteComponent } from './customer-add-issue-quote.component';

describe('CustomerAddIssueQuoteComponent', () => {
  let component: CustomerAddIssueQuoteComponent;
  let fixture: ComponentFixture<CustomerAddIssueQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAddIssueQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAddIssueQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
