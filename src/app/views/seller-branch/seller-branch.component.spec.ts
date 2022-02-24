import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerBranchComponent } from './seller-branch.component';

describe('SellerBranchComponent', () => {
  let component: SellerBranchComponent;
  let fixture: ComponentFixture<SellerBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
