import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFAQComponent } from './customer-faq.component';

describe('CustomerFAQComponent', () => {
  let component: CustomerFAQComponent;
  let fixture: ComponentFixture<CustomerFAQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFAQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFAQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
