import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAccountSettingComponent } from './customer-account-setting.component';

describe('CustomerAccountSettingComponent', () => {
  let component: CustomerAccountSettingComponent;
  let fixture: ComponentFixture<CustomerAccountSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerAccountSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerAccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
