import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerModifyRequestsComponent } from './seller-modify-requests.component';

describe('SellerModifyRequestsComponent', () => {
  let component: SellerModifyRequestsComponent;
  let fixture: ComponentFixture<SellerModifyRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerModifyRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerModifyRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
