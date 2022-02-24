import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelllerBranchListingComponent } from './selller-branch-listing.component';

describe('SelllerBranchListingComponent', () => {
  let component: SelllerBranchListingComponent;
  let fixture: ComponentFixture<SelllerBranchListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelllerBranchListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelllerBranchListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
