import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StaffPrivilegesComponent } from './staff-privileges.component';

describe('StaffPrivilegesComponent', () => {
  let component: StaffPrivilegesComponent;
  let fixture: ComponentFixture<StaffPrivilegesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffPrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffPrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
