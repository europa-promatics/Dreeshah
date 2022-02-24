import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ConsultantQuotationComponent } from './consultant-quotation.component';

describe('ConsultantQuotationComponent', () => {
  let component: ConsultantQuotationComponent;
  let fixture: ComponentFixture<ConsultantQuotationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultantQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultantQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
