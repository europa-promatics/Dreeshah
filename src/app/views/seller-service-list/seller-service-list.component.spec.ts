import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerServiceListComponent } from './seller-service-list.component';

describe('SellerServiceListComponent', () => {
  let component: SellerServiceListComponent;
  let fixture: ComponentFixture<SellerServiceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerServiceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
