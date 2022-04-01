import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEditProfileComponent } from './seller-edit-profile.component';

describe('SellerEditProfileComponent', () => {
  let component: SellerEditProfileComponent;
  let fixture: ComponentFixture<SellerEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
