import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModifyQuoteComponent } from './customer-modify-quote.component';

describe('CustomerModifyQuoteComponent', () => {
  let component: CustomerModifyQuoteComponent;
  let fixture: ComponentFixture<CustomerModifyQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerModifyQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerModifyQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
