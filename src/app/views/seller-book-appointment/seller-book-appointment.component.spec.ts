import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SellerBookAppointmentComponent } from './seller-book-appointment.component';

describe('SellerBookAppointmentComponent', () => {
  let component: SellerBookAppointmentComponent;
  let fixture: ComponentFixture<SellerBookAppointmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBookAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
