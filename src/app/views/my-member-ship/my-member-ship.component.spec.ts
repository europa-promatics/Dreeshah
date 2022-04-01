import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMemberShipComponent } from './my-member-ship.component';

describe('MyMemberShipComponent', () => {
  let component: MyMemberShipComponent;
  let fixture: ComponentFixture<MyMemberShipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMemberShipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMemberShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
