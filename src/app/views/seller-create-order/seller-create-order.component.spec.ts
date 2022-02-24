import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerCreateOrderComponent } from './seller-create-order.component';

describe('SellerCreateOrderComponent', () => {
  let component: SellerCreateOrderComponent;
  let fixture: ComponentFixture<SellerCreateOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerCreateOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerCreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
