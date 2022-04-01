import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDetailDashboardComponent } from './seller-detail-dashboard.component';

describe('SellerDetailDashboardComponent', () => {
  let component: SellerDetailDashboardComponent;
  let fixture: ComponentFixture<SellerDetailDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerDetailDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDetailDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
