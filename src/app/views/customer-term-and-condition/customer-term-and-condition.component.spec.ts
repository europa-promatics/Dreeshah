import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTermAndConditionComponent } from './customer-term-and-condition.component';

describe('CustomerTermAndConditionComponent', () => {
  let component: CustomerTermAndConditionComponent;
  let fixture: ComponentFixture<CustomerTermAndConditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerTermAndConditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTermAndConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
