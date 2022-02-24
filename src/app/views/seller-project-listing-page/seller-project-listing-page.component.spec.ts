import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProjectListingPageComponent } from './seller-project-listing-page.component';

describe('SellerProjectListingPageComponent', () => {
  let component: SellerProjectListingPageComponent;
  let fixture: ComponentFixture<SellerProjectListingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProjectListingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProjectListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
