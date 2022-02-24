import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerRefundManagementComponent } from './seller-refund-management.component';

describe('SellerRefundManagementComponent', () => {
  let component: SellerRefundManagementComponent;
  let fixture: ComponentFixture<SellerRefundManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerRefundManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerRefundManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
