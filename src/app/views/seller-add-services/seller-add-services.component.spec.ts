import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAddServicesComponent } from './seller-add-services.component';

describe('SellerAddServicesComponent', () => {
  let component: SellerAddServicesComponent;
  let fixture: ComponentFixture<SellerAddServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerAddServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerAddServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
