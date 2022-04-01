import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerIssueQuotationComponent } from './seller-issue-quotation.component';

describe('SellerIssueQuotationComponent', () => {
  let component: SellerIssueQuotationComponent;
  let fixture: ComponentFixture<SellerIssueQuotationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerIssueQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerIssueQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
