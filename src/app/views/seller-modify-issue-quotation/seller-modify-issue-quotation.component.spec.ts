import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerModifyIssueQuotationComponent } from './seller-modify-issue-quotation.component';

describe('SellerModifyIssueQuotationComponent', () => {
  let component: SellerModifyIssueQuotationComponent;
  let fixture: ComponentFixture<SellerModifyIssueQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerModifyIssueQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerModifyIssueQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
