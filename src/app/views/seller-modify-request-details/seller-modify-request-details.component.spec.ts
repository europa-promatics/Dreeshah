import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerModifyRequestDetailsComponent } from './seller-modify-request-details.component';

describe('SellerModifyRequestDetailsComponent', () => {
  let component: SellerModifyRequestDetailsComponent;
  let fixture: ComponentFixture<SellerModifyRequestDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerModifyRequestDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerModifyRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
