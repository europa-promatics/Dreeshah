import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddIssueQuoteComponent } from './seller-add-issue-quote.component';

describe('SellerAddIssueQuoteComponent', () => {
  let component: SellerAddIssueQuoteComponent;
  let fixture: ComponentFixture<SellerAddIssueQuoteComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAddIssueQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAddIssueQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function waitForAsync(arg0: () => void): (done: DoneFn) => Promise<void> {
  throw new Error('Function not implemented.');
}

