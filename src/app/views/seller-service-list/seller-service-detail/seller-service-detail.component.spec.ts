import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerServiceDetailComponent } from './seller-service-detail.component';

describe('SellerServiceDetailComponent', () => {
  let component: SellerServiceDetailComponent;
  let fixture: ComponentFixture<SellerServiceDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerServiceDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerServiceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
