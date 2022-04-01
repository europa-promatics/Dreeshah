import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEditServicesComponent } from './seller-edit-services.component';

describe('SellerEditServicesComponent', () => {
  let component: SellerEditServicesComponent;
  let fixture: ComponentFixture<SellerEditServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerEditServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEditServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
