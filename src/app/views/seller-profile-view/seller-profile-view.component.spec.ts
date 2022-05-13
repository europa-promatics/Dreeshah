import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProfileViewComponent } from './seller-profile-view.component';

describe('SellerProfileViewComponent', () => {
  let component: SellerProfileViewComponent;
  let fixture: ComponentFixture<SellerProfileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProfileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProfileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
