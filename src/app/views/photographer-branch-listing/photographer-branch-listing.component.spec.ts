import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotographerBranchListingComponent } from './photographer-branch-listing.component';

describe('PhotographerBranchListingComponent', () => {
  let component: PhotographerBranchListingComponent;
  let fixture: ComponentFixture<PhotographerBranchListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotographerBranchListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotographerBranchListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
