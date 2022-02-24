import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerEditBranchComponent } from './seller-edit-branch.component';

describe('SellerEditBranchComponent', () => {
  let component: SellerEditBranchComponent;
  let fixture: ComponentFixture<SellerEditBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerEditBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerEditBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
