import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMembershipListComponent } from './my-membership-list.component';

describe('MyMembershipComponent', () => {
  let component: MyMembershipListComponent;
  let fixture: ComponentFixture<MyMembershipListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMembershipListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMembershipListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
