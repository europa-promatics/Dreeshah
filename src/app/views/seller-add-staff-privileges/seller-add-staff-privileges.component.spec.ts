import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerAddStaffPrivilegesComponent } from './seller-add-staff-privileges.component';

describe('SellerAddStaffPrivilegesComponent', () => {
  let component: SellerAddStaffPrivilegesComponent;
  let fixture: ComponentFixture<SellerAddStaffPrivilegesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAddStaffPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAddStaffPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
